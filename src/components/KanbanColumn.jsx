import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import TaskCard from './TaskCard'

function KanbanColumn({ column, tasks, users, statuses, onMoveTask }) {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" spacing={1}>
          <Box>
            <Typography component="h2" fontWeight={700} variant="h6">
              {column.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {column.description}
            </Typography>
          </Box>
          <Chip label={tasks.length} size="small" />
        </Stack>

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
            <Typography color="text.secondary" variant="body2">
              У цій колонці поки немає задач.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default KanbanColumn
