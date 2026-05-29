import { useState } from 'react'
import { format } from 'date-fns'
import { enUS, uk } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import AlarmIcon from '@mui/icons-material/Alarm'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useI18n } from '../../context/I18nContext'
import AssigneeAvatar from '../atoms/AssigneeAvatar'
import TaskMetaChip from '../atoms/TaskMetaChip'

const REFERENCE_DATE = new Date('2026-05-28T00:00:00.000Z')
const TWO_DAYS_IN_MS = 48 * 60 * 60 * 1000

function getPriorityStyles(priority, mode) {
  const isDark = mode === 'dark'

  const styles = {
    high: {
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.15)' : '#FEE2E2',
      color: isDark ? '#FCA5A5' : '#991B1B',
    },
    medium: {
      backgroundColor: isDark ? 'rgba(245, 158, 11, 0.15)' : '#FEF3C7',
      color: isDark ? '#FCD34D' : '#92400E',
    },
    low: {
      backgroundColor: isDark ? 'rgba(148, 163, 184, 0.15)' : '#F1F5F9',
      color: isDark ? '#CBD5E1' : '#475569',
    },
  }

  return styles[priority] ?? styles.medium
}

function getDeadlineState(deadline) {
  const deadlineDate = new Date(deadline)
  const timeToDeadline = deadlineDate.getTime() - REFERENCE_DATE.getTime()

  return {
    date: deadlineDate,
    isUrgent: timeToDeadline <= TWO_DAYS_IN_MS,
  }
}

function TaskCard({ task, users, statuses, onMove }) {
  const [menuAnchor, setMenuAnchor] = useState(null)
  const navigate = useNavigate()
  const { language, t } = useI18n()
  const dateLocale = language === 'uk' ? uk : enUS
  const assignee = users.find((user) => user.id === task.assigneeId)
  const completedSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length
  const progress = Math.round((completedSubtasks / task.subtasks.length) * 100)
  const deadline = getDeadlineState(task.deadline)
  const availableStatuses = statuses.filter((status) => status.id !== task.status)

  function openDetails() {
    navigate(`/task/${task.id}`)
  }

  function openMenu(event) {
    event.stopPropagation()
    setMenuAnchor(event.currentTarget)
  }

  function handleMove(event, status) {
    event.stopPropagation()
    // Status changes are delegated to context through the board page.
    onMove(task.id, status)
    setMenuAnchor(null)
  }

  return (
    <Card
      elevation={0}
      role="button"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          openDetails()
        }
      }}
      sx={(theme) => {
        const isDark = theme.palette.mode === 'dark'

        return {
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '1rem',
          cursor: 'pointer',
          display: 'flex',
          minHeight: { xs: '19.5rem', md: '20.75rem' },
          height: { md: '20.75rem' },
          overflow: 'hidden',
          position: 'relative',
          transition:
            'box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: isDark ? 'rgba(250, 250, 250, 0.32)' : 'primary.main',
            boxShadow: isDark
              ? '0 0 0 0.0625rem rgba(250, 250, 250, 0.08), 0 1.125rem 2.625rem rgba(0, 0, 0, 0.34)'
              : '0 1.125rem 2.625rem -1.375rem rgba(15, 23, 42, 0.32), 0 0.625rem 1.5rem -1.125rem rgba(15, 23, 42, 0.22)',
          },
          '&:focus-visible': {
            outline: '0.125rem solid',
            outlineColor: 'primary.main',
            outlineOffset: '0.125rem',
          },
        }
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flex: 1,
          minWidth: 0,
          p: { xs: 2, md: 2 },
        }}
      >
        <Stack spacing={1.75} sx={{ flex: 1, minHeight: 0, width: '100%' }}>
          <Box sx={{ minHeight: '7.5rem', pr: 4 }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                component="h3"
                fontWeight={700}
                lineHeight={1.3}
                sx={{
                  display: '-webkit-box',
                  minHeight: '2.6em',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                }}
                variant="subtitle1"
              >
                {task.title}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  display: '-webkit-box',
                  fontSize: '0.8125rem',
                  mt: 0.75,
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 3,
                }}
              >
                {task.description}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              columnGap: 1,
              display: 'flex',
              flexWrap: 'wrap',
              maxHeight: '3.25rem',
              minHeight: '1.625rem',
              overflow: 'hidden',
              rowGap: 1,
            }}
          >
            {task.tags.map((tag) => (
              <TaskMetaChip key={tag}>{tag}</TaskMetaChip>
            ))}
          </Box>

          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={1}
            sx={{ minHeight: '1.625rem' }}
          >
            <Chip
              label={t.priorities[task.priority]}
              size="small"
              sx={(theme) => {
                const priority = getPriorityStyles(
                  task.priority,
                  theme.palette.mode,
                )

                return {
                  bgcolor: priority.backgroundColor,
                  color: priority.color,
                  fontSize: '0.75rem',
                  height: '1.625rem',
                }
              }}
            />
            <TaskMetaChip
              icon={
                deadline.isUrgent ? (
                  <AlarmIcon />
                ) : (
                  <CalendarTodayOutlinedIcon />
                )
              }
              isUrgent={deadline.isUrgent}
            >
              {format(deadline.date, 'd MMM yyyy', { locale: dateLocale })}
            </TaskMetaChip>
          </Stack>

          <Box sx={{ minHeight: '2.625rem' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={1}
              sx={{ mb: 0.75 }}
            >
              <Typography
                color="text.secondary"
                fontSize="0.75rem"
                fontWeight={600}
              >
                {t.task.subtasks}
              </Typography>
              <Typography
                color="text.secondary"
                fontSize="0.75rem"
                fontWeight={600}
              >
                {completedSubtasks} / {task.subtasks.length}
              </Typography>
            </Stack>
            <LinearProgress
              value={progress}
              variant="determinate"
              sx={(theme) => ({
                bgcolor:
                  theme.palette.mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.16)'
                    : theme.palette.grey[200],
                height: '0.375rem',
                borderRadius: 999,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 999,
                },
              })}
            />
          </Box>

          <Box sx={{ mt: 'auto' }}>
            <AssigneeAvatar user={assignee} />
          </Box>
        </Stack>
      </CardContent>

      <Tooltip
        arrow
        disableInteractive
        placement="bottom"
        slotProps={{
          tooltip: {
            sx: {
              fontSize: '0.75rem',
              fontWeight: 700,
              mt: '0.25rem !important',
              px: 1,
              py: 0.5,
            },
          },
        }}
        title={t.task.actions}
      >
        <IconButton
          aria-label={t.task.actions}
          size="small"
          onClick={openMenu}
          sx={{
            color: 'text.secondary',
            position: 'absolute',
            right: '0.875rem',
            top: '1rem',
            transition: 'transform 160ms ease, background-color 160ms ease',
            zIndex: 2,
            '&:hover': {
              bgcolor: 'transparent',
              color: 'text.primary',
            },
            '&:active': {
              transform: 'scale(0.92)',
            },
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              color: 'text.primary',
              mt: 0.75,
              minWidth: '13.125rem',
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        onClick={(event) => event.stopPropagation()}
        onClose={() => setMenuAnchor(null)}
      >
        {availableStatuses.map((status) => (
          <MenuItem
            key={status.id}
            onClick={(event) => handleMove(event, status.id)}
          >
            {t.task.moveTo} {t.statuses[status.id].title}
          </MenuItem>
        ))}
      </Menu>
    </Card>
  )
}

export default TaskCard
