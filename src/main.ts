import { Plugin } from 'siyuan';
import { createApp } from 'vue';
import App from './App.vue';
import InitApp from './InitApp.vue';

let plugin = null;
export function usePlugin(pluginProps?: Plugin): Plugin {
    console.log('usePlugin', pluginProps, plugin);
    if (pluginProps) {
        plugin = pluginProps;
    }
    if (!plugin && !pluginProps) {
        console.error('need bind plugin');
    }
    return plugin;
}

// let app = null;
let initApp = null;
export function init(plugin: Plugin) {
    // bind plugin hook
    usePlugin(plugin);

    const div = document.createElement('div');
    div.classList.toggle('plugin-sample-vite-vue-app');
    div.id = this.name;
    // app = createApp(App);
    // app.mount(div);
    // document.body.appendChild(div);
    initApp = createApp(InitApp);
    initApp.mount(div);
}

export function destroy() {
    // app.unmount();
    initApp.unmount();
    const div = document.getElementById(this.name);
    document.body.removeChild(div);
}
