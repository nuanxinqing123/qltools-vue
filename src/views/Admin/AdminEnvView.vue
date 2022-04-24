<template>
    <div class="mdui-appbar-with-toolbar">
        <!--        Header部分-->
        <AdminHeader />
        <!--        Bar部分-->
        <AdminBar />
        <!--        Body部分-->
        <AdminEnvCom />
        <!--        Footer部分-->
        <AdminFooter />
    </div>
</template>

<script>
import AdminHeader from "@/views/Admin/AdminCom/AdminHeader";
import AdminBar from "@/views/Admin/AdminCom/AdminBar";
import AdminFooter from "@/views/Admin/AdminCom/AdminFooter";
import AdminEnvCom from "@/components/Admin/AdminEnvCom";
export default {
    name: "AdminEnvView",
    components:{
        AdminHeader,
        AdminBar,
        AdminFooter,
        AdminEnvCom
    },
    mounted() {
        if(window.innerWidth>=1000)document.body.classList.add("mdui-drawer-body-left");
    }
}
</script>

<style scoped>

</style>
