```html
<script setup>
import NavBar from './NavBar.vue'
import MobileNavBar from './MobileNavBar.vue'
</script>

<template>
  <header class="fixed w-full top-0 z-20 bg-blue-500 text-white shadow-md dark:bg-blue-600 dark:text-gray-100">
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold hover:underline dark:hover:text-white transition-colors">
          Vue 待办事项
        </router-link>
        <div class="hidden md:block">
          <NavBar />
        </div>
        <div class="block md:hidden">
          <MobileNavBar />
        </div>
      </div>
    </div>
  </header>
  <!-- 用于补偿固定头部的空白元素 -->
  <div class="h-16"></div>
</template>
```