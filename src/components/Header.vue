<template>
    <!--    外型框架-->
    <div class="mdui-toolbar">
<!--        <a href="/#/" class="mdui-btn mdui-btn-icon">-->
            <i class="mdui-icon material-icons">account_balance_wallet</i>
<!--        </a>-->
        <span class="mdui-typo-title">{{webTitle}}</span>
        <div class="mdui-toolbar-spacer"></div>
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
</template>

<script>
import axios from "axios";

export default {
    name: "HeaderCom",
    data(){
        return {
            webTitle: "",
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
        }
    },
    mounted() {
        // 判断登录状态
        this.CheckLogin()
        this.GetWebTitle()
    }
}
</script>

<style scoped>

</style>
