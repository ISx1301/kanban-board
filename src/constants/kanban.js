// Centralized board metadata keeps status and priority labels consistent.
export const taskStatuses = [
  {
    id: 'todo',
    title: 'Todo',
    shortTitle: 'Todo',
    description: 'Треба зробити',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    shortTitle: 'В роботі',
    description: 'У процесі',
  },
  {
    id: 'done',
    title: 'Done',
    shortTitle: 'Done',
    description: 'Виконано',
  },
]

export const taskPriorities = [
  {
    id: 'high',
    label: 'Високий',
    color: 'error',
  },
  {
    id: 'medium',
    label: 'Середній',
    color: 'warning',
  },
  {
    id: 'low',
    label: 'Низький',
    color: 'success',
  },
]
