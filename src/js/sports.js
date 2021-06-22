// 引入css
require('../css/sports.less');

// 预加载
document.ready(function () {
    // 主机地址
    let baseUrl = 'http://139.9.177.51:8099';
    // 获取最新课程节点
    let newCourseDom = document.querySelector(".new-course");
    // 获取课程盒子
    let courseBoxDom = document.querySelector(".course-box");


    // 调用底部公共组件
    utils.addFooter('sports');
    // 调用头部公共组件
    utils.addHeader('sports');
    // 获取用户id  
    let user = JSON.parse(localStorage.getItem('user'));
    // 获取用户userid
    let userId = user.userId;
    // 获取userId进行课程绑定
    let addData = {
        userId: userId,
        courseIds: [3, 4, 5, 6, 7]
    }
    function getAddCourse() {
        // ajax请求添加数据
        $http.post('http://139.9.177.51:8099/sports/saveCourse', addData, function (res) {
            console.log(res);
        })
    }
    getAddCourse();

    // ajax数据请求
    function getSportsData() {
        // 数据请求
        $http.get('http://139.9.177.51:8099/sports/courseList', { id: userId }, function (result) {
            // console.log(result);
            let data = result.data;
            // console.log(data);
            // 获取最新课程
            let newCourse = data.find(function (item) {
                return item.latest == 1;
            })
            // console.log(newCourse);
            // 最新课程渲染
            let newCourseText = `
                    <a href="./course.html?id=${newCourse.courseId}">
                        <!-- 课程图片 -->
                        <div class="course-img">
                            <img src="${baseUrl + newCourse.imgurl}" alt="">
                        </div>
                        <!-- 课程简介 -->
                        <div class="course-title">
                            <h6>${newCourse.name}</h6>
                            <p>${newCourse.desc}</p>
                        </div>
                    </a>
            `
            newCourseDom.innerHTML = newCourseText;


            // 其他课程渲染
            // 声明变量拼接
            let newHtml = '';
            // 循环
            data.forEach(function (item) {
                newHtml += `
                    <a href="./course.html?id=${item.courseId}">
                        <!-- 课程盒子 -->
                        <div class="course-content">
                            <img src="${baseUrl + item.imgurl}" alt="">
                            <div class="course-content-text">
                                <h6>${item.name}</h6>
                                <p>${item.desc}</p>
                            </div>
                        </div>
                    </a>
                `;
            });
            // console.log(newHtml);
            // 将值渲染到页面
            courseBoxDom.innerHTML = newHtml;
        })
    }
    getSportsData();


})