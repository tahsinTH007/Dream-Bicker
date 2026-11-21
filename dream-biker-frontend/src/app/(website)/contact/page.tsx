import type { Metadata } from "next";
import { ContactView } from "@/features/contact/components/contact-view";
import { getContactInfo, telHref } from "@/server/social/contact-info";

export const metadata: Metadata = {
  title: "যোগাযোগ",
  alternates: { canonical: "/contact" },
  description:
    "মানবিক কার্যক্রম, জরুরি ত্রাণ সহায়তা, ডকুমেন্টারি সহযোগিতা কিংবা যেকোনো প্রয়োজনে সরাসরি হানিফ (ড্রিম বাইকার)-এর সাথে যোগাযোগ করুন।",
};

// Contact details come live from the Facebook page (re-checked every hour)
export const revalidate = 3600;

export default async function ContactPage() {
  const contact = await getContactInfo();
  return (
    <ContactView
      email={contact.email}
      phone={contact.phone ? { label: contact.phone, href: telHref(contact.phone) } : null}
    />
  );
}
