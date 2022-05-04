<template>
    <router-view  v-wechat-title='$route.meta["title"]' />
</template>

<script>
import axios from "axios";

export default {
    name: "App",
    methods:{
        // 设置背景图
        BG: function () {
            axios.get("/v1/api/set/setting?key=backgroundImage").then((res) => {
                if (res.data.data["value"] !== ""){
                    document.body.style = `background: url("` + res.data.data["value"] + `");`
                }
            })
        }
    },
    mounted() {
        this.BG()
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23f6c5d3' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%237b8aca' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%23ecc7e1' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%237491d0' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%23d9c6eb' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%236792cc' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23c4caf3' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%236caae6' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23afd3f5' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%2374bef4' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%239ddcfa' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%2369c3f8' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
    background-attachment:fixed;
    background-size:cover;
    background-color:rgba(255,255,255,.6);
}
</style>
