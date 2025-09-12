import React, { SyntheticEvent, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HeadersTab from '@/lib/components/rest-client/request/RequestTabs/HeadersTab/HeadersTab';

const RequestTabs = () => {
  const [value, setValue] = useState('1');
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="rest client tabs">
          <Tab label="Headers" value="1" />
          <Tab label="Body" value="2" />
          <Tab label="Code" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <HeadersTab />
      </TabPanel>
      <TabPanel value="2">Body</TabPanel>
      <TabPanel value="3">Code</TabPanel>
    </TabContext>
  );
};

export default RequestTabs;
