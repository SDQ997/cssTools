<template>
  <div class="Diamond" :style="{width:option.width,height:option.height,background:option.color}">
    
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"Diamond"
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
.Diamond{
  transform: rotate(45deg);
}
</style>