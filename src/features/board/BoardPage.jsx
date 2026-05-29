import { useState } from 'react'
import { Box, Container, Grid, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import BoardStatusTabs from '../../components/molecules/BoardStatusTabs'
import KanbanColumn from '../../components/organisms/KanbanColumn'
import { allTasksFilter, taskStatuses } from '../../constants/kanban'
import { useTasks } from '../../context/TaskContext'

function BoardPage() {
  const [selectedStatus, setSelectedStatus] = useState(allTasksFilter.id)
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { tasks, users, moveTask } = useTasks()
  const isAllTasksSelected = selectedStatus === allTasksFilter.id
  const visibleStatuses =
    isAllTasksSelected
      ? taskStatuses
      : taskStatuses.filter((status) => status.id === selectedStatus)

  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        height: { md: 'calc(100vh - 4rem)' },
        minHeight: { xs: '100vh', md: 'auto' },
        overflow: { md: 'hidden' },
        py: { xs: 3, md: 0 },
      }}
    >
      <Container maxWidth="xl" sx={{ height: { md: '100%' } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: { xs: '1fr', md: '16.25rem minmax(0, 1fr)' },
            alignItems: { xs: 'start', md: 'stretch' },
            boxSizing: 'border-box',
            height: { md: '100%' },
            py: { md: 1 },
          }}
        >
          <BoardStatusTabs
            isDesktop={isDesktop}
            selectedStatus={selectedStatus}
            tasks={tasks}
            onChange={setSelectedStatus}
          />

          <Grid
            className="tasks-scroll-area"
            container
            spacing={{ xs: 2, md: 2.5 }}
            sx={{
              alignContent: 'flex-start',
              height: { md: '100%' },
              overflowY: { md: 'auto' },
            }}
          >
            {visibleStatuses.map((column) => (
              <Grid
                key={column.id}
                size={{
                  xs: 12,
                  md: isAllTasksSelected ? 4 : 8,
                }}
                sx={{
                  mx: { md: isAllTasksSelected ? 0 : 'auto' },
                }}
              >
                <KanbanColumn
                  column={column}
                  onMoveTask={moveTask}
                  statuses={taskStatuses}
                  tasks={tasks.filter((task) => task.status === column.id)}
                  users={users}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

export default BoardPage
