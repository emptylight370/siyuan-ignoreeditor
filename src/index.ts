import { Plugin, getFrontend } from 'siyuan';
import '@/index.scss';
import PluginInfoString from '@/../plugin.json';
import { destroy, init } from '@/main';
import { createApp } from 'vue';
import SettingPage from './SettingPage.vue';

let PluginInfo = {
    version: '',
};
try {
    PluginInfo = PluginInfoString;
} catch (err) {
    console.log('Plugin info parse error: ', err);
}
const { version } = PluginInfo;

export default class PluginVSCE extends Plugin {
    // Run as mobile
    public isMobile: boolean;
    // Run in browser
    public isBrowser: boolean;
    // Run as local
    public isLocal: boolean;
    // Run in Electron
    public isElectron: boolean;
    // Run in window
    public isInWindow: boolean;
    public platform: SyFrontendTypes;
    public readonly version = version;

    async onload() {
        const frontEnd = getFrontend();
        this.platform = frontEnd as SyFrontendTypes;
        this.isMobile = frontEnd === 'mobile' || frontEnd === 'browser-mobile';
        this.isBrowser = frontEnd.includes('browser');
        this.isLocal = location.href.includes('127.0.0.1') || location.href.includes('localhost');
        this.isInWindow = location.href.includes('window.html');

        try {
            require('@electron/remote').require('@electron/remote/main');
            this.isElectron = true;
        } catch (err) {
            this.isElectron = false;
        }

        console.log('Plugin loaded, the plugin is ', this);

        init(this);
    }

    onunload() {
        destroy();
    }

    openSetting() {
        const div = document.createElement('div');
        div.classList.toggle('vsce-setting');
        div.id = this.name;
        const setting = createApp(SettingPage);
        setting.mount(div);
        document.body.appendChild(div);
    }
}
