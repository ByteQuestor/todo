```html
<script setup>
import { defineProps, defineEmits } from 'vue'
import BaseButton from '../common/BaseButton.vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:page'])

function changePage(page) {
  emit('update:page', page)
}

// 确定要显示哪些页码
const pageNumbers = () => {
  // 如果页数少于 8 页，显示所有页码
  if (props.totalPages <= 7) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  // 如果当前页接近开头
  if (props.currentPage <= 3) {
    return [1, 2, 3, 4, 5, '...', props.totalPages]
  }

  // 如果当前页接近结尾
  if (props.currentPage >= props.totalPages - 2) {
    return [1, '...', props.totalPages - 4, props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages]
  }

  // 在中间 - 显示当前页以及每侧各 2 页
  return [
    1,
    '...',
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
    '...',
    props.totalPages
  ]
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex justify-center space-x-2 mt-4 dark:text-gray-100">
    <!-- “上一页”按钮 -->
    <BaseButton
        variant="secondary"
        size="sm"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
        aria-label="上一页"
    >
      &laquo;
    </BaseButton>

    <!-- 页码 -->
    <template v-for="(page, index) in pageNumbers()" :key="index">
      <span v-if="page === '...'" class="flex items-center px-2 dark:text-gray-400">...</span>
      <BaseButton
          v-else
          :variant="page === currentPage? 'primary' :'secondary'"
          size="sm"
          @click="changePage(page)"
      >
        {{ page }}
      </BaseButton>
    </template>

    <!-- “下一页”按钮 -->
    <BaseButton
        variant="secondary"
        size="sm"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        aria-label="下一页"
    >
      &raquo;
    </BaseButton>
  </div>
</template>
```