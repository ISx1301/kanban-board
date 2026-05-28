import { useState } from 'react'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import AssigneeAvatar from './AssigneeAvatar'
import PriorityChip from './PriorityChip'

function TaskCard({ task, users, statuses, onMove }) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const navigate = useNavigate()
  const assignee = users.find((user) => user.id === task.assigneeId)
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length
  const progress = Math.round((completedSubtasks / task.subtasks.length) * 100)
  const deadline = format(new Date(task.deadline), 'd MMM yyyy', {
    locale: uk,
  })

  function handleMove(status) {
    // Status changes are delegated to context through the board page.
    onMove(task.id, status)
    setMenuAnchor(null)
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1.5}>
          <Box>
            <Typography component="h3" fontWeight={700} variant="subtitle1">
              {task.title}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {task.description}
            </Typography>
          </Box>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {task.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>

          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <PriorityChip priority={task.priority} />
            <Typography color="text.secondary" variant="caption">
              {deadline}
            </Typography>
          </Stack>

          <Box>
            <Stack direction="row" justifyContent="space-between">
              <Typography color="text.secondary" variant="caption">
                Підзадачі
              </Typography>
              <Typography color="text.secondary" variant="caption">
                {completedSubtasks}/{task.subtasks.length}
              </Typography>
            </Stack>
            <LinearProgress value={progress} variant="determinate" />
          </Box>

          <AssigneeAvatar user={assignee} />

          <Stack direction="row" spacing={1}>
            <Button size="small" onClick={() => navigate(`/task/${task.id}`)}>
              Деталі
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(event) => setMenuAnchor(event.currentTarget)}
            >
              Статус
            </Button>
          </Stack>
        </Stack>
      </CardContent>

      <Menu
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        open={Boolean(menuAnchor)}
      >
        {statuses.map((status) => (
          <MenuItem
            disabled={status.id === task.status}
            key={status.id}
            onClick={() => handleMove(status.id)}
          >
            {status.title}
          </MenuItem>
        ))}
      </Menu>
    </Card>
  )
}

export default TaskCard
