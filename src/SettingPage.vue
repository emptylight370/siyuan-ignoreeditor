<template>
  <div class="b3-dialog--open">
    <div class="b3-dialog" style="z-index: 21;">
      <div class="b3-dialog__scrim" @click="closeSetting"></div>
      <div class="b3-dialog__container " style="width: 90vw; height: 90vh; left: auto; top: auto; max-width: 1280px;">
        <svg class="b3-dialog__close">
          <use xlink:href="#iconCloseRound"></use>
        </svg>
        <div class="resize__move b3-dialog__header fn__none" onselectstart="return false;"></div>
        <div class="b3-dialog__body">
          <h2>{{ plugin.i18n.settingTitle }}</h2>
          <p>{{ plugin.i18n.viewUserGuide }}</p>
          <p>{{ plugin.i18n.indexignore }}</p>
          <SyTextarea v-model="ignoreindex" />
          <SyButton @click="saveIgnoreIndex">{{ plugin.i18n.saveIndexignore }}</SyButton>
        </div>
        <div class="resize__rd"></div>
        <div class="resize__ld"></div>
        <div class="resize__lt"></div>
        <div class="resize__rt"></div>
        <div class="resize__r"></div>
        <div class="resize__d"></div>
        <div class="resize__t"></div>
        <div class="resize__l"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFile, putFile } from '@/api';
import SyButton from '@/components/SiyuanTheme/SyButton.vue';
import SyTextarea from '@/components/SiyuanTheme/SyTextarea.vue';
import { usePlugin } from '@/main';
import { onMounted, ref } from 'vue';

const plugin = usePlugin();
const ignoreindex = ref('');

onMounted(async () => {
  await loadIgnoreIndex();
});

async function loadIgnoreIndex() {
  const res = await getFile('/data/.siyuan/indexignore');
  if (res) {
    ignoreindex.value = res;
  }
}

async function saveIgnoreIndex() {
  await putFile('/data/.siyuan/indexignore', false, ignoreindex.value);
}

const closeSetting = () => {
  const settingEl = document.querySelector('.b3-dialog--open');
  if (settingEl) {
    settingEl.remove();
  }
};
</script>

<style lang="scss" scoped></style>