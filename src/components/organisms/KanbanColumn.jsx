import { Box, Paper, Stack, Typography } from '@mui/material'
import { useI18n } from '../../context/I18nContext'
import TaskCard from '../molecules/TaskCard'

function KanbanColumn({ column, tasks, users, statuses, onMoveTask }) {
  const { t } = useI18n()
  const columnLabel = t.statuses[column.id]

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        bgcolor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[900]
            : theme.palette.grey[100],
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '1rem',
        p: { xs: 1.5, sm: 2 },
      })}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: 'minmax(0, 1fr) auto',
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              component="h2"
              fontWeight={700}
              lineHeight={1.2}
              variant="h6"
            >
              {columnLabel.title}
            </Typography>
          </Box>

          <Box
            sx={(theme) => ({
              bgcolor:
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.16)'
                  : theme.palette.grey[200],
              borderRadius: '1.25rem',
              color: 'text.primary',
              display: 'flex',
              fontSize: '0.8125rem',
              fontWeight: 800,
              height: '2.125rem',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '2.125rem',
              px: 1,
              flexShrink: 0,
            })}
          >
            {tasks.length}
          </Box>
        </Box>

        <Stack spacing={1.5}>
          {tasks.length ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                onMove={onMoveTask}
                statuses={statuses}
                task={task}
                users={users}
              />
            ))
          ) : (
            <Box
              sx={(theme) => ({
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(15, 23, 42, 0.42)'
                    : 'rgba(255,255,255,0.68)',
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: '0.875rem',
                p: 2,
                textAlign: 'center',
              })}
            >
              <Typography color="text.secondary" fontSize="0.8125rem">
                {t.board.emptyColumn}
              </Typography>
            </Box>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default KanbanColumn
