'use client';
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import RequestFormProvider from '@/lib/providers/RequestFormProvider';
import RequestForm from '@/lib/components/rest-client/request/request-form/RequestForm';
import { CODE_VARIANTS } from '@/lib/static/codeGen/codeGen';
import ApiResponse from '@/lib/components/rest-client/response/ApiResponse';
import { useTranslations } from 'next-intl';

const initialState: UserRequest = {
  method: 'GET',
  url: 'https://',
  headers: [],
  body: '',
  bodyMode: 'json',
  codeVariant: CODE_VARIANTS[0],
  snippet: '',
};

export interface ApiResponseData {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
}

const RestClientContainer = () => {
  const t = useTranslations("Response");
  const [response, setResponse] = useState<ApiResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResponse = (data: ApiResponseData) => {
    setResponse(data);
    setError(null);
  };

  const handleError = (err: string) => {
    setError(err);
    setResponse(null);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <RequestFormProvider initial={initialState}>
        <RequestForm onSuccess={handleResponse} onError={handleError} />
      </RequestFormProvider>
      {!response && !error && <div>{t("firstRequest")}</div>}
      {response && <ApiResponse data={response} />}
      {error && <Box color="error.main">{t("error", { message: error })}</Box>}
    </Box>
  );
};

export default RestClientContainer;
