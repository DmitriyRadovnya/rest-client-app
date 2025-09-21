'use client';

import { Box, TextField, Button, Typography, Alert } from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpSchema, SignUpValues } from '@/lib/validation/auth.schema'
import { useState } from 'react'
import { signup } from '@/app/[locale]/signup/actions'
import { useTranslations } from 'next-intl'

export const SignUpForm = () => {
  const t = useTranslations('SignUpForm');
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: yupResolver(signUpSchema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpValues> = async (data) => {
    setErrorMessage(null);
    const res = await signup(data);
    if (res?.error) {
      setErrorMessage(res.error);
    }
  };

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
        {t('title')}
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        {...register('username')}
        label={t('name')}
        fullWidth
        margin="normal"
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('email')}
        label={t('email')}
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('password')}
        label={t('password')}
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
        {t('signup')}
      </Button>
    </Box>
  );
};
