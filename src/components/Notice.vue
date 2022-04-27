<template>
    <div id="BodyCon">
<!--        公告-->
        <div class="box" id="box_notice">
            <!--        公告部分-->
            <div>
                <p style="padding-bottom: 10px">网站公告</p>
                <hr>
                <div class="notice_data" id="notice_data">
                    <!--                  开始-->
                    <strong><span style="color:#E53333; text-align: center">本工具仅用于学习和调试使用，禁止用于任何违法犯罪行为</span></strong><br>
                    <!--                  结束-->
                </div>
            </div>
        </div>
<!--        提交-->
        <div class="box" style="margin-top: 35px;">
            <div>
                <p style="padding-bottom: 10px">变量提交</p>
                <hr>
                <div id="envSelect">
                    <div style="width: 100%">
                        <div style="margin-top: 8px">
                            服务器：
                            <select class="mdui-select" @change="changeEnvData($event)" id="server">
                                <option v-for="d in InitIndexData['serverData']" :key="d" :value="d['PanelName']">{{d['PanelName']}}</option>
                            </select>
                        </div>
                        <div style="margin-top: 8px">
                            变量组：
                            <select class="mdui-select" @change="changeNum($event)" id="env">
                                <option v-for="d in this.EnvData" :key="d" :value="d['name']">{{d['name']}}</option>
                            </select>
                        </div>
                        <div style="margin-top: 8px; font-size: 16px">
                            剩余位置：<span id="num">0</span>
                        </div>
                    </div>
                </div>
                <div class="envInput">
                    <form v-on:submit.prevent="POSTEnvAdd">
                        <div class="mdui-textfield">
                            <input type="text" class="mdui-textfield-input" placeholder="Cookie" v-model="EnvAdd.envData"/>
                        </div>
                        <div class="mdui-textfield">
                            <input type="text" class="mdui-textfield-input" placeholder="备注（可空）" v-model="EnvAdd.envRemarks"/>
                        </div>
                        <div style="text-align: center; padding-top: 20px;">
                            <button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-blue-50" style="width: 200px;" id="LoginBtn">提&ensp;&ensp;交</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
<!--        成功提示-->
        <div id="SendOK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-title" id="dialog-title">Success</div>
            <div class="mdui-dialog-content" id="dialog-content">您已提交成功</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import mdui from "mdui";

export default {
    name: "NoticeCom",
    data(){
        return {
            InitIndexData: {},
            EnvData:[],
            EnvAdd: {
                serverID: 0,
                envName: "",
                envData: "",
                envRemarks: ""
            }
        }
    },
    methods :{
        // 获取信息
        GetIndexData(){
            axios.get("/v1/api/index/data").then((res) => {
                this.InitIndexData = res.data.data
                this.EnvData = this.InitIndexData['serverData'][0]['envData']
                this.EnvAdd.serverID = this.InitIndexData['serverData'][0]['ID']
                this.EnvAdd.envName = this.InitIndexData['serverData'][0]['envData'][0]['name']
                document.getElementById("num").innerText = this.InitIndexData['serverData'][0]['envData'][0]['quantity']
            })
        },
        // 获取公告
        GetNotice(){
            axios.get("/v1/api/set/setting?key=notice").then((res) => {
                document.getElementById("notice_data").innerHTML = res.data.data["value"]
            })
        },
        // 服务器变更：修改变量组和默认数据
        changeEnvData(e){
            let iidd = e.target.selectedIndex
            // 修改变量组
            this.EnvData = this.InitIndexData['serverData'][iidd]['envData']
            // 修改服务器ID值
            this.EnvAdd.serverID = this.InitIndexData['serverData'][iidd]['ID']
            // 修改变量Name
            this.EnvAdd.envName = this.InitIndexData['serverData'][iidd]['envData'][0]['name']
            // 修改剩余限额
            document.getElementById("num").innerText = this.InitIndexData['serverData'][iidd]['envData'][0]['quantity']
        },
        // 修改剩余位置&变量名
        changeNum(e){
            let iidd = e.target.selectedIndex
            // 修改剩余位置
            document.getElementById("num").innerText = this.EnvData[iidd]['quantity']
            // 修改变量名
            this.EnvAdd.envName = this.EnvData[iidd]['name']
        },
        // 发送上传请求
        POSTEnvAdd(){
            let inst = new mdui.Dialog('#SendOK');
            axios.post("/v1/api/env/add", this.EnvAdd).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 上传成功
                        document.getElementById("dialog-title").innerText = "Success"
                        document.getElementById("dialog-content").innerText = "您已提交成功"
                        inst.toggle()
                        break
                    case res.data.code === 5020:
                        // 限额已满，禁止提交
                        document.getElementById("dialog-title").innerText = "Error"
                        document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                        inst.toggle()
                        break
                    case res.data.code === 5019:
                        // 上传内容不符合规定, 请检查后再提交
                        document.getElementById("dialog-title").innerText = "上传内容不符合规定, 请检查后再提交"
                        document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                        inst.toggle()
                        break
                    case res.data.code === 5015:
                        // 提交服务器或变量名不在白名单
                        document.getElementById("dialog-title").innerText = "提交服务器或变量名不在白名单"
                        document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                        inst.toggle()
                        break
                    case res.data.code === 5016:
                        // 发生一点小意外，请重新提交
                        document.getElementById("dialog-title").innerText = "发生一点小意外，请重新提交"
                        document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                        inst.toggle()
                        break
                    case res.data.code === 5003:
                        // 服务繁忙,请稍后重试
                        document.getElementById("dialog-title").innerText = "服务繁忙,请稍后重试"
                        document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                        inst.toggle()
                        break
                    case res.data.code === 5002:
                        // 传递参数错误
                        if (res.data.data === "") {
                            document.getElementById("dialog-title").innerText = "服务繁忙,请稍后重试"
                            document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
                            inst.toggle()
                        } else {
                            document.getElementById("dialog-title").innerText = res.data.msg
                            document.getElementById("dialog-content").innerText = "限额已满，禁止提交"
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
        // 修改底栏高度状态
        changeStyle(){
            let container = document.querySelector("#BodyCon");
            container.style.minHeight=window.innerHeight-document.body.clientHeight+container.clientHeight+'px';
            mdui.mutation();
        },
    },
    mounted() {
        this.GetIndexData()
        this.GetNotice()
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

.notice_data {
    line-height: 30px;
    padding-top: 10px;
}
.envInput {
    width: 70%;
    text-align: center;
    margin: 20px auto 0;
}
#envSelect{
    text-align: center;
    margin: 20px auto 0;
}
</style>
