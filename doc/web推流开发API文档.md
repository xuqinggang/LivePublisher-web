# 视频直播推流 Web SDK API开发文档

#NetPublisher
___

An instance of the NetPublisher class is created when any of the NetPublisher.js setup methods are used to initialize a publisher.
    
    <div id="my-publisher"></div>
    var myPublisher = new NetPublisher('my-publisher', [initOptions], [ready]);

##constructor

    new NetPublisher(idString, [initOptions], [ready])
    
#####　parameters

| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| idString      | string        | yes      |  id字符串   |
| initOptions   | Object        | no       |  初始化参数对象，详情见下|
| ready         | Function      | no       |  初始化后的回调函数，详情见下   |

    @params  initOptions
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
    @params ready
    function(code, desc) {
        /*
            默认传入两个参数
            code: 错误代码
            desc: 错误信息
        */
    }
    
##Methods

###startPreview(cameraIndex)
　　开始预览

#####　parameters


| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| cameraIndex   | string        | yes      |  摄像头列表中的索引值 |

###startPublish([url], [initOptions], [errCallback])
　　开始推流

#####　parameters

| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| url           | string        | no      |  推流url地址   |
| initOptions   | Object        | no       |  推流初始化参数对象，详情见下|
| errCallback   | Function      | no       |  推流过程中发生错误的回调函数，详情见下   |

    @params initOptions
    {
        cameraIndex:, // Number (可选) 摄像头列表中的索引值 default 0
        microPhoneIndex: ,// Number (可选) 麦克风列表中的索引值 default 1
        size: ,// String (可选) default 推流器分辨率 '640x480',
        fps: ,//Number (可选) 推流时的帧率 default 15,
        bitrate: //Number (可选) 推流时的码率 default 600
    }
    
    @params errCallback
    function(code, desc) {
        /*
            推流过程中发生错误进行回调
            默认传入两个参数
            code: 错误代码
            desc: 错误信息
        */
    }
    
###stopPublish()
　　停止推流

###getCameraList()
#####　return Array  返回摄像头列表数组

###getMicroPhoneList()
#####　return Array  返回麦克风列表数组

###setCamera(cameraIndex)

#####　parameters

| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| cameraIndex   | Number        | yes      |  摄像头列表中的索引值   |

###setMicroPhone(microPhoneIndex)

#####　parameters

| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| microPhoneIndex   | Number        | yes      |  麦克风列表中的索引值   |

###setDefination(definationObj)

#####　parameters

| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| definationObj   | Object        | yes      |  清晰度选项配置，详情见下   |
    
    @params definationObj
    {
        size: ,// String (可选) default 推流器分辨率 '640x480',
        fps: ,//Number (可选) 推流时的帧率 default 15,
        bitrate: //Number (可选) 推流时的码率 default 600
    }

###resize(width, height)

#####　parameters
| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| width   | Number        | yes      |  推流器的宽   |
| height   | Number        | yes      |  推流器的高   |

###getDefinedErrors()
#####　return Object  返回错误对象信息
    eg.
    {
        '100': '*系统检测到您的摄像头异常，请确认正确连接摄像设备.',
        '101': '*系统检测您的麦克风异常，请确认正确连接麦克风设备.'
        ...
    }

###alterDefinedErrors(errorObject)
#####　parameters
| name        | Type           | Required  | description|
| ------------- |:-------------:| :-----:  |  :-----:   |
| errorObject   | Object        | yes      |  更改错误代号对应的错误信息，详情见下|

    @params errorObject
    {
        '100': '您的摄像头异常，请确认正确连接摄像设备' //更改100错误代号对应的错误信息
        ..
    }

###getSDKVersion()
#####　return String  返回版本号