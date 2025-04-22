import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { getTodos, saveTodos } from '../utils/localStorage'

export const useTodoStore = defineStore('todo', () => {
    // 状态
    const todos = ref(getTodos() || [])

    // 计算属性
    const completedTodos = computed(() =>
        todos.value.filter(todo => todo.completed)
    )

    const incompleteTodos = computed(() =>
        todos.value.filter(todo =>!todo.completed)
    )

    // 按重要性过滤
    const lowPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'low')
    )
    const normalPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'normal')
    )
    const highPriorityTodos = computed(() =>
        todos.value.filter(todo => todo.importance === 'high')
    )

    // 操作
    function addTodo(title, description = '', importance = 'normal') {
        const newTodo = {
            id: uuidv4(),
            title,
            description,  // 新增的描述字段
            importance,   // 新增的重要性字段
            completed: false,
            createdAt: new Date().toISOString()
        }
        todos.value.push(newTodo)
        saveTodos(todos.value)
        return newTodo
    }

    function removeTodo(id) {
        todos.value = todos.value.filter(todo => todo.id!== id)
        saveTodos(todos.value)
    }

    function toggleTodo(id) {
        const todo = todos.value.find(todo => todo.id === id)
        if (todo) {
            todo.completed =!todo.completed
            saveTodos(todos.value)
        }
    }

    function updateTodoDetails(id, updates) {
        const todoIndex = todos.value.findIndex(todo => todo.id === id)
        if (todoIndex!== -1) {
            // 使用新数据更新任务
            todos.value[todoIndex] = {
              ...todos.value[todoIndex],
              ...updates
            }
            saveTodos(todos.value)
            return todos.value[todoIndex]
        }
        return null
    }

    return {
        todos,
        completedTodos,
        incompleteTodos,
        lowPriorityTodos,
        normalPriorityTodos,
        highPriorityTodos,
        addTodo,
        removeTodo,
        toggleTodo,
        updateTodoDetails
    }
})