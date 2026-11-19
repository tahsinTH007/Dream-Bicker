import type { Metadata } from "next";
import { ContactView } from "@/features/contact/components/contact-view";

export const metadata: Metadata = {
  title: "যোগাযোগ | ড্রিম বাইকার (হানিফ)",
  description:
    "মানবিক কার্যক্রম, জরুরি ত্রাণ সহায়তা, ডকুমেন্টারি সহযোগিতা কিংবা যেকোনো প্রয়োজনে সরাসরি হানিফ (ড্রিম বাইকার)-এর সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return <ContactView />;
}
