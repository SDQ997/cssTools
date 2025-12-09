<template>
  <div class="border">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/border.png" alt="">
        <span>边框</span>
      </div>
      <div class="optionsCardContent">
        <div class="optionsCardForm">
          <div class="cardTitle">
            <span>元素样式</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">大小</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.size" class="slider" :max="400" @input="createStyle" @change="createStyle"/>
              <span>{{ options.size }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">背景色</div>
            <div class="optionsValue sliderValue">
              <el-color-picker v-model="options.background" show-alpha @change="createStyle"/>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">圆角</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.radius" class="slider" :max="50" @input="createStyle" @change="createStyle"/>
              <span>{{ options.radius }}px</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>边框样式</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">粗细</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.borderWidth" class="slider" :min="1" :max="100" @input="createStyle" @change="createStyle"/>
              <span>{{ options.borderWidth }}px</span>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">类型</div>
            <div class="optionsValue sliderValue">
              <Ct-tab :list="['solid','dashed','dotted','double','groove','ridge','inset','outset']" v-model="options.borderType" @change="createStyle"></Ct-tab>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">颜色</div>
            <div class="optionsValue sliderValue">
              <el-color-picker v-model="options.borderColor" show-alpha @change="createStyle"/>
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
      <div class="previewContent">
        <div class="shadowContent" id="previewContent">
          <div class="shadowBox" :style="boxStyle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"border"
})
import { copy , downloadHtml } from "@/common/common"
interface OptionsItem{
  size:number,
  radius:number,
  background:string,
  borderWidth:number,
  borderType:string,
  borderColor:string
}
let options = ref<OptionsItem>({
  size:150,
  radius:6,
  background:"rgba(78, 166, 254,1)",
  borderWidth:1,
  borderType:"solid",
  borderColor:"rgba(255,255,255,1)"
})
let boxStyle = ref({})
onMounted(()=>{
  createStyle()
})
const createStyle = () => {
  boxStyle.value = {
    width: `${options.value.size}px`,
    height: `${options.value.size}px`,
    borderRadius: `${options.value.radius}px`,
    background: options.value.background,
    border:`${options.value.borderWidth}px ${options.value.borderType} ${options.value.borderColor}`
  }
}
const copyCode = ()=>{
  copy(JSON.stringify(boxStyle.value))
}
const downloadPreview = ()=>{
  const dom = document.getElementById("previewContent")
  if(dom){
    downloadHtml(dom,"边框")
  }
}
</script>

<style lang="scss" scoped>
.border{
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
      .shadowContent{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .shadowBox{
          
        }
      }
    }
  }
}
</style>