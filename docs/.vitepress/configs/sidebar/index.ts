import type { DefaultTheme } from 'vitepress'
import { BE_CATEGORY, FE_CATEGORY } from '../const'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/be/': BE_CATEGORY,
  '/fe/': FE_CATEGORY,
}
