<template>
    <footer class="mdui-m-t-5">
        <div class="mdui-p-a-5 mdui-typo mdui-container">
            <div class="mdui-row-sm-3">
                <div class="mdui-col mdui-text">
                    <p><span id="Copyright">Copyright ©&nbsp;2022&nbsp;All rights reserved. </span><a href="https://github.com/nuanxinqing123/QLTools"><st>青龙 Tools</st></a></p>
                    <p>简单便捷的第三方工具，给您带来不一样的体验！</p>
                </div>
                <div class="mdui-col mdui-text">
                    <p>QQ交流: <a href="https://jq.qq.com/?_wv=1027&k=BV2RgQaP"><st>进来吹水</st></a></p>
                    <p>电报联系: <a href="https://t.me/Nuanxinqing"><st>@Nuanxinqing</st></a></p>
                </div>
                <div class="mdui-col mdui-text">
                    <p>电报频道: <a href="https://t.me/qltool"><st>青龙Tools</st></a></p>
                    <p>电报群组: <a href="https://t.me/qltools"><st>青龙Tools吹水群</st></a></p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "AdminFooter",
}
</script>

<style scoped>
footer {
    width: 100%;
    text-align: center;
    box-shadow:5px 0 5px 0 rgb(60 64 67 / 30%),0 1px 3px 1px rgb(60 64 67 / 15%);
    backdrop-filter:blur(15px) brightness(110%);
}
@media screen and (min-height:800px){footer{bottom: 0;width: 100%;}}
st {
    font-weight:600;
    color:#475bca;
}
</style>
