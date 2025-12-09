import { ElMessage } from "element-plus"
import html2canvas from "html2canvas"
const copy = (event:any)=>{
  let url = event.target ? event.target.innerText : event
  //复制到粘贴板
  let oInput = document.createElement('input')
  oInput.style.position = 'absolute'
  oInput.style.left = '0'
  oInput.style.top = '0'
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  ElMessage.success('复制成功')
  oInput.remove()
}
const downloadHtml = async (dom:HTMLElement,name:string)=>{
  // 转成 canvas
  const canvas = await html2canvas(dom, {
    scale: 2, // 提高清晰度
    useCORS: true, // 允许跨域图片
    backgroundColor: null, // 保留透明背景
  })

  const dataURL = canvas.toDataURL("image/png")

  // 创建下载
  const link = document.createElement("a")
  link.href = dataURL
  link.download = `${name}.png`
  link.click()
}
export {
  copy,
  downloadHtml
}