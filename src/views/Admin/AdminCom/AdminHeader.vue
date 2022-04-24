<template>
    <header class="mdui-appbar mdui-appbar-fixed mdui-color-indigo-800">
        <div class="mdui-toolbar">
            <a mdui-tooltip="{content: '菜单'}" mdui-drawer="{target: '#main-drawer'}" class="mdui-btn mdui-btn-icon">
                <i class="mdui-icon material-icons">menu</i>
            </a>
            <a href="javascript:;" class="mdui-typo-headline">Tools</a>
            <div class="mdui-toolbar-spacer"></div>
            <a mdui-tooltip="{content: '前往首页'}" @click="GoIndex" class="mdui-btn mdui-btn-icon">
                <i class="mdui-icon material-icons">home</i>
            </a>
            <a mdui-tooltip="{content: '刷新页面'}" href="javascript:location.reload();" class="mdui-btn mdui-btn-icon">
                <i class="mdui-icon material-icons">refresh</i>
            </a>
            <a mdui-tooltip="{content: '退出登录'}" @click="this.LogOut()" href="javascript:;" class="mdui-btn mdui-btn-icon" id="LogOut">
                <i class="mdui-icon material-icons">exit_to_app</i>
            </a>
        </div>
    </header>
</template>

<script>
export default {
    name: "AdminHeader",
    methods: {
        LogOut(){
            // 退出登录
            console.log("退出登录")
            localStorage.clear()
            window.open("/#/", "_self")
            location.reload()
        },
        GoIndex(){
            window.open("/#/", "_self")
            location.reload()
        },
    },
}
</script>

<style scoped>

</style>
