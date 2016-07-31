#第二章 InnoDB存储引擎
##2.5 Master Thread工作方式
###2.5.1 1.0.x版本之前的Master Thread
Master Thread有最高的线程优先级别，其内部由多个循环组成：
* 主循环（loop)
* 后台循环（backgrou,nd loop)
* 刷新循环（flush loop）
* 暂停循环（suspend loop）
Master Thread会根据数据库的运行状态在这个循环进行切换。
**主循环**
其中有两大部分操作-每秒钟和每10秒钟的操作。

loop循环通过thread sleep来实现，这意味着每秒钟和每10秒钟的操作是不精确的，在负载很大的情况下会有延迟。

每秒一次的操作包括：
+ 日志缓冲刷新到磁盘，即使这个事务还没有提交（总是）
	这可以很好解释为什么再大的事务提交的时间也是很短的
+ 合并插入缓冲（可能）
	InnodB存储引擎会判断当前一秒内发生的IO次数是否小于5，如果小于5，InnoDB认为当前IO压力很小，可以执行合并插入缓冲的操作。
+ 至多刷新100个InnoDB的缓冲池中的脏页到磁盘（可能）
	 InnodB存储引擎通过判断当前缓冲池中的脏页比例是否超过配置文件中的innodb_max_dirty_page_pct参数，如果超过了这个值，则认为需要做磁盘同步操作，将100个脏页写入磁盘中
+ 如果当前没有用户活动，则切换到background loop(可能）

每10秒钟的操作包括：
+ 刷新100个脏页到磁盘（可能）
	 InnodB存储引擎会判断过去十秒内的磁盘IO是否小于200次，如果是，则将100个脏页刷新回磁盘
+ 合并至多5个插入缓冲（总是)
	不同于每秒一次可能的合并插入缓冲操作，这次的合并插入缓冲操作总会在这个阶段进行
+ 将日志缓冲刷新到磁盘（总是）
	同每秒一次
+ 删除无用的undo页（总是）
	对表进行update delete操作时，原先的行标记被删除，但是因为一致性读的关系，需要保留这些行版本信息。但是在full purge过程中， InnodB存储引擎会判断当前事务系统中已被删除的行是否可以删除，比如有时候有可能有查询操作需要读取之前版本的undo信息，如果可以删除，InnoDB会立即将其删除。从源码可以看出，每次最多尝试回收20个undo页
+ 刷新100个或者10个脏页到磁盘（总是）
	 InnodB存储引擎判断缓冲池中的脏页比例，如果超过70%，刷新100个脏页到磁盘，如果小于70%，刷新10个到磁盘
**background loop**
若当前没有用户活动时（数据库空闲）或数据库关闭，就会切换到这个循环，会执行一下操作：
* 删除无用undo页（总是）
* 合并20个插入缓冲（总是）
* 跳回到主循环（总是）
* 不断刷新100个页直到符合条件（可能，跳转到flush loop中完成）
若flush loop中也没什么事情可做，回切换到suspend loop，将master thread挂起，等待事情发生。若用户启用了innodb存储引擎，却没有使用任何InnoDB存储引擎的表，那么master thread 总是处于挂起状态

###2.5.2 1.2.x版本之前的Master Thread
在了解了之前的masterthread实现过程后，我们会发现InnoDB存储引擎对IO其实是有限制的，InnoDB存储引擎最大只会刷新100个脏页到磁盘，合并20个插入缓冲.
为此，InnodB Plugin提供了innodb_io_capacity参数，用来表示磁盘吞吐量，默认200。对于刷新到磁盘页的数量，会按照innodb_io_capacity的值的百分比来控制：
+ 在合并插入缓冲时，合并插入缓冲的数量是innodb_io_capacity值的5%
+ 在从缓冲区刷新脏页时，刷新脏页的数量为innodb_io_capacity

另个问题是，参数innodb_max_dirty_pages_pct,1.0.x版本之前，该值默认为90，意味着脏页占缓冲池的90%，但该值太大了，因为InnoDB存储引擎在每秒刷新缓冲池和flush loop时会判断这个值，如果该值大于innodb_dirty_page_pct，才刷新100个页，如果有很大的内存，或者数据库服务器的压力很大，这时刷新脏页的速度反而会降低。同样在数据库恢复阶段可能花更多的时间。从1.0.x,这个值默认为75%。

1.0.x带来的另一个参数是innodb_adaptive_flushing(自适应刷新），InnoDB存储引擎会通过一个名为buf_flush_get_desired_flush_rate的函数来判断需要刷新脏页最合适的数量（通过判断产生重做日志的速度来决定最合适的刷新脏页的数量），因此当脏页比例小于innodb_max_dirty_pages_pct时也会刷新一定量的脏页

另个改变是：之前每次进行full purge操作时，最多回收20个undo页，1.0.x开始引入了参数innodb_purge_batch_size,该参数可以控制每次purge回收的undo页数量。默认20。

###2.5.3 1.2.x版本的Master Thread
1.2.x版本再次对master thread进行了优化，<一段伪代码，两个函数:svr_master_do_idle_tasks() 十秒操作 svr_master_do_active() 每秒操作>,[吐槽：跟没说一样]

对于刷新脏页操作，从Master thread线程分离到一个单独的Page Cleaner Thread,减轻了Master Thread的工作，提高了系统的并发性。


