import { Chip } from '@mui/material'

function TaskMetaChip({ children, icon, isUrgent = false, sx }) {
  return (
    <Chip
      icon={icon}
      label={children}
      size="small"
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark'

        return {
          bgcolor: isUrgent
            ? isDark
              ? 'rgba(239, 68, 68, 0.15)'
              : '#FEE2E2'
            : isDark
              ? 'rgba(148, 163, 184, 0.12)'
              : theme.palette.grey[100],
          border: '1px solid',
          borderColor: isUrgent ? 'error.main' : 'divider',
          color: isUrgent
            ? isDark
              ? '#FCA5A5'
              : theme.palette.error.dark
            : 'text.secondary',
          fontSize: '0.75rem',
          height: '1.625rem',
          '& .MuiChip-icon': {
            color: 'inherit',
            fontSize: '1rem',
          },
          ...(typeof sx === 'function' ? sx(theme) : sx),
        }
      }}
    />
  )
}

export default TaskMetaChip
