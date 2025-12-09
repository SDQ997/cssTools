<template>
  <div class="shadow">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/shadow.png" alt="">
        <span>阴影</span>
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
          <template v-for="(item,index) in options.shadows" :key="index">
            <div class="cardTitle">
              <span>阴影样式({{ index+1 }})</span>
              <el-icon class="delIcon" @click="delShadow(index)" v-if="options.shadows.length > 1"><Delete /></el-icon>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">X偏移</div>
              <div class="optionsValue sliderValue">
                <el-slider v-model="item.x" class="slider" :min="-100" :max="100" @input="createStyle" @change="createStyle"/>
                <span>{{ item.x }}px</span>
              </div>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">Y偏移</div>
              <div class="optionsValue sliderValue">
                <el-slider v-model="item.y" class="slider" :min="-100" :max="100" @input="createStyle" @change="createStyle"/>
                <span>{{ item.y }}px</span>
              </div>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">模糊</div>
              <div class="optionsValue sliderValue">
                <el-slider v-model="item.blur" class="slider" :max="100" @input="createStyle" @change="createStyle"/>
                <span>{{ item.blur }}px</span>
              </div>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">扩散</div>
              <div class="optionsValue sliderValue">
                <el-slider v-model="item.spread" class="slider" :max="100" @input="createStyle" @change="createStyle"/>
                <span>{{ item.spread }}px</span>
              </div>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">类型</div>
              <div class="optionsValue sliderValue">
                <Ct-tab :list="['内阴影','外阴影']" v-model="item.type" @change="createStyle"></Ct-tab>
              </div>
            </div>
            <div class="optionsItem">
              <div class="optionsLabel">阴影色</div>
              <div class="optionsValue sliderValue">
                <el-color-picker v-model="item.shadowColor" show-alpha @change="createStyle"/>
              </div>
            </div>
          </template>
          
          <div class="optiosnAdd" @click="addShadow">
            <el-icon><Plus /></el-icon>
            <span>添加阴影</span>
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
  name:"shadow"
})
import { copy , downloadHtml } from "@/common/common"
interface shadowItem{
  x:number,
  y:number,
  blur:number,
  spread:number,
  shadowColor:string,
  type:string,
}
interface OptionsItem{
  size:number,
  radius:number,
  background:string,
  shadows:shadowItem[]
}
let options = ref<OptionsItem>({
  size:150,
  radius:6,
  background:"rgba(78, 166, 254,1)",
  shadows:[
    {
      x:0,
      y:0,
      blur:6,
      spread:6,
      shadowColor:"rgba(255,255,255,0.5)",
      type:"外阴影",
    }
  ]
})
let boxStyle = ref({})
onMounted(()=>{
  createStyle()
})
const addShadow = ()=>{
  options.value.shadows.push({
    x:0,
    y:0,
    blur:6,
    spread:6,
    shadowColor:"rgba(255,255,255,0.5)",
    type:"外阴影",
  })
  createStyle()
}
const delShadow = (index:number)=>{
  options.value.shadows.splice(index,1)
}
const createStyle = () => {
  // 生成 box-shadow 字符串
  const shadowStr = options.value.shadows
    .map(item => {
      return `${item.x}px ${item.y}px ${item.blur}px ${item.spread}px ${item.shadowColor}${item.type === '内阴影' ? ' inset' : ''}`
    })
    .join(', ')

  boxStyle.value = {
    width: `${options.value.size}px`,
    height: `${options.value.size}px`,
    borderRadius: `${options.value.radius}px`,
    background: options.value.background,
    boxShadow: shadowStr
  }
}
const copyCode = ()=>{
  copy(JSON.stringify(boxStyle.value))
}
const downloadPreview = ()=>{
  const dom = document.getElementById("previewContent")
  if(dom){
    downloadHtml(dom,"阴影")
  }
}
</script>

<style lang="scss" scoped>
.shadow{
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