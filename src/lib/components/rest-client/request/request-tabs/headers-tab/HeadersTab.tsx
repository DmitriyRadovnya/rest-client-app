import React from 'react';
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { UserRequest } from '@/lib/components/rest-client/request/request.types';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const HeadersTab = () => {
  const { control } = useFormContext<UserRequest>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  return (
    <Box>
      <Button
        onClick={() => append({ key: '', value: '', enabled: true })}
        endIcon={<AddIcon />}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        Add header
      </Button>
      <Stack>
        {fields.map((item, index) => (
          <Stack key={item.id} direction="row" alignItems="center" gap={1}>
            <Controller
              name={`headers.${index}.enabled`}
              control={control}
              render={({ field }) => (
                <Checkbox {...field} checked={!!field.value} />
              )}
            />
            <Controller
              name={`headers.${index}.key`}
              control={control}
              render={({ field }) => (
                <TextField {...field} size="small" label="Key" />
              )}
            />
            <Typography>:</Typography>
            <Controller
              name={`headers.${index}.value`}
              control={control}
              render={({ field }) => (
                <TextField {...field} size="small" label="Value" />
              )}
            />
            <IconButton onClick={() => remove(index)} aria-label="Delete header">
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default HeadersTab;
