import type { Tree } from '@nx/devkit';
import { getProjects, joinPathFragments, logger } from '@nx/devkit';

import type { ZedEslintGeneratorSchema } from './schema.js';

export async function zedEslintGenerator(
  tree: Tree,
  _options: ZedEslintGeneratorSchema,
) {
  const projects = getProjects(tree);

  logger.info('Listing all projects..');

  const projectDirsSet = new Set<string>(['./']);

  for (const p of projects.values()) {
    if (p.root === '.') continue;
    if (hasEslintConfig(tree, p.root)) {
      projectDirsSet.add(`./${p.root}/`);
    }
  }

  logger.info(`Collected directories: ${projectDirsSet.size}`);

  writeDirs(
    tree,
    [...projectDirsSet].sort((a, b) => a.localeCompare(b)),
  );
}

function hasEslintConfig(tree: Tree, dir: string) {
  const exts = ['js', 'mjs', 'cjs', 'ts', 'mts', 'cts', 'json'];

  return exts.some(ext =>
    tree.exists(joinPathFragments(dir, `eslint.config.${ext}`)),
  );
}

function writeDirs(tree: Tree, dirs: string[]) {
  logger.info('Reading local zed settings.json');
  const settings: Settings = getSettings(tree);

  logger.info('Writing local zed settings.json');

  Object.assign(settings.lsp.eslint.settings, { workingDirectories: dirs });

  tree.write(
    joinPathFragments('.zed', 'settings.json'),
    JSON.stringify(settings, null, 2),
  );
}

function getSettings(tree: Tree): Settings {
  const settingsString = tree.read(
    joinPathFragments('.zed', 'settings.json'),
    'utf-8',
  );

  if (!settingsString) {
    return { lsp: { eslint: { settings: { workingDirectories: [] } } } };
  }

  return JSON.parse(removeComments(settingsString));
}

function removeComments(jsoncString: string) {
  return jsoncString.replace(/\/\/.*$/gm, '').trim();
}

interface Settings {
  [key: string]: unknown;
  lsp: {
    eslint: {
      settings: {
        workingDirectories: string[];
      };
    };
  };
}

export default zedEslintGenerator;
