<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">网站设置</div>
                <div class="mdui-card-primary-subtitle">Web Settings</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">网站设置是通过修改一些配置信息来提升网站的独立性和对用户的感知</p>
            </div>
        </div>
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">Settings</div>
            </div>
            <div>
                <!--            公告-->
                <div class="mdui-card-primary">
                    <div class="mdui-card-primary-subtitle">设置公告</div>
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
                    <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                        <button @click="SendSettings" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                            提交设置
                        </button>
                    </div>
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
            valueHtml: ""
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
                {key: "notice", value: this.valueHtml}
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
                        this.valueHtml = res.data.data[0].value
                }
            }).catch((error) => {
                // 请求失败
                console.log(error)
                mdui.snackbar({
                    message: "公告获取失败,快点发布一个公告吧",
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

</style>
