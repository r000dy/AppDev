export type ComplaintStatus = "received" | "in-progress" | "resolved";

export interface Complaint {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  subject: string;
  description: string;
  status: ComplaintStatus;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  updates: ComplaintUpdate[];
}

export interface ComplaintUpdate {
  id: string;
  message: string;
  createdAt: Date;
  isInternal: boolean;
}

export const categories = [
  "Product Quality",
  "Delivery Issues",
  "Customer Service",
  "Billing & Payments",
  "Technical Support",
  "Returns & Refunds",
  "Other",
];

export const mockComplaints: Complaint[] = [
  {
    id: "CMP-2024-001",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 234 567 8900",
    category: "Delivery Issues",
    subject: "Package not received",
    description: "I ordered a laptop on December 1st and was supposed to receive it by December 5th. It's now December 10th and I still haven't received my package. The tracking shows it was delivered but I never got it.",
    status: "in-progress",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-08"),
    assignedTo: "Support Team A",
    updates: [
      {
        id: "upd-1",
        message: "We're investigating with our delivery partner. We'll update you within 24 hours.",
        createdAt: new Date("2024-12-08"),
        isInternal: false,
      },
    ],
  },
  {
    id: "CMP-2024-002",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    category: "Billing & Payments",
    subject: "Double charged for subscription",
    description: "My credit card was charged twice for my monthly subscription. I need one of the charges refunded immediately.",
    status: "resolved",
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-12-02"),
    assignedTo: "Billing Team",
    updates: [
      {
        id: "upd-2",
        message: "We've identified the duplicate charge and initiated a refund. Please allow 3-5 business days.",
        createdAt: new Date("2024-11-30"),
        isInternal: false,
      },
      {
        id: "upd-3",
        message: "Refund has been processed successfully. This ticket is now resolved.",
        createdAt: new Date("2024-12-02"),
        isInternal: false,
      },
    ],
  },
  {
    id: "CMP-2024-003",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 987 654 3210",
    category: "Product Quality",
    subject: "Defective item received",
    description: "The electronic device I received is not working properly. The screen flickers and sometimes goes blank completely.",
    status: "received",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
    updates: [],
  },
];

export const faqs = [
  {
    question: "How long does it take to receive a response?",
    answer: "We aim to acknowledge all complaints within 24 hours and provide a full response within 3-5 business days, depending on the complexity of the issue.",
  },
  {
    question: "What information do I need to submit a complaint?",
    answer: "You'll need to provide your contact details (name, email), select a category for your complaint, and describe the issue in detail. Attaching relevant documents or photos is optional but can help speed up resolution.",
  },
  {
    question: "How can I track my complaint status?",
    answer: "After submitting a complaint, you'll receive a unique Complaint ID. Use this ID on our 'Track Complaint' page to check the current status and any updates from our team.",
  },
  {
    question: "Can I update my complaint after submission?",
    answer: "Yes, you can add additional information by tracking your complaint and using the update feature. You can also reply directly to any email updates you receive from us.",
  },
  {
    question: "What happens if I'm not satisfied with the resolution?",
    answer: "If you're not satisfied with the initial resolution, you can request a review by responding to the resolution email or submitting a new complaint referencing your original Complaint ID.",
  },
  {
    question: "Is my personal information secure?",
    answer: "Absolutely. We take data privacy seriously and comply with all relevant data protection regulations. Your information is only used to process and resolve your complaint.",
  },
];

export function generateComplaintId(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `CMP-${year}-${random}`;
}

export function getComplaintById(id: string): Complaint | undefined {
  return mockComplaints.find((c) => c.id === id);
}
