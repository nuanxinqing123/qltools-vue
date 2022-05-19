<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
<!--        仪表盘面板-->
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">管理中心</div>
                <div class="mdui-card-primary-subtitle">Admin Center</div>
            </div>
            <div class="mdui-card-menu">
                <button @click="OpenDialog()" mdui-tooltip="{content:'修改密码'}" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-grey mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">settings</i>账号设置
                </button>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text">欢迎回来, <st>{{AdminInfo}}</st></p>
                <p class="text_s">Tip: 遇到问题可以前往<a href="https://github.com/nuanxinqing123/QLTools">Github</a>反馈问题哦</p>
                <p class="text_s">在线更新（仅支持Linux）: 为了适配Docker，仅提供三种版本的在线更新。如何选择？ x86 架构选amd64，arm 架构选 arm64，其他设备选arm-7</p>
            </div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button @click="GetUpdate" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">update</i>检查版本
                </button>
            </div>
        </div>
<!--        修改密码-->
        <div id="pwd" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">修改管理员密码</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="changeAdPwd">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">旧密码</label>
                        <input class="mdui-textfield-input" type="text" id="old_password" placeholder="必填" v-model="RePwdData.old_password">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">修改密码</label>
                        <input class="mdui-textfield-input" type="text" id="password" placeholder="必填" v-model="RePwdData.password">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">确认密码</label>
                        <input class="mdui-textfield-input" type="text" id="re_password" placeholder="必填" v-model="RePwdData.re_password">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认修改
                        </button>
                    </div>
                </form>
            </div>
        </div>
<!--        最近登录IP（显示十条）-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">最近登录</div>
                <div class="mdui-card-primary-subtitle">Recent Login</div>
            </div>
            <div class="mdui-table-fluid">
            <table class="mdui-table">
                <thead>
                    <tr>
                        <th>登陆时间</th>
                        <th>登录地址</th>
                        <th>登录IP</th>
                        <th>登录状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="d in IPData" :key="d">
                        <th>{{d.login_time}}</th>
                        <th>{{d.ip_address}}</th>
                        <th>{{d.ip}}</th>
                        <th v-if="d.if_ok === true" style="color: green">成功</th>
                        <th v-else style="color: red">失败</th>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
<!--        版本更新-->
        <div id="version" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">检查版本【本地版本：{{this.UpdateSoft.Version}}】</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <div id="Notice"></div>
                <div class="mdui-dialog-actions">
                    <span id="github">
                        处理器架构：
                        <select class="mdui-select" @change="ChangeUpdateARM($event)" id="cpu_select">
                            <option>amd64</option>
                            <option>arm64</option>
                            <option>arm-7</option>
                        </select>&ensp;
                        <button @click="SendUpdateSW" class="mdui-btn mdui-color-indigo mdui-text-color-white btn">
                            在线更新
                        </button>&ensp;
                        <a href="https://github.com/nuanxinqing123/QLTools/releases">
                            <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                                前往仓库
                            </button>
                        </a>
                    </span>

                    <button class="mdui-btn mdui-color-blue-700 mdui-text-color-white btn" mdui-dialog-close>
                        关闭通知
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mdui from "mdui"
import axios from "axios";

export default {
    name: "AdminCom",
    data(){
        return {
            RePwdData :{
                old_password: '',
                password: '',
                re_password: ""
            },
            IPData: [{
                login_time: "暂无记录",
                ip: "暂无记录",
                ip_address: "暂无记录",
                if_ok: true
            }],
            AdminInfo : 'Admin',
            UpdateSoft:{
                Update: false,
                Version: "",
                Notice: ""
            },
            UpdateARM: {
                framework: "amd64"
            }
        }
    },
    methods: {
        OpenDialog(){
            let inst = new mdui.Dialog('#pwd');
            inst.toggle()
        },
        // 修改管理员密码
        changeAdPwd(){
            // 修改管理员密码
            axios.post("/v2/api/admin/rep-wd", this.RePwdData).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 修改成功
                        mdui.snackbar({
                            message: '密码修改成功',
                            position: 'right-top',
                        });
                        // 修改成功,清除Token重新登录
                        setTimeout(() => {
                            localStorage.clear()
                            window.open("/", "_self")
                        }, 2000)
                        break
                    case res.data.code === 5018:
                        // 旧密码错误
                        mdui.snackbar({
                            message: res.data.msg,
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
        // 获取近期IP记录
        GetIPData(){
            axios.get("/v2/api/admin/ip/info").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.IPData = res.data.data
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
        // 获取管理员信息
        GetAdminInfo(){
            axios.get("/v2/api/admin/info").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.AdminInfo = res.data.data
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
        // 获取版本更新
        GetUpdate(){
            axios.get("/v2/api/check/version").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.UpdateSoft = res.data.data
                        if (this.UpdateSoft.Update === true) {
                            // 修改通知
                            document.getElementById("Notice").innerHTML = this.UpdateSoft.Notice

                            // 打开对话框
                            let inst = new mdui.Dialog('#version');
                            inst.toggle()
                        } else {
                            // 修改通知
                            document.getElementById("Notice").innerHTML = '<ul><li>暂无更新</li></ul>'
                            document.getElementById("github").style.display = "none"

                            // 打开对话框
                            let inst = new mdui.Dialog('#version');
                            inst.toggle()
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
        // 版本更新提示
        GetUpdateAd(){
            axios.get("/v2/api/check/version").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.UpdateSoft = res.data.data
                        if (this.UpdateSoft.Update === true) {
                            mdui.snackbar({
                                message: "有新版本可用",
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
        // 修改架构版本
        ChangeUpdateARM(e){
            let iidd = e.target.selectedIndex
            if (iidd === 0){
                this.UpdateARM.framework = "amd64"
            } else if (iidd === 1){
                this.UpdateARM.framework = "arm64"
            } else {
                this.UpdateARM.framework = "arm-7"
            }
        },
        // 发送更新请求
        SendUpdateSW(){
            axios.post("/v2/api/check/update/software", this.UpdateARM).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: "程序已进入自动更新任务，请在五分钟后手动重启。如果更新失败请手动更新或查看日志排查错误原因",
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5030:
                        mdui.snackbar({
                            message: res.data.msg,
                            position: 'right-top',
                        });
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
        this.GetIPData()
        this.GetAdminInfo()
        this.GetUpdateAd()
    }
}
</script>

<style scoped>

</style>
