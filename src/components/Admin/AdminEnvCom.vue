<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">变量管理</div>
                <div class="mdui-card-primary-subtitle">Env Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">变量管理并非管理容器内的变量，而是管理前端上传的允许变量名。可以搭配正则表达式过滤恶意提交，正则表达式为空则代表允许所有内容</p>
            </div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button @click="OpenReList" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">gesture</i>投稿正则表
                </button>
            </div>
        </div>
<!--        变量管理-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">设置变量</div>
                <div class="mdui-card-primary-subtitle">Set Env</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">变量备注：变量名的备注名称，如果填写则前台也将显示备注名称</p>
                <p class="text_s">新建模式：为每个上传的变量创建一个新的表来储存</p>
                <p class="text_s">合并模式：将所有上传的变量放在同一个表中来储存, 可以通过自定义符号来分割变量【此模式用户提交备注将自动无效】</p>
                <p class="text_s">更新模式：通过正则来匹配变量字段。匹配成功则更新旧表，否则自动新建表来储存</p>
                <p class="text_s">绑定插件：管理员通过上传JavaScript插件绑定变量来再次确认变量数据是否符合要求，是否允许上传</p>
            </div>
            <div class="mdui-card-menu">
                <button @click="OpenDialog()" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-grey mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">loupe</i>新增
                </button>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                        <tr>
                            <th>操作</th>
                            <th>变量名</th>
                            <th>变量备注</th>
                            <th>变量限额</th>
                            <th>变量匹配正则</th>
                            <th>上传模式</th>
                            <th>分割符(合并)</th>
                            <th>更新正则(更新)</th>
                            <th>绑定CDK</th>
                            <th>启用插件</th>
                            <th>插件名称</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in EnvAll" :key="d">
                            <th>
                                <button @click="OpenEnvUpdate(d.ID, d.Name, d.NameRemarks, d.Quantity, d.Regex, d.Mode, d.Division, d.ReUpdate, d.IsPlugin, d.PluginName, d.IsCDK)" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue mdui-text-color-white">
                                    修改
                                </button>
                                &ensp;&ensp;
                                <button @click="OpenEnvDel(d.ID)" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-red mdui-text-color-white">
                                    删除
                                </button>
                            </th>
                            <th>{{d.Name}}</th>
                            <th>{{d.NameRemarks}}</th>
                            <th>{{d.Quantity}}</th>
                            <th>{{d.Regex}}</th>
                            <th v-if="d.Mode === 1">新建模式</th>
                            <th v-else-if="d.Mode === 2">合并模式</th>
                            <th v-else>更新模式</th>
                            <th>{{d.Division}}</th>
                            <th>{{d.ReUpdate}}</th>
                            <th v-if="d.IsCDK === true" style="color: green">启用</th>
                            <th v-else>未绑定</th>
                            <th>{{d.IsPlugin}}</th>
                            <th>{{d.PluginName}}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
<!--        变量新增-->
        <div id="envAdd" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">新增变量</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="AddEnv">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量名</label>
                        <input class="mdui-textfield-input" type="text" id="envName" placeholder="必填" v-model="AddEnvName.envName">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量备注</label>
                        <input class="mdui-textfield-input" type="text" id="envName" placeholder="选填" v-model="AddEnvName.envNameRemarks">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量限额</label>
                        <input class="mdui-textfield-input" type="number" id="envQuantity" placeholder="必填" v-model="AddEnvName.envQuantity">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量匹配正则</label>
                        <input class="mdui-textfield-input" type="text" id="envRegex" placeholder="选填" v-model="AddEnvName.envRegex">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">上传模式</label>
                        <select class="mdui-select" id="envMode" @change="SwitchEnvAddMode($event)">
                            <option>新建模式</option>
                            <option>合并模式</option>
                            <option>更新模式</option>
                        </select>
                    </div>
                    <div id="delimiter" class="mdui-textfield" style="display: none">
                        <label class="mdui-textfield-label">分隔符</label>
                        <input class="mdui-textfield-input" type="text" id="envDivision" placeholder="合并模式：必填" v-model="AddEnvName.envDivision">
                    </div>
                    <div id="updateRe" class="mdui-textfield" style="display: none">
                        <label class="mdui-textfield-label">更新匹配正则</label>
                        <input class="mdui-textfield-input" type="text" id="envDivision" placeholder="更新模式：必填" v-model="AddEnvName.envReUpdate">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">绑定CDK</label>
                        <label class="mdui-switch">
                            禁用&ensp;
                            <input v-model="AddEnvName.envIsCDK" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                            &ensp;启用
                        </label>
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">启用插件</label>
                        <label class="mdui-switch">
                            <input v-model="AddEnvName.envIsPlugin" @change="ChangeAddPlugin" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                        </label>
                    </div>
                    <div id="add_plugin" class="mdui-textfield" style="display: none">
                        绑定插件：
                        <select class="mdui-select" @change="changInPlugin($event)" id="in_plugin_select">
                            <option v-for="d in JsAll" :key="d" :value="d['FileIDName']" :selected="d.selected">{{d['FileIDName']}}</option>
                        </select>
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-ripple mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
<!--        变量删除-->
        <div id="envDel" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-content">确认删除变量?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-ripple mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="DelEnv()" class="mdui-btn mdui-ripple">删除</button>
            </div>
        </div>
<!--        变量修改-->
        <div id="envUpdate" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">修改变量</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="UpdateEnv">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量名</label>
                        <input class="mdui-textfield-input" type="text" placeholder="必填" v-model="EnvUpdate.envName">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量备注</label>
                        <input class="mdui-textfield-input" type="text" placeholder="选填" v-model="EnvUpdate.envNameRemarks">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量限额</label>
                        <input class="mdui-textfield-input" type="number" placeholder="必填" v-model="EnvUpdate.envQuantity">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">变量匹配正则</label>
                        <input class="mdui-textfield-input" type="text" placeholder="选填" v-model="EnvUpdate.envRegex">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">上传模式</label>
                        <span v-if="this.EnvUpdate.envMode === 1">
                            <select class="mdui-select" id="envMode" @change="SwitchEnvUpdateMode($event)">
                                <option selected = "selected">新建模式</option>
                                <option>合并模式</option>
                                <option>更新模式</option>
                            </select>
                        </span>
                        <span v-else-if="this.EnvUpdate.envMode === 2">
                            <select class="mdui-select" id="envMode" @change="SwitchEnvUpdateMode($event)">
                                <option>新建模式</option>
                                <option selected = "selected">合并模式</option>
                                <option>更新模式</option>
                            </select>
                        </span>
                        <span v-else>
                            <select class="mdui-select" id="envMode" @change="SwitchEnvUpdateMode($event)">
                                <option>新建模式</option>
                                <option>合并模式</option>
                                <option selected = "selected">更新模式</option>
                            </select>
                        </span>
                    </div>
                    <div id="u_delimiter" class="mdui-textfield" style="display: none">
                        <label class="mdui-textfield-label">分隔符</label>
                        <input class="mdui-textfield-input" type="text" id="envDivision" placeholder="合并模式：必填" v-model="EnvUpdate.envDivision">
                    </div>
                    <div id="u_updateRe" class="mdui-textfield" style="display: none">
                        <label class="mdui-textfield-label">更新匹配正则</label>
                        <input class="mdui-textfield-input" type="text" id="envDivision" placeholder="更新模式：必填" v-model="EnvUpdate.envReUpdate">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">绑定CDK</label>
                        <label class="mdui-switch">
                            禁用&ensp;
                            <input v-model="EnvUpdate.envIsCDK" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                            &ensp;启用
                        </label>
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">启用插件</label>
                        <label class="mdui-switch">
                            <input v-model="EnvUpdate.envIsPlugin" @change="ChangeUpdatePluginZ()" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                        </label>
                    </div>
                    <div id="up_plugin" class="mdui-textfield" style="display: none">
                        绑定插件：
                        <select class="mdui-select" @change="changeUpPlugin($event)" id="up_plugin_select">
                            <option v-for="d in JsAll" :key="d" :value="d['FileIDName']" :selected="d.selected">{{d['FileIDName']}}</option>
                        </select>
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-ripple mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认修改
                        </button>
                    </div>
                </form>
            </div>
        </div>
<!--        投稿正则表-->
        <div id="ReList" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">变量正则表【此表来源于用户投稿】</div>
            <div class="mdui-dialog-content mdui-typo">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                    <tr>
                        <th>正则变量</th>
                        <th>匹配正则</th>
                        <th>更新正则</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>某东的正则表达式</th>
                        <th>pt_key=.*?pt_pin=.*?;</th>
                        <th>pt_pin=.*?;</th>
                    </tr>
                    <tr>
                        <th>某手极速版的正则</th>
                        <th>kuaishou.api_st=.*?;</th>
                        <th>无</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import mdui from "mdui";
import axios from "axios";

export default {
    name: "AdminEnvCom",
    data() {
        return {
            AddEnvName: {
                envName: "",
                envNameRemarks: "",
                envQuantity: 0,
                envRegex: "",
                envMode: 1,
                envDivision: "",
                envReUpdate: "",
                envIsPlugin: false,
                envPluginName: "",
                envIsCDK: false
            },
            EnvAll: [{
                ID: 0,
                Name: "",
                NameRemarks: "",
                Quantity: 0,
                Regex: "",
                Mode: 1,
                Division: "",
                ReUpdate: "",
                IsPlugin: false,
                PluginName: "",
                IsCDK: false
            }],
            EnvDel: {
                envID: 0
            },
            EnvUpdate: {
                envID: 0,
                envName: "",
                envNameRemarks: "",
                envQuantity: 0,
                envRegex: "",
                envMode: 1,
                envDivision: "",
                envReUpdate: "",
                envIsPlugin: false,
                envPluginName: "",
                envIsCDK: false
            },
            JsAll: [{
                FileName: "",
                FileIDName: "",
                selected: false
            }]
        }
    },
    methods: {
        // 打开新增
        OpenDialog(){
            let inst = new mdui.Dialog('#envAdd');
            inst.toggle()
        },
        // 打开正则表
        OpenReList(){
            let inst = new mdui.Dialog('#ReList');
            inst.toggle()
        },
        // 修改新增插件状态
        ChangeAddPlugin(){
            if (this.AddEnvName.envIsPlugin === true) {
                document.getElementById("add_plugin").style.display = "inline"
            } else {
                document.getElementById("add_plugin").style.display = "none"
            }
        },
        // 修改修改插件状态
        ChangeUpdatePluginZ(){
            if (this.EnvUpdate.envIsPlugin === true) {
                this.EnvUpdate.envPluginName = this.JsAll[0].FileName
                document.getElementById("up_plugin").style.display = "inline"
            } else {
                this.EnvUpdate.envPluginName = ""
                document.getElementById("up_plugin").style.display = "none"
            }
        },
        // 打开删除
        OpenEnvDel(envID){
            this.EnvDel.envID = envID
            let inst = new mdui.Dialog('#envDel');
            inst.toggle()
        },
        // 打开修改
        OpenEnvUpdate(id, name, NameRemarks, quantity, regex, mode, division, ReUpdate, IsPlugin, PluginName, IsCDK){
            this.EnvUpdate.envID = id
            this.EnvUpdate.envName = name
            this.EnvUpdate.envNameRemarks = NameRemarks
            this.EnvUpdate.envQuantity = quantity
            this.EnvUpdate.envRegex = regex
            this.EnvUpdate.envMode = mode
            this.EnvUpdate.envDivision = division
            this.EnvUpdate.envReUpdate = ReUpdate
            this.EnvUpdate.envIsPlugin = IsPlugin
            this.EnvUpdate.envPluginName = PluginName
            this.EnvUpdate.envIsCDK = IsCDK
            if (this.EnvUpdate.envMode === 1){
                // 新建模式
                document.getElementById("u_delimiter").style.display = "none"
                document.getElementById("u_updateRe").style.display = "none"
            } else if (this.EnvUpdate.envMode === 2) {
                // 合并模式
                document.getElementById("u_delimiter").style.display = "inline"
                document.getElementById("u_updateRe").style.display = "none"
            } else {
                // 更新模式
                document.getElementById("u_delimiter").style.display = "none"
                document.getElementById("u_updateRe").style.display = "inline"
            }

            // 是否显示开启插件
            if (this.EnvUpdate.envIsPlugin === true) {
                document.getElementById("up_plugin").style.display = "inline"
                for (let i = 0; i < this.JsAll.length; i++) {
                    this.JsAll[i].selected = this.EnvUpdate.envPluginName === this.JsAll[i].FileName;
                }
            } else {
                document.getElementById("up_plugin").style.display = "none"
            }
            let inst = new mdui.Dialog('#envUpdate');
            inst.toggle()
        },
        // 添加变量
        AddEnv(){
            axios.post("/v2/api/env/name/add", this.AddEnvName).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 添加成功
                        mdui.snackbar({
                            message: '变量添加成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                        break
                    case res.data.code === 5012:
                        // 变量名已存在
                        mdui.snackbar({
                            message: '变量名已存在',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5016:
                        // 变量名创建失败
                        mdui.snackbar({
                            message: '变量名创建失败',
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
        // 获取变量信息
        GetEnvAll(){
            axios.get("/v2/api/env/name/all").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.EnvAll = res.data.data
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
        // 删除变量
        DelEnv(){
            axios.delete("/v2/api/env/name/del", {data: this.EnvDel}).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '变量删除成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
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
        // 修改变量信息
        UpdateEnv(){
            axios.put("/v2/api/env/name/update", this.EnvUpdate).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '变量修改成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
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
        // 切换新增上传模式
        SwitchEnvAddMode(e){
            let iidd = e.target.selectedIndex
            if (iidd === 0){
                // 新建模式
                this.AddEnvName.envMode = 1
                document.getElementById("delimiter").style.display = "none"
                document.getElementById("updateRe").style.display = "none"
            } else if (iidd === 1) {
                // 合并模式
                this.AddEnvName.envMode = 2
                document.getElementById("delimiter").style.display = "inline"
                document.getElementById("updateRe").style.display = "none"
            } else {
                // 更新模式
                this.AddEnvName.envMode = 3
                document.getElementById("delimiter").style.display = "none"
                document.getElementById("updateRe").style.display = "inline"
            }
        },
        // 切换修改上传模式
        SwitchEnvUpdateMode(e){
            let iidd = e.target.selectedIndex
            if (iidd === 0){
                // 新建模式
                this.EnvUpdate.envMode = 1
                document.getElementById("u_delimiter").style.display = "none"
                document.getElementById("u_updateRe").style.display = "none"
            } else if (iidd === 1) {
                // 合并模式
                this.EnvUpdate.envMode = 2
                document.getElementById("u_delimiter").style.display = "inline"
                document.getElementById("u_updateRe").style.display = "none"
            } else {
                // 更新模式
                this.EnvUpdate.envMode = 3
                document.getElementById("u_delimiter").style.display = "none"
                document.getElementById("u_updateRe").style.display = "inline"
            }
        },
        // 获取所有插件信息
        GetJsAll(){
            axios.get("/v2/api/javascript/readall").then((res) => {
                this.JsAll = res.data.data
                if (this.JsAll !== null) {
                    for (let i = 0; i < this.JsAll.length; i++) {
                        this.JsAll[i].selected = i === 0;
                    }
                }
            }).catch((error) => {
                // 请求失败
                mdui.snackbar({
                    message: error,
                    position: 'right-top',
                });
            })
        },
        // 修改选择插件
        changeUpPlugin(e){
            let iidd = e.target.selectedIndex
            this.EnvUpdate.envPluginName = this.JsAll[iidd].FileName
        },
        // 新增选择插件
        changInPlugin(e){
            let iidd = e.target.selectedIndex
            this.AddEnvName.envPluginName = this.JsAll[iidd].FileName
        }
    },
    mounted() {
        this.GetJsAll()
        this.GetEnvAll()
    }
}
</script>

<style scoped>

</style>
