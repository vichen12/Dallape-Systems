"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const WHATSAPP_PHONE = "5492612071048";

export async function sendProjectBrief(rawFormData: any) {
  console.log("🔑 API KEY:", process.env.RESEND_API_KEY ? "✅" : "❌");
  console.log("📩 Datos:", rawFormData);

  const { name, email, phone, service, budget, scope, details } = rawFormData;

  try {
    // ── 1. Email vía Resend ──
    const { data, error } = await resend.emails.send({
      from: "Dallape Solutions <onboarding@resend.dev>",
      to: ["dallapevichen12@gmail.com"],
      subject: `🚀 NUEVO LEAD: ${name} — ${service}`,
      html: `
        <div style="font-family: sans-serif; padding: 32px; background: #0f172a; color: #f8fafc; border-radius: 12px; max-width: 600px;">
          <h2 style="color: #6366F1; margin-bottom: 4px;">📬 Nuevo lead desde la web</h2>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 0;">Dallape Solutions — Formulario de contacto</p>
          <hr style="border-color: #1e293b; margin: 20px 0;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Nombre</td><td style="padding: 8px 0; color: #f8fafc; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #6366F1;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">WhatsApp</td><td style="padding: 8px 0; color: #10B981;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Servicio</td><td style="padding: 8px 0; color: #f8fafc;">${service}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Presupuesto</td><td style="padding: 8px 0; color: #10B981; font-weight: bold;">${budget}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Alcance</td><td style="padding: 8px 0; color: #f8fafc;">${scope.join(", ")}</td></tr>
            ${details ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Detalles</td><td style="padding: 8px 0; color: #f8fafc;">${details}</td></tr>` : ""}
          </table>

          <hr style="border-color: #1e293b; margin: 20px 0;" />
          <a href="https://wa.me/${phone?.replace(/\D/g, "")}" style="display:inline-block; padding: 12px 24px; background: #10B981; color: #030712; border-radius: 8px; font-weight: bold; text-decoration: none;">
            💬 Responder por WhatsApp
          </a>
        </div>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ Email enviado:", data?.id);

    // ── 2. WhatsApp vía CallMeBot ──
    const apiKey = process.env.CALLMEBOT_API_KEY;
    if (apiKey) {
      try {
        const waMsg = encodeURIComponent(
          `🚀 Nuevo lead!\n👤 ${name}\n📧 ${email}\n📱 ${phone}\n💼 ${service}\n💰 ${budget}\n📋 ${scope.join(", ")}${details ? `\n📝 ${details}` : ""}`
        );
        const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_PHONE}&text=${waMsg}&apikey=${apiKey}`;
        await fetch(waUrl);
        console.log("✅ WhatsApp enviado");
      } catch (waErr) {
        console.warn("⚠️ WhatsApp falló (no crítico):", waErr);
      }
    } else {
      console.warn("⚠️ CALLMEBOT_API_KEY no configurada — WhatsApp skipped");
    }

    return { success: true };

  } catch (err: any) {
    console.error("🔥 Error crítico:", err.message);
    return { success: false, error: err.message };
  }
}
