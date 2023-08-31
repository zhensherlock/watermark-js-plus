import { readFileSync } from 'node:fs'
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)))

export const banner = `/*!
 * ${packageJson.name} v${packageJson.version}
 * (c) 2022-2023 Michael Sun
 * Released under the ${packageJson.license} License.
 */`
