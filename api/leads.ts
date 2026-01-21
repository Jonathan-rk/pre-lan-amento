import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};

const sanitize = (str: string): string => {
  return str.replace(/[<>]/g, '').trim();
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email } = req.body || {};

    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const sanitizedName = sanitize(name);
    const sanitizedPhone = sanitize(phone);
    const sanitizedEmail = sanitize(email).toLowerCase();

    if (sanitizedName.length < 3) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 3 caracteres' });
    }

    if (!isValidPhone(sanitizedPhone)) {
      return res.status(400).json({ error: 'Telefone inválido' });
    }

    if (!isValidEmail(sanitizedEmail)) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    const now = new Date();
    const brazilDate = now.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    const brazilTime = now.toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const LEAD_EMAIL = process.env.LEAD_EMAIL || SMTP_USER;

    let emailSent = false;
    let emailError = null;

    if (SMTP_USER && SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        const html = `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f9fa; border-radius: 12px;">
            <div style="background: linear-gradient(135deg, #162530 0%, #1e3a4a 100%); color: white; padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700;">🎯 Novo Lead - Landing Page</h1>
              <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Pré-lançamento Ordemo</p>
            </div>
            
            <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
              <h2 style="margin: 0 0 20px; color: #334155; font-size: 18px; border-bottom: 2px solid #2FBF71; padding-bottom: 10px;">
                Informações do Interessado
              </h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 120px;">Nome:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">${sanitizedName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Telefone:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">
                    <a href="https://wa.me/55${sanitizedPhone}" style="color: #2FBF71; text-decoration: none;">${sanitizedPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">E-mail:</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 500;">
                    <a href="mailto:${sanitizedEmail}" style="color: #162530; text-decoration: none;">${sanitizedEmail}</a>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #2FBF71;">
                <p style="margin: 0; color: #64748b; font-size: 13px;">
                  <strong>📅 Data:</strong> ${brazilDate}<br>
                  <strong>⏰ Horário:</strong> ${brazilTime}
                </p>
              </div>
            </div>
            
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
              Este lead foi captado na Landing Page de pré-lançamento do Ordemo.
            </p>
          </div>
        `;

        await transporter.sendMail({
          from: SMTP_USER,
          to: LEAD_EMAIL,
          subject: `🎯 Novo Lead - ${sanitizedName} | Landing Page Ordemo`,
          html,
        });

        emailSent = true;
        console.log(`[Lead] Received and emailed: ${sanitizedName} - ${sanitizedEmail}`);
      } catch (err: any) {
        emailError = err.message;
        console.error('[Lead] Email error:', err.message);
      }
    } else {
      console.log(`[Lead] No SMTP configured. Lead: ${sanitizedName} - ${sanitizedEmail} - ${sanitizedPhone}`);
    }

    // Always return success - lead was captured even if email failed
    return res.status(200).json({ 
      success: true, 
      message: 'Lead recebido com sucesso!',
      emailSent,
      ...(emailError && { emailError })
    });
  } catch (error: any) {
    console.error('[Lead] Error:', error.message);
    return res.status(500).json({ error: 'Erro interno ao processar lead', details: error.message });
  }
}

