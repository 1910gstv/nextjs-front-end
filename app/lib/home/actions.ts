"use server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function sendForm(formData: FormData): Promise<void> {
  const name      = formData.get("name")      as string;
  const email     = formData.get("email")     as string;
  const company   = formData.get("company")   as string | null;
  const challenge = formData.get("challenge") as string | null;

  await sql`
    INSERT INTO contacts (name, email, company, challenge)
    VALUES (${name}, ${email}, ${company}, ${challenge})
  `;
}