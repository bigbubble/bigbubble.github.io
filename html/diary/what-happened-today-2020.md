
# 2020

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
