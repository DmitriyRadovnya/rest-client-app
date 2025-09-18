'use client';
import React from 'react';
import { Box } from '@mui/material';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import RequestFormProvider from '@/lib/providers/RequestFormProvider';
import RequestForm from '@/lib/components/rest-client/request/request-form/RequestForm';

const initialState: UserRequest = {
  method: 'GET',
  url: 'https://',
  headers: [],
  body: '',
  bodyMode: 'json',
};

const RestClientContainer = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <RequestFormProvider initial={initialState}>
        <RequestForm />
      </RequestFormProvider>
    </Box>
  );
};

export default RestClientContainer;
