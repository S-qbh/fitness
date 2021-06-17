// 引入css
require('../css/sports.less');

// 预加载
document.ready(function () {
    // 获取最新课程节点
    let newCourseDom = document.querySelector(".new-course");


    // 调用底部公共组件
    utils.addFooter('sports');

    // 获取用户id  
    let user = JSON.parse(localStorage.getItem('user'));
    // 获取用户userid
    let userId = user.userId;
    // ajax数据请求
    function getSportsData() {
        // 数据请求
        $http.get('http://139.9.177.51:8099/sports/courseList', { userId: userId }, function (result) {
            console.log(result);
        })
    }
    getSportsData();

    // 最新课程节点点击事件监听
    newCourseDom.addEventListener('click', function (e) {
        // 点击跳课程介绍页面
        location.href = './course.html'
    })
})