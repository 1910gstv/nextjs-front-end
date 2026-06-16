"use server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function sendForm(formData: FormData): Promise<void> {
  const name = formData.get("name");
  const email = formData.get("email");
  const company = formData.get("company");
  const challenge = formData.get("challenge");

  await sql`
    INSERT INTO contacts (name, email, company, challenge)
    VALUES (${name}, ${email}, ${company}, ${challenge})
  `;
  // sem return — void
}
