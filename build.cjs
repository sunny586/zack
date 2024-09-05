const fs = require('fs-extra')
const path = require('path')
const { exec } = require('child_process')
const dayjs = require('dayjs')

// 定义github文件夹的路径
const GITHUB_FOLDER = '/Users/zhangyu/Desktop/zhangyu/github/sunny586.github.io'

// 定义源文件夹和目标文件夹的路径
const sourceFolder = path.resolve(__dirname, './dist')
const targetFolder = `${GITHUB_FOLDER}/zack`

/**
 * 提交更改
 */
function commitChanges() {
  exec('git add .', { cwd: GITHUB_FOLDER }, (err, stdout, stderr) => {
    if (err) {
      console.error(`添加更改失败: ${stderr}`)
      return
    }
    console.log(`更改添加成功! ${stdout}`)
    const commitMessage = `update code zack ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    exec(`git commit -m "${commitMessage}"`, { cwd: GITHUB_FOLDER }, (err, stdout, stderr) => {
      if (err) {
        console.error(`提交失败: ${stderr}`)
        return
      }
      console.log(`提交成功! ${stdout}`)
      // 重新拉取代码
      exec(`git pull --rebase`, { cwd: GITHUB_FOLDER }, (err, stdout, stderr) => {
        if (err) {
          console.error(`拉取失败: ${stderr}`)
          return
        }
        console.log(`拉取成功! ${stdout}`)
        // 重新推送代码
        exec(`git push`, { cwd: GITHUB_FOLDER }, (err, stdout, stderr) => {
          if (err) {
            console.error(`推送失败: ${stderr}`)
            return
          }
          console.log(`推送成功! ${stdout}`)
        })
      })
    })
  })
}

async function run() {
  // 如果文件夹不存在, 会创建空文件夹
  // 文件夹中含有其他文件或文件夹时会清空所有
  // 创建时返回文件夹绝对路径
  await fs.emptyDirSync(targetFolder)
  // 移动文件夹或文件, 源必须存在. 无返回值
  await fs.moveSync(sourceFolder, targetFolder, { overwrite: true })
  // git 提交
  commitChanges()
}

run()
