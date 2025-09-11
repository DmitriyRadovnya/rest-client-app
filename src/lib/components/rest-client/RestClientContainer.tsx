'use client';
import React, { ChangeEvent, useState } from 'react';
import { Box, SelectChangeEvent, Typography } from '@mui/material';
import RequestForm from '@/lib/components/rest-client/request/RequestForm/RequestForm';
import { MethodType } from '@/lib/static/http/methods.types';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

const initialState: UserRequest = {
  method: 'GET',
  url: '',
  headers: [],
  body: '',
};

const RestClientContainer = () => {
  const [request, setRequest] = useState<UserRequest>(initialState);

  const selectHandleChange = (e: SelectChangeEvent<MethodType>) => {
    const { value } = e.target;
    setRequest((prevState) => ({ ...prevState, method: value }));
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box bgcolor="grey.100">
        <Typography>временный блок</Typography>
        <Typography>
          {request.url ? request.url : 'Enter URL to perform a request'}
        </Typography>
        <Typography>current method is {request.method}</Typography>
      </Box>
      <RequestForm
        onChange={handleChange}
        onSelectChange={selectHandleChange}
        request={request}
      />
    </Box>
  );
};

export default RestClientContainer;
