"use client";
import { useAuth } from "@/context/userContext";
import { LoginContainer } from "@/components/LoginContainer";
import { Input } from "@/components/Input";

export default function Login() {
  const { handleLogin } = useAuth();

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <LoginContainer
        action={handleLogin}
        title="Já possuo uma conta"
        text="Ainda não tem uma conta?"
        linkText="Registre-se agora"
        url="/login/register"
        btnText="Entrar"
      >
        <Input text="Email" name="email" type="text" required />
        <Input text="Senha" name="password" type="password" required />
      </LoginContainer>
    </main>
  );
}
