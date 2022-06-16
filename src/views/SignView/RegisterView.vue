<template>
    <!--    头部-->
    <HeaderCom />
    <!--    注册组件-->
    <div id="box" >
        <div class="box" style="margin-top: 35px;">
            <p style="padding-bottom: 10px">管理员注册</p>
            <hr>
            <div style="width: 75%;margin: 20px auto 0;">
                <form v-on:submit.prevent="submitForm">
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">email</i>
                        <input type="text" class="mdui-textfield-input" placeholder="管理员邮箱" v-model="RegisterData.email" />
                    </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">account_box</i>
                        <input type="text" class="mdui-textfield-input" placeholder="管理员用户名" v-model="RegisterData.username" />
                    </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">lock</i>
                        <input type="password" class="mdui-textfield-input" placeholder="管理员密码" v-model="RegisterData.password" />
                    </div>
                    <div class="mdui-textfield mdui-textfield-floating-label">
                        <i class="mdui-icon material-icons">lock</i>
                        <input type="password" class="mdui-textfield-input" placeholder="再次确认密码" v-model="RegisterData.re_password" />
                    </div>
                    <div style="text-align: center; padding-top: 20px;">
                        <button class="mdui-ripple mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue-50" style="width: 200px;" id="LoginBtn">注&ensp;&ensp;册</button>
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
            RegisterData :{
                email: '',
                username: '',
                password: '',
                re_password: ''
            }
        }
    },
    methods :{
        // 发送登录请求
        submitForm(){
            axios.post("/v1/api/signup", this.RegisterData).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 注册成功
                        mdui.snackbar({
                            message: '注册成功,已自动关闭注册(即将跳转登录)',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            window.open("/#/login", "_self")
                        }, 2000)
                        break
                    case res.data.code === 5007:
                        // 已关闭注册
                        mdui.snackbar({
                            message: '已关闭注册,禁止新用户注册',
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
        // 修改底栏高度状态
        changeStyle(){
            let container = document.querySelector("#box");
            container.style.minHeight=window.innerHeight-document.body.clientHeight+container.clientHeight+'px';
            mdui.mutation();
        },
    },
    mounted() {
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

