// 导入login的css
require('../css/register.less');
// // 导入离线字体图标
// require('../lib/iconfont/iconfont.css');

// 预加载
document.ready(function () {

    // 获取登录节点
    let loadDom = document.querySelector(".load>span");

    // 获取输入框
    let telInp = document.querySelector(".user_tel");
    let yzmInp = document.querySelector(".user_code");
    let pwdInp = document.querySelector(".user_pwd");
    let confirmInp = document.querySelector(".user_Confirm");
    // 获取注册节点
    let regBtn = document.querySelector(".regBtn");
    // 获取提示
    let infoMsgDom = document.querySelector(".infoMsg");




    // 监听登录按钮点击事件
    loadDom.addEventListener('click', function () {
        location.href = './login.html';
    })




    // 验证码
    // 定义变量保存验证码
    let yzmVal = '';
    let captcha = new CaptchaMini();
    captcha.draw(document.querySelector('#captcha'), function (reg) {
        yzmVal = reg;
        // console.log(reg);
    })




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





    // 验证码输入框失焦事件验证
    yzmInp.addEventListener('blur', function (e) {
        if (yzmInp.value.toLowerCase() != yzmVal.toLowerCase()) {
            utils.tatol(1, '验证码错误');

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



    // 确认密码
    confirmInp.addEventListener('blur', function (e) {
        // 判断两次密码是否一致
        if (pwdInp.value != confirmInp.value) {
            utils.tatol(1, '两次输入的密码不一致');
        }
    })




    // 注册事件点击监听
    regBtn.addEventListener('click', function (e) {
        // 非空验证
        if (telInp.value == '' && yzmInp.value == '' && pwdInp.value == '' && confirmInp.value == '') {
            utils.tatol(1, '输入的内容不能为空');

        } else {
            // 数据请求
            let data = {
                account: telInp.value,
                password: pwdInp.value
            }
            $http.post("http://139.9.177.51:8099/users/add", data, function (result) {
                console.log(result);
                // console.log(result.status);
                // 判断状态 1已存在 0注册成功
                if (result.status == 1) {
                    utils.tatol(0, "用户已存在，即将跳转登录页");
                    setTimeout(function () {
                        location.href = './login.html';
                    }, 2000)


                    // 清空输入框
                    telInp.value = '';
                    yzmInp.value = '';
                    pwdInp.value = '';
                    confirmInp.value = '';

                }
                if (result.status == 0) {
                    utils.tatol(0, '注册成功，即将跳转登录页');
                    setTimeout(function () {
                        location.href = './login.html';
                    }, 2000)

                    // 清空输入框
                    telInp.value = '';
                    yzmInp.value = '';
                    pwdInp.value = '';
                    confirmInp.value = '';
                }
            })
        }


    })




})
