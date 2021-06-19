// 引入course.less
require('../css/course.less');

// 预加载
document.ready(function () {
    // 服务器地址
    let baseUrl = 'http://139.9.177.51:8099';
    // 获取开始按钮
    let startBtn = document.querySelector(".start-btn");
    // 获取卡
    let dataKaDom = document.querySelector(".data-ka");
    // 获取时间
    let dataMinute = document.querySelector(".data-minute");
    // 关注人数
    let peoplenumDom = document.querySelector(".peoplenum");
    // 获取图片区域
    let courseImg = document.querySelector(".audio-box img");
    // 获取标题
    let courseTitle = document.querySelector(".course-title h3");
    // 获取课程简介
    let courseText = document.querySelector(".course-text p");
    // 练习频率
    let testFrequencyDom = document.querySelector(".test-frequency");



    // 定义全局变量存放请求到的视频地址
    let data = null;


    // 获取网址中的search
    let urlStr = location.search;
    // let urlStr = "?name='zhangsan'&age=18&sex='男'" //测试数据
    // 将网址Search字符串转对象
    function getObj(str) {
        let obj = {};
        // 去掉第一个?
        let newStr = str.substr(1);
        // 通过&分割为数组
        let newArr = newStr.split("&");
        // 遍历数组。通过=分割，存入对象
        newArr.forEach(function (item) {
            // 定义新数组存放遍历到的值
            let arr = item.split("=");
            obj[arr[0]] = arr[1];
        })
        return obj;
    }
    // 调用
    let obj = getObj(urlStr);
    // console.log(obj);


    // 封装调用ajax请求
    function getAjaxInfo() {
        $http.get('http://139.9.177.51:8099/sports/courseDetail', obj, function (result) {
            // console.log(result);
            // 将值存放到全局变量中
            data = result.data;
            courseImg.src = baseUrl + result.data.imgurl;//图片
            courseTitle.textContent = result.data.name;
            courseText.textContent = result.data.desc;
            dataKaDom.textContent = result.data.calorie;//千卡
            dataMinute.textContent = result.data.time;//时间
            peoplenumDom.textContent = result.data.peoplenum;//关注人数
            testFrequencyDom.textContent = result.data.frequency;//练习频次
        })
    }
    getAjaxInfo();


    // 开始按钮点击事件监听
    startBtn.addEventListener('click', function (e) {
        // 将课程视频列表存储到本地存储
        localStorage.setItem('videoList', JSON.stringify(data.fragments));
        location.href = './details.html';
    })

})