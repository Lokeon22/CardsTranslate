export function RedirectUser(push: (href: string) => void) {
  alert("Faça login para criar seus cards");
  return push("/login");
}
