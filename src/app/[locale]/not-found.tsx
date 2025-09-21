"use client";

import { Box, Button, Typography } from "@mui/material";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("NotFound");
  const locale = useLocale();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {t("title")}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t("description")}
      </Typography>
      <Link href="/" locale={locale}>
        <Button variant="contained" color="primary">
          {t("backHome")}
        </Button>
      </Link>
    </Box>
  );
}
