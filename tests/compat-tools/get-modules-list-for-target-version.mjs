import { deepEqual, throws } from 'assert/strict';
import getModulesListForTargetVersion from 'core-js-compat/get-modules-list-for-target-version.js';

const modules = require('core-js-compat/modules');
const modulesByVersions = require('../../packages/core-js-compat/modules-by-versions');

const modules30 = modulesByVersions['3.0'];
const filter = new Set([...modules30, ...modulesByVersions['3.1']]);
const modules31 = modules.filter(it => filter.has(it));

deepEqual(getModulesListForTargetVersion(3), modules30, 'num 3'); // TODO: Make it throw in core-js@4
deepEqual(getModulesListForTargetVersion('3'), modules30, '3'); // TODO: Make it throw in core-js@4
deepEqual(getModulesListForTargetVersion('3.0'), modules30, '3.0');
deepEqual(getModulesListForTargetVersion('3.0.0'), modules30, '3.0.0');
deepEqual(getModulesListForTargetVersion('3.0.1'), modules30, '3.0.1');
deepEqual(getModulesListForTargetVersion('3.0.0-alpha.1'), modules30, '3.0.0-alpha.1');
deepEqual(getModulesListForTargetVersion('3.1'), modules31, '3.1');
deepEqual(getModulesListForTargetVersion('3.1.0'), modules31, '3.1.0');
deepEqual(getModulesListForTargetVersion('3.1.1'), modules31, '3.1.1');

throws(() => getModulesListForTargetVersion('2.0'), RangeError, '2.0');
throws(() => getModulesListForTargetVersion('4.0'), RangeError, '4.0');
throws(() => getModulesListForTargetVersion('x'), TypeError, 'x');
throws(() => getModulesListForTargetVersion('*'), TypeError, '*');
throws(() => getModulesListForTargetVersion(), TypeError, 'no arg');

echo(chalk.green('get-modules-list-for-target-version tested'));
