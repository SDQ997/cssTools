<template>
  <div class="CtPositionSelect" :id="domId" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" @mouseleave="mouseleave">
    <div class="center" :style="{'left':center[0],'top':center[1]}"></div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"CtPositionSelect"
})
let domId = ref<string>("")
let center = ref<string[]>(["50%","50%"])
const props = withDefaults(defineProps<{
  modelValue:string[]
}>(),{
  modelValue:()=>["50%","50%"]
})
const emit = defineEmits(["update:modelValue","change"])
let isDown = ref(false)
onBeforeMount(()=>{
  domId.value = "id_" + Math.random().toString(36).slice(2, 10)
})
onMounted(()=>{
  center.value = props.modelValue
})
const mousedown = ($event:any)=>{
  isDown.value = true
}
const mouseup = ($event:any)=>{
  isDown.value = false
}
const mouseleave = ($event:any)=>{
  isDown.value = false
}
const mousemove = ($event:any)=>{
  if(isDown.value){
    clickPosition($event)
  }
}
const clickPosition = ($event:any)=>{
  const dom = document.getElementById(domId.value)
  const domWidth = dom?.clientWidth || 0
  const domHeight = dom?.clientHeight || 0
  const positionX = Math.floor($event.offsetX / domWidth * 100)
  const positionY = Math.floor($event.offsetY / domHeight * 100)
  center.value = [positionX+"%",positionY+"%"]
  emit("update:modelValue",center.value)
  emit("change",center.value)
}
watch(()=>props.modelValue,()=>{
  center.value = props.modelValue
})
</script>

<style lang="scss" scoped>
.CtPositionSelect{
  width: 100%;
  aspect-ratio: 1 / 0.5;
  background-color: var(--bg);
  position: relative;
  cursor: pointer;
  .center{
    pointer-events: none;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid white;
  }
}
</style>