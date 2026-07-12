import AuthPanel from "@/components/auth/AuthPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <AuthPanel />
      <div className="flex items-center justify-center px-6 py-16">
        <RegisterForm />
      </div>
    </main>
  );
}
