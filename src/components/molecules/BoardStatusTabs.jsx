import { Box, Chip, Paper, Tab, Tabs } from '@mui/material'
import { allTasksFilter, taskStatuses } from '../../constants/kanban'
import { useI18n } from '../../context/I18nContext'

function BoardStatusTabs({ isDesktop, selectedStatus, tasks, onChange }) {
  const { t } = useI18n()

  function getTaskCount(statusId) {
    if (statusId === allTasksFilter.id) {
      return tasks.length
    }

    return tasks.filter((task) => task.status === statusId).length
  }

  function getStatusLabel(status) {
    if (status.id === allTasksFilter.id) {
      return {
        title: t.board.allTasks,
        shortTitle: t.board.allTasksShort,
      }
    }

    return t.statuses[status.id]
  }

  function renderTabLabel(status) {
    const label = getStatusLabel(status)

    return (
      <Box
        sx={{
          alignItems: 'center',
          display: 'grid',
          gap: { xs: 0.75, md: 1 },
          gridTemplateColumns: {
            xs: '1fr',
            md: 'minmax(0, 1fr) auto',
          },
          justifyItems: { xs: 'center', md: 'stretch' },
          width: isDesktop ? '12.25rem' : '100%',
        }}
      >
        <Box
          component="span"
          className="tab-label"
          sx={{
            color: 'inherit',
            lineHeight: 1.2,
            minWidth: 0,
            overflow: 'hidden',
            textAlign: { xs: 'center', md: 'left' },
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          {isDesktop ? label.title : (label.shortTitle ?? label.title)}
        </Box>
        <Chip
          label={getTaskCount(status.id)}
          size="small"
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.18)'
                : theme.palette.grey[200],
            color: 'text.secondary',
            flexShrink: 0,
            fontSize: { xs: '0.6875rem', md: '0.8125rem' },
            height: { xs: '1.5rem', md: '1.75rem' },
            justifySelf: { xs: 'center', md: 'end' },
            minWidth: 0,
            p: 0,
            width: { xs: '1.5rem', md: '1.75rem' },
            '& .MuiChip-label': {
              alignItems: 'center',
              display: 'flex',
              height: '100%',
              justifyContent: 'center',
              lineHeight: 1,
              p: 0,
              width: '100%',
            },
          })}
        />
      </Box>
    )
  }

  return (
    <Paper
      component="aside"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '1.125rem',
        p: { xs: 0.75, md: 1 },
      }}
    >
      <Tabs
        aria-label={t.board.filterLabel}
        orientation={isDesktop ? 'vertical' : 'horizontal'}
        scrollButtons={false}
        value={selectedStatus}
        variant={isDesktop ? 'scrollable' : 'fullWidth'}
        onChange={(_, value) => onChange(value)}
        sx={{
          minHeight: 0,
          '& .MuiTab-root': {
            alignItems: 'stretch',
            alignSelf: isDesktop ? 'stretch' : 'auto',
            borderRadius: '0.875rem',
            color: 'text.secondary',
            flex: isDesktop ? 'initial' : '1 1 0',
            fontWeight: 700,
            justifyContent: 'flex-start',
            maxWidth: 'none',
            minHeight: isDesktop ? '2.875rem' : '4rem',
            minWidth: 0,
            px: { xs: 0.5, md: 1.5 },
            textAlign: { xs: 'center', md: 'left' },
            textTransform: 'none',
            transition: 'all 0.2s ease',
            width: isDesktop ? '100%' : 'auto',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.12)'
                  : theme.palette.grey[100],
              color: 'text.primary',
            },
          },
          '& .MuiTab-root.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '& .tab-label': {
              color: 'primary.contrastText',
            },
            '& .MuiChip-root': {
              bgcolor: 'primary.contrastText',
              color: 'primary.main',
            },
          },
          '& .MuiTabs-indicator': {
            display: 'none',
          },
          '& .MuiTabs-flexContainer': {
            alignItems: isDesktop ? 'stretch' : 'center',
            gap: { xs: 0.25, md: 0.5 },
            width: '100%',
          },
        }}
      >
        {[allTasksFilter, ...taskStatuses].map((status) => (
          <Tab key={status.id} label={renderTabLabel(status)} value={status.id} />
        ))}
      </Tabs>
    </Paper>
  )
}

export default BoardStatusTabs
