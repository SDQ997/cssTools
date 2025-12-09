<template>
  <div class="gradient">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/gradient.png" alt="">
        <span>渐变色</span>
      </div>
      <div class="optionsCardContent">
        <div :class="['optionsCardForm' , collapse ? 'optionsCardFormClose':'']">
          <div class="optionsItem">
            <div class="optionsLabel">类型</div>
            <div class="optionsValue">
              <Ct-tab :list="['linear-gradient','radial-gradient']" v-model="options.type" @change="createStyle"></Ct-tab>
            </div>
          </div>
          <div class="optionsItem" v-show="options.type == 'linear-gradient'">
            <div class="optionsLabel">方向</div>
            <div class="optionsValue">
              <Ct-tab :list="['向上','向左','向下','向右']" v-model="arrow" @change="changeArrow" gap></Ct-tab>
            </div>
          </div>
          <div class="optionsItem" v-show="options.type == 'linear-gradient'">
            <div class="optionsLabel">角度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.deg" class="slider" :max="360" @input="createStyle" @change="createStyle"/>
              <span>{{ options.deg }}deg</span>
            </div>
          </div>
          <div class="optionsItem" v-show="options.type == 'radial-gradient'">
            <div class="optionsLabel">形状</div>
            <div class="optionsValue">
              <Ct-tab :list="['circle','ellipse']" v-model="options.shape" @change="createStyle"></Ct-tab>
            </div>
          </div>
          <div class="optionsItem" v-show="options.type == 'radial-gradient'">
            <div class="optionsLabel">位置</div>
            <div class="optionsValue">
              <Ct-tab :list="['左上','右上','右下','左下','中心']" v-model="centerPostion" @change="changeCenter" gap></Ct-tab>
            </div>
          </div>
          <div class="optionsItem" v-show="options.type == 'radial-gradient'">
            <div class="optionsLabel">中心</div>
            <div class="optionsValue">
              <Ct-position-select v-model="options.center" @change="createStyle"></Ct-position-select>
              <div class="centerTip">
                <span>({{ options.center[0] }},{{ options.center[1] }})</span>
              </div>
            </div>
          </div>
        </div>
        <div class="cardCollapse" @click="collapse = !collapse">
          <el-icon class="icon" :style="{'transform':`rotate(${collapse ? 90 : -90}deg)`}"><DArrowRight /></el-icon>
        </div>
        <div class="optionsItem">
          <div class="optionsLabel">主题</div>
          <div class="optionsValue">
            <div class="colorTheme">
              <div :class="['themeItem',theme == key ? 'themeActive' : '']" 
              v-for="(value, key, index) in colorJson" :key="index"
              :style="{'background':key}"
              @click="changeTheme(key)">
                <el-icon v-if="theme == key"><Check /></el-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="optionsItem" v-if="colors.length">
          <div class="optionsValue">
            <div class="colors">
              <div 
              v-for="(item,index) in colors" :key="index" 
              :class="['colorItem',colorIndex == index ? 'colorItemActive':'']" 
              :style="{'background':`linear-gradient(to right , ${item[0]},${item[1]})`}"
              @click="changColor(index)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="optionsPreview">
      <div class="optionsPreviewInfo">
        <div class="previewTitle" v-if="colors.length && colors[colorIndex].length">
          <span>{{ colors[colorIndex][0] }}</span>
          <el-icon><Right /></el-icon>
          <span>{{ colors[colorIndex][1] }}</span>
        </div>
        <div class="privewAction">
          <el-tooltip effect="dark" content="复制" placement="top">
            <div class="actionItem" @click="copyCode">
              <el-icon><CopyDocument /></el-icon>
            </div>
          </el-tooltip>
          <!-- <el-tooltip effect="dark" content="下载为图片" placement="top">
            <div class="actionItem" @click="downloadPreview">
              <el-icon><Download /></el-icon>
            </div>
          </el-tooltip> -->
        </div>
      </div>
      <div class="previewContent" id="previewContent" :style="bgStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"gradient"
})
const colorJson = ref(require("@/options/gradient.json"))
import { copy , downloadHtml } from "@/common/common"
interface OptionsItem{
  deg:number,
  shape:string,
  type:string,
  center:string[]
}
interface BgStyleItem{
  background:string
}
let collapse = ref<Boolean>(false)
let theme = ref<string>("")
let colors = ref<string[]>([])
let colorIndex = ref<number>(0)
let bgStyle = ref<BgStyleItem>({
  background:""
})
let arrow = ref<string>("向上")
let centerPostion = ref<string>("中心")
onMounted(()=>{
  initColors()
  createStyle()
})
const options = ref<OptionsItem>({
  deg:90,
  shape:"circle",
  type:"linear-gradient",
  center:["50%","50%"]
})
const directionMap: Record<string, number> = {
  "向上": 0,
  "向右": 90,
  "向下": 180,
  "向左": 270
}
const postionMap: Record<string, string[]> = {
  "左上": ["0%","0%"],
  "右上": ["100%","0%"],
  "右下": ["100%","100%"],
  "左下": ["0%","100%"],
  "中心": ["50%","50%"],
}
const changeArrow = ()=>{
  options.value.deg = directionMap[arrow.value] ?? 0
  createStyle()
}
const changeCenter = ()=>{
  options.value.center = postionMap[centerPostion.value] ?? ["50%","50%"]
  createStyle()
}
const initColors = ()=>{
  colors.value = []
  if(theme.value){
    colorJson.value[theme.value].forEach((item:string[])=>{
      colors.value.push(item)
    })
  }else{
    for(let key in colorJson.value){
      colorJson.value[key].forEach((item:string[])=>{
        colors.value.push(item)
      })
    }
  }
  colorIndex.value = 0
}
const updateArrowByDeg = () => {
  for (const key in directionMap) {
    if (directionMap[key] === options.value.deg) {
      arrow.value = key
      return
    }
  }
  arrow.value = ""
}
const updatePostionByCenter = () => {
  for (const key in postionMap) {
    if (postionMap[key][0] === options.value.center[0] && postionMap[key][1] === options.value.center[1]) {
      centerPostion.value = key
      return
    }
  }
  centerPostion.value = ""
}
const createStyle = ()=>{
  updateArrowByDeg()
  updatePostionByCenter()
  let colorArray = colors.value[colorIndex.value]
  if(options.value.type == "linear-gradient"){
    bgStyle.value = {
      background:`linear-gradient(${options.value.deg}deg,${colorArray.join(',')})`
    }
  }else{
    bgStyle.value = {
      background:`radial-gradient(${options.value.shape} at ${options.value.center.join(' ')},${colorArray.join(',')})`
    }
  }
}
const changeTheme = (key:string)=>{
  if(theme.value == key){
    theme.value = ""
  }else{
    theme.value = key
  }
  initColors()
}
const changColor = (index:number)=>{
  colorIndex.value = index
  createStyle()
}
const copyCode = ()=>{
  copy(`background:${bgStyle.value['background']}`)
}
const downloadPreview = ()=>{
  const dom = document.getElementById("previewContent")
  if(dom){
    downloadHtml(dom,"渐变色")
  }
}
</script>

<style lang="scss" scoped>
.gradient{
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  gap:20px;
  .optionsCard{
    .sliderValue{
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.9rem;
      .slider{
        width: calc(100% - 80px);
        transform: translateX(10px);
      }
    }
    .centerTip{
      width: 100%;
      margin-top: 10px;
      text-align: center;
      font-size: 0.9rem;
    }
    .colorTheme{
      display: flex;
      flex-wrap: wrap;
      gap:10px;
      .themeItem{
        width: 20px;
        height: 20px;
        // border: 1px solid white;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        box-sizing: border-box;
      }
      .themeActive{
        border: 1px solid white;
      }
    }
    .colors{
      width: 100%;
      // max-height: 300px;
      overflow-y: auto;
      display: flex;
      flex-wrap: wrap;
      gap:10px;
      align-items: center;
      align-content: flex-start;
      .colorItem{
        width: calc(100% / 2 - 5px);
        height: 45px;
        box-sizing: border-box;
        cursor: pointer;
        border-radius: 4px;
      }
      .colorItemActive{
        border: 2px solid white;
      }
    }
  }
  .optionsPreview{
    
  }
}
</style>