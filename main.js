"ui";

var ColoredButton = (function() {
    //继承ui.Widget
    util.extend(ColoredButton, ui.Widget);

    function ColoredButton() {
        //调用父类构造函数
        ui.Widget.call(this);
        //自定义属性color，定义按钮颜色
        this.defineAttr("color", (view, name, defaultGetter) => {
            return this._color;
        }, (view, name, value, defaultSetter) => {
            this._color = value;
            view.attr("backgroundTint", value);
        });
        //自定义属性onClick，定义被点击时执行的代码
        this.defineAttr("onClick", (view, name, defaultGetter) => {
            return this._onClick;
        }, (view, name, value, defaultSetter) => {
            this._onClick = value;
        });
    }
    ColoredButton.prototype.render = function() {
        return (
            <button textSize="8sp" style="Widget.AppCompat.Button.Colored" w="60" h="30"/>
        );
    }
    ColoredButton.prototype.onViewCreated = function(view) {
        view.on("click", () => {
            if (this._onClick) {
                eval(this._onClick);
            }
        });
    }
    ui.registerWidget("colored-button", ColoredButton);
    return ColoredButton;
})();

ui.layout(
<vertical>
        <linear gravity="left">
        <img margin="5" layout="center" id="rounded_img" src="https://suroy.cn/usr/themes/Sunshine/images/Sunshine.png"
                w="50" h="50" radius="13dp" scaleType="fitXY"/>
        <vertical>
        <colored-button text="京东" color="#ff5722" onClick="jdWorker()"/>
        <colored-button text="@Suroy" onClick="hello()"/>
        </vertical>
        <linear gravity="center">
        <text id="info" text="能做事的做事，能发声的发声，有一分热，发一分光。—— 鲁迅" maxLines="3" ellipsize="end" textStyle="italic" margin="8" textColor="grey" autoLink="all" textSize="12sp"/>
        </linear>
    </linear>
    <webview id="webView" layout_below="title" w="*" h="*"/>
</vertical>
);

let webViewExpand = require("expand/core/webViewExpand.js");
webViewExpand.init(ui.webView, [], true);
ui.webView.loadUrl("https://home.m.jd.com/myJd/newhome.action");


function jdWorker() {
    ui.webView.loadUrl("https://home.m.jd.com/myJd/newhome.action");
}


function hello() {
    try {
        $dialogs.setDefaultDialogType("foreground-or-overlay");
    } catch (error) {}
    dialogs.build({
        title: "关于",
        content: "京东Cookies小助手\n版本号:"+app.versionName+"\n作者：@Suroy(https://suroy.cn)",
        positive: "确定",
        titleColor: "#000000",
        positiveColor: "#000000",
    }).on("positive", function() {
            ui.webView.loadUrl("https://suroy.cn");
    }).show();

}


/**
 * @brief 更新一言
 * 
 */
ui.info.on("click", () => {
    alert("Hello ~");
})
