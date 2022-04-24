<template>
    <div class="mdui-appbar-with-toolbar">
        <!--        Admin Header部分-->
        <AdminHeader />
        <!--        Admin Bar部分-->
        <AdminBar />
        <!--        Admin Body部分-->
        <AdminCom />
        <!--        Admin Footer部分-->
        <AdminFooter />
    </div>
</template>

<script>
import AdminHeader from "@/views/Admin/AdminCom/AdminHeader";
import AdminBar from "@/views/Admin/AdminCom/AdminBar";
import AdminFooter from "@/views/Admin/AdminCom/AdminFooter";
import AdminCom from "@/components/Admin/AdminCom";

export default {
    name: "AdminView",
    components:{
        AdminHeader,
        AdminBar,
        AdminFooter,
        AdminCom
    },
    mounted() {
        if(window.innerWidth>=1000)document.body.classList.add("mdui-drawer-body-left");
    }
}
</script>

<style scoped>

</style>
