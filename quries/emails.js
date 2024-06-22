import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmails = async (emailsInfo) => {
  if (!emailsInfo) return null;

  const response = await Promise.allSettled(
    emailsInfo?.map(async (data) => {
      if (data?.to && data?.subject && data?.message) {
        const to = data?.to;
        const subject = data?.subject;
        const message = data.message;
        const sentMail = await resend.emails.send({
          from: "SkillSphere <onboarding@resend.dev>",
          to: to,
          subject: subject,
          react: EmailTemplate({ message }),
        });
        return sentMail;
      } else {
        new Promise((reject) => {
          return reject(
            new Error(
              `Couldn't send email, please check the ${JSON.stringify(data)}.`
            )
          );
        });
      }
    })
  );
  return response;
};
