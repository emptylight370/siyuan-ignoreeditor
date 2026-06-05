<template>
</template>

<script setup lang="ts">
import { usePlugin } from '@/main';
import { onMounted, ref, watchEffect } from 'vue';

const openSetting = () => {
  alert('Need open plugin setting.');
};

const plugin = usePlugin();
console.log('plugin is ', plugin);

// add top bar button
plugin.addTopBar({
  icon: 'iconHeart',
  title: 'Plugin Sample',
  callback: () => {
    alert('Hello Siyuan.');
  },
});

const statusRef = ref<HTMLDivElement>();
watchEffect(() => {
  console.log('statusRef is ', statusRef.value);
});
// two ways to add status bar
onMounted(() => {
  // 1. use Teleport in Vue way
  // show as a green heart icon
  const status = document.getElementById('status') as HTMLDivElement;
  if (status) {
    // delay 5 seconds to bind statusRef
    // avoid status is not ready
    setTimeout(() => {
      statusRef.value = status;
    }, 5000);
  }

  // 2. use addStatusBar in siyuan plugin way
  // show as a red heart icon
  const tempStatus = document.createElement('div');
  tempStatus.classList.add('temp-status');
  tempStatus.innerHTML = `
    <svg style="width: 12px; height: 12px; color: red;">
      <use xlink:href="#iconHeart"></use>
    </svg>
  `;

  plugin.addStatusBar({
    element: tempStatus,
    position: 'right',
  });
});

onMounted(() => {
  window._plugin_ignore_editor = {};
  window._plugin_ignore_editor.openSetting = openSetting;
});
</script>

<!-- 局部样式 -->
<style lang="scss" scoped></style>

<!-- 全局样式 -->
<style lang="scss"></style>