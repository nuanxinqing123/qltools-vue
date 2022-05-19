<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">网站设置</div>
                <div class="mdui-card-primary-subtitle">Web Settings</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">网站设置是通过修改一些配置信息来提升网站的独立性和对用户的感知（控制）</p>
            </div>
        </div>
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">Settings</div>
            </div>
            <div>
                <!--       网站背景图-->
                <div class="mdui-card-primary" style="padding-top: 0; padding-bottom: 0">
                    <div class="mdui-card-content mdui-text-color-indigo" style="padding-bottom: 0">网站背景图</div>
                </div>
                <div id="background-image">
                    <div class="mdui-textfield">
                        <input class="mdui-textfield-input" type="text" placeholder="图片URL地址" v-model="backgroundImage"/>
                        <div class="mdui-textfield-helper">此设置会更改前后台的背景图, 支持图床和直接返回图片的API接口</div>
                    </div>
                </div>
                <!--       IP提交限制-->
                <div class="mdui-card-primary" style="padding-top: 0; padding-bottom: 0">
                    <div class="mdui-card-content mdui-text-color-indigo">提交限制</div>
                </div>
                <div id="submission-restrictions">
                    每个IP限制每天提交&ensp;
                    <input type="number" v-model="ipCount"/>
                    &ensp;次 （填写[0]则没有上传次数限制）
                </div>
                <!--       在线更新代理-->
                <div class="mdui-card-primary" style="padding-top: 0; padding-bottom: 0">
                    <div class="mdui-card-content mdui-text-color-indigo">在线更新代理</div>
                </div>
                <div style="margin-right: 32px;margin-left: 32px;">
                    <div class="mdui-textfield">
                        <input class="mdui-textfield-input" type="text" placeholder="Github代理地址" v-model="ghProxy"/>
                        <div class="mdui-textfield-helper">此设置推荐在中国大陆地区的服务器部署时填写</div>
                    </div>
                </div>
                <!--       变量黑名单-->
                <div class="mdui-card-primary" style="padding-top: 0; padding-bottom: 0">
                    <div class="mdui-card-content mdui-text-color-indigo" style="padding-bottom: 0">变量黑名单【请使用<span style="color: red;"> @ </span>符号分隔】</div>
                </div>
                <div id="textfield">
                    <div class="mdui-textfield">
                        <textarea class="mdui-textfield-input" rows="5" v-model="blacklist"></textarea>
                        <div class="mdui-textfield-helper">变量请使用<span style="color: red;"> @ </span>符号分隔，用户上传时候会用正则去匹配是否处于黑名单</div>
                    </div>
                </div>
                <!--            公告-->
                <div class="mdui-card-primary" style="padding-top: 0; padding-bottom: 0">
                    <div class="mdui-card-content mdui-text-color-indigo">设置公告</div>
                </div>
                <div id="notice">
                    <div style="border: 1px solid #ccc">
                        <Toolbar
                            style="border-bottom: 1px solid #ccc"
                            :editor="editorRef"
                            :defaultConfig="toolbarConfig"
                            :mode="mode"
                        />
                        <Editor
                            style="height: 310px; overflow-y: hidden;"
                            v-model="valueHtml"
                            :defaultConfig="editorConfig"
                            :mode="mode"
                            @onCreated="handleCreated"
                        />
                    </div>
                </div>
                <!--                提交按钮-->
                <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                    <button @click="SendSettings" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                        提交设置
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

// import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { onBeforeUnmount, shallowRef} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import axios from "axios";
import mdui from "mdui";
export default {
    name: "AdminSettingCom",
    components: { Editor, Toolbar },
    data() {
        return {
            Settings: [],
            valueHtml: "",
            blacklist: "",
            backgroundImage: "",
            ipCount: 0,
            ghProxy: ""
        }
    },
    setup() {
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()
        const toolbarConfig = {}
        const editorConfig = { placeholder: '请输入内容...' }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        return {
            editorRef,
            mode: 'simple',
            toolbarConfig,
            editorConfig,
            handleCreated
        };
    },
    methods: {
        // 修改网站配置
        SendSettings(){
            this.SendSettings = [
                {key: "notice", value: this.valueHtml},
                {key: "blacklist", value: this.blacklist},
                {key: "backgroundImage", value: this.backgroundImage},
                {key: "ipCount", value: this.ipCount.toString()},
                {key: "ghProxy", value: this.ghProxy}
            ]
            axios.put("/v2/api/set/settings", this.SendSettings).then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        mdui.snackbar({
                            message: '网站设置修改成功',
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
        // 获取网站配置
        GetSettings(){
            // 获取数据库内容
            axios.get("/v2/api/set/settings").then((res) => {
                // 请求成功
                switch (res.data !== "") {
                    case res.data.code === 2000:
                        if (res.data.data[0] !== undefined){
                            this.valueHtml = res.data.data[0].value
                        }
                        if (res.data.data[1] !== undefined){
                            this.blacklist = res.data.data[1].value
                        }
                        if (res.data.data[2] !== undefined){
                            this.backgroundImage = res.data.data[2].value
                        }
                        if (res.data.data[3] !== undefined){
                            this.ipCount = parseInt(res.data.data[3].value)
                        }
                        if (res.data.data[4] !== undefined){
                            this.ghProxy = res.data.data[4].value
                        }
                }
            }).catch((error) => {
                // 请求失败
                console.log(error)
                mdui.snackbar({
                    message: "获取网站配置失败,快点添加一些配置吧",
                    position: 'right-top',
                });
            })
        }
    },
    mounted() {
        this.GetSettings()
    }
}
</script>

<style scoped>
#textfield{
    margin-right: 32px;
    margin-left: 32px;
}
#notice{
    margin-right: 32px;
    margin-left: 32px;
}
#background-image{
    margin-right: 32px;
    margin-left: 32px;
}
#submission-restrictions {
    margin-right: 32px;
    margin-left: 32px;
}
.mdui-card-content{
    line-height: 10px;
}
</style>
