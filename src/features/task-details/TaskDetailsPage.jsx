import { useState } from 'react'
import { format } from 'date-fns'
import { enUS, uk } from 'date-fns/locale'
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
import AssigneeAvatar from '../../components/atoms/AssigneeAvatar'
import PriorityChip from '../../components/atoms/PriorityChip'
import { taskPriorities, taskStatuses } from '../../constants/kanban'
import { useI18n } from '../../context/I18nContext'
import { useTasks } from '../../context/TaskContext'

function TaskDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language, t } = useI18n()
  const { tasks, users, updateTask, toggleSubtask, addComment } = useTasks()
  const task = tasks.find((item) => item.id === id)
  const [commentText, setCommentText] = useState('')
  const [showSavedMessage, setShowSavedMessage] = useState(false)
  const dateLocale = language === 'uk' ? uk : enUS

  if (!task) {
    return (
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
          <Stack spacing={2}>
            <Typography component="h1" variant="h5">
              {t.task.notFoundTitle}
            </Typography>
            <Typography color="text.secondary">{t.task.notFoundText}</Typography>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
              {t.task.backToBoard}
            </Button>
          </Stack>
        </Paper>
      </Container>
    )
  }

  const assignee = users.find((user) => user.id === task.assigneeId)
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length
  const deadline = format(new Date(task.deadline), 'd MMMM yyyy', {
    locale: dateLocale,
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
    <Container
      component="main"
      maxWidth="md"
      sx={{
        mx: 'auto',
        py: { xs: 3, md: 4 },
      }}
    >
      <Stack spacing={3}>
        <Stack
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            {t.task.back}
          </Button>
          <Chip color="primary" label={`${t.task.deadline}: ${deadline}`} />
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 4 },
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
          }}
        >
          <Stack spacing={1}>
            <Typography component="h1" fontWeight={900} variant="h4">
              {task.title}
            </Typography>
            <Typography color="text.secondary">{t.task.detailsHint}</Typography>
          </Stack>
        </Paper>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) 17.5rem' },
            alignItems: 'start',
          }}
        >
          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
              }}
            >
              <Stack spacing={2}>
                <Box>
                  <Typography component="h2" fontWeight={800} variant="h5">
                    {t.task.mainInfo}
                  </Typography>
                  <Typography color="text.secondary">ID: {task.id}</Typography>
                </Box>

                {showSavedMessage ? (
                  <Alert severity="success">{t.task.saved}</Alert>
                ) : null}

                <TextField
                  fullWidth
                  label={t.task.title}
                  value={task.title}
                  onChange={(event) => updateField('title', event.target.value)}
                />
                <TextField
                  fullWidth
                  label={t.task.description}
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
                    <InputLabel id="status-label">{t.task.status}</InputLabel>
                    <Select
                      label={t.task.status}
                      labelId="status-label"
                      value={task.status}
                      onChange={(event) =>
                        updateField('status', event.target.value)
                      }
                    >
                      {taskStatuses.map((status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {t.statuses[status.id].title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="priority-label">{t.task.priority}</InputLabel>
                    <Select
                      label={t.task.priority}
                      labelId="priority-label"
                      value={task.priority}
                      onChange={(event) =>
                        updateField('priority', event.target.value)
                      }
                    >
                      {taskPriorities.map((priority) => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {t.priorities[priority.id]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="assignee-label">{t.task.assignee}</InputLabel>
                    <Select
                      label={t.task.assignee}
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
                  {t.task.save}
                </Button>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
              }}
            >
              <Stack spacing={2}>
                <Typography component="h2" fontWeight={700} variant="h5">
                  {t.task.comments}
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
                                  { locale: dateLocale },
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
                      label={t.task.newComment}
                      value={commentText}
                      onChange={(event) => setCommentText(event.target.value)}
                    />
                    <Button
                      endIcon={<SendIcon />}
                      type="submit"
                      variant="outlined"
                    >
                      {t.task.add}
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Stack>

          <Stack spacing={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
              }}
            >
              <Stack spacing={1.5}>
                <Typography component="h2" fontWeight={700} variant="h6">
                  {t.task.info}
                </Typography>
                <AssigneeAvatar user={assignee} />
                <Typography color="text.secondary" variant="body2">
                  {t.task.status}: {t.statuses[task.status].description}
                </Typography>
                <PriorityChip priority={task.priority} />
                <Typography color="text.secondary" variant="body2">
                  {t.task.subtasks}: {completedSubtasks}/{task.subtasks.length}
                </Typography>
              </Stack>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
              }}
            >
              <Stack spacing={1.5}>
                <Typography component="h2" fontWeight={700} variant="h6">
                  {t.task.subtasks}
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

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 4,
              }}
            >
              <Stack spacing={1.5}>
                <Typography component="h2" fontWeight={700} variant="h6">
                  {t.task.tags}
                </Typography>
                <Stack alignItems="flex-start" spacing={1}>
                  {task.tags.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
}

export default TaskDetailsPage
