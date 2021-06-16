// 引入personal.css
require('../css/personal.less');

// 预加载
document.ready(function () {
    // 获取节点 退出登录按钮
    let outBtn = document.querySelector(".sign-out");
    // 获取蒙层
    let mantleDom = document.querySelector(".mantle");
    // 按钮获取
    let yesBtn = document.querySelector(".yes-btn");
    let noBtn = document.querySelector(".no-btn");
    // 获取用户名 个性签名节点
    let userNameDom = document.querySelector(".user-name");
    let userTextDom = document.querySelector(".user-text");
    // 获取运动分钟 获取本周消耗
    let minutesDom = document.querySelector(".week-minutes");
    let weekKaDom = document.querySelector(".week-ka");


    // 引入公共组件底部导航，utils.js
    utils.addFooter('personal');

    // 获取用户id
    let user = JSON.parse(localStorage.getItem('user'));
    // 获取userId
    let userId = user.userId;
    // 数据请求-获取用户信息
    function getData() {
        // 通过userId进行数据请求
        $http.get('http://139.9.177.51:8099/users/accountinfo', { userId: userId }, function (result) {
            // console.log(result);
            userNameDom.textContent = result.data.nickname;
            userTextDom.textContent = result.data.sign;
        })
    }
    // 数据请求-获取运动数据
    function getSports() {
        // 通过userId进行数据请求
        $http.get("http://139.9.177.51:8099/users/mysportsBadge", { userId: userId }, function (result) {
            console.log(result);
            // 渲染数据
            minutesDom.textContent = result.data.sports.times;
            weekKaDom.textContent = result.data.sports.calorie;
        })
    }

    // 调用数据请求
    getData();
    getSports();
    // 退出登录点击事件监听
    outBtn.addEventListener('click', function (e) {
        /*
            1、弹出框询问是否确定，如果确定则清空数据返回登录，取消隐藏确认框
            2、清空本地存储的数据
            3、跳转到登录页
        */
        // 出现提示框
        mantleDom.style.display = "block";
    })
    // 确认按钮
    yesBtn.addEventListener('click', function (e) {
        mantleDom.style.display = "none";
        // 清除本地存储
        localStorage.clear();
        // 跳转登录页
        location.href = './login.html';
    })
    // 取消按钮
    noBtn.addEventListener('click', function (e) {
        mantleDom.style.display = "none";
    })


})