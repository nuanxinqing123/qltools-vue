<template>
<!--    头部-->
    <HeaderCom />
<!--    登录组件-->
    <div id="box">
        <div class="box" style="margin-top: 35px;">
            <p style="padding-bottom: 10px">管理员登录（演示版）</p>
            <hr>
            <div style="width: 75%;margin: 20px auto 0;">
                <form v-on:submit.prevent="submitForm">
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">email</i>
                        <input type="text" class="mdui-textfield-input" placeholder="管理员邮箱" v-model="LoginData.email" />
                    </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">lock</i>
                        <input type="password" class="mdui-textfield-input" placeholder="管理员密码" v-model="LoginData.password" />
                    </div>
                    <div style="text-align: center; padding-top: 20px;">
                        <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue-50" style="width: 200px;" id="LoginBtn">登&ensp;&ensp;录</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
<!--    页脚-->
    <FooterCom />
</template>

<script>
import axios from "axios";
import mdui from "mdui";
import HeaderCom from "@/components/Header";
import FooterCom from "@/components/Footer";

export default {
    name: "LoginView",
    components: {
        HeaderCom,
        FooterCom,
    },
    data(){
        return {
            LoginData :{
                email: '',
                password: ''
            }
        }
    },
    methods :{
        // 发送登录请求
        submitForm(){
            axios.post("/v1/api/signin", this.LoginData).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 登录成功
                        localStorage.setItem("Bearer", res.data.data)
                        window.open("/", "_self")
                        break
                    case res.data.code === 5008:
                        // 邮箱或者密码错误
                        mdui.snackbar({
                            message: '邮箱或者密码错误',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5003:
                        // 内部服务错误
                        mdui.snackbar({
                            message: '服务繁忙',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5010:
                        // 邮箱不存在
                        mdui.snackbar({
                            message: '邮箱不存在',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5009:
                        // 邮箱格式错误
                        mdui.snackbar({
                            message: '邮箱格式错误',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5002:
                        // 传递参数错误
                        if (res.data.data === "") {
                            mdui.snackbar({
                                message: '服务繁忙',
                                position: 'right-top',
                            });
                        } else {
                            mdui.snackbar({
                                message: res.data.msg,
                                position: 'right-top',
                            });
                        }
                        break
                }
            }).catch((error) => {
                // 请求失败
                mdui.snackbar({
                    message: error,
                    position: 'right-top',
                });
            })
        },
        CheckLogin(){
            // 从本地存储里获取token
            let token = localStorage.getItem('Bearer');
            // 判断token是否为空如果为空则不跳转, 如果有则跳转到首页
            if (!(token === null || token === "")) {
                window.open("/", "_self")
            }
        },
        // 修改底栏高度状态
        changeStyle(){
            let container = document.querySelector("#box");
            container.style.minHeight=window.innerHeight-document.body.clientHeight+container.clientHeight+'px';
            mdui.mutation();
        },
    },
    mounted() {
        // 检查是否已登录
        this.CheckLogin()
        this.changeStyle()
    }
}
</script>

<style scoped>
.box{
    margin: 0 auto;
    width: 61.8%;
    padding: 30px;
    background: rgba(250, 249, 249, .8);
    box-sizing:border-box;
    box-shadow: 0 15px 25px rgb(60 64 67 / 25%);
    border-radius:15px;
}
@media screen and (max-width:912px){.box{width:80%;}}
@media screen and (max-width:540px){.box{width:500px;}}
@media screen and (max-width:420px){.box{width:360px;}}
@media screen and (max-width:375px){.box{width:330px;}}
@media screen and (max-width:280px){.box{width:255px;}}
</style>
