const fs = require('fs-extra')
const path = require('path')
const gitOperations = require('./git-operations.cjs')

const GITHUB_FOLDER = '/Users/zhangyu/Desktop/zhangyu/github/sunny586.github.io'

const sourceFolder = path.resolve(__dirname, '../dist')
const targetFolder = `${GITHUB_FOLDER}/zack`

async function run() {
  try {
    await fs.emptyDir(targetFolder)
    await fs.move(sourceFolder, targetFolder, { overwrite: true })
    gitOperations(GITHUB_FOLDER)
  } catch (error) {
    console.error(`流程失败: ${error.message}`)
  }
}

run()
