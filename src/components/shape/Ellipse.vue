<template>
  <div class="Ellipse" :style="{width:option.width,height:option.height,background:option.color}">
    
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"Ellipse"
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
.Ellipse{
  border-radius: 50%;
}
</style>