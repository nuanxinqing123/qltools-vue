<template>
    <div id="container" class="mdui-container mdui-p-t-1" style="margin-top: 10px;">
        <div class="mdui-card mt" style="border-radius:15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">容器管理</div>
                <div class="mdui-card-primary-subtitle">Container Management</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">容器管理是方便管理员对于不同容器之间变量的管理操作</p>
            </div>
        </div>
<!--        迁移/复制-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">迁移/复制</div>
                <div class="mdui-card-primary-subtitle">Transfer Copy</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tip: 迁移/复制功能需要至少添加两个面板地址才能正常使用</p>
                <p class="text_s">迁移: 将A面板的所有变量迁移到B面板, 迁移完成后会清空A面板变量</p>
                <p class="text_s">复制: 将A面板的所有变量复制到B面板, 复制完成后A面板变量不会变化</p>
            </div>
            <div class="mdui-divider"></div>
            <div style="text-align: center; margin-top: 15px">
                <span style="margin-left: 20px; margin-right: 20px">
                    A面板：<select class="mdui-select" mdui-select="{position: 'top'}" id="server1">
                        <option>测试服务器</option>
                    </select>
                </span>

                <span style="margin-left: 20px; margin-right: 20px">
                    B面板：<select class="mdui-select" mdui-select="{position: 'top'}" id="server2">
                        <option>华东灾备服务器</option>
                    </select>
                </span>

                <span style="margin-left: 20px; margin-right: 20px">
                    操作：<select class="mdui-select" mdui-select="{position: 'top'}" id="function">
                        <option>复制</option>
                        <option>迁移</option>
                    </select>
                </span>
            </div>
            <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                <button class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                    执行任务
                </button>
            </div>
        </div>
<!--        备份/恢复-->
        <div class="mdui-card mt" style="border-radius:15px;margin-top: 15px;">
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">备份/恢复</div>
                <div class="mdui-card-primary-subtitle">Backup Restore</div>
            </div>
            <div class="mdui-card-content mdui-typo">
                <p class="text_s">Tip: 备份/恢复功能将会以JSON文件实现</p>
            </div>
            <div class="mdui-divider"></div>
            <div style="text-align: center; margin-top: 15px">
               <span style="margin-left: 20px; margin-right: 20px">
                    操作面板：<select class="mdui-select" mdui-select="{position: 'top'}" id="server1">
                        <option>测试服务器</option>
                    </select>
                </span>
                <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                    <button mdui-dialog="{target: '#Restore'}" class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                        恢复
                    </button>
                </div>
                <div class="mdui-float-right" style="margin-right: 15px; margin-top: 15px; margin-bottom: 15px">
                    <button class="mdui-btn mdui-btn-dense mdui-btn-raised btn mdui-p-x-1 mdui-color-green-700 mdui-text-color-white">
                        备份
                    </button>
                </div>
            </div>
        </div>
<!--        恢复面板-->
        <div id="Restore" class="mdui-dialog" style="top: 210px; display: none;">
            <div class="mdui-dialog-title">备份恢复</div>
            <div class="mdui-dialog-content mdui-typo" style="height: 407px;">
                <input type= "file" id="backupFile"/>
                <div class="mdui-dialog-actions">
                    <button class="mdui-btn mdui-color-green-700 mdui-text-color-white btn" mdui-dialog-close>
                        执行操作
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AdminTransferCom"
}
</script>

<style scoped>

</style>
