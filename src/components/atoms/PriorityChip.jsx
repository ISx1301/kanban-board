import { Chip } from '@mui/material'
import { taskPriorities } from '../../constants/kanban'
import { useI18n } from '../../context/I18nContext'

function PriorityChip({ priority }) {
  const { t } = useI18n()
  const config =
    taskPriorities.find((item) => item.id === priority) ?? taskPriorities[1]

  return (
    <Chip
      color={config.color}
      label={t.priorities[config.id]}
      size="small"
      variant="outlined"
    />
  )
}

export default PriorityChip
