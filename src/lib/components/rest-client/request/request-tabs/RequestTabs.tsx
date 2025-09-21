import React, { SyntheticEvent, useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HeadersTab from '@/lib/components/rest-client/request/request-tabs/headers-tab/HeadersTab';
import BodyTab from '@/lib/components/rest-client/request/request-tabs/body-tab/BodyTab';
import CodeTab from '@/lib/components/rest-client/request/request-tabs/code-tab/CodeTab';
import { useTranslations } from 'next-intl';

const RequestTabs = () => {
  const t = useTranslations("RequestTabs");
  const [value, setValue] = useState('1');
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="rest client tabs">
          <Tab label={t("headers")} value="1" />
          <Tab label={t("body")} value="2" />
          <Tab label={t("code")} value="3" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <HeadersTab />
      </TabPanel>
      <TabPanel value="2">
        <BodyTab />
      </TabPanel>
      <TabPanel value="3">
        <CodeTab />
      </TabPanel>
    </TabContext>
  );
};

export default RequestTabs;
