/**
 * 工具函数
 */


/**
 * 公共组件封装
 * S-Q 2021-06-15
 */

// 定义对象存放
let utils = {};
// 将弹窗加入到对象中
utils.tatol = function (status, text) {
    // 创建标签
    let tatol = document.createElement("div");
    // 添加类名
    tatol.className = 'tatol';
    // 字符串拼接
    let html = `
        <div class="stat">${status ? '!' : '√'}</div>
        <div class="infoText">${text}</div>
    `;
    // 将值写入到标签中
    tatol.innerHTML = html;
    // 将标签加入到body最后
    document.querySelector("body").appendChild(tatol);

    // 过2秒自动删除
    setTimeout(function () {
        tatol.remove();
    }, 2000)
}

// 挂载
window.utils = utils;