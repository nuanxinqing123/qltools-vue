<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">容器管理</div>
                <div class="mdui-card-primary-subtitle">Container Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">容器管理是方便管理员对于不同容器之间变量的管理操作</p>
            </div>
        </div>
<!--        迁移/复制-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">迁移/复制</div>
                <div class="mdui-card-primary-subtitle">Transfer Copy</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tip: 迁移/复制功能需要至少添加两个面板地址才能正常使用</p>
                <p class="text_s">迁移: 将A面板的所有变量迁移到B面板, 迁移完成后会清空A面板变量 <span style="color: red">【迁移功能可能受到青龙的限流限制,强烈推荐使用备份功能先备份数据。然后再使用迁移功能（避免数据丢失）】</span></p>
                <p class="text_s">复制: 将A面板的所有变量复制到B面板, 复制完成后A面板变量不会变化</p>
            </div>
            <div class="mdui-divider"></div>
            <div style="text-align: center; margin-top: 15px">
                <span style="margin-left: 20px; margin-right: 20px">
                    A面板：
                    <select class="mdui-select"  @change="UpdateServerID('A', $event)" id="server1">
                        <option>请选择面板</option>
                        <option v-for="d in AllPanelData" :key="d" :value="d['PanelName']">{{d['PanelName']}}</option>
                    </select>
                </span>
                <span style="margin-left: 20px; margin-right: 20px">
                    B面板：
                    <select class="mdui-select"  @change="UpdateServerID('B', $event)" id="server2">
                        <option>请选择面板</option>
                        <option v-for="d in AllPanelData" :key="d" :value="d['PanelName']">{{d['PanelName']}}</option>
                    </select>
                </span>

                <span style="margin-left: 20px; margin-right: 20px">
                    操作：
                    <select class="mdui-select" @click="UpdateData($event)" id="function">
                        <option>复制</option>
                        <option>迁移</option>
                    </select>
                </span>
            </div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button @click="SendData" class="mdui-ripple mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    执行任务
                </button>
            </div>
        </div>
<!--        备份/恢复-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">备份/恢复</div>
                <div class="mdui-card-primary-subtitle">Backup Restore</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tip: 备份/恢复功能将会以JSON文件实现</p>
                <p class="text_s">备份: 备份完成后会自动下载备份文件，下载完成十秒后。服务器自动删除服务端备份数据</p>
                <p class="text_s">恢复: 恢复文件的文件名必须为 【<span style="color: red">backup.json</span>】</p>
            </div>
            <div class="mdui-divider"></div>
            <div style="text-align: center; margin-top: 15px; margin-bottom: 15px">
               <span style="margin-left: 20px; margin-right: 20px">
                    操作面板：
                   <select class="mdui-select" @change="UpdateBRServerID($event)" id="server3">
                       <option>请选择面板</option>
                        <option v-for="d in AllPanelData" :key="d" :value="d['PanelName']">{{d['PanelName']}}</option>
                   </select>
                </span>
            </div>
            <div class="mdui-divider"></div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button mdui-dialog="{target: '#Restore'}" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    恢复
                </button>
            </div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button @click="SendBackup" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    备份
                </button>
            </div>
        </div>
<!--        错误日志-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">错误日志</div>
                <div class="mdui-card-primary-subtitle">Error Log</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tip: 错误日志会显示以上功能执行时发生的错误记录（只显示最新的十条记录）</p>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                    <tr>
                        <th>发生时间</th>
                        <th>任务名称</th>
                        <th>错误记录</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="d in ErrorInfo" :key="d">
                        <th>{{d.OccurrenceTime}}</th>
                        <th>{{d.Journal}}</th>
                        <th>{{d.Operation}}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
<!--        恢复面板-->
        <div id="Restore" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">备份恢复</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <input type= "file" @change="UpdateFile" id="backupFile" accept="application/json"/>
                <div class="mdui-dialog-actions">
                    <button @click="SendRestore" class="mdui-ripple mdui-btn mdui-color-green-700 mdui-text-color-white btn" mdui-dialog-close>
                        执行操作
                    </button>
                </div>
            </div>
        </div>
<!--        成功提示-->
        <div id="SendOK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-title">任务提示</div>
            <div class="mdui-dialog-content">操作已进入任务队列, 请稍后前往青龙面板查看结果</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple mdui-ripple" mdui-dialog-close>确认</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import mdui from "mdui";
import fileDownload from 'js-file-download'

export default {
    name: "AdminTransferCom",
    data() {
        return {
            AllPanelData: [{
                ID: 0,
                PanelName: "",
                url: "",
                id: "",
                secret: "",
                envBinding: ""
            }],
            ServerID: {
                IDOne: 0,
                IDTwo: 0
            },
            SendFunction: 0,
            BRServerID: {
                IDOne: 0,
            },
            File: [],
            ErrorInfo: [{
                OccurrenceTime: "暂无数据",
                Journal: "暂无数据",
                Operation: "暂无数据"
            }]
        }
    },
    methods: {
        // 获取可用面板信息
        GetAllPanelData(){
            axios.get("/v2/api/env/panel/all").then((res) => {
                // 请求成功
                this.AllPanelData = res.data.data
            }).catch((error) => {
                // 请求失败
                mdui.snackbar({
                    message: error,
                    position: 'right-top',
                });
            })
        },
        // 修改ServerID
        UpdateServerID(id, e){
            let iidd = e.target.selectedIndex
            if (iidd !== 0) {
                if (id === "A") {
                    // 修改A服务器数据
                    this.ServerID.IDOne = this.AllPanelData[iidd - 1].ID
                } else {
                    // 修改B服务器数据
                    this.ServerID.IDTwo = this.AllPanelData[iidd - 1].ID
                }
            }
        },
        // 修改迁移/复制操作
        UpdateData(e){
            this.SendFunction = e.target.selectedIndex
        },
        // 发送迁移/复制操作
        SendData(){
            // 判断AB服务器是否一致
            if (this.ServerID.IDOne === this.ServerID.IDTwo) {
                // 一致,拒绝发送
                mdui.snackbar({
                    message: "必须保证A与B服务器不一致",
                    position: 'right-top',
                });
            } else {
                // 不一致,发送
                if (this.SendFunction === 0){
                    // 复制
                    let inst = new mdui.Dialog('#SendOK');
                    axios.post("/v2/api/container/copy", this.ServerID).then((res) => {
                        switch (res.data !== "") {
                            case res.data.code === 2000:
                                inst.toggle()
                                break
                            case res.data.code === 5022:
                                mdui.snackbar({
                                    message: res.data.msg,
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
                    }).catch((err) => {
                        mdui.snackbar({
                            message: err,
                            position: 'right-top',
                        });
                    })
                } else {
                    // 迁移
                    let inst = new mdui.Dialog('#SendOK');
                    axios.post("/v2/api/container/transfer", this.ServerID).then((res) => {
                        switch (res.data !== "") {
                            case res.data.code === 2000:
                                inst.toggle()
                                break
                            case res.data.code === 5022:
                                mdui.snackbar({
                                    message: res.data.msg,
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
                    }).catch((err) => {
                        mdui.snackbar({
                            message: err,
                            position: 'right-top',
                        });
                    })
                }
            }
        },
        // 修改BRServerID
        UpdateBRServerID(e){
            let iidd = e.target.selectedIndex
            if (iidd !== 0) {
                this.BRServerID.IDOne = this.AllPanelData[iidd - 1].ID
            }
        },
        // 发送备份操作
        SendBackup(){
            axios.post("/v2/api/container/backup", this.BRServerID).then((res) => {
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        // 获取下载地址
                        axios.post("/v2/api/container/backup/data").then((res) => {
                            fileDownload(JSON.stringify(res.data), 'backup.json')
                        }).catch((err) => {
                            mdui.snackbar({
                                message: err,
                                position: 'right-top',
                            });
                        })
                        break
                    case res.data.code === 5022:
                        mdui.snackbar({
                            message: res.data.msg,
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
            }).catch((err) => {
                mdui.snackbar({
                    message: err,
                    position: 'right-top',
                });
            })
        },
        // 获取File文件对象
        UpdateFile(e){
            this.File = e.target.files[0]
        },
        // 发送恢复操作
        SendRestore(){
            let inst = new mdui.Dialog('#SendOK');
            let param = new FormData();
            param.append("file", this.File);
            // 发送
            axios.post("/v2/api/container/restore?sID=" + this.BRServerID.IDOne.toString(), param).then((res => {
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        inst.toggle()
                        break
                    case res.data.code === 5023:
                        mdui.snackbar({
                            message: res.data.msg,
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5022:
                        mdui.snackbar({
                            message: res.data.msg,
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
            })).catch((err) => {
                mdui.snackbar({
                    message: err,
                    position: 'right-top',
                });
            })
        },
        // 获取十条错误执行记录
        GetErrorInfo(){
            axios.get("/v2/api/container/info").then((res) => {
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        if (res.data.data !== "" && res.data.data !== null){
                            this.ErrorInfo = res.data.data
                        }
                }
            }).catch((err) => {
                mdui.snackbar({
                    message: err,
                    position: 'right-top',
                });
            })
        }
    },
    mounted() {
        this.GetAllPanelData()
        this.GetErrorInfo()
    }
}
</script>

<style scoped>

</style>
