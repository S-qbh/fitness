/**
 * 工具函数
 */


/**
 * 公共组件封装
 * S-Q 2021-06-15
 */

// 定义对象存放
let utils = {};

/**
 * @tatol 封装弹窗组件
 * @status 状态 1！ 0对
 * @text string 提示文本
 * @timer number 提示框显示时间
 */
// 将弹窗加入到对象中
utils.tatol = function (status, text, timer = 1) {
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
    }, timer * 1000)
}
// 添加footer底部组件
/**
 * @addFooter 添加底部
 */
utils.addFooter = function (page) {
    // 创建footer节点
    let footer = document.createElement("div");
    // 给footer添加类名
    footer.className = 'footer dpflex';
    // 获取值
    let html = `
            <a href="./home.html">
                <!-- 首页 -->
                <div class="${page === 'home' ? 'active' : ''}">
                    <i class="iconfont iconhome"></i><br>
                    首页
                </div>
            </a>
            <a href="./sports.html">
                <!-- 运动 -->
                <div class="${page === 'sports' ? 'active' : ''}">
                    <i class="iconfont iconsports"></i><br>
                    运动
                </div>
            </a>
            <a href="./personal.html">
                <!-- 我的 -->
                <div class="${page === 'personal' ? 'active' : ''}">
                    <i class="iconfont iconmine"></i><br>
                    我的
                </div>
            </a>
    `;
    // 将值添加给创建的footer标签
    footer.innerHTML = html;
    // 将footer添加到body最后
    document.querySelector('body').appendChild(footer);
}



/**
 * @strToObj 将网址中的字符串转换为数组
 * @str String   ?name="zhangsan"&age=18
 * @returns Object {"name":"zhangsan","age":18}
 */








// 挂载
window.utils = utils;