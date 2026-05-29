export const allTasksFilter = {
  id: 'all',
}

export const taskStatuses = [
  {
    id: 'todo',
  },
  {
    id: 'in-progress',
  },
  {
    id: 'done',
  },
]

export const taskPriorities = [
  {
    id: 'high',
    color: 'error',
  },
  {
    id: 'medium',
    color: 'warning',
  },
  {
    id: 'low',
    color: 'success',
  },
]

export const DEFAULT_LANGUAGE = 'uk'
export const SUPPORTED_LANGUAGES = ['uk', 'en']

export const translations = {
  uk: {
    appTitle: 'Дошка',
    switchToDarkTheme: 'Увімкнути темну тему',
    switchToLightTheme: 'Увімкнути світлу тему',
    switchLanguage: 'Switch to English',
    languageShort: 'EN',
    board: {
      allTasks: 'Усі задачі',
      allTasksShort: 'Усі',
      filterLabel: 'Фільтр задач за статусом',
      emptyColumn: 'У цій колонці поки немає задач.',
    },
    task: {
      actions: 'Дії із задачею',
      moveTo: 'Перемістити до',
      subtasks: 'Підзадачі',
      deadline: 'Дедлайн',
      notFoundTitle: 'Задачу не знайдено',
      notFoundText: 'Перевірте посилання або поверніться до дошки.',
      backToBoard: 'До дошки',
      back: 'Назад',
      detailsHint:
        'Керуйте деталями задачі, підзадачами, статусом і коментарями.',
      mainInfo: 'Основна інформація',
      saved: 'Зміни збережено.',
      title: 'Назва',
      description: 'Опис',
      status: 'Статус',
      priority: 'Пріоритет',
      assignee: 'Відповідальний',
      save: 'Зберегти',
      comments: 'Коментарі',
      newComment: 'Новий коментар',
      add: 'Додати',
      info: 'Інформація',
      tags: 'Теги',
    },
    notFound: {
      title: 'Сторінку не знайдено',
      text: 'Перевірте адресу або поверніться до Kanban-дошки.',
      action: 'До дошки',
    },
    statuses: {
      todo: {
        title: 'До виконання',
        shortTitle: 'План',
        description: 'Заплановані задачі',
      },
      'in-progress': {
        title: 'В роботі',
        shortTitle: 'В роботі',
        description: 'Активні задачі',
      },
      done: {
        title: 'Виконано',
        shortTitle: 'Готово',
        description: 'Завершені задачі',
      },
    },
    priorities: {
      high: 'Високий',
      medium: 'Середній',
      low: 'Низький',
    },
  },
  en: {
    appTitle: 'Board',
    switchToDarkTheme: 'Switch to dark theme',
    switchToLightTheme: 'Switch to light theme',
    switchLanguage: 'Перемкнути українською',
    languageShort: 'UA',
    board: {
      allTasks: 'All tasks',
      allTasksShort: 'All',
      filterLabel: 'Filter tasks by status',
      emptyColumn: 'There are no tasks in this column yet.',
    },
    task: {
      actions: 'Task actions',
      moveTo: 'Move to',
      subtasks: 'Subtasks',
      deadline: 'Deadline',
      notFoundTitle: 'Task not found',
      notFoundText: 'Check the link or return to the board.',
      backToBoard: 'Back to board',
      back: 'Back',
      detailsHint: 'Manage task details, subtasks, status, and comments.',
      mainInfo: 'Main information',
      saved: 'Changes saved.',
      title: 'Title',
      description: 'Description',
      status: 'Status',
      priority: 'Priority',
      assignee: 'Assignee',
      save: 'Save',
      comments: 'Comments',
      newComment: 'New comment',
      add: 'Add',
      info: 'Information',
      tags: 'Tags',
    },
    notFound: {
      title: 'Page not found',
      text: 'Check the address or return to the Kanban board.',
      action: 'Back to board',
    },
    statuses: {
      todo: {
        title: 'Todo',
        shortTitle: 'Todo',
        description: 'To do',
      },
      'in-progress': {
        title: 'In Progress',
        shortTitle: 'Doing',
        description: 'In progress',
      },
      done: {
        title: 'Done',
        shortTitle: 'Done',
        description: 'Completed',
      },
    },
    priorities: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
  },
}
