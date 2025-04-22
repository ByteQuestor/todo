```html
<script setup>
import { useTodos } from '@/composables/useTodos'
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const { todoStats } = useTodos()
</script>

<template>
  <nav class="flex items-center space-x-6 text-white dark:text-gray-100">
    <router-link to="/" class="hover:text-blue-200 transition-colors">首页</router-link>

    <router-link to="/todos" class="hover:text-blue-200 transition-colors flex items-center">
      任务
      <span
          v-if="todoStats.total > 0"
          class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5 dark:bg-gray-200 dark:text-blue-700"
      >
        {{ todoStats.total }}
      </span>
    </router-link>

    <router-link to="/easy-pagination-example" class="hover:text-blue-200 transition-colors">
      分页
    </router-link>

    <ThemeToggle />
  </nav>
</template>
```