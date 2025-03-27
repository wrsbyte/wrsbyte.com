import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  sendEmail: defineAction({
    input: z.object({
      name: z.string(),
      email: z.string().email(),
      message: z.string().min(10),
    }),
    handler: async ({ name, email, message }) => {
      const { data, error } = await resend.emails.send({
        from: "Contact Form <contact@wrsbyte.com>",
        to: ["me@wrsbyte.com"],
        subject: `(wrsbyte) New contact form submission from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}`,
        replyTo: email,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
