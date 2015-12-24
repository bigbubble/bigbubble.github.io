#Html实现串口通讯[通过MSCOMM32.OCX插件]

##注册MSComm32控件
网上下载这个控件，然后把它拷贝到到C:\Windows\system32文件夹下，我装的是64位的Win7系统，是在C:\Windows\sysWOW64文件夹下，然后打开cmd,写入代码 regsvr32 C:\Windows\system32\MSComm32.ocx然后按enter会提示你注册成功

完成上面程序之后，在注册表中手工新建一个主键项：先在点击“开始”->"运行"，再在中填入regedit命令打开注册表，找到HKEY_CLASSES_ROOT\Licenses，在其中添加主键
4250E830-6AC2-11cf-8ADB-00AA00C00905　并将内容设置为：
kjljvjjjoquqmjjjvpqqkqmqykypoqjquoun