import TaskPage from "@/pages/TaskPage"
import TasksPage from "@/pages/TasksPage"

export const routes = [
  {
    path: "/",
    element: <TasksPage />,
  },
  {
    path: "/tasks/:id",
    element: <TaskPage />,
  },
  {
    path: "*",
    element: <div>404, not found</div>,
  },
]
