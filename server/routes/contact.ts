import { RequestHandler } from "express";
import nodemailer from "nodemailer";

export const handleContact: RequestHandler = async (req, res) => {
  const { name, email, message, type } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER || "hello@dealpost.co.in",
      pass: process.env.SMTP_PASS || "rmrz eeld dgda zhch",
    },
  });

  try {
    await transporter.sendMail({
      from: `"Dealpost Contact Form" <hello@dealpost.co.in>`,
      to: "hello@dealpost.co.in", // sending to themselves
      replyTo: email,
      subject: `New Lead: ${type || 'General Inquiry'} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nInterested In: ${type || 'Not specified'}\n\nMessage:\n${message}`,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};
