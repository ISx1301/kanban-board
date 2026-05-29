import {
  Box,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useI18n } from '../../context/I18nContext'

function AppHeader({ mode, onToggleThemeMode }) {
  const { t, toggleLanguage } = useI18n()

  return (
    <Box
      component="header"
      sx={{
        alignItems: 'center',
        bgcolor: 'background.default',
        boxSizing: 'border-box',
        height: '4rem',
        position: { xs: 'sticky', md: 'static' },
        top: { xs: 0, md: 'auto' },
        width: '100%',
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Typography fontWeight={800} variant="subtitle1">
          {t.appTitle}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Tooltip title={t.switchLanguage}>
            <IconButton
              aria-label={t.switchLanguage}
              onClick={toggleLanguage}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                height: '2.625rem',
                p: 0,
                width: '2.625rem',
                '&:hover': {
                  bgcolor: 'background.paper',
                },
              }}
            >
              <Typography component="span" fontSize="0.75rem" fontWeight={800}>
                {t.languageShort}
              </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip
            title={mode === 'light' ? t.switchToDarkTheme : t.switchToLightTheme}
          >
            <IconButton
              aria-label={
                mode === 'light' ? t.switchToDarkTheme : t.switchToLightTheme
              }
              onClick={onToggleThemeMode}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '50%',
                height: '2.625rem',
                p: 0,
                width: '2.625rem',
                '&:hover': {
                  bgcolor: 'background.paper',
                },
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Container>
    </Box>
  )
}

export default AppHeader
