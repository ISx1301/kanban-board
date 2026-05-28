import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import BoardPage from '../features/board/BoardPage'
import NotFoundPage from '../features/not-found/NotFoundPage'
import TaskDetailsPage from '../features/task-details/TaskDetailsPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BoardPage />,
  },
  {
    path: '/task/:id',
    element: <TaskDetailsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
