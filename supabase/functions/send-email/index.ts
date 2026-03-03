import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const RECIPIENT_EMAIL = "info@zykacredit.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, data } = await req.json();

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    let adminSubject = "";
    let adminHtml = "";
    let applicantHtml = "";
    let applicantEmail = "";
    let applicantName = "";

    if (type === "application") {
      applicantEmail = data.email;
      applicantName = data.firstName;
      adminSubject = `New Loan Application: ${data.firstName} ${data.lastName} - ${data.creditType}`;
      adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a5c2e; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">New Loan Application</h1>
          </div>
          <div style="padding: 24px; background: #f9f9f9;">
            <h2 style="color: #1a5c2e;">Applicant Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.firstName} ${data.lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Credit Type:</td><td style="padding: 8px;">${data.creditType}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Amount:</td><td style="padding: 8px;">${data.amount || "Not specified"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Details:</td><td style="padding: 8px;">${data.message || "None"}</td></tr>
            </table>
          </div>
        </div>
      `;
      applicantHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a5c2e; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Zyka Credit Limited</h1>
          </div>
          <div style="padding: 24px;">
            <h2 style="color: #333;">Hello ${data.firstName},</h2>
            <p>Thank you for submitting your loan application with Zyka Credit Limited. We have received your application for <strong>${data.creditType}</strong>.</p>
            <p>Our team will review your application and get back to you within <strong>2-3 business days</strong>.</p>
            <div style="background: #f0f7f0; padding: 16px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1a5c2e; margin-top: 0;">Application Summary</h3>
              <p><strong>Type:</strong> ${data.creditType}</p>
              <p><strong>Amount:</strong> ${data.amount || "To be discussed"}</p>
            </div>
            <p>If you have any questions, feel free to reach us at:</p>
            <ul>
              <li>Phone: 0904 937 1418 / 0818 705 2728</li>
              <li>Email: info@zykacredit.com</li>
              <li>Office: Suite 13, Purple Stone Plaza, Apo Resettlement, Abuja, Nigeria</li>
            </ul>
            <p>Best regards,<br /><strong>Zyka Credit Limited</strong></p>
          </div>
        </div>
      `;
    } else if (type === "contact") {
      applicantEmail = data.email;
      applicantName = data.firstName;
      adminSubject = `New Contact Message from ${data.firstName} ${data.lastName}`;
      adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a5c2e; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">New Contact Message</h1>
          </div>
          <div style="padding: 24px; background: #f9f9f9;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${data.firstName} ${data.lastName}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${data.email}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${data.phone || "Not provided"}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Message:</td><td style="padding: 8px;">${data.message}</td></tr>
            </table>
          </div>
        </div>
      `;
      applicantHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a5c2e; padding: 20px; text-align: center;">
            <h1 style="color: #fff; margin: 0;">Zyka Credit Limited</h1>
          </div>
          <div style="padding: 24px;">
            <h2 style="color: #333;">Hello ${data.firstName},</h2>
            <p>Thank you for reaching out to Zyka Credit Limited. We have received your message and will respond within <strong>24 hours</strong>.</p>
            <p>If your matter is urgent, please call us directly at <strong>0904 937 1418</strong> or <strong>0818 705 2728</strong>.</p>
            <p>Best regards,<br /><strong>Zyka Credit Limited</strong></p>
          </div>
        </div>
      `;
    } else {
      throw new Error("Invalid email type");
    }

    // Send email to admin
    const adminRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Zyka Credit <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: adminSubject,
        html: adminHtml,
      }),
    });

    if (!adminRes.ok) {
      const errBody = await adminRes.text();
      throw new Error(`Failed to send admin email [${adminRes.status}]: ${errBody}`);
    }
    await adminRes.text();

    // Send confirmation to applicant
    if (applicantEmail) {
      const confirmRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Zyka Credit <onboarding@resend.dev>",
          to: [applicantEmail],
          subject: "We received your submission - Zyka Credit Limited",
          html: applicantHtml,
        }),
      });

      if (!confirmRes.ok) {
        const errBody = await confirmRes.text();
        console.error(`Confirmation email failed [${confirmRes.status}]: ${errBody}`);
      } else {
        await confirmRes.text();
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
