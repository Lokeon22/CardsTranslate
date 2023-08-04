import { Input } from "@/components/Input";
import { LoginContainer } from "@/components/LoginContainer";

export default function Register() {
  async function teste2(data: FormData) {
    "use server";
    console.log("pagina register");
  }

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <LoginContainer
        action={teste2}
        title="Criar uma nova conta"
        text="Já possui uma conta?"
        linkText="Voltar"
        url="/login"
        btnText="Cadastrar"
      >
        <Input text="Seu nome" name="name" type="text" />
        <Input text="Email" name="email" type="text" />
        <Input text="Senha" name="password" type="password" />
      </LoginContainer>
    </main>
  );
}
