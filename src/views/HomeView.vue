<script setup>
// 从组合式函数模块引入 useTodos 函数
import { useTodos } from '../composables/useTodos'
// 引入基础按钮组件
import BaseButton from '../components/common/BaseButton.vue'
// 引入待办事项统计卡片组件
import TodoStatsCard from '../components/todo/TodoStatsCard.vue'

// 调用 useTodos 函数并解构获取待办事项统计信息
const { todoStats } = useTodos()
</script>

<template>
  <div>
    <!-- 页面顶部标题和介绍部分 -->
    <div class="text-center mb-12 mt-8">
      <!-- 主标题 -->
      <h1 class="text-4xl font-bold text-gray-800 mb-4 dark:text-gray-100">
        欢迎使用 Vue 待办事项应用
      </h1>
      <!-- 副标题 -->
      <p class="text-xl text-gray-600 dark:text-gray-300">
        简单高效的任务管理
      </p>

      <!-- 前往任务页面的按钮 -->
      <div class="mt-8">
        <BaseButton
            to="/todos"
            variant="primary"
            size="lg"
        >
          前往任务页面
        </BaseButton>
      </div>
    </div>

    <!-- 当存在待办事项时显示待办事项统计卡片 -->
    <TodoStatsCard v-if="todoStats.total > 0" class="max-w-lg mx-auto" />

    <!-- 应用功能介绍部分 -->
    <div class="mt-16 max-w-2xl mx-auto">
      <!-- 功能介绍标题 -->
      <h2 class="text-2xl font-semibold mb-6 text-center dark:text-gray-100">
        应用功能
      </h2>

      <!-- 功能介绍网格布局 -->
      <div class="grid md:grid-cols-2 gap-6">
        <!-- 本地存储功能介绍 -->
        <div class="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg dark:shadow-gray-900">
          <h3 class="text-lg font-semibold mb-2">本地存储</h3>
          <p class="text-gray-600 dark:text-gray-300">
            您的任务会保存在浏览器中，即使页面重新加载也能继续访问。
          </p>
        </div>

        <!-- 简单界面功能介绍 -->
        <div class="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg dark:shadow-gray-900">
          <h3 class="text-lg font-semibold mb-2">简洁界面</h3>
          <p class="text-gray-600 dark:text-gray-300">
            直观的任务管理，操作步骤极少。
          </p>
        </div>

        <!-- 统计功能介绍 -->
        <div class="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg dark:shadow-gray-900">
          <h3 class="text-lg font-semibold mb-2">统计功能</h3>
          <p class="text-gray-600 dark:text-gray-300">
            方便跟踪您的任务完成进度。
          </p>
        </div>

        <!-- 自适应设计功能介绍 -->
        <div class="bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg dark:shadow-gray-900">
          <h3 class="text-lg font-semibold mb-2">自适应设计</h3>
          <p class="text-gray-600 dark:text-gray-300">
            适用于所有设备 — 从手机到桌面电脑。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>