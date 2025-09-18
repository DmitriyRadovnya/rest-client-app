'use client'

import { Box, TextField, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { login } from '@/app/signin/actions'

type LoginValues = {
  email: string
  password: string
}

export default function SignInForm() {
  const { register, handleSubmit, formState } = useForm<LoginValues>()

  const onSubmit = async (data: LoginValues) => {
    await login(data)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        width: '90%',
        mx: 'auto',
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign In
      </Typography>

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        required
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={formState.isSubmitting}
      >
        Sign In
      </Button>
    </Box>
  )
}