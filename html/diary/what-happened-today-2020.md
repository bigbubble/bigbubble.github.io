
# 2020
##### 1106
批量删除redis集群上的前缀key 
```shell script
./delete-redis-key.sh prefix-*
```
```shell script
#!/bin/sh
redis_common=/home/pengbo/redis-dir/src

redis_server_1=10.110.119.120
redis_server_2=10.110.119.121
redis_server_3=10.110.119.122

cluster_port_1=6379
cluster_port_2=6380
cluster_port_3=6381

cd $redis_common
 
./redis-cli -c -h $redis_server_1 -p $cluster_port_1 keys $1 | xargs -i ./redis-cli -h $redis_server_1 -p $cluster_port_1 del {}
./redis-cli -c -h $redis_server_2 -p $cluster_port_2 keys $1 | xargs -i ./redis-cli -h $redis_server_2 -p $cluster_port_2 del {}
./redis-cli -c -h $redis_server_3 -p $cluster_port_3 keys $1 | xargs -i ./redis-cli -h $redis_server_3 -p $cluster_port_3 del {}
```

##### 1013
git 分支名和tag名称不能起一样的，否则会导致提交不了
##### 1002
python2-certbot-nginx 生成nginx htts证书工具
[获取你的User-Agent](http://121.36.153.197/getUserAgent)
##### 0928
RFC 952 规范指出域名只能是字母、数字和短线（-）还有点（.），别用下划线 '_'， 否则一些API会不认
##### 0922
java 下载图片， 如果先写响应头，后写流数据，正常下载；如果先写流数据，后写响应头，图片会渲染在页面上  
HttpServletResponse获取输出流，是否需要close()? 不需要，Servlet容器会关闭，如果你调用了close()也没啥大影响，可能会影响一些filter。  
还有另一个副作用，无法通过response.setStatus设置状态码
[should-one-call-close-on-httpservletresponse-getoutputstream-getwriter](https://stackoverflow.com/questions/1159168/should-one-call-close-on-httpservletresponse-getoutputstream-getwriter)
```java
String svgContent = "xxxxxx"
String filename = "1.png";
response.setHeader("Content-Disposition", "attachment; filename=" + URLEncoder.encode(filename, "UTF-8"));
response.setContentType("application/octet-stream; charset=UTF-8");
SvgConvertUtils.convertImageToOutputStream(svgContent, response.getOutputStream(), type);
```
##### 0917
"现在，很多网站使用大数据算法，很精确地知道用户的喜好和立场，总是推荐感兴趣的新闻给你看，或者说只给你看想看的东西，比如今日头条和Facebook。  

久而久之，天天看到一大堆同类新闻，你会产生一种幻觉，以为自己的喜好和立场是主流，跟大多数人一致。但是实际上，这完全是假象，举例来说，算法发现你养狗，天天给你看小狗的新闻，搞得你以为到处都是爱狗人士，其实社会，上不喜欢狗的人才是多数。  

这就是推荐算法的一个副作用，不管你是多么少的少数，它都有办法满足你，让你产生幻觉，高估自己的份量。你明明是人群的1%，却误以为大多数人跟你一样，这样就容易做出错误判断。比如，你天天看到小狗的新闻，就决定做一款宠物相关的产品，进行创业。你以为自己的产品针对大众市场，感兴趣的人应该很多，其实响应者寥寥。  
知道自己是少数派还是多数派，挺重要的。如果你是创业者，这就决定了你的产品定位和市场策略。如果涉及到政治，那就更重要了。我觉得，推荐算法以后不仅应该推荐用户感兴趣的内容，还应该告诉用户，你是不是少数派。"
##### 0916
[给nginx配个正向代理](/html/function_test/nginx-forward-proxy.html)
##### 0907
当一个 form 元素中只有一个输入框时，在该输入框中按下回车会提交该表单。  

Vue:如果希望阻止这一默认行为，可以在form元素标签上添加 @submit.native.prevent。

##### 0902
tomcat部署项目的四种方式  

1.直接丢在$TOMCAT_HOME/webapps/  

2.在$TOMCAT_HOME/conf/server.xml 中修改Context标签 docBase和Path, 指定到自定义位置  

3.在$TOMCAT_HOME/conf/Catalina/localhost下添加新的配置文件，文件名就是path路径, 文件内只有个Context标签内容就可以  

4.Idea或Eclipse等开发工具的方式  
明白两个变量的含义：  
catalina.home(安装目录)：指向公用信息的位置，就是bin和lib的父目录  
catalina.base(工作目录)：指向每个Tomcat目录私有信息的位置，就是conf、logs、temp、webapps和work的父目录  

使用$catalina.home的bin和lib，通过配置$catalina.base变量，运行自己的配置文件（非$TOMCAT_HOEM/conf），在自定义的配置文件夹内指定应用位置，
与原$TOMCAT_HOME的里conf完全隔离。idea在mac环境下的配置位置为
```shell script
/Users/pengbo/Library/Caches/JetBrains/IntelliJIdea2020.1/tomcat
```
会有Unnamed_开头的项目文件夹（Unnamed_MemoryLeak_2），通过第三种方式部署应用运行.
```shell script
/Users/pengbo/Library/Caches/JetBrains/IntelliJIdea2020.1/tomcat/Unnamed_MemoryLeak_2/conf/Catalina/localhost/ROOT.xml
```
ROOT.xml内容为：
```xml script
<Context path="" docBase="/Users/pengbo/projects/demo/target/MemoryLeak.war" />
```

##### 0821
chrome80后默认禁用第三方cookie，本地无法跨域调试，chrome://flags/， 搜索cookie，禁用SameSite by default cookies 和 Cookies without SameSite must be secure

##### 0819
MapStruct (Bean属性拷贝工具，在编译时生成bean映射，性能不赖)
[microservice](https://github.com/mapstruct/mapstruct)

##### 0805
扎心图片，仿佛看到了我们的影子。。  
"微服务架构还有一个技术外的好处，它使整个系统的分工更加明确，责任更加清晰，每个人专心负责为其他人提供更好的服务。在单体应用的时代，公共的业务功能经常没有明确的归属。最后要么各做各的，每个人都重新实现了一遍；要么是随机一个人（一般是能力比较强或者比较热心的人）做到他负责的应用里面。在后者的情况下，这个人在负责自己应用之外，还要额外负责给别人提供这些公共的功能一一而这 个功能本来是无人负责的，仅仅因为他能力较强/比较热心，就莫名地背锅（这种情况还被美其名日能者多劳）。结果最后大家都不愿意提供公共的功能。长此以往，团队里的人渐渐变得各自为政，不再关心全局的架构设计。" 
[microservice](/img/diary/2020080501.png)

"要做改造，首先你需要有足够的精力和资源。如果你的需求方（业务人员、项目经理、上 司等）很强势地一心追求需求进度，以致于你无法挪出额外的精力和资源的话，那么你可能无法做任何事"
[microservice](/img/diary/2020080502.png?width=500px)

##### 0803
部署内网测试环境：  
1.时区问题
网上搜到的都是
```shell script
# cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
这种用date命令查看时间是正常的，但是在java项目中，取到的时区，时间还是原来的，如果要使java程序取到正确的时区，还需要配置
```shell script
# vim /etc/timezone
```
改为你需要的时区,(需要重启java应用)  
另一种方法就是：java启动项中增加 -Duser.timezone=Asia/Shanghai  

2.如果要在后台生成打印相关的资源，注意字体文件，复制到$JAVA_HOME/jre/lib/fonts/  
3.https问题：免费的证书有些系统不认。。尴尬；nginx 与 tomcat之间不要图省事走http，最好也走https，否则有些代码getSchema之类的取到的还是http  
4.运维我们需要"专业团队"

##### 0723
Apache Curator idea开发测试，将断点放在了获取锁（InterProcessSemaphoreMutex）后下面的代码的位置，在另一台机器上尝试获取锁，竟然成功了，
通过zkCli发现打断点的机器创建的临时节点，几秒种后莫名消失了，说明客户端连接断了。  
应该是ide在断点时，也阻塞了客户端和Zookeeper服务器的心跳，导致服务端认为客户端断了。

##### 0721
口无遮拦的一天

##### 0719
VM虚拟机网络IP地址影响java获取本机地址问题  
Dubbo 开发环境服务注册，在zookeeper注册中心里的服务提供方的IP是一个非常奇怪的网段IP，公司正常有线无线连接都不会出现这种IP，提供方的ping调用方机器可以ping通，
但是调用方ping此IP无法ping通，导致服务调用失败。解决办法禁用掉虚拟机网络接口

##### 0613
代码安全 - Timing Attack
[这 10 行比较字符串相等的代码给我整懵了，不信你也来看看](https://mp.weixin.qq.com/s/CVNi8pSQW3M-BKztNwgyuQ?a)

```java
boolean safeEqual(String a, String b) {
   if (a.length() != b.length()) {
       return false;
   }
   int equal = 0;
   for (int i = 0; i < a.length(); i++) {
       equal |= a.charAt(i) ^ b.charAt(i);
   }
   return equal == 0;
}
```

"这种手段可以让调用 safeEquals("abcdefghijklmn", "xbcdefghijklmn") （只有首位不相同）和调用 safeEquals("abcdefghijklmn", "abcdefghijklmn") （两个完全相同的字符串）的所耗费的时间一样。防止通过大量的改变输入并通过统计运行时间来暴力破解出要比较的字符串。"

##### 0521

一行tail -f 脚本引发的事故，以后别把tail -f 写到启动脚本里。。。
```shell script
cd ~/software/tomcat-server
echo '启动tomcat...'
set -m
./bin/startup.sh
tail -f ./logs/catalina.out
```
[Tomcat进程意外退出的问题分析](http://ifeve.com/why-kill-2-cannot-stop-tomcat/)

##### 0515

常态偏差：人们倾向于相信事物将会以正常的方式运行，不太可能出现不正常的情况，从而低估了灾难的可能性和影响程度。

##### 0429

修改<code>marked.js</code>，增加[自定义图片大小](https://github.com/bigbubble/marked/commit/ee78bfcadf35af3d3d64ba4b0922bc66e123d229)功能

看到一张图不错，很好的阐明了ThreadLocal的工作原理，来自[ThreadLocal 是什么鬼？用法、源码一锅端](https://mp.weixin.qq.com/s/sy_OYD_QeCvSfPfuG3NU6w)  

![threadLocal](/img/diary/threadLocal.png?width=600px)

JAVA 线程池  

[1.Java线程池实现原理及其在美团业务中的实践](https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html)  

[2.如何设置线程池参数？美团给出了一个让面试官虎躯一震的回答](https://mp.weixin.qq.com/s?__biz=MzIxNTQ4MzE1NA==&mid=2247485631&idx=1&sn=b0d7cd3f337246c79cd08431d9a6d8ec&chksm=9796dec2a0e157d4b8a05b5bc1adcd53bc6ef81112cac5c7dc93370fbbc3baaab717aa5db628&scene=21#wechat_redirect)  

[3.每天都在用，但你知道 Tomcat 的线程池有多努力吗？](https://mp.weixin.qq.com/s/YAeneN-x_En55FlC2mVcaA)

##### 0417

遇到点问题: [SpringWeb FastJsonHttpMessageConverter supportedMediaTypes 配置问题](/html/function_test/fastjsonhttpmessageconverter-supported-medias-problem.html)

##### 0327

好文我读：[微服务失败的 11 个原因](https://www.infoq.cn/article/ayMg1xljifQerOTNADfY)

Martin Fowler 微服务的定义：[Microservices](https://martinfowler.com/articles/microservices.html)， [(中文)](http://blog.cuicc.com/blog/2015/07/22/microservices/)

##### 03-25

问题:[SpringWeb RestTemplate HttpMessageConverter问题](/html/function_test/springweb-resttemplate-httpmessageconverter.html)

##### 03-21

READ:[从源代码构建Nginx](/html/read/building-nginx-from-sources-translate.html)

##### 03-20
使用<code>marked.js</code>渲染markdown文件，[解决](https://github.com/bigbubble/marked.git)使用highlight.js渲染代码块时无背景色问题
```javascript 1.6
 function ajaxGet(url, fn) {
         var xhr = new XMLHttpRequest();
         xhr.open('GET', url, true);
         xhr.onreadystatechange=function(){
             if(xhr.readyState==4){
                 if(xhr.status==200 || xhr.status==304){
                     fn(xhr.responseText);
                 }
             }
         }
         xhr.send();
     }
```


##### 03-17
公众号【前端宇宙】文章：  
[4W字长文带你深度解锁Webpack系列(上)](https://mp.weixin.qq.com/s/X9fWN4GbDFOLfOODZlLoVg)  
[万字长文带你深度解锁Webpack（进阶篇）](https://mp.weixin.qq.com/s/t8dW5TlASCAb_Cdowb8isA)  
[带你深度解锁Webpack系列(优化篇)](https://mp.weixin.qq.com/s/Rv1O4oFvj6rVpijUXtfyCA)  

公众号【前端大全】文章：
[npm install 原理分析](https://mp.weixin.qq.com/s/5tmND0G_ZkYVR7Dmug0ugQ)  

[-> 2019](what-happened-today.html)
