// 导入details.less
require('../css/details.less');

// 预加载
document.ready(function () {
    // 定义服务器地址
    let baseUrl = "http://139.9.177.51:8099";


    // 获取当前节
    let starNumDom = document.querySelector('.start-num');
    // 获取总共节
    let allNumDom = document.querySelector('.all-num');
    // 获取标题
    let msgTitleDom = document.querySelector('.msg-title');
    // 获取视频
    let videoDom = document.querySelector(".course-box video");
    // 获取上一节按钮
    let previousBtn = document.querySelector('.previous-btn');
    // 获取下一节按钮
    let lastBtn = document.querySelector('.last-btn');
    // 进度条
    let progressDom = document.querySelector('.progress-bottom');


    /**
     * 蒙层
     */
    // 获取暂停按钮
    let stopBtn = document.querySelector('.start-btn');
    // 蒙层获取
    let mantleDom = document.querySelector('.stop-mantle');
    // 获取蒙层继续按钮
    let continueBtn = document.querySelector(".continue-btn");
    // 获取蒙层结束按钮
    let endBtn = document.querySelector(".end-btn");
    // 当前图片
    let nowImgDom = document.querySelector('.picBox img');
    // 当前标题
    let nowTitle = document.querySelector('.nowpic-title');


    // 获取本地存储中的视频值
    let videoList = JSON.parse(localStorage.getItem('videoList'));
    console.log(videoList);


    // 获取总共长度
    allNumDom.textContent = videoList.length;

    let index = 0;
    // 定义播放函数
    function play(index) {
        // 更改当前节
        starNumDom.textContent = index + 1;
        // 切换视频
        videoDom.src = baseUrl + videoList[index].videoUrl;
        // 切换标题
        msgTitleDom.textContent = videoList[index].title;
    }
    // 调用
    play(index);

    // 下一节按钮点击事件
    lastBtn.addEventListener('click', function (e) {
        // 判断如果小于最后一个视频就可以执行切换
        if (index < videoList.length - 1) {
            index++;
            play(index);
        }
    })
    // 上一节按钮点击事件
    previousBtn.addEventListener('click', function (e) {
        // 判断如果
        if (index != 0) {
            index--;
            play(index);
        }
    })
    // 自动播放
    videoDom.addEventListener('ended', function (e) {
        // 判断index,如果小于总长度则自动播放下一个
        if (index < videoList.length - 1) {
            index++;
            // 调用函数
            play(index);
        }
    })

    /**
     * 1、自动播放 video节点ended事件监听
     * 2、显示进度条    宽度 = （当前播放事件/视频总时长）*100
     * 3、点击暂停--暂停视频--显示蒙层 video节点.pause()
     *    点击继续隐藏蒙层，视频继续 video节点.play()
     *    点击退出，返回运动首页
     */

    // 设置定时器,自动进度条，通过获取视频的时长和已播放时长实现
    setInterval(function () {
        // 计算当前应当的宽度  宽度 = （当前播放时间/视频总时长）*100
        let nowWidth = (videoDom.currentTime / videoDom.duration) * 100;
        // console.log(nowWidth);
        // 更改进度条宽度
        // console.log(nowWidth + '%');
        nowWidth = nowWidth + '%';
        progressDom.style.width = nowWidth;

    }, 60);




    // 暂停点击事件监听
    stopBtn.addEventListener('click', function (e) {
        // 显示蒙层
        mantleDom.style.display = "block";
        // 通过video的方法暂停视频
        videoDom.pause();

        /**
         * 获取当前播放视频的图片
         * 获取标题
         * 渲染到蒙层
         */
        nowImgDom.src = baseUrl + videoList[index].imgUrl;
        nowTitle.textContent = videoList[index].title;

    })
    // 继续按钮点击事件监听
    continueBtn.addEventListener('click', function (e) {
        // 隐藏盒子
        mantleDom.style.display = "none";
        // 通过video的方法继续播放视频
        videoDom.play();
    })
    // 结束按钮点击事件监听
    endBtn.addEventListener('click', function (e) {
        // 跳转运动首页
        location.href = './sports.html';
    })

})