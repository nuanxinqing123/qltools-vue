<template>
    <div>
        <HeaderCom />
    </div>
<!--    内容部分-->
    <div>
        <NoticeCom />
    </div>
<!--    内容结束-->
    <div>
        <FooterCom />
    </div>
</template>

<script>
import NoticeCom from "@/components/Notice";
import HeaderCom from "@/components/Header";
import FooterCom from "@/components/Footer";

export default {
    name: "IndexView",
    components: {
        HeaderCom,
        NoticeCom,
        FooterCom,
    }
}
</script>

<style scoped>

</style>
