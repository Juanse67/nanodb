"use server";

import { db } from "@/lib/db";
import { notes } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) return;
  await db.insert(notes).values({ content });
  revalidatePath("/");
}
