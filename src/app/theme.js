import { createTheme } from '@mui/material/styles'

export function createAppTheme(mode) {
  const isDark = mode === 'dark'

  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1240,
        lg: 1536,
        xl: 1920,
      },
    },
    palette: {
      mode,
      background: {
        default: isDark ? '#09090B' : '#F8FAFC',
        paper: isDark ? '#18181B' : '#FFFFFF',
      },
      primary: {
        main: isDark ? '#FAFAFA' : '#0F172A',
        contrastText: isDark ? '#09090B' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F4F4F5' : '#0F172A',
        secondary: isDark ? '#A1A1AA' : '#475569',
      },
      divider: isDark ? '#27272A' : '#E2E8F0',
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily:
        '"Fixel Text", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    shadows: [
      'none',
      isDark ? 'none' : '0 0.25rem 1.25rem -0.125rem rgba(0,0,0,0.05)',
      isDark ? 'none' : '0 0.5rem 1.75rem -0.375rem rgba(0,0,0,0.08)',
      isDark ? 'none' : '0 0.75rem 2.125rem -0.625rem rgba(0,0,0,0.10)',
      isDark ? 'none' : '0 1rem 2.75rem -0.75rem rgba(0,0,0,0.12)',
      ...Array(20).fill(
        isDark ? 'none' : '0 1rem 2.75rem -0.75rem rgba(0,0,0,0.12)',
      ),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDark ? '#09090B' : '#F8FAFC',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            boxShadow: 'none',
            fontWeight: 700,
            textTransform: 'none',
          },
          contained: {
            boxShadow: isDark
              ? 'none'
              : '0 0.25rem 1.25rem -0.125rem rgba(0,0,0,0.05)',
            '&:hover': {
              boxShadow: isDark
                ? 'none'
                : '0 0.5rem 1.75rem -0.375rem rgba(0,0,0,0.08)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
            boxShadow: isDark
              ? 'none'
              : '0 0.25rem 1.25rem -0.125rem rgba(0,0,0,0.05)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: '0.75rem',
            boxShadow: isDark
              ? 'none'
              : '0 0.25rem 1.25rem -0.125rem rgba(0,0,0,0.05)',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
    },
  })
}
