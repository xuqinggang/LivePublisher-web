'use strict';
define(function(require, exports, module) {
    var parallax = require("module/parallax"),
        validateTool = require('module/validateTool'),
        dialog = require('module/dialog'),
        scroll = require('module/scroll'),
        tooltip = require('module/tooltip'),
        service,
        publisher;
    service = {
        init: function() {
            service.initEvent();
            service.initPublisher();
        },
        initEvent: function() {
            $('#i-audio-ok').on('click', function() {
                if ($('#i-publish-ok').val() === '停止直播') { //直播过程中无法再点击预览按钮
                    return;
                }
                var v = $('.j-publish-camera').val();
                publisher.startPreview(v);
                $('.m-publish-container').css('background', 'none');
                $('#show-status').addClass('show-status-preview').children('.status-text').text('预览');
                scroll.scrollToScreenCenter($('.g-publish-view'));
            })

            $(window).on('scroll', function() {
                parallax.parallaxScroll($('.m-footer'));
            });

            $('.m-publish-body select').on('change', function() {
                $(this).addClass('change-color');
            });

            //开始直播按钮
            $('#i-publish-ok').on('click', function() {
                scroll.scrollToScreenCenter($('.g-publish-view')); //滚动
            })

            $('#i-publish-ok').on('click', function() { //推流
                var definationVal = $('#i-publish-defination option:selected').val(),
                    cameraIndex = $('.j-publish-camera option:selected').val(),
                    microPhoneIndex = $('.j-publish-microPhone option:selected').val(),
                    definationObj,
                    url,
                    $this = $(this),
                    $statusEle = $('#show-status');
                definationObj = definationConf(definationVal);
                //设置清晰度(fps,size,bitrate)
                publisher.setDefination(definationObj);
                //选择摄像头，麦克风
                try {
                    publisher.setCamera(cameraIndex);
                    publisher.setMicroPhone(microPhoneIndex);
                } catch (e) {}
                //设置url
                url = $('#i-publish-url').val();
                if (validateTool.validate('#i-publish-url')) {
                    if ($this.val() === '停止直播') {
                        publisher.stopPublish();
                        changeStatus('预览', $statusEle);
                        $this.val('开始直播');

                        //恢复禁用
                        $('#i-audio-ok').removeClass('u-btn-preview-disabled').removeAttr('disabled'); //解除预览按钮禁用
                        $('.j-publish-camera').removeAttr('disabled').removeClass('u-select-disabled');
                        $('.j-publish-microPhone').removeAttr('disabled').removeClass('u-select-disabled');
                        $('#i-publish-defination').removeAttr('disabled').removeClass('u-select-disabled');
                        //
                        $('#i-publish-url').removeAttr('readonly').removeClass('u-input-disabled');
                        return;
                    }
                    $this.val('停止直播');
                    changeStatus('直播中', $statusEle);

                    //下拉列表禁止，按钮禁止
                    $('#i-audio-ok').addClass('u-btn-preview-disabled').attr('disabled', 'disabled'); //预览按钮禁用
                    $('.j-publish-camera').attr('disabled', 'disabled').addClass('u-select-disabled');
                    $('.j-publish-microPhone').attr('disabled', 'disabled').addClass('u-select-disabled');
                    $('#i-publish-defination').attr('disabled', 'disabled').addClass('u-select-disabled');
                    //url只读
                    $('#i-publish-url').attr('readonly', 'readonly').addClass('u-input-disabled');
                    publisher.startPublish(url, function(code, desc) {    
                    //推流过程中发生错误进行回调
                        dialog.confirm({ //弹窗错误提示
                            content: desc,
                            okValue: '立即刷新',
                            ok: function() {
                                window.location.reload();
                            },
                            cancelValue: '稍后重试',
                            cancel: function() {}
                        })
                    })
                }
                return false;
            });
        },
        //初始化推流器
        initPublisher: function() {
            publisher = new nePublisher('local_publisher', {
                width: 862,
                height: 486,
                size: '1280x960',
                fps: 30,
                bitrate: 1000,
                quality: 'high',
                wmode: 'transparent',
                allowScriptAccess: 'always'
            }, function(code, desc) {
                //获得摄像头，麦克风列表。填充到下拉列表中
                var cameraArray = this.getCameraList(),
                    microPhoneArray = this.getMicroPhoneList(),
                    cameraOptions = '',
                    microPhoneOptions = '';
                if (code === 100) {
                    tooltip.bottomLeftMessage($('.j-publish-camera').parent(), desc, 'red');
                    $('.j-publish-camera').attr('disabled', 'disabled');
                    $('.u-btn-start').attr('disabled', 'disabled').addClass('u-btn-disabled');
                    $('#i-audio-ok').addClass('u-btn-preview-disabled').attr('disabled', 'disabled');
                    return;
                }
                if (code === 101) {
                    tooltip.bottomLeftMessage($('.j-publish-microPhone').parent(), desc, 'red');
                    $('.j-publish-microPhone').attr('disabled', 'disabled');
                    $('.u-btn-start').attr('disabled', 'disabled').addClass('u-btn-disabled');
                    $('#i-audio-ok').addClass('u-btn-preview-disabled').attr("disabled", "disabled");
                    return;
                }
                if (cameraArray.length) {
                    $.each(cameraArray, function(index, val) {
                        cameraOptions += "<option value='" + index + "'>" + cameraArray[index] + "</option>";
                    })
                }
                $('.j-publish-camera').html(cameraOptions);
                if (microPhoneArray.length) {
                    $.each(microPhoneArray, function(index, val) {
                        microPhoneOptions += "<option value='" + index + "'>" + microPhoneArray[index] + "</option>";
                    })
                }
                $('.j-publish-microPhone').html(microPhoneOptions);
            });
        }
    };

    function definationConf(val) {
        var definationList = {
            '2': { //高清2
                fps: 20,
                bitrate: 1500,
                size: '1280x720',
            },
            '1': { //标清 1
                fps: 20,
                bitrate: 1000,
                size: '960x640',
            },
            '0': { //流畅 0
                fps: 15,
                bitrate: 600,
                size: '640x480',
            }
        }
        return definationList[val];
    }

    function changeStatus(statusInfo, $ele) {
        switch (statusInfo) {
            case '预览':
                $ele.removeClass('show-status-live');
                $ele.addClass('show-status-preview');
                $ele.children('.status-text').text('预览');
                break;
            case '直播中':
                $ele.removeClass('show-status-preview');
                $ele.addClass('show-status-live');
                $ele.children('.status-text').text('直播中');
                break;
        }
    }
    service.init();
})