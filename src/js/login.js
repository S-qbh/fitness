// 引入login.css
require('../css/login.less');

document.ready(function () {
    // 节点获取
    // 输入框获取
    let telInp = document.querySelector("#tel");
    let pwdInp = document.querySelector("#pwd");
    let infoMsgDom = document.querySelector(".infoMsg");
    // 注册节点获取
    let regDom = document.querySelector(".register span");
    // 登录节点获取
    let loadBtn = document.querySelector(".user_load input");

    // 注册事件监听
    regDom.addEventListener('click', function (e) {
        location.href = "./register.html";
    })

    // 用户名框正则验证
    // 电话输入框失焦事件
    telInp.addEventListener('blur', function (e) {
        // 获取值打印到后台
        // console.log(telInp.value);
        let telReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        // 判断是否符合规则
        if (!telReg.test(telInp.value)) {
            utils.tatol(1, '用户名错误');
        }
    })

    // 密码验证
    pwdInp.addEventListener('blur', function (e) {
        // 正则 字母开头，长度在6~18之间，只能包含字母、数字和下划线
        let pwdReg = /^[a-zA-Z]\w{5,17}$/
        if (!pwdReg.test(pwdInp.value)) {
            utils.tatol(1, '字母开头，长度在6~18之间，只能包含字母、数字和下划线');
        }
    })

    // 登录监听事件
    loadBtn.addEventListener('click', function (e) {
        // 非空验证
        if (telInp.value == '' && pwdInp.value == '') {
            utils.tatol(1, '输入信息不能为空');
        } else {
            // 数据请求
            let data = {
                account: telInp.value,
                password: pwdInp.value
            }
            // post请求
            $http.post("http://139.9.177.51:8099/users/login", data, function (result) {
                console.log(result);
                console.log(result.status);
                // 判断状态
                if (result.status == 0) {
                    // 登录成功
                    utils.tatol(0, "登录成功，点击跳转首页!")
                    localStorage.setItem('user', JSON.stringify(result.data.user));

                    // 定时器跳转页面
                    setTimeout(function () {
                        location.href = './home.html';
                    }, 2000)
                    // 输入框数据清空
                    telInp.value = '';
                    pwdInp.value = '';
                }
                if (result.status == 555) {
                    // 用户名或账号错误
                    utils.tatol(0, "用户名或密码错误，请重新输入!")
                    // 输入框数据清空
                    telInp.value = '';
                    pwdInp.value = '';
                }
            })
        }
    })
})