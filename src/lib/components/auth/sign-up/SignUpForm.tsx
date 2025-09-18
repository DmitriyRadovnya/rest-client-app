'use client'

import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signup } from '@/app/signup/actions'
import { signUpSchema, SignUpValues } from '@/lib/validation/auth.schema'
import { useState } from 'react'

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpSchema),
    mode: 'onBlur',
  })

  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    setErrorMessage(null)
    const res = await signup(data)
    if (res?.error) {
      setErrorMessage(res.error)
    }
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
      noValidate
    >
      <Typography variant="h5" align="center" gutterBottom>
        Sign Up
      </Typography>

      {errorMessage && (
        <Alert severity="error">{errorMessage}</Alert>
      )}

      <TextField
        {...register('username')}
        label="Username"
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={isSubmitting}
      >
        Sign Up
      </Button>
    </Box>
  )
}