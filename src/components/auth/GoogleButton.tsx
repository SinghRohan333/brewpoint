"use client";

import { useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleButton({
  redirectTo = "/",
}: {
  redirectTo?: string;
}) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const initializeGoogle = () => {
    if (!window.google || !buttonRef.current) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: async (response: { credential: string }) => {
        try {
          await loginWithGoogle(response.credential);
          toast.success("Signed in with Google");
          router.push(redirectTo);
        } catch (err) {
          toast.error(
            err instanceof Error ? err.message : "Google sign-in failed",
          );
        }
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "filled_black",
      size: "large",
      shape: "pill",
      width: 320,
      text: "continue_with",
    });
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />
      <div ref={buttonRef} className="flex justify-center" />
    </>
  );
}
