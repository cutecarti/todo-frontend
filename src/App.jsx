import Router from "./Router"
import TaskPage from "./pages/TaskPage"
import TasksPage from "./pages/TasksPage"
const App = () => {

  const routes = {
    '/': TasksPage,
    '/tasks/123': TaskPage,
    '*': <div>404, not found</div>
  }
  return (
    <Router routes={routes}/>
  )
}

export default App