<template>
    <div class="mdui-appbar-with-toolbar">
        <!--        Header部分-->
        <AdminHeader />
        <!--        Bar部分-->
        <AdminBar />
        <!--        Body部分-->
        <AdminAboutCom />
        <!--        Footer部分-->
        <AdminFooter />
    </div>
</template>

<script>
import AdminHeader from "@/views/Admin/AdminCom/AdminHeader";
import AdminBar from "@/views/Admin/AdminCom/AdminBar";
import AdminFooter from "@/views/Admin/AdminCom/AdminFooter";
import AdminAboutCom from "@/components/Admin/AdminAboutCom";

export default {
    name: "AdminAboutView",
    components:{
        AdminHeader,
        AdminBar,
        AdminFooter,
        AdminAboutCom
    },
    mounted() {
        if(window.innerWidth>=1000)document.body.classList.add("mdui-drawer-body-left");
    }
}
</script>

<style scoped>

</style>
