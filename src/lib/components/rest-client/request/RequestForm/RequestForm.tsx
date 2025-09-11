import React, { ChangeEvent, FC } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { METHOD_META, METHODS } from '@/lib/static/http/methods';
import { MethodType } from '@/lib/static/http/methods.types';
import RequestTabs from '@/lib/components/rest-client/request/RequestTabs/RequestTabs';
import SendIcon from '@mui/icons-material/Send';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';

interface RequestFormProps {
  onSelectChange: (e: SelectChangeEvent<MethodType>) => void;
  request: UserRequest;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RequestForm: FC<RequestFormProps> = ({
  onChange,
  onSelectChange,
  request,
}) => {
  return (
    <Box component="form" display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <FormControl>
          <InputLabel id="method-select-label">Method</InputLabel>
          <Select
            labelId="method-select-label"
            id="method-select"
            value={request.method}
            name="method"
            label="Method"
            onChange={onSelectChange}
            size="small"
          >
            {METHODS.map((item) => (
              <MenuItem key={item} value={item}>
                {METHOD_META[item].label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <TextField
            id="url"
            label="Enter URL"
            value={request.url}
            name="url"
            onChange={onChange}
            size="small"
          />
        </FormControl>
        <FormControl>
          <Button variant="contained" size="medium" endIcon={<SendIcon />}>
            send
          </Button>
        </FormControl>
      </Box>
      <RequestTabs request={request} />
    </Box>
  );
};

export default RequestForm;
