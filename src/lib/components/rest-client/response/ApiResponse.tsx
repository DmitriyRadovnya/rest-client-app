import React, { JSX } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ApiResponseProps {
  data: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: unknown;
  };
}

const ApiResponse: React.FC<ApiResponseProps> = ({ data }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderBody = (value: unknown, key?: string | number): JSX.Element => {
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean' ||
      value === null
    ) {
      return (
        <ListItem key={key}>
          <ListItemText
            primary={key ? `${key}:` : ''}
            secondary={String(value)}
          />
        </ListItem>
      );
    }

    if (Array.isArray(value)) {
      return (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{key ? `${key} (array)` : 'Array'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>{value.map((item, index) => renderBody(item, index))}</List>
          </AccordionDetails>
        </Accordion>
      );
    }

    if (typeof value === 'object') {
      return (
        <Accordion key={key}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{key ? `${key} (object)` : 'Object'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {Object.entries(value).map(([subKey, subValue]) =>
                renderBody(subValue, subKey)
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      );
    }

    return <Typography variant="body2">Unknown data type.</Typography>;
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Response
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="response tabs"
        >
          <Tab label="Status" />
          <Tab label="Headers" />
          <Tab label="Body" />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <Box p={2}>
          <Typography>
            Status code: {data.status} {data.statusText}
          </Typography>
        </Box>
      )}
      {tabValue === 1 && (
        <Box p={2}>
          <List>
            {Object.entries(data.headers).map(([key, value]) => (
              <ListItem key={key}>
                <ListItemText primary={key} secondary={value} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      {tabValue === 2 && (
        <Box p={2}>
          {data.body ? (
            <List>{renderBody(data.body)}</List>
          ) : (
            <Typography>Response body is empty.</Typography>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default ApiResponse;
