# CODEBUDDY.md This file provides guidance to CodeBuddy when working with code in this repository.

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install dependencies |
| `pnpm dev` | Build in development mode with watch, outputs to workspace plugins folder |
| `pnpm build` | Production build, outputs `dist/` and `package.zip` for marketplace |
| `pnpm release` | Auto bump version and create git tag |
| `pnpm release:patch` | Release patch version (e.g., 0.0.1 → 0.0.2) |
| `pnpm release:minor` | Release minor version (e.g., 0.0.1 → 0.1.0) |
| `pnpm release:major` | Release major version (e.g., 0.0.1 → 1.0.0) |
| `mise run changelog` | Generate changelog from git commits |

> Code formatting handled by lefthook pre-commit hooks (prettier).

## Architecture

SiYuan Note plugin extending VSCode Lite Edit theme. Built with Vite + Vue 3, requires the theme to be active for features to work.

### Plugin Lifecycle

`src/index.ts` exports `PluginVSCE` extending `Plugin` base class:
- **onload()**: Detects platform (mobile/browser/electron/desktop), calls `init(this)`
- **onunload()**: Calls `destroy()` to unmount Vue app
- **openSetting()**: Delegates to `window._sy_plugin_sample.openSetting()`

### Module Structure

- **src/index.ts**: Plugin entry point, extends `Plugin`. Sets platform flags (`isMobile`, `isBrowser`, `isLocal`, `isElectron`, `isInWindow`)
- **src/main.ts**: Vue initialization. `init(plugin)` creates app container, `destroy()` unmounts. Uses `usePlugin()` singleton pattern
- **src/api.ts**: SiYuan API wrapper using `fetchSyncPost`. Covers notebooks, file tree, blocks, attributes, SQL, templates, files, export, convert, notification, network, system
- **src/utils/index.ts**: `getDomByVueComponent(component)` utility for creating Vue component DOM elements
- **src/types/index.d.ts**: SiYuan type definitions (BlockId, NotebookId, Block, etc.) and global `Window` interface extensions
- **src/App.vue**: Root Vue component (SiyuanTheme selector, menu builder, block menu handler)
- **src/components/**: Vue components organized by feature
- **src/i18n/**: Localization files (en_US.json, zh_CN.json)
- **plugin.json**: Plugin manifest with name `plugin-vscodelite-edit`, display name "VSCode Lite Edit"

### Build Configuration

Vite config handles:
- `VITE_SIYUAN_WORKSPACE_PATH` env var for dev output directory
- Development: watch mode with livereload, outputs to workspace plugins folder
- Production: outputs to `dist/`, packages as `package.zip`
- Static copy: README, icon, preview, i18n files, plugin.json
- Webpack external: `siyuan` and `process`

### Key Patterns

1. **Window interface**: `_sy_plugin_sample` namespace for plugin window APIs
2. **i18n**: All user-facing strings via `this.i18n.*`
3. **Theme detection**: Plugin only activates when VSCE theme is in use
4. **Block attributes**: Uses `custom-vsce` attribute for toggle states
