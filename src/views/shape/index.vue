<template>
  <div class="shape">
    <div class="optionsCard">
      <div class="title">
        <img src="@/assets/shape.png" alt="">
        <span>形状</span>
      </div>
      <div class="optionsCardContent">
        <div class="optionsCardForm">
          <div class="shapeList">
            <div :class="['shapeItem',item.id == chooseItem.id ? 'shapeItemActive' : '']" 
            v-for="(item,index) in shapeList" :key="index" @click="chooseShape(item)">
              <div class="shapeBox">
                <component :is="item.component" :options="item.options"></component>
              </div>
              <div class="shapeName">
                <span>{{ item.name }}</span>
              </div>
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
          
        </div> 
      </div>
      <div class="previewContent">
        <div class="codeList">
          <div class="codeItem">
            <div class="codeTitle">
              <span>Html</span>
              <el-tooltip effect="dark" content="复制" placement="top">
                <div class="actionItem" @click="copyHtmlCode">
                  <el-icon><CopyDocument /></el-icon>
                </div>
              </el-tooltip>
            </div>
            <div class="codeBox">
              <code v-html="chooseItem.htmlCode">
              </code>
            </div>
          </div>
          <div class="codeItem">
            <div class="codeTitle">
              <span>Scss</span>
              <el-tooltip effect="dark" content="复制" placement="top">
                <div class="actionItem" @click="copyCssCode">
                  <el-icon><CopyDocument /></el-icon>
                </div>
              </el-tooltip>
            </div>
            <div class="codeBox">
              <code v-html="chooseItem.cssCode">
              </code>
            </div>
          </div>
        </div>
        <component :is="chooseItem.component" :options="chooseItem.options"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"shape"
})
import { copy } from "@/common/common"
interface shapeListItem{
  name:string,
  id:string,
  component:any,
  options:any,
  previewOptions:any,
  htmlCode:string,
  cssCode:string
}
const shapeList = shallowRef<shapeListItem[]>([
  {
    name:"正方形",
    id:"square",
    component:defineAsyncComponent(() => import("@/components/shape/Square.vue")),
    htmlCode:`&lt;div class="Square"&gt;<br>&lt;div&gt;`,
    cssCode:`.Square{<br>
    &ensp;&ensp;width:100px;<br>
    &ensp;&ensp;height:100px;<br>
    &ensp;&ensp;background:#459CFE;<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw'
    },
    options:{
      width:'2vw',
      height:'2vw'
    }
  },
  {
    name:"长方形",
    id:"rectangle",
    component:defineAsyncComponent(() => import("@/components/shape/Rectangle.vue")),
    htmlCode:`&lt;div class="Rectangle"&gt;<br>&lt;div&gt;`,
    cssCode:`.Rectangle{<br>
    &ensp;&ensp;width:200px;<br>
    &ensp;&ensp;height:100px;<br>
    &ensp;&ensp;background:#459CFE;<br>
    }`,
    previewOptions:{
      width:'30vw',
      height:'15vw'
    },
    options:{
      width:'4vw',
      height:'2vw'
    }
  },
  {
    name:"三角形",
    id:"triangle",
    component:defineAsyncComponent(() => import("@/components/shape/Triangle.vue")),
    htmlCode:`&lt;div class="Triangle"&gt;<br>&lt;div&gt;`,
    cssCode:`.Triangle{<br>
    &ensp;&ensp;width:0;<br>
    &ensp;&ensp;height:0;<br>
    &ensp;&ensp;border-left:150px solid transparent;<br>
    &ensp;&ensp;border-right:150px solid transparent;<br>
    &ensp;&ensp;border-bottom:150px solid #459CFE;<br>
    &ensp;&ensp;border-top:none;<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw'
    },
    options:{
      width:'2vw',
      height:'2vw'
    }
  },
  {
    name:"圆形",
    id:"circle",
    component:defineAsyncComponent(() => import("@/components/shape/Circle.vue")),
    htmlCode:`&lt;div class="Circle"&gt;<br>&lt;div&gt;`,
    cssCode:`.Circle{<br>
      &ensp;&ensp;width:100px;<br>
      &ensp;&ensp;height:100px;<br>
      &ensp;&ensp;background:#459CFE;<br>
      &ensp;&ensp;border-radius: 50%;<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw'
    },
    options:{
      width:'2vw',
      height:'2vw'
    }
  },
  {
    name:"椭圆形",
    id:"ellipse",
    component:defineAsyncComponent(() => import("@/components/shape/Ellipse.vue")),
    htmlCode:`&lt;div class="Ellipse"&gt;<br>&lt;div&gt;`,
    cssCode:`.Ellipse{<br>
      &ensp;&ensp;width:200px;<br>
      &ensp;&ensp;height:100px;<br>
      &ensp;&ensp;background:#459CFE;<br>
      &ensp;&ensp;border-radius: 50%;<br>
    }`,
    previewOptions:{
      width:'30vw',
      height:'15vw'
    },
    options:{
      width:'4vw',
      height:'2vw'
    }
  },
  {
    name:"菱形",
    id:"diamond",
    component:defineAsyncComponent(() => import("@/components/shape/Diamond.vue")),
    htmlCode:`&lt;div class="Diamond"&gt;<br>&lt;div&gt;`,
    cssCode:`.Diamond{<br>
    &ensp;&ensp;width:100px;<br>
    &ensp;&ensp;height:100px;<br>
    &ensp;&ensp;background:#459CFE;<br>
    &ensp;&ensp;transform: rotate(45deg);<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw'
    },
    options:{
      width:'2vw',
      height:'2vw'
    }
  },
  {
    name:"平行四边形",
    id:"parallelogram",
    component:defineAsyncComponent(() => import("@/components/shape/Parallelogram.vue")),
    htmlCode:`&lt;div class="Parallelogram"&gt;<br>&lt;div&gt;`,
    cssCode:`.Parallelogram{<br>
    &ensp;&ensp;width:100px;<br>
    &ensp;&ensp;height:100px;<br>
    &ensp;&ensp;background:#459CFE;<br>
    &ensp;&ensp;transform: skew(15deg);;<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw'
    },
    options:{
      width:'2vw',
      height:'2vw'
    }
  },
  {
    name:"心形",
    id:"heart",
    component:defineAsyncComponent(() => import("@/components/shape/Heart.vue")),
    htmlCode:`&lt;div class="Heart"&gt;<br>
    &ensp;&ensp;&lt;div class="heartDom heart1"&gt;<br>
    &ensp;&ensp;&lt;div class="heartDom heart2"&gt;<br>
    &lt;div&gt;`,
    cssCode:`.Heart{<br>
    &ensp;&ensp;position: relative;<br>
    &ensp;&ensp;width: 200px;<br>
    &ensp;&ensp;height: 200px;<br>
    &ensp;&ensp;.heartDom{<br>
    &ensp;&ensp;&ensp;&ensp;width: 100px;<br>
    &ensp;&ensp;&ensp;&ensp;height: 150px;<br>
    &ensp;&ensp;&ensp;&ensp;position: absolute;<br>
    &ensp;&ensp;&ensp;&ensp;top: 0;<br>
    &ensp;&ensp;&ensp;&ensp;border-top-left-radius: 150px;<br>
    &ensp;&ensp;&ensp;&ensp;border-top-right-radius: 150px;<br>
    &ensp;&ensp;&ensp;&ensp;background:pink;<br>
    &ensp;&ensp;}<br>
    &ensp;&ensp;.heart1{<br>
    &ensp;&ensp;&ensp;&ensp;left: 0;<br>
    &ensp;&ensp;&ensp;&ensp;transform: rotate(-45deg) translateX(10%);<br>
    &ensp;&ensp;}<br>
    &ensp;&ensp;.heart2{<br>
    &ensp;&ensp;&ensp;&ensp;right: 0;<br>
    &ensp;&ensp;&ensp;&ensp;transform: rotate(45deg) translateX(-10%);<br>
    &ensp;&ensp;}<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw',
      color:"pink"
    },
    options:{
      width:'2vw',
      height:'2vw',
      color:"pink"
    }
  },
  {
    name:"云",
    id:"cloud",
    component:defineAsyncComponent(() => import("@/components/shape/Cloud.vue")),
    htmlCode:`&lt;div class="Cloud"&gt;<br>
    &ensp;&ensp;&lt;div class="Cloud1"&gt;&lt;/div&gt;<br>
    &ensp;&ensp;&lt;div class="Cloud2"&gt;&lt;/div&gt;<br>
    &ensp;&ensp;&lt;div class="Cloud3"&gt;&lt;/div&gt;<br>
    &lt;/div&gt;`,
    cssCode:`.Cloud{<br>
    &ensp;&ensp;width: 200px;<br>
    &ensp;&ensp;height: 200px;<br>
    &ensp;&ensp;position: relative;<br>
    &ensp;&ensp;.Cloud1{<br>
    &ensp;&ensp;&ensp;&ensp;width: 100%;<br>
    &ensp;&ensp;&ensp;&ensp;height: 20%;<br>
    &ensp;&ensp;&ensp;&ensp;position: absolute;<br>
    &ensp;&ensp;&ensp;&ensp;bottom: 0;<br>
    &ensp;&ensp;&ensp;&ensp;border-radius: 50px;<br>
    &ensp;&ensp;&ensp;&ensp;background: #FFFFFF;<br>
    &ensp;&ensp;}<br>
    &ensp;&ensp;.Cloud2{<br>
    &ensp;&ensp;&ensp;&ensp;position: absolute;<br>
    &ensp;&ensp;&ensp;&ensp;width: 30%;<br>
    &ensp;&ensp;&ensp;&ensp;aspect-ratio: 1 / 1;<br>
    &ensp;&ensp;&ensp;&ensp;border-radius: 50%;<br>
    &ensp;&ensp;&ensp;&ensp;bottom: 0;<br>
    &ensp;&ensp;&ensp;&ensp;right: 10%;<br>
    &ensp;&ensp;&ensp;&ensp;background: #FFFFFF;<br>
    &ensp;&ensp;}<br>
    &ensp;&ensp;.Cloud3{<br>
    &ensp;&ensp;&ensp;&ensp;position: absolute;<br>
    &ensp;&ensp;&ensp;&ensp;width: 50%;<br>
    &ensp;&ensp;&ensp;&ensp;aspect-ratio: 1 / 1;<br>
    &ensp;&ensp;&ensp;&ensp;border-radius: 50%;<br>
    &ensp;&ensp;&ensp;&ensp;bottom: 0;<br>
    &ensp;&ensp;&ensp;&ensp;left: 50%;<br>
    &ensp;&ensp;&ensp;&ensp;transform: translateX(-60%);<br>
    &ensp;&ensp;&ensp;&ensp;background: #FFFFFF;<br>
    &ensp;&ensp;}<br>
    }`,
    previewOptions:{
      width:'15vw',
      height:'15vw',
      color:"white"
    },
    options:{
      width:'2vw',
      height:'2vw',
      color:"white"
    }
  }
])
let chooseItem = shallowRef<shapeListItem[] | null>(null)
const componentRefs = ref({})
const chooseShape = (item:shapeListItem[])=>{
  chooseItem.value = {
    ...item,
    options:item.previewOptions
  }
}
onBeforeMount(()=>{
  let item = shapeList.value[0]
  chooseItem.value = {
    ...item,
    options:item.previewOptions
  }
})
const decodeHtml = (str: string)=>{
  // 1. 去掉 <br> 替换为换行
  let result = str.replace(/<br\s*\/?>/gi, "\n");
  // 2. 去掉 &ensp; （替换成空格）
  result = result.replace(/&ensp;/gi, " ");
  // 3. 利用 textarea 反转义 HTML 实体
  const txt = document.createElement("textarea");
  txt.innerHTML = result;
  return txt.value;
}
const copyHtmlCode = ()=>{
  copy(decodeHtml(chooseItem.value.htmlCode))
  // copy(decodeCode(chooseItem.value.htmlCode))
}
const copyCssCode = ()=>{
  copy(decodeHtml(chooseItem.value.cssCode))
  // copy(decodeCode(chooseItem.value.cssCode))
}
</script>

<style lang="scss" scoped>
.shape{
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  gap:20px;
  .optionsCard{
    .shapeList{
      width: 100%;
      padding: 0 12px;
      display: flex;
      flex-wrap: wrap;
      gap:12px;
      .shapeItem{
        width: calc((100% - 3 * 12px) / 4);
        aspect-ratio: 1 / 1;
        border-radius: 4px;
        transition: all .2s;
        cursor: pointer;
        .shapeBox{
          width: 100%;
          height: calc(100% - 40px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .shapeName{
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: white;
        }
      }
      .shapeItemActive{
        background-color: rgba(255,255,255,.2);
      }
      .shapeItem:hover{
        background-color: rgba(255,255,255,.2);
      }
    }
  }
  .optionsPreview{
    .previewContent{
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .codeList{
        position: absolute;
        min-width: 400px;
        width: 30%;
        height: calc(100% - 24px);
        top: 12px;
        left: 12px;
        display: flex;
        flex-direction: column;
        gap:12px;
        .codeItem{
          width: 100%;
          height: calc((100% - 12px * 2) / 2);
          background-color: var(--bg);
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #d3d3d3;
          box-sizing: border-box;
          opacity: 0.3;
          transition: all .2s;
          .codeTitle{
            width: 100%;
            height: 30px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #d3d3d3;
            span{
              font-weight: 500;
              color: black;
            }
            .actionItem{
              cursor: pointer;
            }
          }
          .codeBox{
            height: calc(100% - 30px);
            padding:12px;
            overflow-y: auto;
            color: white;
          }
        }
        .codeItem:hover{
          opacity: 1;
        }
      }
    }
  }
}
</style>