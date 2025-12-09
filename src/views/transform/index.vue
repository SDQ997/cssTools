<template>
  <div class="transform">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/transForm.png" alt="">
        <span>变形</span>
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
            <span>变形样式</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">中心</div>
            <div class="optionsValue">
              <Ct-position-select v-model="options.center" @change="createStyle"></Ct-position-select>
              <div class="centerTip">
                <span>({{ options.center[0] }},{{ options.center[1] }})</span>
              </div>
            </div>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">模式</div>
            <div class="optionsValue sliderValue">
              <Ct-tab :list="['2D','3D']" v-model="options.mode" @change="createStyle"></Ct-tab>
            </div>
          </div>
          <div class="optionsItem" v-show="options.mode == '3D'">
            <div class="optionsLabel">透视</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.perspective" class="slider" :min="-2000" :max="2000" @input="createStyle" @change="createStyle"/>
              <span>{{ options.perspective }}px</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>Translate(平移)</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">
              <el-switch
                v-model="TranslateMode"
                :active-value="1"
                :inactive-value="0"
                size="small"
                active-text="分轴模式"
                inactive-text="简写模式"
                @change="createStyle"
              />
            </div>
          </div>
          <div class="optionsItem" v-show="TranslateMode == 0">
            <div class="optionsLabel">幅度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.translate" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.translate }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="TranslateMode == 1">
            <div class="optionsLabel">X轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.translateX" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.translateX }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="TranslateMode == 1">
            <div class="optionsLabel">Y轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.translateY" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.translateY }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="TranslateMode == 1 && options.mode == '3D'">
            <div class="optionsLabel">Z轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.translateZ" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.translateZ }}px</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>Rotate(旋转)</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">
              <el-switch
                v-model="RotateMode"
                :active-value="1"
                :inactive-value="0"
                size="small"
                active-text="分轴模式"
                inactive-text="简写模式"
                @change="createStyle"
              />
            </div>
          </div>
          <div class="optionsItem" v-show="RotateMode == 0">
            <div class="optionsLabel">幅度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.rotate" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.rotate }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="RotateMode == 1">
            <div class="optionsLabel">X轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.rotateX" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.rotateX }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="RotateMode == 1">
            <div class="optionsLabel">Y轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.rotateY" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.rotateY }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="RotateMode == 1 && options.mode == '3D'">
            <div class="optionsLabel">Z轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.rotateZ" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.rotateZ }}px</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>Scale(缩放)</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">幅度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.scale" class="slider" :step="0.01" :min="0" :max="5" @input="createStyle" @change="createStyle"/>
              <span>{{ options.scale }}</span>
            </div>
          </div>
          <div class="cardTitle">
            <span>Skew(倾斜)</span>
          </div>
          <div class="optionsItem">
            <div class="optionsLabel">
              <el-switch
                v-model="SkewMode"
                :active-value="1"
                :inactive-value="0"
                size="small"
                active-text="分轴模式"
                inactive-text="简写模式"
                @change="createStyle"
              />
            </div>
          </div>
          <div class="optionsItem" v-show="SkewMode == 0">
            <div class="optionsLabel">幅度</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.skew" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.skew }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="SkewMode == 1">
            <div class="optionsLabel">X轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.skewX" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.skewX }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="SkewMode == 1">
            <div class="optionsLabel">Y轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.skewY" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.skewY }}px</span>
            </div>
          </div>
          <div class="optionsItem" v-show="SkewMode == 1 && options.mode == '3D'">
            <div class="optionsLabel">Z轴</div>
            <div class="optionsValue sliderValue">
              <el-slider v-model="options.skewZ" class="slider" :min="-200" :max="200" @input="createStyle" @change="createStyle"/>
              <span>{{ options.skewZ }}px</span>
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
  name:"transform"
})
import { copy , downloadHtml } from "@/common/common"
interface OptionsItem{
  size:number,
  radius:number,
  background:string,
  mode:string,
  center:string[],
  translate:number,
  translateX:number,
  translateY:number,
  translateZ:number,
  rotate:number,
  rotateX:number,
  rotateY:number,
  rotateZ:number,
  scale:number,
  skew:number,
  skewX:number,
  skewY:number,
  skewZ:number,
  perspective:number
}
let options = ref<OptionsItem>({
  size:150,
  radius:6,
  background:"rgba(78, 166, 254,1)",
  mode:"2D",
  center:["50%","50%"],
  translate:0,
  translateX:0,
  translateY:0,
  translateZ:0,
  rotate:0,
  rotateX:0,
  rotateY:0,
  rotateZ:0,
  scale:1,
  skew:0,
  skewX:0,
  skewY:0,
  skewZ:0,
  perspective:800
})
let boxStyle = ref({})
let TranslateMode = ref<number>(0) //0简写1分轴
let RotateMode = ref<number>(0) //0简写1分轴
let SkewMode = ref<number>(0) //0简写1分轴
onMounted(()=>{
  createStyle()
})
const createStyle = () => {
  const opt = options.value;
  const transformList: string[] = [];

  /* ------------------------
   *  Translate
   * ------------------------*/
  if (TranslateMode.value === 0) {
    if (opt.translate !== 0) {
      transformList.push(`translate(${opt.translate}px)`);
    }
  } else {
    if (opt.translateX !== 0 || opt.translateY !== 0) {
      transformList.push(`translate(${opt.translateX}px, ${opt.translateY}px)`);
    }
    if (opt.mode === "3D" && opt.translateZ !== 0) {
      transformList.push(`translateZ(${opt.translateZ}px)`);
    }
  }

  /* ------------------------
   *  Rotate
   * ------------------------*/
  if (RotateMode.value === 0) {
    if (opt.rotate !== 0) {
      transformList.push(`rotate(${opt.rotate}deg)`);
    }
  } else {
    if (opt.rotateX !== 0) transformList.push(`rotateX(${opt.rotateX}deg)`);
    if (opt.rotateY !== 0) transformList.push(`rotateY(${opt.rotateY}deg)`);
    if (opt.rotateZ !== 0) transformList.push(`rotateZ(${opt.rotateZ}deg)`); //⭐ 修复这里
  }

  /* ------------------------
   *  Scale（无 xyz）
   * ------------------------*/
  if (opt.scale !== 1) {
    transformList.push(`scale(${opt.scale})`);
  }

  /* ------------------------
   *  Skew
   * ------------------------*/
  if (SkewMode.value === 0) {
    if (opt.skew !== 0) {
      transformList.push(`skew(${opt.skew}deg)`);
    }
  } else {
    if (opt.skewX !== 0 || opt.skewY !== 0) {
      transformList.push(`skew(${opt.skewX}deg, ${opt.skewY}deg)`);
    }
    // CSS 不存在 skewZ
  }

  /* ------------------------
   *  Perspective（只在 3D 模式下）
   * ------------------------*/
  let wrapperPerspective = "";
  if (opt.mode === "3D" && opt.perspective !== 0) {
    wrapperPerspective = `${opt.perspective}px`;
  }

  /* ------------------------
   *  Output boxStyle
   * ------------------------*/
  boxStyle.value = {
    width: opt.size + "px",
    height: opt.size + "px",
    background: opt.background,
    borderRadius: opt.radius + "px",
    transform: transformList.join(" "),
    transformOrigin: `${opt.center[0]} ${opt.center[1]}`,
    perspective: wrapperPerspective,
  };
};
const copyCode = ()=>{
  copy(JSON.stringify(boxStyle.value))
}
const downloadPreview = ()=>{
  const dom = document.getElementById("previewContent")
  if(dom){
    downloadHtml(dom,"变现")
  }
}
</script>

<style lang="scss" scoped>
.transform{
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