/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react'
import { mockTasks, mockUsers } from '../data/mockData'

const TASKS_STORAGE_KEY = 'kanban_tasks'
const TASKS_VERSION_KEY = 'kanban_tasks_version'
const TASKS_VERSION = '2026-05-28-uk-v2'

const TaskContext = createContext(null)

function getInitialTasks() {
  const storedVersion = localStorage.getItem(TASKS_VERSION_KEY)
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

  // Reset saved data when mock data changes shape or copy.
  if (!storedTasks || storedVersion !== TASKS_VERSION) {
    return mockTasks
  }

  try {
    return JSON.parse(storedTasks)
  } catch {
    return mockTasks
  }
}

function createCommentId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `comment-${Date.now()}`
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(getInitialTasks)
  const [users] = useState(mockUsers)

  // Persist every task change so board edits survive page refreshes.
  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    localStorage.setItem(TASKS_VERSION_KEY, TASKS_VERSION)
  }, [tasks])

  function moveTask(taskId, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    )
  }

  function updateTask(taskId, updatedFields) {
    // Keep updates generic so details forms can edit any task field.
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    )
  }

  function toggleSubtask(taskId, subtaskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== taskId) {
          return task
        }

        return {
          ...task,
          subtasks: task.subtasks.map((subtask) =>
            subtask.id === subtaskId
              ? { ...subtask, isCompleted: !subtask.isCompleted }
              : subtask,
          ),
        }
      }),
    )
  }

  function addComment(taskId, commentText) {
    // Comments are mock-local, but mimic a real timestamped activity stream.
    const newComment = {
      id: createCommentId(),
      author: 'Admin',
      text: commentText,
      createdAt: new Date().toISOString(),
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, comments: [...task.comments, newComment] }
          : task,
      ),
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        users,
        moveTask,
        updateTask,
        toggleSubtask,
        addComment,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)

  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }

  return context
}
