```html
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTodos } from '@/composables/useTodos'
import ThemeToggle from "@/components/common/ThemeToggle.vue";

const { todoStats } = useTodos()
const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  // 如果菜单已打开，则禁止页面滚动
  if (isMobileMenuOpen.value) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
}

// 当屏幕尺寸改变时关闭菜单
function handleResize() {
  if (window.innerWidth >= 768 && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    document.body.classList.remove('overflow-hidden')
  }
}

// 按下 Escape 键时关闭菜单
function handleKeyDown(event) {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
    document.body.classList.remove('overflow-hidden')
  }
}

// 点击移动菜单外部区域时关闭菜单
function handleOutsideClick(event) {
  const mobileMenu = document.getElementById('mobile-menu')
  const mobileMenuButton = document.getElementById('mobile-menu-button')

  if (isMobileMenuOpen.value && mobileMenu && !mobileMenu.contains(event.target) &&
      mobileMenuButton && !mobileMenuButton.contains(event.target)) {
    isMobileMenuOpen.value = false
    document.body.classList.remove('overflow-hidden')
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
  window.addEventListener('keydown', handleKeyDown)
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('keydown', handleKeyDown)
  document.removeEventListener('click', handleOutsideClick)

  // 确保恢复页面滚动
  document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <div class="flex items-center space-x-2">
    <!-- 在菜单按钮旁边添加主题切换器 -->
    <ThemeToggle />

    <button
        id="mobile-menu-button"
        @click.stop="toggleMobileMenu"
        class="text-white dark:text-gray-100 focus:outline-none p-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
        aria-label="切换移动菜单"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
        />
        <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>

  <!-- 带有动画效果的移动菜单 -->
  <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
  >
    <div
        v-if="isMobileMenuOpen"
        id="mobile-menu"
        class="fixed inset-0 z-30 bg-black bg-opacity-50"
        @click.self="toggleMobileMenu"
    >
      <div class="fixed top-16 right-0 bottom-0 w-64 bg-blue-500 dark:bg-blue-600 shadow-lg p-6 overflow-y-auto">
        <div class="flex flex-col space-y-6">
          <router-link
              @click="toggleMobileMenu"
              to="/"
              class="text-lg hover:text-blue-200 transition-colors"
          >
            首页
          </router-link>

          <router-link
              @click="toggleMobileMenu"
              to="/todos"
              class="text-lg hover:text-blue-200 transition-colors flex items-center"
          >
            任务
            <span
                v-if="todoStats.total > 0"
                class="ml-2 bg-white text-blue-600 rounded-full text-xs px-2 py-0.5 dark:bg-gray-200 dark:text-blue-700"
            >
            {{ todoStats.total }}
          </span>
          </router-link>

          <router-link
              @click="toggleMobileMenu"
              to="/easy-pagination-example"
              class="text-lg hover:text-blue-200 transition-colors"
          >
            分页
          </router-link>
        </div>
      </div>
    </div>
  </transition>
</template>
```