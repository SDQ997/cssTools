<template>
  <div class="index">
    <div class="header">
      <div class="tabList">
        <div class="logo" @click="pageTo({name:'',routeName:'/'})">
          <img src="@/assets/logo.png" alt="" id="logo">
          <span>CSS工具站</span>
        </div>
        <div 
        class="tab" 
        v-for="(item,index) in tabList" :key="index" 
        @click="pageTo(item)">{{ item.name }}</div>
      </div>
    </div>
    <div class="content">
      <!-- <transition :name="transitionName" mode="out-in"> -->
        <router-view />
      <!-- </transition> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface TabItem {
    name:string,
    routeName:string
  }
  const tabList = ref<TabItem[]>([
    {name:"渐变色",routeName:"gradient"},
    {name:"阴影",routeName:"shadow"},
    {name:"边框",routeName:"border"},
    {name:"变形",routeName:"transform"},
    {name:"滤镜",routeName:"filter"},
    {name:"形状",routeName:"shape"},
  ])
  let transitionName = ref("slide-left")
  const route = useRoute()
  // let routeName = ref<string>(route.name)
  const router = useRouter()
  const pageTo = (item:TabItem)=>{
    if(item.routeName){
      router.push(item.routeName)
    }
  }
  const getTabIndex = (routeName: string) => {
    return tabList.value.findIndex(tab => tab.routeName === routeName)
  }
  watch(
    () => route.name,
    (toName, fromName) => {
      const toIndex = getTabIndex(toName as string)
      const fromIndex = getTabIndex(fromName as string)
      if (toIndex === -1 || fromIndex === -1) return

      transitionName.value = toIndex > fromIndex ? 'slide-left' : 'slide-right'
    },
    { immediate: true }
  )
</script>
<style>
/* 左右滑动动画 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
<style lang="scss" scope>
.index{
  width: 100%;
  height: 100%;
  .header{
    width: 100%;
    height: 50px;
    background-color: var(--card);
    display: flex;
    justify-content: center;
    align-items: center;
    .tabList{
      width: 100%;
      max-width: 1080px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .logo{
        display: flex;
        align-items: center;
        color: white;
        margin: 0 12px;
        gap:5px;
        cursor: pointer;
      }
      #logo{
        width: 30px;
        height: 30px;
        // filter: brightness(0) invert(1);
      }
      .tab{
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        color: white;
        font-weight: 400;
        cursor: pointer;
        transition: all .2s;
      }
      .tab:hover{
        background-color: rgba(255,255,255,.2);
      }
      .tab:active{
        background-color: rgba(255,255,255,.5);
      }
    }
  }
  .content{
    width: 100%;
    height: calc(100% - 50px);
    background-color: var(--bg);
  }
}
</style>