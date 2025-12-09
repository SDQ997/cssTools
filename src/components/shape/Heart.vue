
<template>
  <!-- <div class="Triangle" :style="{
    borderLeft:`${option.width} solid transparent`,
    borderRight:`${option.width} solid transparent`,
    borderBottom:`${option.height} solid ${option.color}`,
    }">
    
  </div> -->
  <div class="Heart" :style="{width:option.width,height:option.height}">
    <div class="heartDom heart1" :style="{width:`calc(${option.width} / 1.5)`,height:option.height,background:option.color}"></div>
    <div class="heartDom heart2" :style="{width:`calc(${option.width} / 1.5)`,height:option.height,background:option.color}"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"Triangle"
})
interface optionsItem{
  width:string,
  height:string,
  color:string,
}
const props = withDefaults(defineProps<{
  options:optionsItem
}>(),{
  options:()=>({
    width:'100px',
    height:'100px',
    color:'var(--primary)'
  })
})
let option = ref<optionsItem>({
  width:'100px',
  height:'100px',
  color:'var(--primary)'
})
onMounted(()=>{
  option.value.width = props.options.width || option.value.width
  option.value.height = props.options.height || option.value.height
  option.value.color = props.options.color || option.value.color
})
</script>

<style lang="scss" scoped>
.Heart{
  position: relative;
}
.heartDom{
  position: absolute;
  border-top-left-radius: 150px;
  border-top-right-radius: 150px;
}
.heart1{
  left: 0;
  top: 0;
  transform: rotate(-45deg) translateX(10%);
}
.heart2{
  right: 0;
  top: 0;
  transform: rotate(45deg) translateX(-10%);
}
</style>