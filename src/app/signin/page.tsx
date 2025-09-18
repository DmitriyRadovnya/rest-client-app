import { redirect } from "next/navigation";
import { createClient } from "@/lib/providers/supabase/server";
import { Box } from "@mui/material";
import SignInForm from "@/lib/components/auth/sign-in/SignInForm";

export default async function SignInPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignInForm />
    </Box>
  );
}