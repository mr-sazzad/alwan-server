export const resetPassMailOptions = (email: string, url: string) => {
  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password",
    html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
              body {
                font-family: "Montserrat", sans-serif;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #E3F4F4;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                padding-bottom: 20px;
                border-bottom: 1px solid #dddddd;
              }
              .header img {
                width: 50px;
                padding: 20px;
    
              }
              .content {
                padding: 20px;
              }
    
              .content p {
                line-height: 1.5;
                font-size: 1rem;
                color: #222831
              }
              .content a {
                color: #ffffff;
                font-size: 1.2rem;
              }
              .btn {
                display: block;
                width: 200px;
                margin: 20px 0px;
                padding: 10px;
                background-color: #EE4E4E;
                color: #ffffff;
                text-align: center;
                border-radius: 5px;
                text-decoration: none;
              }
              .footer {
                padding-top: 20px;
                border-top: 1px solid #dddddd;
                color: #999999;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://firebase.google.com/static/images/integrations/slack.png" alt="website logo">
              </div>
              <div class="content">
                <h1>Reset Your Alwan Password</h1>
                <p>Hi there,</p>
                <p>We received a request to reset your password for your alwan account. Click the button below to reset it.</p>
                <a href="${url}" class="btn">Reset Your Password</a>
                <p>If you did not request a password reset, please ignore this email. This link will expire in 1 hour for security reasons.</p>
              </div>
              <div class="footer">
                <p>sent with ❤️ from alwan</p>
                <p>If you have any questions, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
              </div>
            </div>
          </body>
          </html>
        `,
  };
};
