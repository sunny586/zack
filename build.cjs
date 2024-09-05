const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

// 定义github文件夹的路径
const GITHUB_FOLDER = '/Users/zhangyu/Desktop/zhangyu/github/sunny586.github.io'

// 定义源文件夹和目标文件夹的路径
const sourceFolder = path.resolve(__dirname, './dist')
const targetFolder = `${GITHUB_FOLDER}/zack/`

/**
 * 获取当前日期和时间
 * @returns {string} 返回格式为 "YYYY HH:mm:ss" 的字符串
 */
function getCurrentDateTime() {
  const now = new Date()
  const year = now.getFullYear()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return year + ' ' + hours + ':' + minutes + ':' + seconds
}

/**
 * 删除文件夹
 * @param {string} folder - 文件夹路径
 */
function deleteFolder(folder) {
  // 使用fs.rmdirSync()方法删除文件夹
  try {
    fs.rmSync(folder, { recursive: true })
    console.log(folder + '-文件夹已成功删除')
  } catch (err) {
    console.error('删除文件夹时出错:', err)
  }
}

/**
 * 移动文件
 */
function moveFiles() {
  if (fs.existsSync(sourceFolder)) {
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true })
    }
    fs.readdirSync(sourceFolder).forEach((item) => {
      const sourcePath = path.join(sourceFolder, item)
      const destPath = path.join(targetFolder, item)
      if (fs.lstatSync(sourcePath).isDirectory()) {
        fs.renameSync(sourcePath, destPath)
      } else {
        fs.renameSync(sourcePath, destPath)
      }
    })
    deleteFolder(sourceFolder)
  } else {
    console.log(`源文件夹 ${sourceFolder} 不存在。`)
  }
}

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
    const commitMessage = 'Update code_zack_' + getCurrentDateTime()
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

/**
 * 开始处理流程
 */
function startProcess() {
  deleteFolder(targetFolder)
  moveFiles()
  commitChanges()
}

startProcess()
