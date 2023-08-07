"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function teste() {
  revalidatePath("/");
  revalidatePath("/mycards");
  return redirect("/mycards");
}

export { teste };
