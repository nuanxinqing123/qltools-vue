<template>
    <div class="mdui-drawer mdui-shadow-6" id="main-drawer" style="box-sizing:border-box;">
        <div class="mdui-list">
            <a @click="this.OpenURL('/#/admin/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">desktop_mac</i>
                <div class="mdui-list-item-content">仪表盘</div>
            </a>
            <a @click="this.OpenURL('/#/admin/env/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">playlist_play</i>
                <div class="mdui-list-item-content">变量管理</div>
            </a>
            <a @click="this.OpenURL('/#/admin/panel/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">apps</i>
                <div class="mdui-list-item-content">面板管理</div>
            </a>
            <a @click="this.OpenURL('/#/admin/plugin/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">local_play</i>
                <div class="mdui-list-item-content">插件管理</div>
            </a>
            <a @click="this.OpenURL('/#/admin/transfer/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">import_export</i>
                <div class="mdui-list-item-content">容器管理</div>
            </a>
            <a @click="this.OpenURL('/#/admin/message/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">sms</i>
                <div class="mdui-list-item-content">推送管理</div>
            </a>
            <a @click="this.OpenURL('/#/admin/settings/')" class="mdui-list-item">
                <i class="mdui-list-item-icon mdui-icon material-icons">settings</i>
                <div class="mdui-list-item-content">网站设置</div>
            </a>
            <a class="mdui-list-item" mdui-drawer-close="">
                <i class="mdui-list-item-icon mdui-icon material-icons">chevron_left</i>
                <div class="mdui-list-item-content">收起菜单</div>
            </a>
        </div>
    </div>
</template>

<script>
import mdui from "mdui";
export default {
    name: "AdminBar",
    methods: {
        // 修改侧栏打开状态
        changeStyle(){
            if(window.innerWidth>=1000)document.getElementById('main-drawer').classList.add('mdui-drawer-open');
            let container = document.querySelector("#container");
            container.style.minHeight=window.innerHeight-document.body.clientHeight+container.clientHeight+'px';
            mdui.mutation();
        },
        OpenURL(url){
            window.open(url, "_self")
            location.reload()
        }
    },
    mounted() {
        this.changeStyle()
    }
}
</script>

<style scoped>
</style>
