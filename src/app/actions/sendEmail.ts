"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendProjectBrief(rawFormData: any) {
  // LOG 1: Verificamos si la API Key llega al servidor
  console.log("🔑 Verificando API KEY:", process.env.RESEND_API_KEY ? "Configurada ✅" : "FALTANTE ❌");

  try {
    // LOG 2: Verificamos qué datos llegan desde el cliente
    console.log("📩 Datos recibidos en el servidor:", rawFormData);

    const { name, email, phone, service, budget, scope, details } = rawFormData;

    const { data, error } = await resend.emails.send({
      from: "Dallape Solutions <onboarding@resend.dev>", 
      to: ["dallapevichen12@gmail.com"],
      subject: `🚀 NUEVA PROPUESTA: ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #0f172a; color: #fff;">
          <h2>Nuevo Lead de la Web</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>WhatsApp:</strong> ${phone}</p>
          <p><strong>Servicio:</strong> ${service}</p>
          <p><strong>Presupuesto:</strong> ${budget}</p>
          <p><strong>Alcance:</strong> ${scope.join(", ")}</p>
          <p><strong>Detalles:</strong> ${details || "Sin detalles"}</p>
        </div>
      `,
    });

    if (error) {
      // LOG 3: Si Resend falla, vemos el error oficial
      console.error("❌ ERROR DE RESEND:", error);
      return { success: false, error: error.message };
    }

    console.log("✅ MAIL ENVIADO CON ÉXITO:", data?.id);
    return { success: true };

  } catch (err: any) {
    // LOG 4: Errores de código o de red
    console.error("🔥 ERROR CRÍTICO EN ACTION:", err.message);
    return { success: false, error: err.message };
  }
}