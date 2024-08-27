import type { DefaultTheme } from 'vitepress'
import { JAVA_CATEGORY, FE_CATEGORY } from '../const'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/be/java/': JAVA_CATEGORY,
  '/fe/': FE_CATEGORY,
}
