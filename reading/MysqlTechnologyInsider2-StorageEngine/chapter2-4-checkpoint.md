#第二章 innodb存储引擎
##2.4 checkpoint技术
checkpoint技术要解决的问题：
* 缩短数据库回复时间；
 当数据库发生宕机时，数据库不需要重做所有日志，因为checkpoint点之前的页都已经刷新回磁盘。只需对checkpoint点之后的重做日志进行恢复即可；
* 缓冲池不够用时，将脏页刷新到磁盘；
 当缓冲池不够用时，根据LRU算法会溢出最近最少使用的页，若此页为脏数据，则会强制执行checkpoint，将脏页也就是页的新版本刷新回磁盘；
* 重做日志不可用时，刷新脏页；
 重做日志出现不可用的情况是当前数据库系统对重做日志的设计都是循环使用的，当需要覆盖的重做日志还需使用就必须强制产生checkpoint；
innodb中使用LSN(log sequence Number)标记版本，LSN是八字节的数，每页有LSN,重做日志也有LSN。

###checkpoint发生的时间，条件和脏页的选择

innodb引擎中的两种checkpoint：
* sharp checkpoint
* fuzzy checkpoint
sharp checkpoint 发生在数据库关闭时将所有的脏页刷新到磁盘；

但若在数据库运行时也是用sharp checkpoint，那么数据库的可用性会受到很大影响，故在innodb存储引擎内部使用fuzzy checkpoint，可能发生如下几种checkpoint：
* Master Thread checkpoint
 每隔几秒或几十秒的速度从缓冲池的脏页列表中刷新一定比例的页面回磁盘，这个过程是异步的。
* FLUSH LRU_LIST_checkpoint
 innodb存储引擎要保证LRU列表中需要有差不多100多个空闲页可供使用，如不够则需要执行checkpoint。
* Asy/Sync Flush Checkpoint
 当重做日志不可用时，需强制将一些页刷新回磁盘，而此时脏页是从脏页列表中选取的。
	redo_lsn = 已经写入到LSN
	checkpoint_lsn = 已经刷新回磁盘最新页
 so checkpoint_age = redo_lsn - checkpoint_lsn	
	async_water_mark = 75% * total_redo_log_file_size
	sync_water_mark = 90% * total_redo_log_file_size
 total_redo_log_file_size是所有重做日志大小的总和

 当checkpoint_age < async_water_mark 时，不需要刷新任何脏页到磁盘
 当async_water_mark < checkpoint_age < sync_water_mark时触发Async Flush,从Flush列表中刷新出足够的页回磁盘，使得checkpoint_age < async_water_mark
 当checkpoint_age >  sync_water_mark时触发Sync Flush,从Flush列表刷新出足够的页回磁盘，使得checkpoint_age < async_water_mark,这种情况很少发生。

 可以通过命令show engine innodb status来观察刷新情况
		Async_Flush:0 Sync Flush:0 LRU List Flush:0,Flush List Flush:111736
* Dirty Page too much
 脏页数量太多，存储引擎强制执行checkpoint,保证缓冲池中有足够可用的页；可由变量innodb_max_dirty_page_pct控制


