# 视频直播推流 Web SDK 开发指南

## <span id="SDK概述">SDK 概述</span>

视频直播推流SDK是一个强大的平台无关的实时直播推流引擎，可用于构建美女秀场、远程教育等产品。

SDK提供了构建直播推流所需要的所有核心技术，包括：音视频设备管理、音视频采集、编解码、网络传输、显示等功能，支持Windows、iOS和Android平台。

## <span id="开发准备">开发准备</span>    
* 引入视频直播推流Web SDK，SDK的API文档请参考 [网易视频云官网](http://vcloud.163.com/ "网易视频云官网")
* 在开发页面中引入远程NetPublisher.js路径 [远程js加载路径](http://vcloud.163.com "远程js加载路径")

## <span id="SDK类说明">SDK 类说明</span>

SDK 所有功能都封装在NetPublisher类中，首先实例化类Netpublisher类。下面详细介绍下NetPublisher类的功能。

Thanks to the awesome folks over at Fastly, there's a free, CDN hosted version of NetPublisher.js that anyone can use. Also, check out the Getting Started page on our website which has the latest urls as well. Simply add these includes to your document's 

\<head>:

    
    <script src="链接"></script>

\<body>

    <div id="my-publisher"><div>
    
    <script>
    /**
    *NetPublisher 构造推流容器
    *@param {String} my-publisher id字符串
    *@param {Object} {} 推流初始化参数
    *@param {Function} function(code, desc){} 初始化后的回调函数默认传入参数 code：(错误代码) desc:(错误信息描述)
    *@return {Object} Object 推流器
    */
    var myPublisher = new NetPublisher('my-publisher', { /*initOptions*/ }, function(code, desc) {
        /*
            首先判断是否有错误代码传入检查初始化时是否发生错误
            若有错误可进行相应的错误提示
        */
        var cameraArray = this.getCameraList(),//获得摄像头列表 返回字符串数组
            miciroPhoneArray = this.getMicroPhoneList();//获得麦克风列表 返回字符串数组
        ....//根据返回的 cameraArray 和 microPhoneArray 构造相应的信息列表
    
    });
    </script>  

### <span id="推流初始化参数设置">推流初始化参数设置</span>
    推流初始化参数以键-值对的方式封装在对象中，并传入到new NetPublisher()的第二个参数中
#### <span id="推流参数">推流参数</span>
    {
        url: ,//String (可选) 设置推流url地址
        width: , //Number (可选) default 862  设置推流器的宽
        height: , //Number (可选) default 446 设置推流器的宽
        size: ,//Ntring (可选) 分辨率 default '640x480' 设置推流器的分辨率
        fps: , //Number (可选) 帧率 default 15  设置推流器的帧率
        bitrate: ,//Number (可选) 码率 default 600 设置推流器的码率
        wmode: ,//String (可选) 'window','transparent','opaque' default 'opaque'
        quality: ,//String (可选) 'low','medium','hign','best'  default 'high'
        allowScriptAccess: ,//
    }
    
### <span id="推流初始化后的回调函数">推流初始化后的回调函数</span>
    推流初始化后的回调函数function(code, desc)传入到new NetPublisher()的第三个参数中
    /**
    *@param code 错误代码
    *@param desc 错误信息 
    function(code, desc){
    
    }
###  <span id="预览操作">预览操作</span>
NetPublisher类提供用户预览时摄像头的切换
* 选择摄像头

```objc
-setCamera(cameraIndex) 
```
* 选择麦克风

```objc
-setMicroPhone(microPhoneIndex)
```
* 开始预览

```objc
-startPreview()
```
###  <span id="直播操作">直播操作</span>
NetPublisher类提供用户直播音视频推流开启、关闭：
* 选择摄像头

```objc
-setCamera(cameraIndex) 
```
* 选择麦克风

```objc
-setMicroPhone(microPhoneIndex)
```
* 设置清晰度

```objc
-setDefination(definationObj)
```
* 重新设置推流器宽高

```objc
-resize(width, height)
```
* 开始直播推流

```objc
-startPublish([url], [options], function(){})
```
返回开始直播是否出现错误，以及详细错误信息。

* 关闭直播

```objc
-stopPublish()
```
###  <span id="获取版本号">获取版本号</span>
* 获取版本号

```objc
-getSDKVersion()
```