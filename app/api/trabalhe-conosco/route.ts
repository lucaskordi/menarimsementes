import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const mensagem = formData.get("mensagem") as string;
    const curriculo = formData.get("curriculo") as File | null;

    if (!nome || !email || !telefone || !mensagem) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attachments = [];
    if (curriculo && curriculo.size > 0) {
      const bytes = await curriculo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: curriculo.name,
        content: buffer,
      });
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CAREERS_EMAIL || process.env.SMTP_USER,
      subject: `Candidatura - Trabalhe Conosco - ${nome}`,
      html: `
        <h2>Nova candidatura - Trabalhe Conosco</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, "<br>")}</p>
        ${curriculo ? `<p><strong>Currículo anexado:</strong> ${curriculo.name}</p>` : ""}
      `,
      attachments,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json(
      { error: "Erro ao enviar candidatura" },
      { status: 500 }
    );
  }
}

