<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">变量管理</div>
                <div class="mdui-card-primary-subtitle">Env Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">变量管理并非管理容器内的变量，而是管理前端上传的允许变量名。可以搭配正则表达式过滤恶意提交，正则表达式为空则代表允许所有内容</p>
                <p class="text_s">某东的正则表达式（举例）：pt_key=.*?pt_pin=.*?;</p>
                <p class="text_s">某手极速版的正则（举例）：kuaishou.api_st=.*?;</p>
            </div>
        </div>
<!--        变量管理-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">设置变量</div>
                <div class="mdui-card-primary-subtitle">Set Env</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">新建模式：为每个上传的变量创建一个新的表来储存</p>
                <p class="text_s">合并模式：将所有上传的变量放在同一个表中来储存, 可以通过自定义符号来分割变量【此模式用户提交备注将自动无效】</p>
            </div>
            <div class="mdui-card-menu">
                <button @click="OpenDialog()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-grey mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">loupe</i>新增
                </button>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                        <tr>
                            <th>变量名</th>
                            <th>变量限额</th>
                            <th>匹配正则</th>
                            <th>上传模式</th>
                            <th>分割符</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in EnvAll" :key="d">
                            <th>{{d.Name}}</th>
                            <th>{{d.Quantity}}</th>
                            <th>{{d.Regex}}</th>
                            <th v-if="d.Mode === 1">新建模式</th>
                            <th v-else >合并模式</th>
                            <th>{{d.Division}}</th>
                            <th>
                                <button @click="OpenEnvUpdate(d.ID, d.Name, d.Quantity, d.Regex, d.Mode, d.Division)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue mdui-text-color-white">
                                    修改
                                </button>
                                &ensp;&ensp;
                                <button @click="OpenEnvDel(d.ID)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-red mdui-text-color-white">
                                    删除
                                </button>
                            </th>
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
                        <label class="mdui-textfield-label">变量限额</label>
                        <input class="mdui-textfield-input" type="number" id="envQuantity" placeholder="必填" v-model="AddEnvName.envQuantity">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">匹配正则</label>
                        <input class="mdui-textfield-input" type="text" id="envRegex" placeholder="选填" v-model="AddEnvName.envRegex">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">上传模式</label>
                        <select class="mdui-select" id="envMode" @change="SwitchEnvAddMode($event)">
                            <option>新建模式</option>
                            <option>合并模式</option>
                        </select>
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">分隔符</label>
                        <input disabled="disabled" class="mdui-textfield-input" type="text" id="envDivision" placeholder="合并模式：必填" v-model="AddEnvName.envDivision">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
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
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
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
                        <label class="mdui-textfield-label">变量限额</label>
                        <input class="mdui-textfield-input" type="number" placeholder="必填" v-model="EnvUpdate.envQuantity">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">匹配正则</label>
                        <input class="mdui-textfield-input" type="text" placeholder="选填" v-model="EnvUpdate.envRegex">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">上传模式</label>
                        <span v-if="this.EnvUpdate.envMode === 1">
                            <select class="mdui-select" id="envMode" @change="SwitchEnvUpdateMode($event)">
                                <option selected = "selected">新建模式</option>
                                <option>合并模式</option>
                            </select>
                        </span>
                        <span v-else>
                            <select class="mdui-select" id="envMode" @change="SwitchEnvUpdateMode($event)">
                                <option>新建模式</option>
                                <option selected = "selected">合并模式</option>
                            </select>
                        </span>
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">分隔符</label>
                        <span v-if="this.EnvUpdate.envMode === 1">
                            <input disabled="disabled" class="mdui-textfield-input" type="text" id="envDivisionUp" placeholder="合并模式：必填" v-model="EnvUpdate.envDivision">
                        </span>
                        <span v-else>
                            <input class="mdui-textfield-input" type="text" id="envDivisionUp" placeholder="合并模式：必填" v-model="EnvUpdate.envDivision">
                        </span>

                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认修改
                        </button>
                    </div>
                </form>
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
                envQuantity: 0,
                envRegex: "",
                envMode: 1,
                envDivision: ""
            },
            EnvAll: [{
                ID: 0,
                Name: "",
                Quantity: 0,
                Regex: "",
                Mode: 1,
                Division: ""
            }],
            EnvDel: {
                envID: 0
            },
            EnvUpdate: {
                envID: 0,
                envName: "",
                envQuantity: 0,
                envRegex: "",
                envMode: 1,
                envDivision: ""
            }
        }
    },
    methods: {
        // 打开新增
        OpenDialog(){
            let inst = new mdui.Dialog('#envAdd');
            inst.toggle()
        },
        // 打开删除
        OpenEnvDel(envID){
            this.EnvDel.envID = envID
            let inst = new mdui.Dialog('#envDel');
            inst.toggle()
        },
        // 打开修改
        OpenEnvUpdate(id, name, quantity, regex, mode, division){
            this.EnvUpdate.envID = id
            this.EnvUpdate.envName = name
            this.EnvUpdate.envQuantity = quantity
            this.EnvUpdate.envRegex = regex
            this.EnvUpdate.envMode = mode
            this.EnvUpdate.envDivision = division
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
                mdui.$("#envDivision").attr("disabled", "disabled")
                this.AddEnvName.envDivision = ""
                this.AddEnvName.envMode = 1
            } else {
                // 合并模式
                mdui.$("#envDivision").removeAttr("disabled")
                this.AddEnvName.envMode = 2
            }
        },
        // 切换修改上传模式
        SwitchEnvUpdateMode(e){
            let iidd = e.target.selectedIndex
            if (iidd === 0){
                // 新建模式
                mdui.$("#envDivisionUp").attr("disabled", "disabled")
                this.EnvUpdate.envDivision = ""
                this.EnvUpdate.envMode = 1
            } else {
                // 合并模式
                mdui.$("#envDivisionUp").removeAttr("disabled")
                this.EnvUpdate.envMode = 2
            }
        }
    },
    mounted() {
        this.GetEnvAll()
    }
}
</script>

<style scoped>

</style>
