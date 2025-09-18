import { createClient } from "@/lib/providers/supabase/server";
import { Container, Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser();

  return (
<Container
      maxWidth="md"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px - 64px)"
      }}
    >
  {!user ? (
    <>
      <Typography variant="h4">Welcome!</Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/signin"
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Sign In
        </Button>
        <Button
          component={Link}
          href="/signup"
          variant="outlined"
        >
          Sign Up
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Typography variant="h4">
        Welcome Back, {user.user_metadata?.username}!
      </Typography>
      <Box mt={2}>
        <Button
          component={Link}
          href="/rest-client"
          variant="outlined"
          sx={{ mr: 2 }}
        >
          REST Client
        </Button>
        <Button
          component={Link}
          href="/history"
          variant="outlined"
          sx={{ mr: 2 }}
        >
          History
        </Button>
        <Button
          component={Link}
          href="/variables"
          variant="outlined"
        >
          Variables
        </Button>
      </Box>
    </>
  )}
</Container>
)}