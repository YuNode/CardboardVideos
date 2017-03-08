// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要在 Ripple 或 Android 设备/仿真程序中调试代码: 启用你的应用程序，设置断点，
// 然后在 JavaScript 控制台中运行 "window.location.reload()"。
(function ()
{
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady()
    {
        // 处理 Cordova 暂停并恢复事件
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova 已加载。在此处执行任何需要 Cordova 的初始化。
        document.getElementById("file").addEventListener("change", onInputFileChange, false);
        document.querySelector(".play-wrap").addEventListener("click", showControls, false)
        document.querySelector(".back").addEventListener("click", back, false)

        document.querySelector("#continue").addEventListener("click", continuePlay, false)

    };

    function onPause()
    {
        // TODO: 此应用程序已挂起。在此处保存应用程序状态。
    };

    function onResume()
    {
        // TODO: 此应用程序已重新激活。在此处还原应用程序状态。
    };
    function onInputFileChange()
    {
        play();

    }

    function play()
    {
        document.querySelector(".play-wrap").style.display = "block";
        var file = document.getElementById('file').files[0];
        var url = URL.createObjectURL(file);
        console.log(file.name);
        document.getElementById("video-right").src = url;
        document.getElementById("video-left").src = url;
        showControls();
        try
        {
            // Hide system UI and keep it hidden (Android 4.4+ only) 
            AndroidFullScreen.immersiveMode(successFunction, errorFunction);
            screen.lockOrientation('landscape');
            //screen.orientation.lock("landscape-secondary");

        }
        catch (e)
        {
            console.log("cordova addon err!")
        }
    }
    function showControls()
    {
        document.querySelector(".control").style.display = "block";
        setTimeout(hideControls, 3000);
    }
    function hideControls()
    {

        document.querySelector(".control").style.display = "none";
    }
    function back()
    {
        document.getElementById("video-right").src = "";
        document.getElementById("video-left").src = "";
        try
        {
            screen.lockOrientation('portrait-primary');

            //screen.orientation.lock("portrait-primary");
        }
        catch (e)
        {
            console.log("cordova addon err!")
        }

        document.querySelector(".play-wrap").style.display = "none";
    }

    function continuePlay()
    {
        play()
    }

    function successFunction()
    {
        console.info("It worked!");
    }

    function errorFunction(error)
    {
        console.error(error);
    }

    function trace(value)
    {
        console.log(value);
    }




})();