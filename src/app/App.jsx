import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { TaskProvider } from '../context/TaskContext'
import { AppRouter } from './router'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App
