<template></template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import { usePlugin } from './main';
import { IMenu, IProtyle, subMenu } from 'siyuan';

const plugin = usePlugin();

// 点击块图标，添加块菜单
const handleBlockIcon = (event: CustomEvent<{ menu: subMenu; protyle: IProtyle; blockElements: HTMLElement[] }>) => {
  if (event.detail.blockElements.length <= 0) return;
  if (event.detail.blockElements.every((block) => block.dataset.type === event.detail.blockElements[0].dataset.type)) {
    event.detail.menu.addItem({
      label: 'VSCE',
      click: () => {
        if (event.detail.blockElements[0].dataset.type === 'p') { }
      },
    } as IMenu);
  }
};

// 组件挂载
onMounted(() => {
  window._plugin_vscodelite_edit = {};
  plugin.eventBus.on('click-blockicon', handleBlockIcon);
});

// 组件取消挂载
onUnmounted(() => {
  plugin.eventBus.off('click-blockicon', handleBlockIcon);
});
</script>