// Types for the contact form (the sample-data types were removed with the mock data)
export type InquiryType =
  | "General Inquiry"
  | "Collaboration"
  | "Media and Press"
  | "Humanitarian Support"
  | "Business Opportunities"
  | "Other";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  inquiryType: InquiryType;
  message: string;
}
