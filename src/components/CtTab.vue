<template>
  <div :class="['CtTab',props.gap ? 'CtTabGap':'']">
    <div 
    :class="['CtTabItem' , active == item ? 'CtTabItemActive':'']" 
    v-for="(item,index) in props.list" :key="index"
    @click="changeTab(item)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name:"CtTab"
})
const props = withDefaults(defineProps<{
  list: (string | number)[]
  gap?: boolean,
  modelValue:string | number
}>(),{
  gap:false,
  modelValue:""
})
let active = ref<string | number>("")
onMounted(()=>{
  active.value = props.modelValue
})
const emit = defineEmits<{
  "update:modelValue":[string | number],
  "change":[string | number]
}>()
const changeTab = (item:string | number)=>{
  active.value = item
  emit("update:modelValue",active.value)
  emit("change",active.value)
}
watch(()=>props.modelValue,()=>{
  active.value = props.modelValue
})
</script>

<style lang="scss" scoped>
.CtTab{
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  .CtTabItem{
    height: 35px;
    line-height: 35px;
    padding: 0 12px;
    font-size: 0.8rem;
    color: white;
    cursor: pointer;
    font-weight: 400;
    box-sizing: border-box;
    background-color: rgb(75, 75, 75);
    transition: all .2s;
  }
  .CtTabItem:last-child{
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .CtTabItemActive{
    background-color: var(--primary);
    color: white;
  }
}
.CtTabGap{
  gap:10px;
  .CtTabItem{
    border-radius: 4px;
  }
}
</style>