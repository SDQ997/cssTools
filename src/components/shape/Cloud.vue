
<template>
  <div class="Cloud" :style="{width:option.width,height:option.height}">
    <div class="Cloud1" :style="{background:option.color}"></div>
    <div class="Cloud2" :style="{background:option.color}"></div>
    <div class="Cloud3" :style="{background:option.color}"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"Cloud"
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
.Cloud{
  position: relative;
 .Cloud1{
  width: 100%;
  height: 20%;
  position: absolute;
  bottom: 0;
  border-radius: 50px;
 }
 .Cloud2{
  position: absolute;
  width:30%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  bottom: 0;
  right:10%;
 }
 .Cloud3{
  position: absolute;
  width: 50%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  bottom: 0;
  left: 50%;
  transform: translateX(-60%);
 }
}
</style>