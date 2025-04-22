```html
<script setup>
// 从自定义组合式函数模块中导入 useTodos 函数
import { useTodos } from '@/composables/useTodos'

// 定义组件接收的 props
const props = defineProps({
  // 任务状态筛选条件，默认为显示所有任务
  filter: {
    type: String,
    default: 'all'
  },
  // 任务重要性筛选条件，默认为显示所有重要性的任务
  importanceFilter: {
    type: String,
    default: 'all'
  }
})

// 定义组件要触发的事件
const emit = defineEmits(['update:filter', 'update:importanceFilter'])

// 调用 useTodos 函数，获取待办事项的统计信息
const { todoStats } = useTodos()

// 触发更新任务状态筛选条件的事件
function setFilter(value) {
  emit('update:filter', value)
}

// 触发更新任务重要性筛选条件的事件
function setImportanceFilter(value) {
  emit('update:importanceFilter', value)
}
</script>

<template>
  <!-- 包含筛选条件按钮的容器 -->
  <div class="space-y-4 bg-white p-4 rounded-lg shadow-md dark:bg-gray-800">
    <!-- 任务状态筛选部分 -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- 筛选条件标签 -->
      <span class="text-gray-600 font-medium dark:text-gray-200">状态:</span>

      <!-- 筛选按钮容器 -->
      <div class="flex flex-wrap gap-2">
        <!-- 显示所有任务的按钮 -->
        <button
            @click="setFilter('all')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          所有 ({{ todoStats.total }})
        </button>

        <!-- 显示活跃任务的按钮 -->
        <button
            @click="setFilter('active')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'active'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          活跃 ({{ todoStats.incomplete }})
        </button>

        <!-- 显示已完成任务的按钮 -->
        <button
            @click="setFilter('completed')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.filter === 'completed'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          已完成 ({{ todoStats.completed }})
        </button>
      </div>
    </div>

    <!-- 任务重要性筛选部分 -->
    <div class="flex flex-wrap items-center gap-4">
      <!-- 筛选条件标签 -->
      <span class="text-gray-600 font-medium dark:text-gray-200">重要性:</span>

      <!-- 筛选按钮容器 -->
      <div class="flex flex-wrap gap-2">
        <!-- 显示所有重要性任务的按钮 -->
        <button
            @click="setImportanceFilter('all')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'all'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          所有 ({{ todoStats.total }})
        </button>

        <!-- 显示低重要性任务的按钮 -->
        <button
            @click="setImportanceFilter('low')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'low'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          低 ({{ todoStats.lowPriority }})
        </button>

        <!-- 显示普通重要性任务的按钮 -->
        <button
            @click="setImportanceFilter('normal')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'normal'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          普通 ({{ todoStats.normalPriority }})
        </button>

        <!-- 显示高重要性任务的按钮 -->
        <button
            @click="setImportanceFilter('high')"
            class="px-3 py-1 rounded-full text-sm font-medium transition-colors"
            :class="props.importanceFilter === 'high'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'"
        >
          高 ({{ todoStats.highPriority }})
        </button>
      </div>
    </div>
  </div>
</template>
```