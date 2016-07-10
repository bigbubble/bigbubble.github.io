#第二章 InnoDB 存储引擎
##2.1 概述 skiped
##2.2 InnoDB存储引擎版本
InnoDB各版本功能对比
| 版本         | 功能                                                  |
| -------------| -----------------------------------------------------:|
| 老版本InnoDB | 支持ACID、行锁设计、MVVC                              |
| InnoDB 1.0.x | 继承上述版本所有功能，增加了compress和dynamic页格式   |
| InnoDB 1.1.x | 继承上述版本所有功能，增加linux AIO、多段回滚         |
| InnoDB 1.2.x | 继承上述版本所有功能,增加了全文索引支持、在线索引添加 |

在MySQL5.1中支持两个InnoDB，静态编译的版本，老版本的InnoDB；另一个动态加载的版本InnoDB Plugin，视为InnoDB1.0.x,但它不支持Linux Native AIO;

MySQL5.5中InnoDB升级为了1.1.x

MySQL5.6中InnoDB升级为了1.2.x

##2.3 InnoDB 体系架构
* 内存池 InnoDB存储引擎有多个内存块，负责维护数据结构、缓存磁盘数据、重做日志缓冲等等
* 后台线程，负责刷新内存池中的数据，保证缓冲池中的数据是最近的数据，将已修改的数据文件刷新到磁盘文件，同时保证在数据库发生异常的情况下InnoDB能恢复到正常运行状态。
###2.3.1 后台线程
1. Master Thread
主要负责将缓冲池中的数据异步刷新到磁盘，保证数据一致性。
2. IO Thread
InnoDB中大量使用了AIO来处理IO请求，IO Thread的工作主要负责这些IO请求的回调。

可以使用 innodb_read_io_threads和innodb_write_io_threads来进行设置

可以使用 SHOW ENGINE INNODB STATUS 观察InnoDB中的IO Thread：

IO Thread 0为insert buffer thread

IO Thread 1为log Thread

之后为设置的读写线程，并且读的线程ID总是小于写线程
3. Purge Thread
事务被提交后，其所使用的undolog可能不在需要，因此需要PurgeThread来回收已经使用病分配的undo页

从1.2开始，支持设置多个Purge Thread， 进一步加快undo页的回收，同时由于Purge Thread需要离散地读取undo页， 能进一步礼欧诺个磁盘的随机读取性能。
4. Purge Cleaner Thread
since 1.2.x,作用是将之前版本中脏页的刷新操作都放入单独的线程来完成，减轻原Master Thread的工作及对用户查询线程的阻塞。
###2.3.2 内存
1. 缓冲池
InnoDB存储引擎式基于磁盘存储的，并将其中的记录按照页的方式进行管理，默认大小为16KB。

缓冲池简单来说就是一块内存区域，通过内存的速度来弥补磁盘速度较慢对数据库性能的影响

数据的读取更改操作都先到缓冲池中操作，对于修改现在缓冲池中修改，然后再以一定频率更新到磁盘上。

页从缓冲池刷新回磁盘的操作并不是在每次页发生改变时触发，而是通过称为CheckPoint的机制刷新回磁盘，以提高数据库性能

缓冲池的大小直接影响数据库的性能

可以通过参数 innodb_buffer_pool_size来设置缓冲池大小

缓冲池中由多种数据类型的数据页：索引页，数据页，undo页，插入缓冲，自适应哈希索引，锁信息，数据字典信息等

从1.0.x开始，允许有多个缓冲池实例，可以通过innodb_buffer_pool_instances来配置，默认为1

可以通过 SHOW ENGINE INNODB STATUS查看， 从MySQL5.6开始可以通过infomation_schema架构下的表INNODB_BUFFER_POOL_STATS查看

2. LRU List、Free List和Flush List

InnoDB存储引擎使用了优化了的LRU算法对缓冲池进行管理，在LRU列表中加入了midpoint位置。

新读取到到的页，并不是直接放到LRU列表的首部，而是放到列表的midpoint位置，在默认配置下，这个位置在LUR列表长度的5/8处

midpoint位置可以由参数 innodb_old_blocks_pck控制

为什么不使用朴素的LRU算法呢?
直接将读取的页放到LRU列表的首部，那么某些SQL操作可能会使缓冲池中的页被刷出，常见的这类操作为索引或数据扫描操作。这类操作需要访问表中许多页，甚至是全部页。如果页被放入LRU的首部，那么非常有可能将所需要的热点数据从LRU列表中移除，而在下一次读取该页时，需要再次访问磁盘。

为解决这个问题，InnoDB存储引擎引进了另一个参数 innodb_old_blocks_time，用于表示读取到midpoint位置后需要等待多久才会被加入多LRU列表的热端

Free list

当数据库启动时，LRU列表是空的，这是页都存放在Free List中。当需要从缓冲池中分页时（什么意思？？？）,首先从Free列表中查找是否有可用的空闲页，若有则将该页从Free列表中删除，放入到LRU列表中。否则根据LRU算法，淘汰LRU末尾的页，将该内存空间分配给新页。

当从页的LRU列表的old部分加入到new时，称此时的操作为page made young，而因innodb_old_blocks_time的设置而导致页没有从old移动到new的部分称为page not made young,可通过SHOW ENGINE INNODB STATUS观察free列表使用情况。

这里有个重要的观察变量：buffer bit rate,表示缓冲池命中率，通常该值应该不小于95%

从1.2开始可以通过表INNODB_BUFFER_POOL_STATS来观察池中的状态

还可以通过表INNODB_BUFFER_PAGE_LRU观察每个LRU列表中每个页的具体信息

从1.0.x开始支持压缩页的功能，对于非16KB的页，通过unzip_LRU列表进行管理，LRU列表中包含了unzip_LRU列表中的页。


unzip_LRU怎样从缓冲池中分配内存？

首先，对不同压缩页大小的页进行分别管理，其次，通过伙伴算法进行内存的分配。

Flush list

在LRU列表中的页被修改后，称为脏页，即缓冲池里的页和磁盘上的数据产生了不一致，这是数据库会通过CHECKPOINT机制将脏页刷新回磁盘，而Flush列表中的页即为脏页。LRU列表用来管理缓冲池中页的可用性，Flush列表用来管理将页刷新回磁盘。
3. 重做日志缓冲
InnoDB首先将重做日志信息放到这个缓冲区，再按一定频率将其刷新到重做日志文件。一般日志缓冲需要设置得很大，一般情况下每一秒种会将重做日志缓冲刷新到日志文件。该值可由参数innodb_log_buffer_size设置，默认为8M.
8M通常足以满足绝大部分应用，因为日志缓冲会在下列三种情况下写入到磁盘日志文件：Master Thread每秒钟将重做日志缓冲刷新到重做日志文件、每个事务提交时会将重做日志缓冲写入到重做日志文件、当重做日志缓冲池剩余空间小于1/2时，重做日志缓冲会写入到重做日志文件。
4. 额外的内存池
在InnoDB存储引擎中，对内存的管理是通过一种称为内存堆的方式进行的。在对一些数据结构本身的内存进行分配时，需要从额外的内存池中申请，当区域的内存不够时，会从缓冲池中申请。因此，当申请了很大的InnoDB缓冲池时，也应当考虑相应增加这个值。
##2.4 CHECKPOINT 技术

