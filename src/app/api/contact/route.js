import { Resend } from "resend";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, company_name, employees, interest, message } =
      body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Udfyld navn, e-mail og besked." },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      text: `
Ny henvendelse fra Motus&Manus

Navn: ${name}
E-mail: ${email}
Telefon: ${phone || "Ikke oplyst"}
Virksomhed: ${company_name || "Ikke oplyst"}
Antal medarbejdere: ${employees || "Ikke oplyst"}
Interesse: ${interest || "Ikke oplyst"}

Besked:
${message}
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        { error: "Kunne ikke sende beskeden." },
        { status: 500 },
      );
    }

    return Response.json(
      { success: true, message: "Beskeden er sendt!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      { error: "Der opstod en serverfejl." },
      { status: 500 },
    );
  }
}
