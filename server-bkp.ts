import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

const result = dotenv.config();

// console.log("dotenv result:", result);
// console.log("cwd:", process.cwd());
// console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API Routes - Must go BEFORE Vite middleware
  app.post("/api/leads", async (req, res) => {
    try {
      const { email, type, companyName, city, industry, phone } = req.body;

      if (!email || !type || !industry || !phone) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // const recipient = "info@karotradz.com";
      const recipient = "info@karotradz.com";
      const ccMail = "govindaraj.poosamani@karotradz.com"
      const subject = `Karo Tradz - New Inquiry: ${type === 'manufacturer' ? 'Manufacturer' : 'Buyer'} - ${industry}`;

      const htmlContent = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:30px 15px; font-family: 'Poppins', sans-serif;">


<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden; font-family: 'Poppins', sans-serif;">

<!-- Header -->

<tr>
<td style="background:#111827;padding:20px;text-align:center;">
 <img src="https://karotradz.com/assets/Logo-Light-ZSUmRdmV.png"
           alt="KaroTradz"
           style="height:42px; ">
</td>
</tr>

<!-- Title -->

<tr>
<td style="padding:30px 35px 10px;">

<span style="
display:inline-block;
background:#d0fff2;
color:#00b894;
padding:8px 18px;
border-radius:50px;
font-size:13px;
font-weight:bold;">
NEW LEAD
</span>

<h2 style="margin:18px 0 8px;color:#111827;font-size:22px;">
You've received a new Business Inquiry
</h2>

<p style="margin:0;color:#4c5567;font-size:15px;line-height:24px;">
A visitor has submitted a new inquiry through your
<strong>KaroTradz</strong> website.
Below are the lead details.
</p>

</td>
</tr>

<!-- Details Card -->

<tr>
<td style="padding:20px 35px;">

<table width="100%" cellpadding="0" cellspacing="0"
style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden; font-size:14px;">

<tr style="background:#fafafa;">
<td style="padding:16px;font-weight:bold;color:#4c5567;width:180px;">
Inquiry Type
</td>

<td style="padding:16px;color:#111827;">
${type}
</td>
</tr>

<tr>

<td style="padding:16px;font-weight:bold;color:#4c5567;">
Industry
</td>

<td style="padding:16px;color:#111827;">
${industry}
</td>

</tr>

<tr style="background:#fafafa;">

<td style="padding:16px;font-weight:bold;color:#4c5567;">
Company
</td>

<td style="padding:16px;color:#111827;">
${companyName || '-'}
</td>

</tr>

<tr>

<td style="padding:16px;font-weight:bold;color:#4c5567;">
Location
</td>

<td style="padding:16px;color:#111827;">
${city || '-'}
</td>

</tr>

<tr style="background:#fafafa;">

<td style="padding:16px;font-weight:bold;color:#4c5567;">
Email
</td>

<td style="padding:16px;">

<a href="mailto:${email}"
style="color:#ea580c;text-decoration:none;font-weight:bold;">
${email}
</a>

</td>

</tr>

<tr>

<td style="padding:16px;font-weight:bold;color:#4c5567;">
Phone
</td>

<td style="padding:16px;">

<a href="tel:${phone.replace(/\s+/g,'')}"
style="color:#ea580c;text-decoration:none;font-weight:bold;">
${phone}
</a>

</td>

</tr>

</table>

</td>
</tr>

<!-- Action Buttons -->

<tr>
<td align="center" style="padding:10px 35px 35px;">

<table cellpadding="0" cellspacing="0">
<tr>

<td align="center">

<a href="mailto:${email}"
style="
background:#ea580c;
color:#ffffff;
text-decoration:none;
padding:14px 26px;
border-radius:8px;
display:flex;
gap:8px;
align-items:center;
font-weight:bold;
font-size:14px;">
<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.02832 10L10.2246 14.8166C10.8661 15.2443 11.1869 15.4581 11.5336 15.5412C11.8399 15.6146 12.1593 15.6146 12.4657 15.5412C12.8124 15.4581 13.1332 15.2443 13.7747 14.8166L20.971 10M10.2981 4.06879L4.49814 7.71127C3.95121 8.05474 3.67775 8.22648 3.4794 8.45864C3.30385 8.66412 3.17176 8.90305 3.09111 9.161C3 9.45244 3 9.77535 3 10.4212V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V10.4212C21 9.77535 21 9.45244 20.9089 9.161C20.8282 8.90305 20.6962 8.66412 20.5206 8.45864C20.3223 8.22648 20.0488 8.05474 19.5019 7.71127L13.7019 4.06879C13.0846 3.68116 12.776 3.48735 12.4449 3.4118C12.152 3.34499 11.848 3.34499 11.5551 3.4118C11.224 3.48735 10.9154 3.68116 10.2981 4.06879Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> Reply via Email
</a>

</td>

<td width="15"></td>

<td align="center">

<a href="tel:${phone.replace(/\s+/g,'')}"
style="
background:#111827;
color:#ffffff;
text-decoration:none;
padding:14px 26px;
border-radius:8px;
display:flex;
gap:8px;
align-items:center;
font-weight:bold;
font-size:14px;">

<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>

Call Now
</a>

</td>

</tr>
</table>

</td>
</tr>

<!-- Note -->

<tr>
<td style="padding:0 35px 35px;">

<table width="100%" cellpadding="0" cellspacing="0"
style="
background:#fff7ed;
border-left:4px solid #ea580c;
border-radius:6px;">

<tr>

<td style="padding:18px;color:#92400e;font-size:12px;line-height:24px;">

<strong>Quick Tip</strong><br>

Respond to this inquiry within
<strong>30 minutes</strong> to significantly improve your chances of converting this lead into a customer.

</td>

</tr>

</table>

</td>
</tr>

<!-- Footer -->

<tr>

<td align="center"
style="
padding:25px;
background:#f9fafb;
border-top:1px solid #e5e7eb;">

<p style="margin:0;font-size:13px;color:#9ca3af;">
This is an automated notification from
<strong>KaroTradz</strong>.
</p>

<p style="margin-top:10px;font-size:12px;color:#c0c4cc;">
© 2026 KaroTradz. All Rights Reserved.
</p>

</td>

</tr>

</table>

</td>
</tr>
</table>
      `;
  
   
  const manufacturerTemplate = `
  
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

    <!-- Header -->
    <tr>
        <td style="background:#111827;padding:25px 30px;">
            <table width="100%">
                <tr>
                    <td align="left">
                       <img src="https://karotradz.com/assets/Logo-Light-ZSUmRdmV.png"
           alt="KaroTradz"
           style="height:32px; ">
                    </td>

                    <td align="right" style="color:#FFE8D6;font-size:13px;">
                        ${new Date().toLocaleDateString('en-IN',{
                            day:'2-digit',
                            month:'short',
                            year:'numeric'
                        })}
                    </td>
                </tr>
            </table>

           
        </td>
    </tr>

    <!-- Body -->
    <tr>
        <td style="padding:35px;">

           

            <p style="margin-top:0;font-size:16px;color:#374151;">
                Hello!, 
            </p>

            <p style="font-size:16px;color:#374151;line-height:28px;">
                Thank you for showing interest in
                <strong>KaroTradz</strong>.
                We're excited to connect with manufacturers who want to expand their business globally.
            </p>

            <p style="font-size:16px;color:#374151;line-height:28px;">
                Our platform is designed to help Indian manufacturers connect directly with verified international buyers, while providing transparent pricing, simplified communication, and efficient trade management.
            </p>

            <!-- What's Next -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin:30px 0;background:#FFF7ED;border-left:5px solid #ea580c;border-radius:8px;">

                <tr>
                    <td style="padding:22px;">

                        <h3 style="margin:0 0 15px;color:#92400e;font-size:18px;">
                         What happens next?
                        </h3>

                        <p style="margin:10px 0;color:#374151;">
                            &#9679; Our team will review your inquiry.
                        </p>

                        <p style="margin:10px 0;color:#374151;">
                            &#9679; We'll contact you within
                            <strong>2 business days</strong>.
                        </p>

                        <p style="margin:10px 0;color:#374151;">
                           &#9679;  We'll understand your export goals and discuss how KaroTradz can help.
                        </p>

                    </td>
                </tr>

            </table>

            <p style="font-size:16px;color:#374151;line-height:28px;">
                Have questions before then?
                Simply reply to this email and one of our team members will be happy to assist you.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:35px auto;">
                <tr>
                    <td align="center">
                        <a href="https://karotradz.com" target="_blank"
                           style="
                           background:#111827;
                           color:#ffffff;
                           text-decoration:none;
                           padding:14px 30px;
                           border-radius:8px;
                           display:inline-block;
                           font-weight:bold;
                           font-size:15px;">
                           Visit KaroTradz
                        </a>
                    </td>
                </tr>
            </table>

            <p style="font-size:16px;color:#374151;line-height:28px;margin-top:35px;">
                Regards,<br>
                <strong>The KaroTradz Team</strong><br>
                <a href="mailto:info@karotradz.com"
                   style="color:#ea580c;text-decoration:none;">
                    info@karotradz.com
                </a>
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f9fafb;padding:25px;border-top:1px solid #e5e7eb;text-align:center;">

            <p style="margin:0;color:#6b7280;font-size:13px;">
                Empowering Indian Businesses to Trade Globally
            </p>

            <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
                This email was sent automatically because you requested information from KaroTradz.
            </p>

            <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} KaroTradz. All Rights Reserved.
            </p>

        </td>
    </tr>

</table>
  `;

  const buyerTemplate = `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:650px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

    <!-- Header -->
    <tr>
        <td style="background:#111827;padding:25px 30px;">
            <table width="100%">
                <tr>
                    <td align="left">
                       <img src="https://karotradz.com/assets/Logo-Light-ZSUmRdmV.png"
           alt="KaroTradz"
           style="height:32px; ">
                    </td>

                    <td align="right" style="color:#FFE8D6;font-size:13px;">
                        ${new Date().toLocaleDateString('en-IN',{
                            day:'2-digit',
                            month:'short',
                            year:'numeric'
                        })}
                    </td>
                </tr>
            </table>

           
        </td>
    </tr>

    <!-- Body -->
    <tr>
        <td style="padding:35px;">

           

            <p style="margin-top:0;font-size:16px;color:#374151;">
                Hello!, 
            </p>

            <p style="font-size:16px;color:#374151;line-height:28px;">
                Thank you for showing interest in
                <strong>KaroTradz</strong>.
                 We help global buyers connect with verified Indian manufacturers, making sourcing easier, more transparent, and more reliable. Our goal is to simplify international trade while giving you confidence in every sourcing decision.
            </p>

            <p style="font-size:16px;color:#374151;line-height:28px;">
             

We're currently working closely with buyers to understand real-world sourcing challenges and build features that truly support global procurement teams.
            </p>

            <!-- What's Next -->
            <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin:30px 0;background:#FFF7ED;border-left:5px solid #ea580c;border-radius:8px;">

                <tr>
                    <td style="padding:22px;">

                        <h3 style="margin:0 0 15px;color:#92400e;font-size:18px;">
                         What happens next?
                        </h3>

                        <p style="margin:10px 0;color:#374151;">
                            &#9679; Our team will review your inquiry.
                        </p>

                        <p style="margin:10px 0;color:#374151;">
                            &#9679; We'll contact you within
                            <strong>2 business days</strong>.
                        </p>

                        <p style="margin:10px 0;color:#374151;">
                           &#9679;  We'll discuss your sourcing requirements and help connect you with suitable verified manufacturers.
                        </p>

                    </td>
                </tr>

            </table>

             <table width="100%" cellpadding="0" cellspacing="0"
                   style="margin-bottom:30px;">

                <tr>

                    <td style="padding:18px;border:1px solid #e5e7eb;border-radius:8px;">

                        <h3 style="margin-top:0;color:#111827;font-size:18px;">
                            Why KaroTradz?
                        </h3>

                        <p style="margin:8px 0;color:#4b5563;">
                            ✅ Verified Indian manufacturers
                        </p>

                        <p style="margin:8px 0;color:#4b5563;">
                            ✅ Transparent pricing and sourcing
                        </p>

                        <p style="margin:8px 0;color:#4b5563;">
                            ✅ Faster supplier discovery
                        </p>

                        <p style="margin:8px 0;color:#4b5563;">
                            ✅ Dedicated support throughout your sourcing journey
                        </p>

                    </td>

                </tr>

            </table>

    

            <p style="font-size:16px;color:#374151;line-height:28px;">
               If you have any questions before we reach out, simply reply to
                this email and one of our team members will be happy to assist you.
            </p>

            <!-- CTA -->
            <table cellpadding="0" cellspacing="0" style="margin:35px auto;">
                <tr>
                    <td align="center">
                        <a href="https://karotradz.com" target="_blank"
                           style="
                           background:#111827;
                           color:#ffffff;
                           text-decoration:none;
                           padding:14px 30px;
                           border-radius:8px;
                           display:inline-block;
                           font-weight:bold;
                           font-size:15px;">
                           Visit KaroTradz
                        </a>
                    </td>
                </tr>
            </table>

            <p style="font-size:16px;color:#374151;line-height:28px;margin-top:35px;">
                Regards,<br>
                <strong>The KaroTradz Team</strong><br>
                <a href="mailto:info@karotradz.com"
                   style="color:#ea580c;text-decoration:none;">
                    info@karotradz.com
                </a>
            </p>

        </td>
    </tr>

    <!-- Footer -->
    <tr>
        <td style="background:#f9fafb;padding:25px;border-top:1px solid #e5e7eb;text-align:center;">

            <p style="margin:0;color:#6b7280;font-size:13px;">
               Connecting Global Buyers with Trusted Indian Manufacturers
            </p>

            <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;">
                This email was sent automatically because you requested information from KaroTradz.
            </p>

            <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} KaroTradz. All Rights Reserved.
            </p>

        </td>
    </tr>

</table>

  `;

   const apiKey = process.env.RESEND_API_KEY;



      if (!apiKey) {
        console.warn("RESEND_API_KEY is missing!");
        return res.status(500).json({ error: "Missing API key" });
      }

     // console.log("Creating Resend client...");
      const resend = new Resend(apiKey);

   //   console.log("Sending email...");
      const data = await resend.emails.send({
        from: "KaroTradz Inquiry <info@karotradz.com>",
        to: recipient,
        cc: ccMail,
        subject,
        html: htmlContent,
      });
    
   // console.log("Sending Thank you email...");
   
    const tyData = await resend.emails.send({
    from: "KaroTradz <info@karotradz.com>",
    to: email,
    subject: thankYouSubject,
    html: type === "manufacturer"
        ? manufacturerTemplate
        : buyerTemplate,
});

   //   console.log("Resend response:", data);

      return res.json({
        success: true,
        message: "Inquiry successfully sent by email to " + recipient,
        data
      });
    } catch (error: any) {
      console.error("Failed to send lead email:", error);
      return res.status(500).json({
        error: "Failed to dispatch email",
        details: error?.message || String(error)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
