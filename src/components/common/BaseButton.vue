```html
<script setup>
// 从 Vue 中导入 computed 函数
import { computed } from 'vue'
// 从 vue-router 中导入 RouterLink 组件
import { RouterLink } from 'vue-router'

// 定义组件接收的 props
const props = defineProps({
  // 按钮变体，默认为'primary'，验证其值是否在指定数组内
  variant: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'secondary','success', 'danger', 'warning'].includes(value)
  },
  // 按钮尺寸，默认为'md'，验证其值是否在指定数组内
  size: {
    type: String,
    default: 'md',
    validator: value => ['sm','md', 'lg'].includes(value)
  },
  // 链接目标，可以是字符串或对象，默认为 null
  to: {
    type: [String, Object],
    default: null
  },
  // 是否禁用按钮，默认为 false
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否为块级元素，默认为 false
  block: {
    type: Boolean,
    default: false
  }
})

// 根据按钮变体计算对应的样式类
const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
    success: 'bg-green-600 hover:bg-green-700 text-white dark:bg-green-800 dark:hover:bg-green-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white dark:bg-red-800 dark:hover:bg-red-900',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white dark:bg-yellow-700 dark:hover:bg-yellow-800'
  }

  return variants[props.variant]
})

// 根据按钮尺寸计算对应的样式类
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg'
  }

  return sizes[props.size]
})

// 计算最终的按钮样式类
const classes = computed(() => {
  return [
    'rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900',
    variantClasses.value,
    sizeClasses.value,
    props.block? 'w-full' : '',
    props.disabled? 'opacity-50 cursor-not-allowed' : ''
  ]
})
</script>

<template>
  <!-- 如果有链接目标且按钮未禁用，则渲染 RouterLink 组件 -->
  <RouterLink v-if="to &&!disabled" :to="to" :class="classes">
    <!-- 插槽内容，由父组件传入 -->
    <slot></slot>
  </RouterLink>

  <!-- 否则渲染按钮元素 -->
  <button v-else :disabled="disabled" :class="classes">
    <!-- 插槽内容，由父组件传入 -->
    <slot></slot>
  </button>
</template>
```