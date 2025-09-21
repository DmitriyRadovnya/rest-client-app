'use client';

import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { login } from '@/app/[locale]/signin/actions'
import { useTranslations } from 'next-intl'

type LoginValues = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const t = useTranslations('SignInForm');
  const { register, handleSubmit, formState } = useForm<LoginValues>()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const onSubmit = async (data: LoginValues) => {
    const res = await login(data);
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
    >
      <Typography variant="h5" align="center" gutterBottom>
        {t('title')}
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        {...register('email')}
        label={t('email')}
        type="email"
        fullWidth
        margin="normal"
        required
      />

      <TextField
        {...register('password')}
        label={t('password')}
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
        startIcon={
          formState.isSubmitting ? <CircularProgress size={20} /> : null
        }
      >
        {formState.isSubmitting ? t('signingIn') : t('signin')}
      </Button>
    </Box>
  );
};
