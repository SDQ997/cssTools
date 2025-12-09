
<template>
  <div class="Triangle" :style="{
    borderLeft:`${option.width} solid transparent`,
    borderRight:`${option.width} solid transparent`,
    borderBottom:`${option.height} solid ${option.color}`,
    }">
    
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
.Triangle{
  width: 0;
  height: 0;
  border-top: none;
}
</style>