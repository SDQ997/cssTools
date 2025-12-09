<template>
  <div class="home">
    <span id="title" class="animate__animated animate__lightSpeedInLeft">欢迎使用CSS工具站</span>
    <span id="desc" class="animate__animated animate__lightSpeedInLeft">CSS工具站是一款专注于CSS的在线可视化编辑平台</span>
    <span id="desc" class="animate__animated animate__lightSpeedInLeft">通过可视化面板，你可以快速生成渐变、阴影、边框等CSS代码</span>
    <span id="desc" class="animate__animated animate__lightSpeedInLeft">无论你是前端新手还是设计师，都能在这里更快地调试、预览与生成CSS</span>
    <span id="desc" class="animate__animated animate__lightSpeedInLeft">By SDQ</span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"home"
})
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  gap:10px;
  #title{
    font-size: 5rem;
    font-weight: 300;
  }
  #desc{
    font-size: 1.3rem;
    font-weight: 200;
    letter-spacing: 6px;
  }
}
</style>