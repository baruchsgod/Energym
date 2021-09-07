const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'energymbot@gmail.com', // generated ethereal user
        pass: 'EnergymBot2021', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    } 
});
exports.enviarCorreo = function (mailOptions) {
    var cuerpo = getTemplate(mailOptions);
    var opciones = {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject,
        html: cuerpo
    };
    transporter.sendMail(opciones, function (error, info) {
        if (error) {
            
        } else {
            return true;
        }
    });
}

var getTemplate = function (mailOptions) {
    const template =
        `<!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <meta name="x-apple-disable-message-reformatting">
            <meta name="color-scheme" content="only">
            <title></title>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>         
            <style>
                table, td, div, h1, p {font-family: Arial, sans-serif;}
            </style>
        </head>
        <body style="margin:0;padding:0;">
            <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
                <tr>
                    <td align="center" style="padding:0;">
                        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #fdfdfd;border-spacing:0;text-align:left;">
                            <tr>
                                <td align="center" style="padding:40px 0 30px 0;background:#044c92e6;">
                                    <h1 style="width:300px;font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;color:#ffffff;">Energym Fitness Center</h1>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:36px 30px 42px 30px;">
                                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                                        <tr>
                                            <td style="padding:0 0 36px 0;color:#153643;">
                                                <h2 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">${mailOptions.titulo}</h2>
                                                <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${mailOptions.detalle}</p>
                                                <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">${mailOptions.despedida}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:30px;background:#e98808;">
                                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                                        <tr>
                                            <td style="padding:0;width:50%;" align="left">
                                                <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                                                    &reg; Energym ${new Date().getFullYear()}<br/>
                                                    125 metros sur de la panadería Delipan.<br/>
                                                    Paraíso, Cartago Province, Costa Rica.
                                                </p>
                                            </td>
                                            <td style="padding:0;width:50%;" align="right">
                                                <table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
                                                    <tr>
                                                        <td style="padding:0 0 0 10px;width:50px;">
                                                            <a href="https://www.facebook.com/energym15" style="color:#ffffff;">Síguenos en Facebook <i class="fab fa-facebook" style="height:auto;display:block;border:0;"></i></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
    return template;
}

