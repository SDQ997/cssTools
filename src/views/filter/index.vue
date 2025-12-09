<template>
  <div class="filter">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/filter.png" alt="">
        <span>滤镜</span>
      </div>
      <div class="optionsCardContent">
        <div class="optionsCardForm">
          <div class="optionsItem">
            <div class="optionsLabel">图片</div>
            <div class="optionsValue">
              <el-button type="primary" @click="chooseImg">点击选择</el-button>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">模糊度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.blur" class="slider" :step="0.1" :min="0" :max="100" @input="createStyle" @change="createStyle"/>
              <span>{{ options.blur }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">明亮度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.brightness" class="slider" :step="0.01" :min="0" :max="5" @input="createStyle" @change="createStyle"/>
              <span>{{ options.brightness }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">对比度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.contrast" class="slider" :step="0.01" :min="0" :max="5" @input="createStyle" @change="createStyle"/>
              <span>{{ options.contrast }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">饱和度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.saturate" class="slider" :step="0.01" :min="0" :max="5" @input="createStyle" @change="createStyle"/>
              <span>{{ options.saturate }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">黑白滤镜</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.grayscale" class="slider" :step="0.01" :min="0" :max="1" @input="createStyle" @change="createStyle"/>
              <span>{{ options.grayscale }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">复古棕色</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.sepia" class="slider" :step="0.01" :min="0" :max="1" @input="createStyle" @change="createStyle"/>
              <span>{{ options.sepia }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">色相旋转</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.hueRotate" class="slider" :step="0.01" :min="-1" :max="1" @input="createStyle" @change="createStyle"/>
              <span>{{ options.hueRotate }}deg</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">颜色反相</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.invert" class="slider" :step="0.01" :min="0" :max="1" @input="createStyle" @change="createStyle"/>
              <span>{{ options.invert }}</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">透明度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.opacity" class="slider" :step="0.01" :min="0" :max="1" @input="createStyle" @change="createStyle"/>
              <span>{{ options.opacity }}</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>阴影</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">X偏移</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.dropShadow.x" class="slider" :min="-100" :max="100" @input="createStyle" @change="createStyle"/>
              <span>{{ options.dropShadow.x }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">Y偏移</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.dropShadow.y" class="slider" :min="-100" :max="100" @input="createStyle" @change="createStyle"/>
              <span>{{ options.dropShadow.y }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">模糊</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.dropShadow.blur" class="slider" :min="-100" :max="100" @input="createStyle" @change="createStyle"/>
              <span>{{ options.dropShadow.blur }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">颜色</div>
            <div class="optionsValue sliderValue">
              <el-color-picker v-model="options.dropShadow.color" show-alpha @change="createStyle"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="optionsPreview">
      <div class="optionsPreviewInfo">
        <div class="previewTitle">
          <span>预览</span>
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
      <div class="previewContent" id="previewContent">
        <img :src="imgUrl" alt="" :style="filterStyle">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"filter"
})
import { copy , downloadHtml } from "@/common/common"
interface DropShadowItem{
  x:number,
  y:number,
  blur:number,
  color:string
}
interface OptionsItem{
  blur:number,
  brightness:number,
  contrast:number,
  saturate:number,
  grayscale:number,
  sepia:number,
  hueRotate:number,
  invert:number,
  opacity:number,
  dropShadow:DropShadowItem
}
let options = ref<OptionsItem>({
  blur:0,
  brightness:1,
  contrast:1,
  saturate:1,
  grayscale:0,
  sepia:0,
  hueRotate:0,
  invert:0,
  opacity:1,
  dropShadow:{
    x:0,
    y:0,
    blur:0,
    color:"rgba(0,0,0,0)"
  }
})
let filterStyle = ref({})
let imgUrl = ref(require("@/assets/filterImg.jpg"))
onMounted(()=>{
  createStyle()
})
const chooseImg = ()=>{
  const inputFile = document.createElement("input")
  inputFile.setAttribute("type","file")
  inputFile.setAttribute("accept", "image/*");
  inputFile.click()
  inputFile.addEventListener("change",(e:any)=>{
    if(e.target.files.length){
      const file = e.target.files[0]
      imgUrl.value = URL.createObjectURL(file)
    }
  })
}
const createStyle = () => {
  const o = options.value
  // 组合 filter 字符串
  const filterStr = `
    blur(${o.blur}px)
    brightness(${o.brightness})
    contrast(${o.contrast})
    saturate(${o.saturate})
    grayscale(${o.grayscale})
    sepia(${o.sepia})
    hue-rotate(${o.hueRotate}deg)
    invert(${o.invert})
    opacity(${o.opacity})
    drop-shadow(${o.dropShadow.x}px ${o.dropShadow.y}px ${o.dropShadow.blur}px ${o.dropShadow.color})
  `.trim().replace(/\s+/g, " ") // 清理多余空格

  filterStyle.value = {
    filter: filterStr
  }
}
const copyCode = ()=>{
  copy(JSON.stringify(filterStyle.value))
}
const downloadPreview = ()=>{
  const dom = document.getElementById("previewContent")
  if(dom){
    downloadHtml(dom,"滤镜")
  }
}
</script>

<style lang="scss" scoped>
.filter{
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
    .optiosnAdd{
      width: calc(100% - 24px);
      margin-left: 12px;
      padding: 5px 0;
      background-color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-sub);
      cursor: pointer;
      transition: all .2s;
      border-radius: 4px;
      .icon{
        transition: all .2s;
      }
    }
    .optiosnAdd:hover{
      background-color: rgba(255,255,255,.2);
    }
    .delIcon{
      cursor: pointer;
      color: #F56C6C;
    }
  }
  .optionsPreview{
    .previewContent{
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 90%;
        pointer-events: none;
        user-select: none;
      }
    }
  }
}
</style>