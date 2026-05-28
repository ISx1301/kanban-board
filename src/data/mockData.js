// Static data set used as the initial state for the Kanban board.
export const mockUsers = [
  {
    id: 'user-1',
    name: 'Anna Kovalenko',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    id: 'user-2',
    name: 'Dmytro Shevchenko',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    id: 'user-3',
    name: 'Marta Levchenko',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    id: 'user-4',
    name: 'Oleh Bondar',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80',
  },
  {
    id: 'user-5',
    name: 'Iryna Melnyk',
    avatar:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=128&h=128&q=80',
  },
]

export const mockTasks = [
  {
    id: 'task-1',
    title: 'Оптимізація рендерингу великих списків',
    description:
      'Переробити відображення таблиць із тисячами записів, впровадити віртуалізацію та зменшити кількість зайвих перерендерів.',
    status: 'todo',
    priority: 'high',
    deadline: '2026-05-29T18:00:00.000Z',
    assigneeId: 'user-1',
    subtasks: [
      {
        id: 'subtask-1-1',
        title: 'Провести профілювання поточного рендерингу',
        isCompleted: false,
      },
      {
        id: 'subtask-1-2',
        title: 'Впровадити віртуалізацію списку',
        isCompleted: false,
      },
      {
        id: 'subtask-1-3',
        title: 'Перевірити продуктивність після змін',
        isCompleted: false,
      },
    ],
    tags: ['Фронтенд', 'Продуктивність', 'React'],
    comments: [
      {
        id: 'comment-1-1',
        author: 'Dmytro Shevchenko',
        text: 'На демо-стенді список починає помітно гальмувати після 1500 рядків.',
        createdAt: '2026-05-20T09:15:00.000Z',
      },
    ],
  },
  {
    id: 'task-2',
    title: 'Інтеграція платіжного шлюзу',
    description:
      'Підключити нового платіжного провайдера, обробити успішні й неуспішні платежі та підготувати основу для webhook-подій.',
    status: 'todo',
    priority: 'high',
    deadline: '2026-06-05T17:00:00.000Z',
    assigneeId: 'user-2',
    subtasks: [
      {
        id: 'subtask-2-1',
        title: 'Описати контракт даних для платіжної форми',
        isCompleted: true,
      },
      {
        id: 'subtask-2-2',
        title: 'Зібрати UI сценарію оплати',
        isCompleted: false,
      },
      {
        id: 'subtask-2-3',
        title: 'Додати обробку помилок провайдера',
        isCompleted: false,
      },
    ],
    tags: ['Платежі', 'Бекенд', 'Безпека'],
    comments: [
      {
        id: 'comment-2-1',
        author: 'Oleh Bondar',
        text: 'Потрібно окремо перевірити сценарій скасування платежу користувачем.',
        createdAt: '2026-05-21T13:20:00.000Z',
      },
    ],
  },
  {
    id: 'task-3',
    title: "Рефакторинг модулів зв'язку",
    description:
      "Розділити шар WebSocket-з'єднань, черги повідомлень та UI-сповіщень, щоб зменшити зв'язаність realtime-функцій.",
    status: 'in-progress',
    priority: 'medium',
    deadline: '2026-06-10T16:30:00.000Z',
    assigneeId: 'user-4',
    subtasks: [
      {
        id: 'subtask-3-1',
        title: 'Виділити сервіс керування WebSocket-сесією',
        isCompleted: true,
      },
      {
        id: 'subtask-3-2',
        title: 'Перенести обробники подій в окремі адаптери',
        isCompleted: false,
      },
      {
        id: 'subtask-3-3',
        title: 'Оновити документацію щодо realtime-потоку',
        isCompleted: false,
      },
    ],
    tags: ['Архітектура', 'Realtime', 'Рефакторинг'],
    comments: [
      {
        id: 'comment-3-1',
        author: 'Marta Levchenko',
        text: 'Після розділення модулів буде простіше додати retry-логіку.',
        createdAt: '2026-05-22T10:05:00.000Z',
      },
    ],
  },
  {
    id: 'task-4',
    title: 'Аудит безпеки користувацьких сесій',
    description:
      'Перевірити зберігання токенів, поведінку refresh-flow, вихід з акаунта на кількох пристроях і ризики після завершення сесії.',
    status: 'in-progress',
    priority: 'high',
    deadline: '2026-06-14T15:00:00.000Z',
    assigneeId: 'user-5',
    subtasks: [
      {
        id: 'subtask-4-1',
        title: 'Перевірити refresh-token flow',
        isCompleted: true,
      },
      {
        id: 'subtask-4-2',
        title: 'Описати edge cases для logout',
        isCompleted: true,
      },
      {
        id: 'subtask-4-3',
        title: 'Підготувати список рекомендацій для команди',
        isCompleted: false,
      },
    ],
    tags: ['Безпека', 'Авторизація', 'Аудит'],
    comments: [
      {
        id: 'comment-4-1',
        author: 'Iryna Melnyk',
        text: 'Знайшла кілька місць, де UI не реагує на завершену сесію.',
        createdAt: '2026-05-24T14:10:00.000Z',
      },
    ],
  },
  {
    id: 'task-5',
    title: 'Міграція дизайн-системи на MUI theme tokens',
    description:
      'Перенести кольори, радіуси, тіні й типографіку в єдину тему MUI, щоб компоненти використовували спільні дизайн-токени.',
    status: 'done',
    priority: 'medium',
    deadline: '2026-06-18T12:00:00.000Z',
    assigneeId: 'user-3',
    subtasks: [
      {
        id: 'subtask-5-1',
        title: 'Зібрати поточні значення кольорів і відступів',
        isCompleted: true,
      },
      {
        id: 'subtask-5-2',
        title: 'Створити базову MUI theme-конфігурацію',
        isCompleted: true,
      },
      {
        id: 'subtask-5-3',
        title: 'Оновити основні UI-компоненти',
        isCompleted: true,
      },
    ],
    tags: ['Дизайн-система', 'MUI', 'UI'],
    comments: [
      {
        id: 'comment-5-1',
        author: 'Marta Levchenko',
        text: 'Токени готові, картки та кнопки вже використовують нову тему.',
        createdAt: '2026-05-25T16:35:00.000Z',
      },
    ],
  },
  {
    id: 'task-6',
    title: 'Налаштування моніторингу помилок фронтенду',
    description:
      'Додати централізований збір runtime-помилок, базову категоризацію подій і процес triage для критичних клієнтських збоїв.',
    status: 'done',
    priority: 'low',
    deadline: '2026-06-24T18:00:00.000Z',
    assigneeId: 'user-2',
    subtasks: [
      {
        id: 'subtask-6-1',
        title: 'Визначити список критичних подій',
        isCompleted: true,
      },
      {
        id: 'subtask-6-2',
        title: 'Додати error boundary для основних сторінок',
        isCompleted: true,
      },
      {
        id: 'subtask-6-3',
        title: 'Підготувати інструкцію для розбору інцидентів',
        isCompleted: true,
      },
    ],
    tags: ['Моніторинг', 'Надійність', 'Фронтенд'],
    comments: [
      {
        id: 'comment-6-1',
        author: 'Anna Kovalenko',
        text: 'Error boundary покриває основні маршрути, можна використовувати його як шаблон у нових фічах.',
        createdAt: '2026-05-26T12:25:00.000Z',
      },
    ],
  },
]
