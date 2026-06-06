<template>
  <div class="b3-dialog--open">
    <div class="b3-dialog" style="z-index: 21">
      <div class="b3-dialog__scrim" @click="closeSetting"></div>
      <div class="b3-dialog__container" style="width: 90vw; height: 90vh; left: auto; top: auto; max-width: 1280px">
        <svg class="b3-dialog__close" @click="closeSetting">
          <use xlink:href="#iconCloseRound"></use>
        </svg>
        <div class="b3-dialog__header" onselectstart="return false;">
          <h2>{{ plugin.i18n?.settingTitle }}</h2>
        </div>
        <div class="b3-dialog__body">
          <p>{{ plugin.i18n?.viewUserGuide }}</p>
          <hr />

          <div style="overflow-y: auto">
            <!-- 忽略索引 -->
            <h3>{{ plugin.i18n?.indexignore }}</h3>
            <a :href="plugin.i18n?.ugIndexignoreLink" @click="closeSetting">{{ plugin.i18n?.ugLink }}</a>
            <SyTextarea v-model="ignoreindex" style="resize: vertical;" />
            <SyButton @click="loadIgnoreIndex">{{ plugin.i18n?.reloadIgnoreFile }}</SyButton>
            <SyButton @click="saveIgnoreIndex">{{ plugin.i18n?.saveIndexignore }}</SyButton>
            <hr />

            <!-- 忽略搜索 -->
            <h3>{{ plugin.i18n?.searchignore }}</h3>
            <a :href="plugin.i18n?.ugSearchignoreLink" @click="closeSetting">{{ plugin.i18n?.ugLink }}</a>
            <SyTextarea v-model="searchignore" style="resize: vertical;" />
            <SyButton @click="loadSearchIgnore">{{ plugin.i18n?.reloadIgnoreFile }}</SyButton>
            <SyButton @click="saveSearchIgnore">{{ plugin.i18n?.saveSearchignore }}</SyButton>
            <hr />

            <!-- 忽略引用 -->
            <h3>{{ plugin.i18n?.refsearchignore }}</h3>
            <a :href="plugin.i18n?.ugRefignoreLink" @click="closeSetting">{{ plugin.i18n?.ugLink }}</a>
            <SyTextarea v-model="refsearchignore" style="resize: vertical;" />
            <SyButton @click="loadRefsearchIgnore">{{ plugin.i18n?.reloadIgnoreFile }}</SyButton>
            <SyButton @click="saveRefsearchIgnore">{{ plugin.i18n?.saveRefsearchignore }}</SyButton>
            <hr v-if="syncEnabled" />

            <!-- 忽略同步 -->
            <h3 v-if="syncEnabled">{{ plugin.i18n?.syncignore }}</h3>
            <a :href="plugin.i18n?.ugSyncignoreLink" @click="closeSetting"
              v-if="syncEnabled">{{ plugin.i18n?.ugLink }}</a>
            <SyTextarea v-model="syncignore" style="resize: vertical;" v-if="syncEnabled" />
            <SyButton @click="loadSyncIgnore" v-if="syncEnabled">{{ plugin.i18n?.reloadIgnoreFile }}</SyButton>
            <SyButton @click="saveSyncIgnore" v-if="syncEnabled">{{ plugin.i18n?.saveSyncignore }}</SyButton>
          </div>

        </div>
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
const searchignore = ref('');
const refsearchignore = ref('');
const syncignore = ref('');

const syncEnabled = ref(false);

onMounted(async () => {
  await loadIgnoreIndex();
  await loadSearchIgnore();
  await loadRefsearchIgnore();
  if (window.siyuan?.config?.sync?.enabled) {
    await loadSyncIgnore();
    syncEnabled.value = true;
  }
});

async function loadIgnoreIndex() {
  const res = await getFile('/data/.siyuan/indexignore');
  if (res) {
    ignoreindex.value = res;
  }
}

async function saveIgnoreIndex() {
  const blob = new Blob([ignoreindex.value], { type: 'text/plain' });
  await putFile('/data/.siyuan/indexignore', false, blob);
}

async function loadSearchIgnore() {
  const res = await getFile('/data/.siyuan/searchignore');
  if (res) {
    searchignore.value = res;
  }
}

async function saveSearchIgnore() {
  const blob = new Blob([searchignore.value], { type: 'text/plain' });
  await putFile('/data/.siyuan/searchignore', false, blob);
}

async function loadRefsearchIgnore() {
  const res = await getFile('/data/.siyuan/refsearchignore');
  console.log('refsearchignore', res);
  if (res) {
    refsearchignore.value = res;
  }
}

async function saveRefsearchIgnore() {
  const blob = new Blob([refsearchignore.value], { type: 'text/plain' });
  await putFile('/data/.siyuan/refsearchignore', false, blob);
}

async function loadSyncIgnore() {
  const res = await getFile('/data/.siyuan/syncignore');
  if (res) {
    syncignore.value = res;
  }
}

async function saveSyncIgnore() {
  const blob = new Blob([syncignore.value], { type: 'text/plain' });
  await putFile('/data/.siyuan/syncignore', false, blob);
}

const closeSetting = () => {
  const settingEl = document.querySelector('.ignore-setting');
  if (settingEl) {
    settingEl.remove();
  }
};
</script>

<style lang="scss" scoped></style>