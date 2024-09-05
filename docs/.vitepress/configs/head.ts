import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ['link', { rel: 'icon', href: '/zack/favicon.ico' }],
  ['link', { rel: 'apple-touch-icon', href: '/zack/favicon.ico' }],
  ['link', { rel: 'mask-icon', href: '/zack/favicon.ico', color: '#3eaf7c' }],
  ['meta', { name: 'msapplication-TileImage', content: '/zack/favicon.ico' }],
  ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
]
