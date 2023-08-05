import { Input } from "@/components/Input";
import { LoginContainer } from "@/components/LoginContainer";
import { redirect } from "next/navigation";

export default function Register() {
  async function handleCreateUser(data: FormData) {
    "use server";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/create`, {
      method: "POST",
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    const resData = await res.json();

    if (!res.ok) console.log(resData.message);

    if (res.ok || res.status === 200) return console.log("ok");
  }

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <LoginContainer
        action={handleCreateUser}
        title="Criar uma nova conta"
        text="Já possui uma conta?"
        linkText="Voltar"
        url="/login"
        btnText="Cadastrar"
      >
        <Input required text="Seu nome" name="name" type="text" />
        <Input required text="Email" name="email" type="text" />
        <Input required text="Senha" name="password" type="password" />
      </LoginContainer>
    </main>
  );
}
