<script setup>
// 从自定义组合式函数模块中导入 useTodos 函数
import { useTodos } from '@/composables/useTodos'
// 导入自定义的基础按钮组件
import BaseButton from '../common/BaseButton.vue'

// 定义组件接收的 props
const props = defineProps({
  // 待办事项对象，为必填项
  todo: {
    type: Object,
    required: true
  }
})

// 从 useTodos 函数返回的对象中解构出切换任务完成状态和删除任务的函数
const { toggleTodo, removeTodo } = useTodos()

// 确认删除任务的函数
function confirmDelete() {
  if (confirm('您确定要删除这个任务吗？')) {
    removeTodo(props.todo.id)
  }
}

// 不同重要性级别的任务对应的样式对象
const importanceStyles = {
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  normal: 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300',
  high: 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300'
}
</script>

<template>
  <!-- 待办事项卡片容器 -->
  <div
      class="bg-white rounded-lg shadow p-4 transition-all dark:bg-gray-800 dark:text-gray-100"
      :class="{ 'opacity-75': props.todo.completed }"
  >
    <div class="flex items-center">
      <!-- 任务完成状态切换按钮 -->
      <div
          class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
          :class="[
          props.todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-400 dark:border-gray-600'
        ]"
          @click="toggleTodo(props.todo.id)"
      >
        <!-- 任务完成时显示的对勾图标 -->
        <svg
            v-if="props.todo.completed"
            class="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- 任务标题和描述容器 -->
      <div class="flex-grow">
        <div class="flex items-center">
          <!-- 任务标题 -->
          <span
              class="font-medium"
              :class="{
              'line-through text-gray-500 dark:text-gray-400': props.todo.completed
            }"
          >
            {{ props.todo.title }}
          </span>

          <!-- 任务重要性标签 -->
          <span
              class="ml-2 px-2 py-0.5 text-xs rounded-full"
              :class="importanceStyles[props.todo.importance || 'normal']"
          >
            <!-- 显示任务重要性，若未设置则显示“普通” -->
            {{ props.todo.importance || '普通' }}
          </span>
        </div>

        <!-- 任务描述，若有则显示，最多显示一行 -->
        <p v-if="props.todo.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
          {{ props.todo.description }}
        </p>
      </div>

      <!-- 操作按钮容器 -->
      <div class="flex space-x-2">
        <!-- 查看任务详情按钮 -->
        <BaseButton
            :to="`/todos/${props.todo.id}`"
            variant="secondary"
            size="sm"
        >
          详情
        </BaseButton>
        <!-- 删除任务按钮 -->
        <BaseButton
            @click="confirmDelete"
            variant="danger"
            size="sm"
        >
          删除
        </BaseButton>
      </div>
    </div>
  </div>
</template>