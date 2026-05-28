import { Avatar, Stack, Typography } from '@mui/material'

function AssigneeAvatar({ user, compact = false }) {
  if (!user) {
    return null
  }

  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Avatar alt={user.name} src={user.avatar} sx={{ width: 30, height: 30 }} />
      {!compact ? (
        <Typography color="text.secondary" variant="body2">
          {user.name}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default AssigneeAvatar
