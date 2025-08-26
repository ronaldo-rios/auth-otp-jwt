import nodemailer from 'nodemailer'

export const sendEmail = async (to: string | string[], subject: string, body: string): Promise<boolean>=> {
    const isProduction = process.env.NODE_ENV === 'production'
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        secure: isProduction,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    })
    
    try {
        await transporter.sendMail({
            from: { 
                name: process.env.MAIL_SENDER_NAME || 'No Reply - OTP',
                email: process.env.MAIL_SENDER_EMAIL || 'noreply@default.com' 
            },
            to: to,
            subject: subject,
            text: body,
        })
        return true
    } catch(error) {
        console.error('Email error:', error)
        return false
    }
}