import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
    // 定义当前是深色主题还是浅色主题
    const isDark = ref(false)

    // 在初始化时检查 localStorage 和系统设置
    function initTheme() {
        // 检查保存的主题
        const savedTheme = localStorage.getItem('theme')

        if (savedTheme) {
            // 使用保存的主题
            isDark.value = savedTheme === 'dark'
        } else {
            // 如果没有保存的主题，检查系统偏好设置
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            isDark.value = prefersDark
            // 将选择保存到 localStorage 中
            localStorage.setItem('theme', prefersDark? 'dark' : 'light')
        }

        // 将主题应用到文档上
        applyTheme()
    }

    // 切换主题的函数
    function toggleTheme() {
        isDark.value =!isDark.value
        localStorage.setItem('theme', isDark.value? 'dark' : 'light')
    }

    // 将主题应用到 HTML 元素上
    function applyTheme() {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    // 监听主题的变化
    watch(isDark, () => {
        applyTheme()
    })

    return {
        isDark,
        initTheme,
        toggleTheme
    }
})