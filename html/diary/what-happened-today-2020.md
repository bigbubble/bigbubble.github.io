
# 2020

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
应该是ide在断点时，也阻塞了客户端和Zookeeper服务器的心跳，导致服务端任务客户端断了。

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
