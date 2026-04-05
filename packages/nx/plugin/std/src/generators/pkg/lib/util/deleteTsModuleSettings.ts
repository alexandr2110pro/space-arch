import type { Tree } from '@nx/devkit';

import { updateTsConfigLibJson } from './updateTsConfigLibJson.ts';
import { updateTsConfigSpecJson } from './updateTsConfigSpecJson.ts';

export function deleteTsModuleSettings(tree: Tree, path: string) {
  updateTsConfigLibJson(tree, path, json => {
    delete json.compilerOptions.module;
    delete json.compilerOptions.moduleResolution;
    return json;
  });
  updateTsConfigSpecJson(tree, path, json => {
    delete json.compilerOptions.module;
    delete json.compilerOptions.moduleResolution;
    return json;
  });
}
