<template>
    <!--    外型框架-->
    <div class="mdui-toolbar">
<!--        <a href="/#/" class="mdui-btn mdui-btn-icon">-->
            <i class="mdui-icon material-icons">account_balance_wallet</i>
<!--        </a>-->
        <span class="mdui-typo-title">{{webTitle}}</span>
        <div class="mdui-toolbar-spacer"></div>
        <a mdui-tooltip="{content: '密钥添加/更新'}" @click="OpenCDKInput()" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">credit_card</i>
        </a>
        <a mdui-tooltip="{content: '刷新页面'}" href="javascript:location.reload();" class="mdui-btn mdui-btn-icon">
            <i class="mdui-icon material-icons">refresh</i>
        </a>
        <a mdui-tooltip="{content: '管理面板'}" @click="this.GoAdmin()" id="Admin" class="mdui-btn mdui-btn-icon" style="display: none">
            <i class="mdui-icon material-icons">account_circle</i>
        </a>
        <a mdui-tooltip="{content: '退出登录'}" @click="this.LogOut()" id="LogOut" class="mdui-btn mdui-btn-icon" style="display: none">
            <i class="mdui-icon material-icons">exit_to_app</i>
        </a>
    </div>
<!--    CDK模块-->
    <div id="cdkAdd" class="mdui-dialog" style="top: 210px; display: none;">
        <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
            <form v-on:submit.prevent="">
                <div class="mdui-textfield">
                    <label class="mdui-textfield-label">CD-KEY密钥</label>
                    <input class="mdui-textfield-input" type="text" placeholder="请输入您的CD-KEY密钥" v-model="CD_KEY">
                </div>
                <div class="mdui-dialog-actions">
                    <button @click="InsertCDK()" class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                        <i class="mdui-icon mdui-icon-left material-icons">check</i>{{this.CDK_Btn}}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import mdui from "mdui";

export default {
    name: "HeaderCom",
    data(){
        return {
            webTitle: "",
            CDK_Btn: "确认密钥",
            CD_KEY: ""
        }
    },
    methods: {
        // 获取网站Title
        GetWebTitle(){
            axios.get("/v1/api/set/setting?key=webTitle").then((res) => {
                if (res.data.data["value"] === "") {
                    this.webTitle = "青龙Tools"
                } else {
                    this.webTitle = res.data.data["value"]
                }
            })
        },
        CheckLogin(){
            // 检查是否已登录,从本地存储里获取token
            this.CD_KEY = localStorage.getItem('cdk');
            let token = localStorage.getItem('Bearer');
            // 判断token是否为空如果为空则不跳转, 如果有则跳转到首页
            if (!(token === null || token === "")) {
                // 校验Token有效性
                let TokenData = {"token": token};
                axios.post("/v1/api/check/token", TokenData).then((res) => {
                    if (res.data.data === true) {
                        document.getElementById("Admin").style.display = "inline"
                        document.getElementById("LogOut").style.display = "inline"
                    } else {
                        // Token失效
                        localStorage.clear()
                    }
                })
            }
        },
        LogOut(){
            // 退出登录
            console.log("退出登录")
            localStorage.clear()
            window.open("/#/", "_self")
            location.reload()
        },
        GoAdmin(){
            window.open("/#/admin", "_self")
            location.reload()
        },
        // 打开密钥输入组件
        OpenCDKInput(){
            let inst = new mdui.Dialog('#cdkAdd');
            inst.toggle()
        },
        // 修改按钮状态
        ChangeBtn(){
            // 获取CDK值
            let cdk = localStorage.getItem('cdk');
            if (!(cdk === null || cdk === "")) {
                // CDK存在，修改状态为更新
                this.CDK_Btn = "更新密钥"
            }
        },
        // 添加CDK
        InsertCDK(){
            localStorage.setItem("cdk", this.CD_KEY)
            window.open("/", "_self")
        }
    },
    mounted() {
        // 判断登录状态
        this.CheckLogin()
        this.GetWebTitle()
        this.ChangeBtn()
    }
}
</script>

<style scoped>

</style>
