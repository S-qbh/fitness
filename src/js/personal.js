// 引入personal.css
require('../css/personal.less');

// 预加载
document.ready(function () {
    // 定义服务器主机地址
    let hostAddress = 'http://139.9.177.51:8099';
    // 获取节点 退出登录按钮
    let outBtn = document.querySelector(".sign-out");
    // 获取蒙层
    let mantleDom = document.querySelector(".mantle");
    // 按钮获取
    let yesBtn = document.querySelector(".yes-btn");
    let noBtn = document.querySelector(".no-btn");
    // 获取用户名 个性签名节点 头像
    let userNameDom = document.querySelector(".user-name");
    let userTextDom = document.querySelector(".user-text");
    let userHeaderPic = document.querySelector(".user-header img");
    // 获取运动分钟 获取本周消耗
    let minutesDom = document.querySelector(".week-minutes");
    let weekKaDom = document.querySelector(".week-ka");
    // 获取用户信息节点
    let userInfoBoxDom = document.querySelector(".user-info-box");
    // 获取跳转数据页按钮
    let goDataBtn = document.querySelector("#go-data");
    // 获取文件上传按钮
    let fileSendBtn = document.querySelector('.file-send-btn');


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
            if (result.status == 0) {
                // 头像
                if (result.data.imgurl) {
                    userHeaderPic.src = result.data.imgurl;
                }
                if (result.data.nickname) {
                    userNameDom.textContent = result.data.nickname;
                }
                if (result.data.sign) {
                    userTextDom.textContent = result.data.sign;
                }

            }

        })
    }
    // 数据请求-获取运动数据
    function getSports() {
        // 通过userId进行数据请求
        $http.get("http://139.9.177.51:8099/users/mysportsBadge", { userId: userId }, function (result) {
            // console.log(result);

            // 渲染数据 判断状态
            if (result.status == 0) {
                if (result.data.sports.times) {
                    minutesDom.textContent = result.data.sports.times;
                }
                if (result.data.sports.calorie) {
                    weekKaDom.textContent = result.data.sports.calorie;
                }
            }
        })
    }
    // 头像点击事件监听
    userHeaderPic.addEventListener('click', function (e) {
        // 触发文件上传点击事件
        fileSendBtn.click();
        // 阻止冒泡
        e.stopPropagation();
    })

    // 用户头像改变的监听事件
    function userHeader() {
        // 文件上传使用type = file,获取值使用files
        fileSendBtn.addEventListener('change', function (e) {
            // console.log(fileSendBtn.files[0]);
            // 调用文件上传
            $updateFile('http://139.9.177.51:8099/users/upload', 'imgurl', fileSendBtn.files[0], function (result) {
                // 如果请求成功进行数据修改请求
                if (status == 0) {
                    // 完整地址
                    // console.log(hostAddress + result.data);
                    // 定义一个对象传递数据
                    let userData = {
                        userId: userId,
                        imgurl: hostAddress + result.data
                    }
                    // 调用定义的ajax请求函数
                    editUserHeaderPic(userData)
                    // userHeaderPic.src = hostAddress + result.data;
                }

            })
        })
    }
    // 修改头像请求-函数调用
    userHeader();
    // 封装ajax请求修改用户信息
    function editUserHeaderPic(data) {
        // 进行数据请求
        $http.post('http://139.9.177.51:8099/users/userEdit', data, function (result) {
            // 判断状态，成功则进行头像修改并提示
            if (status == 0) {
                // console.log(result);
                // 从传递的对象中获取地址渲染到页面
                userHeaderPic.src = data.imgurl;
                // 显示提示信息
                utils.tatol(0, '修改成功');
            }
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
    // 用户信息点击事件监听
    userInfoBoxDom.addEventListener('click', function (e) {
        // 点击跳转详细信息页
        location.href = './userInfo.html';
    })
    // 跳转运动数据页监听
    goDataBtn.addEventListener('click', function (e) {
        location.href = './sportsData.html';
    })


})