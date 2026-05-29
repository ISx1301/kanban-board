import { useMemo, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import AppHeader from '../components/organisms/AppHeader'
import { I18nProvider } from '../context/I18nContext'
import { TaskProvider } from '../context/TaskContext'
import { AppRouter } from './router'
import { createAppTheme } from './theme'

const THEME_MODE_STORAGE_KEY = 'kanban_theme_mode'

function getInitialThemeMode() {
  const savedMode = localStorage.getItem(THEME_MODE_STORAGE_KEY)

  if (savedMode === 'light' || savedMode === 'dark') {
    return savedMode
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function App() {
  const [mode, setMode] = useState(getInitialThemeMode)
  const theme = useMemo(() => createAppTheme(mode), [mode])

  function toggleThemeMode() {
    setMode((currentMode) => {
      const nextMode = currentMode === 'light' ? 'dark' : 'light'

      localStorage.setItem(THEME_MODE_STORAGE_KEY, nextMode)

      return nextMode
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <I18nProvider>
        <TaskProvider>
          <AppHeader mode={mode} onToggleThemeMode={toggleThemeMode} />
          <AppRouter />
        </TaskProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
