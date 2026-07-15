"use client";

import { useRef, useEffect } from "react";
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
  const isInitialized = useRef(false);
  const { loginWithGoogle } = useAuth();
  const router = useRouter();

  const initializeGoogle = () => {
    // Prevent initializing if Google SDK isn't ready, the DOM node is missing,
    // or if we have already initialized this instance.
    if (!window.google || !buttonRef.current || isInitialized.current) return;

    try {
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
        locale: "en",
      });

      isInitialized.current = true;
    } catch (error) {
      console.error("Failed to initialize Google Sign-In:", error);
    }
  };

  // Safely handle client-side navigations where the script is already loaded
  useEffect(() => {
    if (window.google) {
      initializeGoogle();
    }

    // Reset initialization tracker if the component unmounts
    return () => {
      isInitialized.current = false;
    };
  }, []);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client?hl=en"
        strategy="afterInteractive"
        onLoad={initializeGoogle}
      />
      <div ref={buttonRef} className="flex justify-center min-h-[50px]" />
    </>
  );
}
