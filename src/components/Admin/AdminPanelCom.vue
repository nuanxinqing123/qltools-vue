<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">面板管理</div>
                <div class="mdui-card-primary-subtitle">Panel Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">面板管理可以添加自己的服务容器（青龙面板），用于分散提交的变量到不同的容器来缓解过于集中的压力。利于管理</p>
                <p class="text_s">Tips：青龙Tools需要<span style="font-size: 16px; color: #E53333">环境变量</span>模块的权限，请开通此模块权限</p>
                <p class="text_s">Tips：青龙Tools基于<span style="font-size: 16px; color: #E53333">青龙V2.12.X</span>版本开发，使用前推荐更新到开发相同或相邻的版本</p>
                <p class="text_s">Tips：已知兼容版本：<span style="font-size: 16px; color: #E53333">v2.11.x - v2.12.x</span></p>
            </div>
        </div>
        <!--        面板管理-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">设置面板</div>
                <div class="mdui-card-primary-subtitle">Set Panel</div>
            </div>
            <div class="mdui-card-menu">
                <button @click="OpenPanelAdd()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-grey mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">loupe</i>新增
                </button>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                        <tr>
                            <th>启用面板</th>
                            <th>面板名称</th>
                            <th>面板地址</th>
                            <th>面板ID</th>
                            <th>面板Secret</th>
                            <th>绑定变量</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, index) in AllPanelData" :key="d">
                            <th v-if="d.enablePanel === true" style="color: green">启用</th>
                            <th v-else style="color: #5353f5">停用</th>
                            <th>{{d.name}}</th>
                            <th>{{d.url}}</th>
                            <th>{{d.id}}</th>
                            <th>{{d.secret}}</th>
                            <th>
                                <button @click="OpenPanelEnv(d.ID, index)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-teal mdui-text-color-white">
                                    绑定变量
                                </button>
                            </th>
                            <th>
                                <button @click="CheckPanelSuccess(d.url, d.id, d.secret)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                                    测试连接
                                </button>
                                &ensp;&ensp;
                                <button @click="OpenPanelUpdate(d.ID, d.name, d.url, d.id, d.secret, d.enablePanel)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue mdui-text-color-white">
                                    修改
                                </button>
                                &ensp;&ensp;
                                <button @click="OpenPanelDel(d.ID)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-red mdui-text-color-white">
                                    删除
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--        面板新增-->
        <div id="panelAdd" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">新增面板</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="AddPanel">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">面板名称</label>
                        <input class="mdui-textfield-input" type="text" id="panelName" placeholder="选填" v-model="AddPanelData.name">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">面板地址</label>
                        <input class="mdui-textfield-input" type="url" id="panelUrl" placeholder="必填" v-model="AddPanelData.url">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">ClientID</label>
                        <input class="mdui-textfield-input" type="text" id="panelID" placeholder="必填" v-model="AddPanelData.id">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">ClientSecret</label>
                        <input class="mdui-textfield-input" type="text" id="panelSecret" placeholder="必填" v-model="AddPanelData.secret">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!--        面板删除-->
        <div id="panelDel" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-content">确认删除面板?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="DelPanel()" class="mdui-btn mdui-ripple">删除</button>
            </div>
        </div>
        <!--        面板修改-->
        <div id="panelUpdate" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">修改面板信息</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="UpdatePanel">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">面板状态</label>
                        <label class="mdui-switch">
                            停用面板&ensp;
                            <input v-model="UpdatePanelData.enablePanel" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                            &ensp;启用面板
                        </label>
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">面板名称</label>
                        <input class="mdui-textfield-input" type="text" placeholder="选填" v-model="UpdatePanelData.name">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">面板地址</label>
                        <input class="mdui-textfield-input" type="url" placeholder="必填" v-model="UpdatePanelData.url">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">ClientID</label>
                        <input class="mdui-textfield-input" type="text" placeholder="必填" v-model="UpdatePanelData.id">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">ClientSecret</label>
                        <input class="mdui-textfield-input" type="text" placeholder="必填" v-model="UpdatePanelData.secret">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认修改
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <!--        面板绑定变量-->
        <div id="panelEnv" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">绑定变量</div>
            <div class="mdui-dialog-content mdui-typo">
                <form v-on:submit.prevent="SendPanelBinding">
                    <span v-for="(d) in EnvAll" :key="d">
                         <label class="mdui-checkbox">
                             <input v-if="EnvPanelData.includes(d.ID.toString()) === true" @click="UpdatePanelBinding(d.ID)" type="checkbox" checked/>
                             <input v-else @click="UpdatePanelBinding(d.ID)" type="checkbox"/>
                            <i class="mdui-checkbox-icon"></i>
                            {{d.Name}}
                        </label>&ensp;&ensp;
                    </span>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认绑定
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
    name: "AdminPanelCom",
    data() {
        return {
            AllPanelData: [{
                ID: 0,
                name: "",
                enablePanel  : false,
                url: "",
                id: "",
                secret: "",

            }],
            AddPanelData: {
                name: "",
                enablePanel: true,
                url: "",
                id: "",
                secret: "",
            },
            DelPanelData: {
                uid: 0
            },
            UpdatePanelData: {
                uid: 0,
                name: "",
                enablePanel: false,
                url: "",
                id: "",
                secret: "",
            },
            EnvPanelData: [],
            EnvPanelDataID: 0,
            EnvAll: [{
                ID: 0,
                Name: "",
            }],
        }
    },
    methods: {
        // 获取所有变量信息
        GetAllPanelData(){
            axios.get("/v2/api/env/panel/all").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.AllPanelData = res.data.data
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
        // 打开添加标签
        OpenPanelAdd(){
            let inst = new mdui.Dialog('#panelAdd');
            inst.toggle()
        },
        // 打开删除标签
        OpenPanelDel(panelID){
            this.DelPanelData.uid = panelID
            let inst = new mdui.Dialog('#panelDel');
            inst.toggle()
        },
        // 打开更新标签
        OpenPanelUpdate(panelID, name, url, id, secret, enable){
            this.UpdatePanelData.uid = panelID
            this.UpdatePanelData.name = name
            this.UpdatePanelData.url = url
            this.UpdatePanelData.id = id
            this.UpdatePanelData.secret = secret
            this.UpdatePanelData.enablePanel = enable

            let inst = new mdui.Dialog('#panelUpdate');
            inst.toggle()
        },
        // 打开面板变量绑定
        OpenPanelEnv(panelID, index){
            this.EnvPanelDataID = panelID
            this.GetEnvAll()
            this.EnvPanelData = this.AllPanelData[index].envBinding.split("@")
            let inst = new mdui.Dialog('#panelEnv');
            inst.toggle()
        },
        // 添加面板@
        AddPanel(){
            axios.post("/v2/api/env/panel/add", this.AddPanelData).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 添加成功
                        mdui.snackbar({
                            message: '面板信息添加成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                        break
                    case res.data.code === 5016:
                        // 变量名创建失败
                        mdui.snackbar({
                            message: '面板信息添加失败',
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
        // 删除面板
        DelPanel(){
            axios.delete("/v2/api/env/panel/del", {data: this.DelPanelData}).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '面板删除成功',
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
        // 更新面板
        UpdatePanel(){
            axios.put("/v2/api/env/panel/update", this.UpdatePanelData).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '面板修改成功',
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
        // 检查面板连通性
        CheckPanelSuccess(url, id, secret){
            axios.post("/v2/api/panel/connect", {url: url, id: id, secret: secret}).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 连通测试成功
                        mdui.snackbar({
                            message: '连接测试成功',
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5014:
                        // client_id或client_secret有误
                        mdui.snackbar({
                            message: res.data.msg,
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5003:
                        // 服务错误
                        mdui.snackbar({
                            message: '服务繁忙, 可能是URL地址错误',
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
        // 修改面板绑定变量
        UpdatePanelBinding(id){
            let num = 0
            // 是否存在选中值
            for (let i = 0; i < this.EnvPanelData.length; i++) {
                if (id === parseInt(this.EnvPanelData[i])) {
                    // 存在, 删除
                    delete this.EnvPanelData[i]
                    num += 1
                }
            }
            if (num === 0) {
                // 不存在, 加入
                this.EnvPanelData.push(id)
            }
        },
        // 发送修改
        SendPanelBinding(){
            // 数据转换int
            let s_list = []

            for (let i = 0; i < this.EnvPanelData.length; i++) {
                if (!isNaN(this.EnvPanelData[i])) {
                    // 数据转换String
                    s_list.push(this.EnvPanelData[i].toString())
                }
            }

            // 发送修改
            axios.put("/v2/api/env/panel/binding/update", {"uid": this.EnvPanelDataID, "envBinding": s_list}).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '绑定修改成功',
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1500)
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
    },
    mounted() {
        this.GetAllPanelData()
    }
}
</script>

<style scoped>

</style>
