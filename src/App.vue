<template>
  <router-view/>
</template>

<style lang="scss">
.el-switch__label{
  color: white !important;
}
.el-switch{
  .is-active{
    color: var(--primary) !important;
  }
}
:root {
  --primary: #4ea6fe;
  --secondary: #22D3EE;

  --bg: #0F172A;
  --card: #1E293B;
  --border: #334155;

  --text: #E2E8F0;
  --text-sub: #94A3B8;

  --accent: #8B5CF6;
}
body,html{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "PINGFANG";
}
*, *::before, *::after {
  box-sizing: inherit;
}
#app {
  width: 100%;
  height: 100%;
}
*::-webkit-scrollbar {
  width: 0; /* 隐藏垂直滚动条 */
  height: 0; /* 隐藏水平滚动条 */
}
.optionsCard{
  width: 20%;
  min-width: 400px;
  height: 100%;
  border-radius: 12px;
  display: inline-block;
  .title{
    height: 50px;
    line-height: 50px;
    font-size: 1.5rem;
    color: white;
    font-weight: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    gap:5px;
    background-color: var(--card);
    border-radius: 6px;
    img{
      width: 20px;
      opacity: 0.8;
    }
  } 
  .optionsCardContent{
    width: 100%;
    height: calc(100% - 50px - 10px);
    margin-top: 10px;
    background-color: var(--card);
    display: inline-block;
    overflow-y: auto;
    border-radius: 6px;
    padding-bottom: 10px;
    .optionsCardForm{
      transition: all .2s;
      margin-top: 10px;
    }
    .optionsCardFormClose{
      height: 0;
      overflow: hidden;
    }
    .cardTitle{
      margin: 0 12px;
      color: white;
      font-size: 1.1rem;
      position: relative;
      display: flex;
      align-items: center;
      gap:10px;
      span{
        margin-left: 12px;
      }
    }
    .cardTitle::after{
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: var(--primary);
      border-radius: 50%;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .optionsItem{
      margin:20px 12px;
      display: flex;
      align-items: center;
      gap:10px;
      color: white;
      font-weight: 300;
      .optionsLabel{
      }
      .optionsValue{
        flex: 1;
      }
    }
    .cardCollapse{
      width: calc(100% - 24px);
      margin-left: 12px;
      padding: 5px 0;
      background-color: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-sub);
      cursor: pointer;
      transition: all .2s;
      border-radius: 4px;
      .icon{
        transition: all .2s;
      }
    }
    .cardCollapse:hover{
      background-color: rgba(255,255,255,.2);
    }
  }
}
.optionsPreview{
  flex: 1;
  height: 100%;
  .optionsPreviewInfo{
     width: 100%;
    padding: 0 20px;
    height: 50px;
    border-radius: 4px;
    background-color: var(--card);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: 300;
    .previewTitle{
      display: flex;
      align-items: center;
      gap:5px;
    }
    .privewAction{
      display: flex;
      align-items: center;
      gap:15px;
      font-size: 1.2rem;
      .actionItem{
        cursor: pointer;
      }
    }
  }
  .previewContent{
    width: 100%;
    height: calc(100% - 50px - 10px);
    margin-top: 10px;
    border-radius: 4px;
    background-color: var(--card);
  }
}
</style>
