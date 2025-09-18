import { signOut } from "@/app/signin/actions";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()}>Sign Out</button>
  )
}

