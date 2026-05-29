import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../../context/I18nContext'

function NotFoundPage() {
  const navigate = useNavigate()
  const { t } = useI18n()

  return (
    <Container component="main" maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography component="h1" fontWeight={700} variant="h5">
            {t.notFound.title}
          </Typography>
          <Typography color="text.secondary">{t.notFound.text}</Typography>
          <Button sx={{ alignSelf: 'flex-start' }} onClick={() => navigate('/')}>
            {t.notFound.action}
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}

export default NotFoundPage
