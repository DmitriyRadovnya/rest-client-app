import React, { useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface UserRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: {
    [key: string]: string;
  };
  body: string;
}

const initialState: UserRequest = {
  method: 'GET',
  url: '',
  headers: {},
  body: '',
};

const RestClientContainer = () => {
  const [request, setRequest] = useState<UserRequest>(initialState);
  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setRequest((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>show url here</Typography>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Select
            labelId="method-select-label"
            id="method-select"
            value={request.method}
            name="method"
            label="Method"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default RestClientContainer;
