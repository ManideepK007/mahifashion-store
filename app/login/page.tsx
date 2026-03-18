"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function LoginPage() {

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button onClick={handleLogin}>
        Continue with Google
      </Button>
    </div>
  );
}