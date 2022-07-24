<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
<!--        介绍-->
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">插件管理</div>
                <div class="mdui-card-primary-subtitle">Plugin Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">插件是通过JavaScript的形式向变量模块附加鉴定的一个用户自主化控制的扩展部分</p>
                <p class="text_s">插件管理允许管理员自行上传&删除插件</p>
                <p class="text_s">官方插件集合库：<a href="https://plugin.6b7.org/">https://plugin.6b7.org/</a></p>
                <p class="text_s">插件开发文档：<a href="https://github.com/nuanxinqing123/QLTools/blob/master/Plugin.md">https://github.com/nuanxinqing123/QLTools/blob/master/Plugin.md</a></p>
                <p class="text_s">官方插件集合库收集插件并非完全，管理员可自行寻找其他第三方集合库</p>
            </div>
        </div>
<!--        插件列表-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">插件列表</div>
                <div class="mdui-card-primary-subtitle">Plugin List</div>
            </div>
            <div class="mdui-card-menu">
                <button mdui-dialog="{target: '#pluginUpload'}" class="mdui-ripple mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-blue-grey mdui-text-color-white">
                    <i class="mdui-icon mdui-icon-left material-icons">file_upload</i>上传插件
                </button>
            </div>
            <div class="mdui-table-fluid">
                <table class="mdui-table">
                    <thead>
                    <tr>
                        <th>文件名称</th>
                        <th>插件名称</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="d in JsAll" :key="d">
                            <th>{{d.FileName}}</th>
                            <th>{{d.FileIDName}}</th>
                            <th>
                                <button @click="OpenPluginDel(d.FileName)" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-red mdui-text-color-white">
                                    删除插件
                                </button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--        插件开发模板-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">插件开发模板</div>
                <div class="mdui-card-primary-subtitle">Plug Development Template</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <highlightjs language='javascript' code='// [name:Cookie检测（demo 插件开发演示）]

// 第一行为插件名称， 在后台显示的使用会用到

// 返回数据格式
// return {
//      // 代表是否允许通过
//     "bool": true,
//      // 处理后的变量
//     "env": env
// }

// 必须以main为函数名, env为传入变量
function main(env) {
    let result = request({
        "method": "get",
        "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
        "headers": {
            "Cookie": env,
            "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            "Referer": "https://h5.m.jd.com/"
        },
        "dataType": "json",
        "timeout": 5 * 1000
    })

    if (result) {
        // 判断是否过期
        if (result["islogin"] === "1"){
            // Cookie有效
            return {
                "bool": true,
                "env": env
            }
        } else {
            // Cookie无效
            return {
                "bool": false,
                "env": "Cookie已失效"
            }
        }
    } else {
        return {
            "bool": false,
            "env": "请求失败"
        }
    }
}' />
            </div>
        </div>
        <!--        插件删除-->
        <div id="pluginDel" class="mdui-dialog">
            <div class="mdui-dialog-content">确认删除插件?</div>
            <div class="mdui-dialog-actions">
                <button class="mdui-ripple mdui-btn mdui-ripple" mdui-dialog-close>返回</button>
                <button @click="DelPlugin()" class="mdui-ripple mdui-btn mdui-ripple">删除</button>
            </div>
        </div>
        <!--        上传插件-->
        <div id="pluginUpload" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">上传插件</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <input type= "file" @change="UpdateFile" id="pluginFile" accept="application/javascript"/>
                <div class="mdui-dialog-actions">
                    <button @click="SendFile" class="mdui-ripple mdui-btn mdui-color-green-700 mdui-text-color-white btn" mdui-dialog-close>
                        执行操作
                    </button>
                </div>
            </div>
        </div>
        <!--        成功提示-->
        <div id="SendOK" class="mdui-dialog" style="display: none;">
            <div class="mdui-dialog-title">上传提示</div>
            <div class="mdui-dialog-content">插件上传成功</div>
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
    name: "AdminPluginCom",
    data(){
        return {
            JsAll: [{
                FileName: "",
                FileIDName: ""
            }],
            DelPluginName: {
                FileName: ""
            },
            File: [],
        }
    },
    methods: {
        // 获取所有插件信息
        GetJsAll(){
            axios.get("/v2/api/javascript/readall").then((res) => {
                this.JsAll = res.data.data
            }).catch((error) => {
                // 请求失败
                mdui.snackbar({
                    message: error,
                    position: 'right-top',
                });
            })
        },
        // 打开插件删除
        OpenPluginDel(name){
            this.DelPluginName.FileName = name
            let inst = new mdui.Dialog('#pluginDel');
            inst.toggle()
        },
        // 删除插件
        DelPlugin(){
            axios.post("/v2/api/javascript/delete", this.DelPluginName).then((res) => {
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: "删除成功",
                            position: 'right-top',
                        });
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                        break
                    case res.data.code === 5003:
                        mdui.snackbar({
                            message: "服务繁忙",
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5027:
                        mdui.snackbar({
                            message: "删除失败",
                            position: 'right-top',
                        });
                        break
                    case res.data.code === 5002:
                        // 传递参数错误
                        if (res.data.data === "") {
                            mdui.snackbar({
                                message: "服务繁忙,请稍后重试",
                                position: 'right-top',
                            });
                            break
                        } else {
                            mdui.snackbar({
                                message: JSON.parse(res.data.msg),
                                position: 'right-top',
                            });
                            break
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
        // 获取File文件对象
        UpdateFile(e){
            this.File = e.target.files[0]
        },
        // 发送文件
        SendFile(){
            let inst = new mdui.Dialog('#SendOK');
            let param = new FormData();
            param.append("file", this.File);
            // 发送
            axios.post("/v2/api/javascript/upload", param).then((res => {
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        inst.toggle()
                        setTimeout(() => {
                            location.reload()
                        }, 1000)
                        break
                    case res.data.code === 5003:
                        mdui.snackbar({
                            message: res.data.msg,
                            position: 'right-top',
                        });
                        break
                }
            })).catch((err) => {
                mdui.snackbar({
                    message: err,
                    position: 'right-top',
                });
            })
        },
    },
    mounted() {
        this.GetJsAll()
    }
}
</script>

<style scoped>

</style>
