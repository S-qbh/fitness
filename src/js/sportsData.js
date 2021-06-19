// 引入sportsData.less
require('../css/sportsData.less');

// 预加载
document.ready(function () {
    // 获取返回按钮
    let goBackBtn = document.querySelector(".go-back-person");
    // 获取头像节点
    let userPic = document.querySelector('.show-img img');
    // 获取卡路里节点
    let weekDom = document.querySelector('.week-ka');
    let weekShowDom = document.querySelector('.week-ka-show');
    // 获取运动分钟节点
    let weekMinutes = document.querySelector('.week-minutes');
    // 累计天数节点
    let allTimeDom = document.querySelector('.all-time');
    // 连续天数
    let continueDays = document.querySelector('.user-continuity-days');


    // 从本地存储获取userId
    let user = JSON.parse(localStorage.getItem('user'));
    let userId = user.userId;


    // 进入页面进行数据请求，渲染页面
    function getUserSports() {
        // ajax请求
        $http.get('http://139.9.177.51:8099/users/mysportsBadge', { userId: userId }, function (result) {
            // console.log(result);
            // 渲染头像
            userPic.src = result.data.user.imgurl;
            // 提取用户运动数据
            let data = result.data.sports;
            // console.log(data);
            // 卡路里消耗
            weekDom.textContent = data.calorie;
            weekShowDom.textContent = data.calorie;
            // 运动时间
            weekMinutes.textContent = data.times;
            // 运动累计天数
            allTimeDom.textContent = data.coursetims;
            continueDays.textContent = data.ridekm;
        })
    }
    // 调用请求函数
    getUserSports();




    // 点击事件监听
    goBackBtn.addEventListener('click', function (e) {
        // 跳转个人信息页
        location.href = './personal.html';
    })
})