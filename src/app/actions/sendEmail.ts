"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const WHATSAPP_PHONE = "5492612071048";

type ProjectBrief = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  scope?: string[];
  details?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function sendProjectBrief(rawFormData: ProjectBrief) {
  const name = rawFormData.name?.trim() || "Sin nombre";
  const email = rawFormData.email?.trim() || "";
  const phone = rawFormData.phone?.trim() || "";
  const service = rawFormData.service?.trim() || "Contacto web";
  const budget = rawFormData.budget?.trim() || "A definir";
  const scope = rawFormData.scope?.length ? rawFormData.scope : ["Brief corto"];
  const details = rawFormData.details?.trim() || "";
  const contact = email || phone || "Sin contacto";

  try {
    const { data, error } = await resend.emails.send({
      from: "GPD Systems <onboarding@resend.dev>",
      to: ["dallapevichen12@gmail.com"],
      subject: `Nuevo lead: ${name} - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 32px; background: #0f172a; color: #f8fafc; border-radius: 12px; max-width: 640px;">
          <h2 style="color: #6366F1; margin-bottom: 4px;">Nuevo lead desde la web</h2>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 0;">GPD Systems - Formulario de contacto</p>
          <hr style="border-color: #1e293b; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Nombre</td><td style="padding: 8px 0; color: #f8fafc; font-weight: bold;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Contacto</td><td style="padding: 8px 0; color: #10B981;">${escapeHtml(contact)}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Servicio</td><td style="padding: 8px 0; color: #f8fafc;">${escapeHtml(service)}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Presupuesto</td><td style="padding: 8px 0; color: #10B981; font-weight: bold;">${escapeHtml(budget)}</td></tr>
            <tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Alcance</td><td style="padding: 8px 0; color: #f8fafc;">${escapeHtml(scope.join(", "))}</td></tr>
            ${details ? `<tr><td style="padding: 8px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">Detalles</td><td style="padding: 8px 0; color: #f8fafc;">${escapeHtml(details)}</td></tr>` : ""}
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    const apiKey = process.env.CALLMEBOT_API_KEY;
    if (apiKey) {
      try {
        const waMsg = encodeURIComponent(
          `Nuevo lead\nNombre: ${name}\nContacto: ${contact}\nServicio: ${service}\nPresupuesto: ${budget}\nAlcance: ${scope.join(", ")}${details ? `\nDetalles: ${details}` : ""}`,
        );
        const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_PHONE}&text=${waMsg}&apikey=${apiKey}`;
        await fetch(waUrl);
      } catch (waErr) {
        console.warn("WhatsApp notification failed:", waErr);
      }
    }

    return { success: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Critical lead error:", message);
    return { success: false, error: message };
  }
}

