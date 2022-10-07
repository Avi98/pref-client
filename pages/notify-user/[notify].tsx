import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import s from "./notify.module.css";
import verifyEmail from "../../public/assets/illustration/email_send.png";
import emailVerified from "../../public/assets/illustration/email_verified.png";
import forgotPassword from "../../public/assets/illustration/email_send.png";
import React, { ReactElement } from "react";

const headerMessage = {
  verifyEmail:
    "Please login into your email and click on the link provided to verify you email",
  forgotPassword:
    "Please login into your email and click on the link to reset your password",
  emailVerified:
    "Thank you for verifying your email address. Click on the button below to login",
};

const actionButton = {
  emailVerified: <Link href="/login">Go to login</Link>,
  verifyEmail: <Link href="/login">Go to login</Link>,
};

const illustration = {
  emailVerified,
  verifyEmail,
  forgotPassword,
};

const isHeaderMessage = (key: any): keyof typeof headerMessage | null => {
  if (key in headerMessage) {
    return key;
  }
  return null;
};

const hasActionButton = (key: any): keyof typeof actionButton | null => {
  if (key in actionButton) {
    return key;
  }
  return null;
};

/**
 * @TODO need to refactor this component
 * @returns
 */

const Notify = () => {
  const { query } = useRouter();

  const headerMessageKey = isHeaderMessage(query.notify);
  const message = headerMessageKey ? headerMessage[headerMessageKey] : null;

  const CTAName = hasActionButton(query.notify);

  const CTA = CTAName ? actionButton[CTAName] : null;

  const heroImage = illustration[headerMessageKey as keyof typeof illustration];
  if (!query.notify) return;

  return (
    <div className={s.root}>
      <div>
        <div className={s.actionItem}>
          <Image
            src={heroImage}
            width="400px"
            height="400px"
            alt="action-img"
          />
        </div>
        <h2>{message}</h2>
        {CTA}
      </div>
    </div>
  );
};

//remove header and footer from the page
Notify.getLayout = (page: ReactElement) => {
  return page;
};
export default Notify;
