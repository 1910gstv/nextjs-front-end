'use server'
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function sendForm(formData: FormData){
    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const message = formData.get('message')?.toString() ?? '';

    console.log(`seus dados chegaram: ${name}, ${email}, ${message}`);
    try {
        const data = await sql`
        INSERT INTO contacts (name, email, message)
        VALUES (${name}, ${email}, ${message})
        RETURNING id;
        `;

        return data;
    } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed on create new form');    
}
}