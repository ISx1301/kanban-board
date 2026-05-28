import { useState } from 'react'
import { format } from 'date-fns'
import { uk } from 'date-fns/locale'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SendIcon from '@mui/icons-material/Send'
import AssigneeAvatar from '../../components/AssigneeAvatar'
import PriorityChip from '../../components/PriorityChip'
import { taskPriorities, taskStatuses } from '../../constants/kanban'
import { useTasks } from '../../context/TaskContext'

function TaskDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { tasks, users, updateTask, toggleSubtask, addComment } = useTasks()
  const task = tasks.find((item) => item.id === id)
  const [commentText, setCommentText] = useState('')
  const [showSavedMessage, setShowSavedMessage] = useState(false)

  if (!task) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography component="h1" variant="h5">
              Задачу не знайдено
            </Typography>
            <Typography color="text.secondary">
              Перевірте посилання або поверніться до дошки.
            </Typography>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
              До дошки
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  const assignee = users.find((user) => user.id === task.assigneeId)
  const currentStatus = taskStatuses.find((status) => status.id === task.status)
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length
  const deadline = format(new Date(task.deadline), 'd MMMM yyyy', {
    locale: uk,
  })

  function updateField(field, value) {
    // Edits write directly to context so the board reflects them immediately.
    setShowSavedMessage(false)
    updateTask(task.id, { [field]: value })
  }

  function handleAddComment(event) {
    event.preventDefault()

    const text = commentText.trim()

    if (!text) {
      return
    }

    addComment(task.id, text)
    setCommentText('')
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Назад
          </Button>
          <Typography color="text.secondary" variant="body2">
            Дедлайн: {deadline}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 320px' },
            alignItems: 'start',
          }}
        >
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Box>
                  <Typography component="h1" fontWeight={700} variant="h4">
                    Деталі задачі
                  </Typography>
                  <Typography color="text.secondary">
                    ID: {task.id}
                  </Typography>
                </Box>

                {showSavedMessage ? (
                  <Alert severity="success">Зміни збережено.</Alert>
                ) : null}

                <TextField
                  fullWidth
                  label="Назва"
                  value={task.title}
                  onChange={(event) => updateField('title', event.target.value)}
                />
                <TextField
                  fullWidth
                  label="Опис"
                  minRows={4}
                  multiline
                  value={task.description}
                  onChange={(event) =>
                    updateField('description', event.target.value)
                  }
                />

                <Box
                  sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Статус</InputLabel>
                    <Select
                      label="Статус"
                      labelId="status-label"
                      value={task.status}
                      onChange={(event) =>
                        updateField('status', event.target.value)
                      }
                    >
                      {taskStatuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="priority-label">Пріоритет</InputLabel>
                    <Select
                      label="Пріоритет"
                      labelId="priority-label"
                      value={task.priority}
                      onChange={(event) =>
                        updateField('priority', event.target.value)
                      }
                    >
                      {taskPriorities.map((priority) => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {priority.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="assignee-label">Відповідальний</InputLabel>
                    <Select
                      label="Відповідальний"
                      labelId="assignee-label"
                      value={task.assigneeId}
                      onChange={(event) =>
                        updateField('assigneeId', event.target.value)
                      }
                    >
                      {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Button
                  sx={{ alignSelf: 'flex-start' }}
                  variant="contained"
                  onClick={() => setShowSavedMessage(true)}
                >
                  Зберегти
                </Button>
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={2}>
                <Typography component="h2" fontWeight={700} variant="h5">
                  Коментарі
                </Typography>

                <List disablePadding>
                  {task.comments.map((comment, index) => (
                    <Box key={comment.id}>
                      <ListItem alignItems="flex-start" disableGutters>
                        <ListItemAvatar>
                          <Avatar>{comment.author.charAt(0)}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.author}
                          secondary={
                            <>
                              <Typography component="span" variant="body2">
                                {comment.text}
                              </Typography>
                              <br />
                              <Typography
                                color="text.secondary"
                                component="span"
                                variant="caption"
                              >
                                {format(
                                  new Date(comment.createdAt),
                                  'd MMM yyyy, HH:mm',
                                  { locale: uk },
                                )}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < task.comments.length - 1 ? <Divider /> : null}
                    </Box>
                  ))}
                </List>

                <Box component="form" onSubmit={handleAddComment}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
                    <TextField
                      fullWidth
                      label="Новий коментар"
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                    />
                    <Button
                      endIcon={<SendIcon />}
                      type="submit"
                      variant="outlined"
                    >
                      Додати
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Stack>

          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <Typography component="h2" fontWeight={700} variant="h6">
                  Інформація
                </Typography>
                <AssigneeAvatar user={assignee} />
                <Typography color="text.secondary" variant="body2">
                  Статус: {currentStatus?.description}
                </Typography>
                <PriorityChip priority={task.priority} />
                <Typography color="text.secondary" variant="body2">
                  Підзадачі: {completedSubtasks}/{task.subtasks.length}
                </Typography>
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack spacing={1.5}>
                <Typography component="h2" fontWeight={700} variant="h6">
                  Підзадачі
                </Typography>
                {task.subtasks.map((subtask) => (
                  <Stack
                    alignItems="center"
                    direction="row"
                    key={subtask.id}
                    spacing={1}
                  >
                    <Checkbox
                      checked={subtask.isCompleted}
                      onChange={() => toggleSubtask(task.id, subtask.id)}
                    />
                    <Typography
                      color={subtask.isCompleted ? 'text.secondary' : 'inherit'}
                      sx={{
                        textDecoration: subtask.isCompleted
                          ? 'line-through'
                          : 'none',
                      }}
                      variant="body2"
                    >
                      {subtask.title}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 3 }}>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {task.tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default TaskDetailsPage
