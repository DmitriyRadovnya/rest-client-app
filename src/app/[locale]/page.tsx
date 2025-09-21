import { createClient } from "@/lib/providers/supabase/server";
import { Container, Typography, Box } from "@mui/material";
import en from "@/messages/en.json";
import ru from "@/messages/ru.json";
import { LocalizedButtonLink } from "@/lib/components/header/LocalizedButtonLink";

type Locale = "en" | "ru";
const messagesMap = { en, ru };
type Messages = typeof en | typeof ru;

type Props = {
  params: { locale: Locale } | Promise<{ locale: Locale }>;
};

function getMessages(locale: Locale): Messages {
  return messagesMap[locale] ?? en;
}

export default async function Page({ params }: Props) {
  const { locale } = await Promise.resolve(params);
  const messages = getMessages(locale);
  const t = (key: keyof Messages["HomePage"]) => messages.HomePage[key];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Container
      maxWidth="md"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px - 64px)",
      }}
    >
      {!user ? (
        <>
          <Typography variant="h4">{t("title-anon")}</Typography>
          <Box mt={2}>
            <LocalizedButtonLink href="/signin" variant="outlined" sx={{ mr: 2 }}>
              {t("signin")}
            </LocalizedButtonLink>
            <LocalizedButtonLink href="/signup" variant="outlined">
              {t("signup")}
            </LocalizedButtonLink>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h4">
            {t("title-auth")}, {user.user_metadata?.username}!
          </Typography>
          <Box mt={2}>
            <LocalizedButtonLink href="/client" variant="outlined" sx={{ mr: 2 }}>
              {t("rest")}
            </LocalizedButtonLink>
            <LocalizedButtonLink href="/history" variant="outlined" sx={{ mr: 2 }}>
              {t("history")}
            </LocalizedButtonLink>
            <LocalizedButtonLink href="/variables" variant="outlined">
              {t("variables")}
            </LocalizedButtonLink>
          </Box>
        </>
      )}
    </Container>
  );
}


