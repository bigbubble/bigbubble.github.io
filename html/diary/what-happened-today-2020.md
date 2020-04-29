
# 2020

##### 0429

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
