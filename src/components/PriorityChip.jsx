import { Chip } from '@mui/material'
import { taskPriorities } from '../constants/kanban'

function PriorityChip({ priority }) {
  const config =
    taskPriorities.find((item) => item.id === priority) ?? taskPriorities[1]

  return (
    <Chip
      color={config.color}
      label={config.label}
      size="small"
      variant="outlined"
    />
  )
}

export default PriorityChip
