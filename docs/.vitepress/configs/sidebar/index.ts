import type { DefaultTheme } from 'vitepress'
import { BE, DSA, FE } from '../const'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/be/': BE,
  '/fe/': FE,
  '/dsa/': DSA,
}
