import { useState } from 'react'
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import KanbanColumn from '../../components/KanbanColumn'
import { taskStatuses } from '../../constants/kanban'
import { useTasks } from '../../context/TaskContext'

const allTasksFilter = {
  id: 'all',
  title: 'Усі задачі',
  shortTitle: 'Усі',
  description: 'Повна дошка',
}

function BoardPage() {
  const [selectedStatus, setSelectedStatus] = useState(allTasksFilter.id)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { tasks, users, moveTask } = useTasks()
  const visibleStatuses =
    selectedStatus === allTasksFilter.id
      ? taskStatuses
      : taskStatuses.filter((status) => status.id === selectedStatus)

  // "All" displays the full board; status tabs narrow the board to one column.
  function getTaskCount(statusId) {
    if (statusId === allTasksFilter.id) {
      return tasks.length
    }

    return tasks.filter((task) => task.status === statusId).length
  }

  function renderTabLabel(status) {
    return (
      <Stack
        alignItems="center"
        direction={isDesktop ? 'row' : 'column'}
        justifyContent={isDesktop ? 'space-between' : 'center'}
        spacing={1}
        sx={{ width: isDesktop ? '100%' : 'auto' }}
      >
        <span>
          {isDesktop ? status.title : (status.shortTitle ?? status.title)}
        </span>
        <Chip label={getTaskCount(status.id)} size="small" />
      </Stack>
    )
  }

  return (
    <Container component="main" maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', md: '260px minmax(0, 1fr)' },
          alignItems: 'start',
        }}
      >
        <Paper
          component="aside"
          variant="outlined"
          sx={{ p: { xs: 1, md: 2 }, position: { md: 'sticky' }, top: { md: 24 } }}
        >
          <Tabs
            aria-label="Фільтр задач за статусом"
            orientation={isDesktop ? 'vertical' : 'horizontal'}
            scrollButtons={false}
            value={selectedStatus}
            variant={isDesktop ? 'scrollable' : 'fullWidth'}
            onChange={(_, value) => setSelectedStatus(value)}
            sx={{
              minHeight: 0,
              // Mobile uses full-width tabs to avoid horizontal scrolling.
              '& .MuiTab-root': {
                alignItems: 'stretch',
                flex: isDesktop ? 'initial' : '1 1 0',
                minHeight: isDesktop ? 44 : 58,
                minWidth: 0,
                px: { xs: 0.5, md: 2 },
                textTransform: 'none',
              },
              '& .MuiTabs-flexContainer': {
                gap: { xs: 0, md: 0.5 },
              },
            }}
          >
            {[allTasksFilter, ...taskStatuses].map((status) => (
              <Tab
                key={status.id}
                label={renderTabLabel(status)}
                value={status.id}
              />
            ))}
          </Tabs>
        </Paper>

        <Stack spacing={3}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                lg:
                  selectedStatus === allTasksFilter.id
                    ? 'repeat(3, minmax(0, 1fr))'
                    : 'minmax(0, 760px)',
              },
              alignItems: 'start',
            }}
          >
            {visibleStatuses.map((column) => (
              <KanbanColumn
                column={column}
                key={column.id}
                onMoveTask={moveTask}
                statuses={taskStatuses}
                tasks={tasks.filter((task) => task.status === column.id)}
                users={users}
              />
            ))}
          </Box>
        </Stack>
      </Box>
    </Container>
  )
}

export default BoardPage
