<script setup>
import { useTodos } from '@/composables/useTodos'

const { todoStats } = useTodos()
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-800 dark:text-gray-100 dark:shadow-lg dark:shadow-gray-900">
    <h2 class="text-xl font-semibold mb-4">任务统计信息</h2>

    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600 dark:text-gray-300">任务总数:</span>
        <span class="font-medium">{{ todoStats.total }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600 dark:text-gray-300">已完成:</span>
        <span class="font-medium text-green-600">{{ todoStats.completed }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600 dark:text-gray-300">待完成:</span>
        <span class="font-medium text-blue-600">{{ todoStats.incomplete }}</span>
      </div>

      <div class="mt-4">
        <div class="flex justify-between items-center mb-1">
          <span class="text-sm text-gray-600 dark:text-gray-400">进度:</span>
          <span class="text-sm font-medium">{{ todoStats.percentCompleted }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
              class="bg-blue-500 h-2.5 rounded-full"
              :style="{ width: `${todoStats.percentCompleted}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>