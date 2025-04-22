const TODOS_STORAGE_KEY = 'vue3-todos'
const STORAGE_VERSION = '2' // 增加版本号用于跟踪数据结构的变化

// 获取待办事项并在必要时进行数据迁移
export function getTodos() {
    const todosJson = localStorage.getItem(TODOS_STORAGE_KEY)
    if (!todosJson) return []

    try {
        const todos = JSON.parse(todosJson)

        // 检查版本并进行数据迁移
        const version = localStorage.getItem(`${TODOS_STORAGE_KEY}-version`) || '1'

        if (version === '1') {
            // 从版本 1 迁移到版本 2
            const migratedTodos = todos.map(todo => ({
                ...todo,
                description: todo.description || '', // 添加空描述
                importance: todo.importance || 'normal' // 添加默认的普通重要性
            }))

            // 保存迁移后的待办事项
            saveTodos(migratedTodos)
            return migratedTodos
        }

        return todos
    } catch (e) {
        console.error('从 localStorage 解析待办事项时出错:', e)
        return []
    }
}

// 保存待办事项并更新版本号
export function saveTodos(todos) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
    localStorage.setItem(`${TODOS_STORAGE_KEY}-version`, STORAGE_VERSION)
}

// 用于更新特定待办事项的额外函数
/*
export function updateTodo(updatedTodo) {
    const todos = getTodos()
    const index = todos.findIndex(todo => todo.id === updatedTodo.id)

    if (index!== -1) {
        todos[index] = updatedTodo
        saveTodos(todos)
        return true
    }
    return false
}
*/