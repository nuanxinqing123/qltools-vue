<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">消息推送</div>
                <div class="mdui-card-primary-subtitle">Message Push</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">消息推送是用于管理员感知用户提交操作、网站安全等通知设置</p>
            </div>
        </div>
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">邮件服务器</div>
                <div class="mdui-card-primary-subtitle">Set SMTP</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tips：默认向管理员邮箱发送消息推送, 测试发送前请先 <span style="color: #E53333">填写必要信息并保存</span></p>
                <p class="text_s">目前支持模块：异常登录推送</p>
            </div>
            <div class="mdui-divider"></div>
            <div class="mdui-center" style="margin-top: 15px;">
                <div class="SMTPInput" style="margin-right: 32px;margin-left: 32px;">
                    <form v-on:submit.prevent="SMTP">
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">推送状态</label>
                            <label class="mdui-switch">
                                停用&ensp;
                                <input v-model="SMTP.EnableEmail" type="checkbox"/>
                                <i class="mdui-switch-icon"></i>
                                &ensp;启用
                            </label>
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">发件人邮箱</label>
                            <input type="email" class="mdui-textfield-input" placeholder="必填"
                                   v-model="SMTP.SendMail" />
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">发件人密码</label>
                            <input type="text" class="mdui-textfield-input" placeholder="必填"
                                   v-model="SMTP.SendPwd" />
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">SMTP 邮件服务器地址</label>
                            <input type="text" class="mdui-textfield-input" placeholder="必填"
                                   v-model="SMTP.SMTPServer" />
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">SMTP端口</label>
                            <input type="number" class="mdui-textfield-input" placeholder="必填"
                                   v-model="SMTP.SMTPPort" />
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">发件人昵称</label>
                            <input type="text" class="mdui-textfield-input" placeholder="必填"
                                   v-model="SMTP.SendName" />
                        </div>
                        <div class="mdui-textfield">
                            <label class="mdui-textfield-label">测试邮箱</label>
                            <input type="email" class="mdui-textfield-input" placeholder="选填"
                                   v-model="SMTP.TestEmail" />
                        </div>
                    </form>
                    <!--                提交按钮-->
                    <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                        <button @click="this.UpdateEmailData" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                            提交设置
                        </button>
                    </div>
                    <!--                测试按钮-->
                    <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                        <button @click="this.SendTestEmail" class="mdui-ripple mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-700 mdui-text-color-white">
                            测试发送
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import mdui from "mdui";

export default {
    name: "AdminMsgCom",
    data(){
        return {
            SMTP: {
                EnableEmail: false,
                SendMail: "",
                SendPwd: "",
                SMTPServer: "",
                SMTPPort: 0,
                SendName: "",
                TestEmail: ""
            }
        }
    },
    methods: {
        // 获取信息
        GetEmailData(){
            axios.get("/v2/api/message/data").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.SMTP = res.data.data
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
        // 测试发送
        SendTestEmail(){
            axios.post("/v2/api/message/send/test", this.SMTP).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 连通测试成功
                        mdui.snackbar({
                            message: '测试邮件发送成功',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5003:
                        mdui.snackbar({
                            message: res.data.msg,
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
        // 修改邮件信息
        UpdateEmailData(){
            axios.post("/v2/api/message/update", this.SMTP).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 连通测试成功
                        mdui.snackbar({
                            message: '邮件信息更新成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1500)
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
        }
    },
    mounted() {
        this.GetEmailData()
    }
}
</script>

<style scoped>

</style>
