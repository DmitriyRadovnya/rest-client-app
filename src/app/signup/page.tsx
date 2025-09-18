import { redirect } from "next/navigation";
import { createClient } from "@/lib/providers/supabase/server";
import { Box } from "@mui/material";
import { SignUpForm } from "@/lib/components/auth/sign-up/SignUpForm";

const SignUpPage = async () => {
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
      <SignUpForm />
    </Box>
  );
}

export default SignUpPage;