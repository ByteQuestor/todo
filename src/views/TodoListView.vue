<script setup>
// 从 Vue 中导入 ref 函数
import { ref } from 'vue'
// 从自定义的组合式函数模块中导入 useTodos 函数
import { useTodos } from '../composables/useTodos'
// 导入自定义的基础输入框组件
import BaseInput from '../components/common/BaseInput.vue'
// 导入自定义的基础按钮组件
import BaseButton from '../components/common/BaseButton.vue'
// 导入待办事项列表项组件
import TodoItem from '../components/todo/TodoItem.vue'
// 导入待办事项筛选组件
import TodoFilter from '../components/todo/TodoFilter.vue'
// 导入待办事项搜索组件
import TodoSearch from '../components/todo/TodoSearch.vue'
// 导入分页组件
import Pagination from '../components/todo/Pagination.vue'

// 使用带有分页选项的更新后的组合式函数
const {
  addTodo, // 添加待办事项的函数
  filter, // 筛选条件的响应式数据
  importanceFilter, // 重要性筛选条件的响应式数据
  searchQuery, // 搜索查询的响应式数据
  clearSearch, // 清除搜索的函数
  paginatedTodos, // 分页后的待办事项列表
  currentPage, // 当前页码的响应式数据
  totalPages, // 总页数的响应式数据
  setPage, // 设置页码的函数
  todoStats // 待办事项统计信息
} = useTodos({ perPage: 10 })

// 用于存储新待办事项标题的响应式数据
const newTodoTitle = ref('')
// 用于存储新待办事项描述的响应式数据
const newTodoDescription = ref('')
// 用于存储新待办事项重要性的响应式数据
const newTodoImportance = ref('normal')
// 用于控制是否显示高级选项的响应式数据
const showAdvancedOptions = ref(false)

// 处理添加新待办事项的函数
function handleAddTodo() {
  if (newTodoTitle.value.trim()) {
    addTodo(
        newTodoTitle.value.trim(),
        newTodoDescription.value.trim(),
        newTodoImportance.value
    )
    newTodoTitle.value = ''
    newTodoDescription.value = ''
    newTodoImportance.value = 'normal'
    showAdvancedOptions.value = false
  }
}

// 更新筛选条件的函数
function updateFilter(newFilter) {
  filter.value = newFilter
  // 当筛选条件改变时重置页码为 1
  setPage(1)
}

// 更新重要性筛选条件的函数
function updateImportanceFilter(newFilter) {
  importanceFilter.value = newFilter
  // 当重要性筛选条件改变时重置页码为 1
  setPage(1)
}

// 处理页码改变的函数
function handlePageChange(page) {
  setPage(page)
}

// 切换高级选项显示状态的函数
function toggleAdvancedOptions() {
  showAdvancedOptions.value = !showAdvancedOptions.value
}

// 处理搜索查询改变的函数
function updateSearchQuery(query) {
  searchQuery.value = query
  // 当搜索查询改变时重置页码为 1
  setPage(1)
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 dark:text-gray-100">我的任务</h1>

    <div class="bg-white rounded-lg shadow-md p-6 mb-8 dark:bg-gray-800 dark:text-gray-200">
      <h2 class="text-lg font-semibold mb-4 dark:text-gray-100">添加新任务</h2>

      <div class="space-y-4">
        <div class="flex flex-col md:flex-row gap-4">
          <BaseInput
              v-model="newTodoTitle"
              placeholder="需要做什么？"
              @keyup.enter="handleAddTodo"
              class="flex-grow dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          />

          <BaseButton
              @click="toggleAdvancedOptions"
              variant="secondary"
              size="md"
          >
            {{ showAdvancedOptions ? '隐藏' : '更多选项' }}
          </BaseButton>

          <BaseButton
              @click="handleAddTodo"
              variant="primary"
              :disabled="!newTodoTitle.trim()"
          >
            添加
          </BaseButton>
        </div>

        <div v-if="showAdvancedOptions" class="space-y-3 pt-2 border-t dark:border-gray-700">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              描述
            </label>
            <textarea
                v-model="newTodoDescription"
                placeholder="输入任务描述（可选）"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
                rows="2"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              重要性
            </label>
            <select
                v-model="newTodoImportance"
                class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="low">低</option>
              <option value="normal">普通</option>
              <option value="high">高</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索组件 -->
    <TodoSearch
        :search-query="searchQuery"
        :total-results="todoStats.found"
        :total-todos="todoStats.total"
        @update:search-query="updateSearchQuery"
        @clear-search="clearSearch"
        class="mb-4"
    />

    <TodoFilter
        :filter="filter"
        :importance-filter="importanceFilter"
        @update:filter="updateFilter"
        @update:importance-filter="updateImportanceFilter"
        class="mb-6 dark:bg-gray-800 dark:text-gray-200"
    />

    <div v-if="paginatedTodos.length" class="space-y-4">
      <TodoItem
          v-for="todo in paginatedTodos"
          :key="todo.id"
          :todo="todo"
      />

      <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @update:page="handlePageChange"
      />
    </div>

    <div v-else class="bg-white rounded-lg shadow-md p-6 text-center text-gray-500 dark:bg-gray-800 dark:text-gray-400">
      <template v-if="searchQuery">
        <p class="dark:text-gray-300">没有找到与“{{ searchQuery }}”相关的内容</p>
        <BaseButton @click="clearSearch" variant="secondary" class="mt-3">
          清除搜索
        </BaseButton>
      </template>
      <template v-else-if="filter!== 'all' || importanceFilter!== 'all'">
        <p class="dark:text-gray-300">
          没有符合所选筛选条件的任务
        </p>
      </template>
      <template v-else>
        <p class="dark:text-gray-300">
          您目前没有任务。创建第一个任务吧！
        </p>
      </template>
    </div>
  </div>
</template>