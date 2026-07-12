import { Suspense } from "react";
import AuthPanel from "@/components/auth/AuthPanel";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center px-6 py-16">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
