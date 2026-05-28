import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography component="h1" fontWeight={700} variant="h5">
            Сторінку не знайдено
          </Typography>
          <Typography color="text.secondary">
            Перевірте адресу або поверніться до Kanban-дошки.
          </Typography>
          <Button sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/')}>
            До дошки
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default NotFoundPage
