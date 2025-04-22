```html
<template>
  <div class="p-4 max-w-md mx-auto min-h-screen flex flex-col">
    <div class="flex flex-col justify-between min-h-[400px]">
      <!-- 标题 -->
      <div>
        <h2 class="text-xl font-bold mb-4 dark:text-gray-100">📋 元素列表（分页）</h2>

        <ul class="space-y-2 mb-4 grow">
          <li
              v-for="item in paginatedItems"
              :key="item.id"
              class="p-3 bg-gray-100 rounded shadow-sm dark:bg-gray-700 dark:text-gray-200"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>

      <!-- 分页导航 -->
      <div class="mt-auto">
        <div class="flex justify-between items-center">
          <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 dark:bg-blue-600 dark:text-gray-200"
          >
            ⬅ 上一页
          </button>

          <span class="font-semibold dark:text-gray-100">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </span>

          <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 dark:bg-blue-600 dark:text-gray-200"
          >
            下一页 ➡
          </button>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>
import {ref, computed} from 'vue'

const items = ref([
  {id: 1, name: '📌 任务 1'},
  {id: 2, name: '💡 想法 2'},
  {id: 3, name: '🔨 工作 3'},
  {id: 4, name: '📅 计划 4'},
  {id: 5, name: '💬 讨论 5'},
  {id: 6, name: '🚀 项目 6'},
  {id: 7, name: '📝 笔记 7'},
  {id: 8, name: '📚 学习 8'},
  {id: 9, name: '🎯 目标 9'},
  {id: 10, name: '📈 统计数据 10'},
  {id: 11, name: '💻 开发 11'},
  {id: 12, name: '📖 书籍 12'},
  {id: 13, name: '🎨 设计 13'}
])

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(items.value.length / itemsPerPage)
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return items.value.slice(start, start + itemsPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<style scoped>
/* 一些美化样式 */
</style>
```