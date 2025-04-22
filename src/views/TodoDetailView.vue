<script setup>
// 从 Vue 中导入 computed 和 ref 函数
import { computed, ref } from 'vue'
// 从 vue-router 中导入 useRouter 函数
import { useRouter } from 'vue-router'
// 从自定义的组合式函数模块中导入 useTodos 函数
import { useTodos } from '../composables/useTodos'
// 导入自定义的基础按钮组件
import BaseButton from '../components/common/BaseButton.vue'
// 导入自定义的基础输入框组件
import BaseInput from '../components/common/BaseInput.vue'

// 定义组件接收的 props
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 获取路由实例
const router = useRouter()
// 解构从 useTodos 函数中返回的函数和数据
const { todos, toggleTodo, removeTodo, updateTodoDetails } = useTodos()

// 通过计算属性获取当前待办事项（根据传入的 id）
const todo = computed(() => {
  return todos.value.find(t => t.id === props.id)
})

// 用于表示编辑模式的状态
const isEditing = ref(false)
// 用于存储编辑后的标题
const editedTitle = ref('')
// 用于存储编辑后的描述
const editedDescription = ref('')
// 用于存储编辑后的重要性级别
const editedImportance = ref('normal')

// 重要性级别对应的显示标签对象
const importanceLabels = {
  low: '低',
  normal: '普通',
  high: '高'
}

// 格式化待办事项创建日期的计算属性
const formattedDate = computed(() => {
  if (!todo.value) return ''

  const date = new Date(todo.value.createdAt)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
})

// 开始编辑的函数
function startEditing() {
  if (!todo.value) return

  editedTitle.value = todo.value.title
  editedDescription.value = todo.value.description || ''
  editedImportance.value = todo.value.importance || 'normal'
  isEditing.value = true
}

// 保存编辑更改的函数
function saveChanges() {
  if (!todo.value) return

  updateTodoDetails(props.id, {
    title: editedTitle.value.trim(),
    description: editedDescription.value.trim(),
    importance: editedImportance.value
  })

  isEditing.value = false
}

// 取消编辑的函数
function cancelEditing() {
  isEditing.value = false
}

// 处理待办事项删除的函数
function handleRemove() {
  if (confirm('您确定要删除这个待办事项吗？')) {
    removeTodo(props.id)
    router.push('/todos')
  }
}

// 不同重要性级别对应的样式对象
const importanceStyles = {
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  normal: 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300',
  high: 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300'
}
</script>

<template>
  <!-- 当存在待办事项时显示详细信息 -->
  <div v-if="todo" class="max-w-2xl mx-auto">
    <div class="flex items-center mb-6">
      <BaseButton to="/todos" variant="secondary" class="mr-2">
        &larr; 返回
      </BaseButton>
      <h1 class="text-2xl font-bold dark:text-gray-100">待办事项详情</h1>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800 dark:text-gray-100">
      <!-- 编辑模式 -->
      <div v-if="isEditing" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            标题
          </label>
          <BaseInput
              v-model="editedTitle"
              placeholder="输入待办事项标题"
              class="w-full dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            描述
          </label>
          <textarea
              v-model="editedDescription"
              placeholder="输入待办事项描述"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows="3"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            重要性
          </label>
          <select
              v-model="editedImportance"
              class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value="low">低</option>
            <option value="normal">普通</option>
            <option value="high">高</option>
          </select>
        </div>

        <div class="flex space-x-3 mt-4">
          <BaseButton @click="saveChanges" variant="primary">
            保存
          </BaseButton>
          <BaseButton @click="cancelEditing" variant="secondary">
            取消
          </BaseButton>
        </div>
      </div>

      <!-- 查看模式 -->
      <div v-else>
        <div class="flex items-center mb-6">
          <div
              class="w-5 h-5 border-2 rounded-full mr-3 cursor-pointer flex items-center justify-center"
              :class="[
              todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
            ]"
              @click="toggleTodo(todo.id)"
          >
            <svg
                v-if="todo.completed"
                class="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div class="flex-grow">
            <div class="flex items-center">
              <h2
                  class="text-xl font-semibold"
                  :class="{ 'line-through text-gray-400 dark:text-gray-600': todo.completed }"
              >
                {{ todo.title }}
              </h2>
              <span
                  class="ml-2 px-2 py-0.5 text-xs rounded-full"
                  :class="importanceStyles[todo.importance || 'normal']"
              >
                {{ importanceLabels[todo.importance || 'normal'] }}
              </span>
            </div>

            <p v-if="todo.description" class="mt-2 text-gray-600 dark:text-gray-300">
              {{ todo.description }}
            </p>
            <p v-else class="mt-2 text-gray-400 dark:text-gray-500 italic">
              没有描述
            </p>
          </div>
        </div>

        <div class="space-y-4 text-gray-600 dark:text-gray-300">
          <div>
            <p class="font-medium">状态:</p>
            <p>
              <span
                  class="inline-block px-2 py-1 text-sm rounded"
                  :class="todo.completed
                  ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-200'
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-200'"
              >
                {{ todo.completed ? '已完成' : '进行中' }}
              </span>
            </p>
          </div>

          <div>
            <p class="font-medium">重要性:</p>
            <p>
              <span
                  class="inline-block px-2 py-1 text-sm rounded"
                  :class="importanceStyles[todo.importance || 'normal']"
              >
                {{ importanceLabels[todo.importance || 'normal'] }}
              </span>
            </p>
          </div>

          <div>
            <p class="font-medium">创建日期:</p>
            <p>{{ formattedDate }}</p>
          </div>

          <div>
            <p class="font-medium">待办事项 ID:</p>
            <p class="text-sm font-mono bg-gray-100 p-1 rounded dark:bg-gray-700 dark:text-gray-300">
              {{ todo.id }}
            </p>
          </div>
        </div>

        <div class="mt-8 flex space-x-4">
          <BaseButton @click="startEditing" variant="primary">
            编辑
          </BaseButton>

          <BaseButton
              @click="toggleTodo(todo.id)"
              :variant="todo.completed ? 'warning' : 'success'"
          >
            {{ todo.completed ? '标记为进行中' : '标记为已完成' }}
          </BaseButton>

          <BaseButton @click="handleRemove" variant="danger">
            删除
          </BaseButton>
        </div>
      </div>
    </div>
  </div>

  <!-- 当待办事项不存在时显示提示信息 -->
  <div v-else class="text-center py-12">
    <p class="text-xl text-gray-600 mb-6 dark:text-gray-300">待办事项未找到</p>
    <BaseButton to="/todos" variant="primary">
      返回待办事项列表
    </BaseButton>
  </div>
</template>