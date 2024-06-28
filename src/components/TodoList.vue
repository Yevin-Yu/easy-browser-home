<template>
  <div class="content">
    <div class="left-content">
      <div class="title">Todo</div>
      <div class="centont-todo-list">
        <div class="left-list">
          <div @click="todoItemClick(item)" v-for="item in 20" :key="item"
               :class="{ 'left-list-item': true, active: item === todoActive }">
            ToDo List 工作任务ToDo List 工作任务
          </div>
        </div>
        <div class="right-main" tabindex="1">
          <el-input v-model="text" maxlength="10" placeholder="Name" show-word-limit type="text" />
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="title">Memo</div>
      <div class="centont-memo">
        <div class="left-list">
          <div @click="memoItemClick(item)" v-for="item in 10" :key="item"
               :class="{ 'left-list-item': true, active: item === memoActive }">
            ToDo List 工作任务ToDo List 工作任务
          </div>
        </div>
        <div class="right-main" tabindex="1">
          <textarea class="memo-textarea" v-model="textarea"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>


<style>


.nav .content {
  width: 68vw;
  height: 50vh;
  background-color: #fff;
  margin: 10vh auto;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  box-shadow: 5px 5px 5px rgba(255, 255, 255, 0.2);
  display: flex;
  position: relative;
  overflow: auto;
}

.nav .content::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

.nav .content::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}

.nav .content .title {
  text-align: center;
  margin: 0 auto;
  width: 60%;
  background-color: #fff;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
  border-radius: 4px;
  color: #fff;
  padding: 4px;
  backdrop-filter: blur(5px);
  letter-spacing: 2px;
  font-size: 14px;
  margin-bottom: 10px;
}

.nav .content .left-list {
  background-color: #ffffff88;
  width: 200px;
  height: 100%;
  border-radius: 4px;
  overflow: auto;
  padding: 10px;
  box-sizing: border-box;
}

.nav .content .left-list::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

.nav .content .left-list::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}

.nav .content .left-list .left-list-item {
  margin: 5px 5px 10px 10px;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  border-radius: 8px;
  background: linear-gradient(90deg, #ebbd9286 0, #a96aa284 58%);
  overflow: hidden;
  padding: 0 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  transition: 0.3s;
  left: 0;
}

.nav .content .left-list .left-list-item.active {
  background: linear-gradient(90deg, #ebbd92 0, #a96aa2 58%);
  left: 15px;
  line-height: 38px;
  border-radius: 8px 0 0 8px;
}

.nav .content .right-main {
  height: 100%;
  width: 100%;
  background-color: #ffffff88;
  flex: 1;
  overflow: auto;
  border-radius: 4px;
  margin-left: 2px;
  box-sizing: border-box;
  overflow: hidden;
}

.nav .content .centont-todo-list .right-main {
  padding: 12px;
}

.nav .content .right-main:focus {
  box-shadow: 0 0px 3px 3px #a96aa2b0 inset;
}

.nav .content .right-main .memo-textarea {
  margin: 0;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  font-size: 18px;
  background-color: transparent;
  color: #333;
  line-height: 26px;
  box-sizing: border-box;
  padding: 10px;
  resize: none;
}

.nav .content .right-main .memo-textarea:focus {
  box-shadow: 0 0px 3px 3px #a96aa2b0 inset;
}

.nav .content .right-main .memo-textarea::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: transparent;
}

.nav .content .right-main .memo-textarea::-webkit-scrollbar-thumb {
  width: 5px;
  height: 5px;
  border-radius: 2px;
  background: linear-gradient(0deg, #ebbd92 0, #a96aa2 58%);
}

.nav .content .centont-todo-list,
.nav .content .centont-memo {
  display: flex;
  height: calc(100% - 40px);
}

.nav .content .left-content {
  padding: 12px;
  width: 50%;
  height: 100%;
  /* background-color: pink; */
  flex: 1;
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
}

.nav .content .right-content {
  padding: 12px;
  width: 50%;
  height: 100%;
  /* background-color: red; */
  flex: 1;
  border-left: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
}
</style>