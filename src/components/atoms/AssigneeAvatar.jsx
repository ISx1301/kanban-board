import { Avatar, Stack, Typography } from '@mui/material'

function AssigneeAvatar({ user, compact = false }) {
  if (!user) {
    return null
  }

  return (
    <Stack alignItems="center" direction="row" spacing={1}>
      <Avatar
        alt={user.name}
        src={user.avatar}
        sx={{ width: '2rem', height: '2rem' }}
      />
      {!compact ? (
        <Typography color="text.secondary" fontWeight={600} variant="body2">
          {user.name}
        </Typography>
      ) : null}
    </Stack>
  )
}

export default AssigneeAvatar
