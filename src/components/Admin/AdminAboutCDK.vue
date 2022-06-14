<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">CDK管理</div>
                <div class="mdui-card-primary-subtitle">CD-KEY Manage</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">CD-KEY是用来管理限制变量提交的，可以通过CDK限制指定变量的提交对象、数量等环境因素控制（属于面板恶意提交的一种防范措施）</p>
            </div>
        </div>
<!--        CD-KEY管理-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">CD-KEY管理</div>
                <div class="mdui-card-primary-subtitle">CD-KEY Manage</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                操作：
                <button @click="OpenCDKAdd()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    批量新增
                </button>&ensp;&ensp;
                <button @click="OpenSCDK()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    全部启用
                </button>&ensp;&ensp;
                <button @click="OpenECDK()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    全部禁用
                </button>
            </div>
            <div class="mdui-card-content mdui-typo">
                筛选：
                <button @click="GetCDKData('all')" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    全部
                </button>&ensp;&ensp;
                <button @click="GetCDKData('true')" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    启用
                </button>&ensp;&ensp;
                <button @click="GetCDKData('false')" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    禁用
                </button>&ensp;&ensp;
                <button @click="OpenSearchCDK()" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-indigo-a400 mdui-text-color-white">
                    搜索
                </button>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table mdui-table-hoverable">
                    <thead>
                    <tr>
                        <th>CD-KEY</th>
                        <th>可用次数</th>
                        <th>当前状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in CD_KEY_Data" :key="d">
                            <th>{{d["CdKey"]}}</th>
                            <th>{{d["AvailableTimes"]}}</th>
                            <th v-if="d['State'] === true" style="color: green">启用</th>
                            <th v-else style="color: red">禁用</th>
                            <th>
                                <button @click='OpenUpCDK(d["ID"], d["CdKey"], d["AvailableTimes"], d["State"])' class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue mdui-text-color-white">
                                    修改
                                </button>
                                &ensp;&ensp;
                                <button @click="OpenDelCDK(d['ID'])" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-red mdui-text-color-white">
                                    删除
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mdui-card-content mdui-typo">
                <div>
                    一共{{this.CD_KEY_Page}}页，当前第{{this.Now_Page}}页 &ensp;&emsp;
                    <button @click="GetDivisionCDKData(Now_Page - 1)" id="previousPage" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-400 mdui-text-color-white">
                        上一页
                    </button>&ensp;&ensp;
                    <button @click="GetDivisionCDKData(Now_Page + 1)" id="nextPage" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-400 mdui-text-color-white">
                        下一页
                    </button>&ensp;&ensp;&ensp;&ensp;|&ensp;&ensp;&ensp;&ensp;
                    前往第
                    <input style="width: 50px; display: inline; text-align: center" class="mdui-textfield-input" type="number" v-model="this.Go_Page">
                    页&ensp;&ensp;
                    <button @click="GetDivisionCDKData(this.Go_Page)" id="goPage" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-deep-purple-400 mdui-text-color-white">
                        跳转
                    </button>
                </div>
            </div>
        </div>
<!--        CD-KEY搜索-->
        <div id="SearchCDK" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">搜索CD-KEY</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="GetCDKData('s', this.SearchData)">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">CD-KEY</label>
                        <input class="mdui-textfield-input" type="text" placeholder="必填" v-model="SearchData">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认搜索
                        </button>
                    </div>
                </form>
            </div>
        </div>
<!--        CD-KEY批量新增-->
        <div id="cdkAdd" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">批量新增CD-KEY</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="SendCDKAdd">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">生成CD-KEY数量</label>
                        <input class="mdui-textfield-input" type="number" v-model="cdkAdd.cdKeyCount">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">CD-KEY使用次数</label>
                        <input class="mdui-textfield-input" type="number" v-model="cdkAdd.cdKeyAvailableTimes">
                    </div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn">
                            <i class="mdui-icon mdui-icon-left material-icons">check</i>确认新增
                        </button>
                    </div>
                </form>
            </div>
        </div>
<!--        CD-KEY全部启用-->
        <div id="sCDK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-content">确认<span style="color: green">启用</span>全部CD-KEY?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="UpdateCDKState(1)" class="mdui-btn mdui-ripple">确认</button>
            </div>
        </div>
<!--        CD-KEY全部禁用-->
        <div id="eCDK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-content">确认<span style="color: red">禁用</span>全部CD-KEY?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="UpdateCDKState(2)" class="mdui-btn mdui-ripple">确认</button>
            </div>
        </div>
<!--        CD-KEY删除-->
        <div id="delCDK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-content">确认<span style="color: red">删除</span>此CD-KEY?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="SendDelCDK()" class="mdui-btn mdui-ripple">确认</button>
            </div>
        </div>
<!--        CD-KEY修改-->
        <div id="upCDK" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">修改CD-KEY</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <form v-on:submit.prevent="SendUpdateCDK">
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">CD-KEY</label>
                        <input disabled class="mdui-textfield-input" type="text" v-model="Now_CDK">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">使用次数</label>
                        <input class="mdui-textfield-input" type="number" v-model="Update_CDK.availableTimes">
                    </div>
                    <div class="mdui-textfield">
                        <label class="mdui-textfield-label">当前状态</label>
                        <label class="mdui-switch">
                            <span style="color: red">禁用</span>&ensp;
                            <input v-model="Update_CDK.state" type="checkbox"/>
                            <i class="mdui-switch-icon"></i>
                            &ensp;<span style="color: green">启用</span>
                        </label>
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
import axios from "axios";
import mdui from "mdui";
import fileDownload from "js-file-download";

export default {
    name: "AdminAboutCDK",
    data(){
        return {
            CD_KEY_Data: [],
            CD_KEY_Page: 1,
            Now_Page: 0,
            Go_Page: 1,
            SearchData: "",
            cdkAdd: {
                cdKeyCount: 0,
                cdKeyAvailableTimes: 0,
            },
            delCDK: 0,
            Now_CDK: "",
            Update_CDK: {
                id: 0,
                availableTimes: 0,
                state: false
            }
        }
    },
    methods: {
        // 获取CDK分页数据
        GetDivisionCDKData(page){
            if (page < 0 || page > this.CD_KEY_Page) {
                mdui.snackbar({
                    message: "请输入正确的跳转页码",
                    position: 'right-top',
                });
            } else {
                if (page === 1) {
                    axios.get("/v2/api/cd-key/division/data").then((res) => {
                        // 请求成功
                        switch (res.data !== "") {
                            case res.data.code === 2000:
                                this.Now_Page = 1
                                this.CD_KEY_Page = res.data.data["page"]
                                this.CD_KEY_Data = res.data.data["CDKData"]
                                this.ChangePageBtn()
                                break
                        }
                    }).catch((error) => {
                        // 请求失败
                        mdui.snackbar({
                            message: error,
                            position: 'right-top',
                        });
                    })
                } else {
                    axios.get("/v2/api/cd-key/division/data?page=" + page.toString()).then((res) => {
                        // 请求成功
                        switch (res.data !== "") {
                            case res.data.code === 2000:
                                this.Now_Page = page
                                this.CD_KEY_Page = res.data.data["page"]
                                this.CD_KEY_Data = res.data.data["CDKData"]
                                this.ChangePageBtn()
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
            }
        },
        // 修改上下页按钮状态
        async ChangePageBtn(){
            /*
            * 判断逻辑
            * 1、如果CD_KEY_Page的值小于等于1。则上下页按钮禁用
            * 2、CD_KEY_Page的值大于1，Now_Page的值等于1。则上一页按钮禁用
            * 3、CD_KEY_Page的值等于Now_Page的值。则下一页按钮禁用
            */
            let p = document.getElementById("previousPage");
            let n = document.getElementById("nextPage");
            let go = document.getElementById("goPage");
            if (this.CD_KEY_Page <= 1){
                p.disabled = true
                n.disabled = true
                go.disabled = true
            } else if (this.CD_KEY_Page > 1 && this.Now_Page === 1) {
                p.disabled = true
                n.disabled = false
            } else if (this.CD_KEY_Page === this.Now_Page) {
                p.disabled = false
                n.disabled = true
            } else {
                p.disabled = false
                n.disabled = false
                go.disabled = false
            }
        },
        // 获取全部信息/启用/禁用
        GetCDKData(method, s){
            let url = ""
            if (method === "all") {
                url = "/v2/api/cd-key/data?method=all"
            } else if (method === "true") {
                url = "/v2/api/cd-key/data?method=true"
            } else if (method === "false"){
                url = "/v2/api/cd-key/data?method=false"
            } else {
                url = "/v2/api/cd-key/data?method=s&s=" + s
            }
            axios.get(url).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        this.Now_Page = 1
                        this.CD_KEY_Page = 1
                        this.CD_KEY_Data = res.data.data
                        this.ChangePageBtn()
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
        // 打开CDK搜索
        OpenSearchCDK(){
            let inst = new mdui.Dialog('#SearchCDK');
            inst.toggle()
        },
        // 打开CDK启用
        OpenSCDK(){
            let inst = new mdui.Dialog('#sCDK');
            inst.toggle()
        },
        // 打开CDK禁用
        OpenECDK(){
            let inst = new mdui.Dialog('#eCDK');
            inst.toggle()
        },
        // 全部启用/禁用
        UpdateCDKState(number){
            let url = "v2/api/cd-key/all/state"
            let state = {}
            if (number === 1) {
                // 启用
                state = {"state": 1}
            } else {
                // 禁用
                state = {"state": 2}
            }
            axios.put(url, state).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: "更新成功",
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
        // 打开批量新增
        OpenCDKAdd(){
            let inst = new mdui.Dialog('#cdkAdd');
            inst.toggle()
        },
        // 发送新增请求
        SendCDKAdd(){
            axios.post('/v2/api/cd-key/add', this.cdkAdd).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: "添加成功，即将下载新增CDK文本",
                            position: 'right-top',
                        });

                        // 下载生成CDK文本
                        axios.get("/v2/api/cd-key/data/download").then((res) => {
                            fileDownload(res.data, 'CDK.txt')
                        }).catch((err) => {
                            mdui.snackbar({
                                message: err,
                                position: 'right-top',
                            });
                        })
                        setTimeout(() => {
                            location.reload()
                        }, 1500)
                        break
                    case res.data.code === 5003:
                        mdui.snackbar({
                            message: res.data.msg,
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5031:
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
        },
        // 打开CDK删除
        OpenDelCDK(id){
            this.delCDK = id
            let inst = new mdui.Dialog('#delCDK');
            inst.toggle()
        },
        // 发送CDK删除
        SendDelCDK(){
            let del = {id: this.delCDK}
            axios.delete('/v2/api/cd-key/delete', {data: del}).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: 'CD-KEY删除成功',
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
        // 打开CDK修改
        OpenUpCDK(i, c, n, s){
            this.Now_CDK = c
            this.Update_CDK.id = i
            this.Update_CDK.availableTimes = n
            this.Update_CDK.state = s
            let inst = new mdui.Dialog('#upCDK');
            inst.toggle()
        },
        // 发送修改数据
        SendUpdateCDK(){
            axios.put('/v2/api/cd-key/update', this.Update_CDK).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: 'CD-KEY修改成功',
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
        }
    },
    mounted() {
        // 获取CDK分页数据
        this.GetDivisionCDKData(1)
    }
}
</script>

<style scoped>

</style>
