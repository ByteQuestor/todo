<script setup>
// 从 Vue 导入 ref 和 watch 函数
import { ref, watch } from 'vue'
// 导入自定义的基础输入框组件
import BaseInput from '../common/BaseInput.vue'

// 定义组件接收的 props
const props = defineProps({
  // 搜索查询字符串，默认为空字符串
  searchQuery: {
    type: String,
    default: ''
  },
  // 搜索结果的总数，默认为 0
  totalResults: {
    type: Number,
    default: 0
  },
  // 待办事项的总数，默认为 0
  totalTodos: {
    type: Number,
    default: 0
  }
})

// 定义要触发的事件
const emit = defineEmits(['update:searchQuery', 'clearSearch'])

// 创建一个本地的响应式变量，初始值为 props 中的 searchQuery
const localSearchQuery = ref(props.searchQuery)

// 监听 props 中 searchQuery 的变化，若变化则更新本地变量
watch(() => props.searchQuery, (newValue) => {
  localSearchQuery.value = newValue
})

// 当输入框内容改变时，触发 update:searchQuery 事件，将新的搜索查询字符串传递出去
function updateSearch(event) {
  emit('update:searchQuery', event.target.value)
}

// 处理清除搜索的操作，将本地搜索查询字符串置为空，并触发 clearSearch 事件
function handleClear() {
  localSearchQuery.value = ''
  emit('clearSearch')
}

// 根据搜索结果和待办事项总数，返回搜索状态信息
function getSearchStatus() {
  if (!props.searchQuery) return null

  if (props.totalResults === 0) {
    return '未找到匹配项'
  } else if (props.totalResults < props.totalTodos) {
    return `找到: ${props.totalResults}`
  }

  return null
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-md p-4 dark:bg-gray-800 dark:text-gray-100">
    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-grow">
        <!-- 基础输入框组件，绑定本地搜索查询字符串，输入时触发 updateSearch 函数 -->
        <BaseInput
            v-model="localSearchQuery"
            @input="updateSearch"
            placeholder="搜索任务..."
            class="w-full pl-10 dark:bg-gray-700 dark:text-gray-100"
        />
        <!-- 搜索图标 -->
        <div class="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- 清除搜索按钮，当本地搜索查询字符串不为空时显示 -->
        <button
            v-if="localSearchQuery"
            @click="handleClear"
            class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 显示搜索状态信息，当有搜索查询且存在搜索状态信息时显示 -->
      <div v-if="props.searchQuery && getSearchStatus()" class="text-sm flex items-center px-3 bg-gray-100 rounded-md dark:bg-gray-700">
        {{ getSearchStatus() }}
      </div>
    </div>

    <!-- 当有搜索查询但未找到结果时，给出提示信息 -->
    <div v-if="props.searchQuery && props.totalResults === 0" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      尝试更改查询或清除搜索
    </div>
  </div>
</template>