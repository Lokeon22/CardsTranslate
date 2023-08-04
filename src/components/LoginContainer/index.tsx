import Link from "next/link";
import { Button } from "../Button";

type LoginRegisterProps = {
  title: string;
  text: string;
  linkText: string;
  btnText: string;
  url: string;
  children: React.ReactNode;
  action: (data: FormData) => void;
};

export function LoginContainer({
  title,
  text,
  linkText,
  btnText,
  url,
  children,
  action,
}: LoginRegisterProps) {
  return (
    <form action={action} className="max-w-sm flex flex-col mt-5 sm:mt-8">
      <h2 className="text-xl font-medium">{title}</h2>
      {children}
      <span className="text-sm mt-0.5">
        {text}
        <Link className="text-[#3b727a] pl-0.5 hover:brightness-75 hover:duration-200" href={url}>
          {linkText}
        </Link>
      </span>
      <Button type="submit" text={btnText} className="bg-[#3b727a] mt-2" />
    </form>
  );
}
