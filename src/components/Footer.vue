<template>
    <!--    Footer框架-->
    <footer class="mdui-m-t-5" id="footer">
        <div class="mdui-p-a-5 mdui-typo mdui-container">
            <div class="mdui-col mdui-text">
                <p><span id="Copyright">Copyright ©&nbsp;2022&nbsp;All rights reserved. </span><a href="https://github.com/nuanxinqing123/QLTools"><st>青龙 Tools</st></a></p>
                <p>简单便捷的第三方工具，给您带来不一样的体验！</p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterCom"
}
</script>

<style scoped>
footer {
    width: 100%;
    text-align: center;
    box-shadow:5px 0 5px 0 rgb(60 64 67 / 30%),0 1px 3px 1px rgb(60 64 67 / 15%);
    backdrop-filter:blur(15px) brightness(110%);
}
@media screen and (min-height:800px){footer{position: fixed;bottom: 0;width: 100%;}}
st {
    font-weight:600;
    color:#475bca;
}
</style>
