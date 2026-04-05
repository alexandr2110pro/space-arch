import type { Tree } from '@nx/devkit';

import { deleteTsModuleSettings } from './deleteTsModuleSettings.ts';
import { updateArrayProperty } from './updateArrayProperty.ts';
import { updateTsConfigLibJson } from './updateTsConfigLibJson.ts';

export function setJsTsOptions(tree: Tree, path: string) {
  deleteTsModuleSettings(tree, path);
  updateTsConfigLibJson(tree, path, json => {
    updateArrayProperty(json.compilerOptions, 'types', ['node', 'vite/client']);
    return json;
  });
}
