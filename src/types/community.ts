export type MemberStatus = "pending" | "approved" | "rejected";
export type MemberRole = "member" | "admin";

export interface CommunityMember {
  id: string;
  clerk_user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  status: MemberStatus;
  role: MemberRole;
  invite_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CommunityBusiness {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  location?: string;
  logo_url?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  // joined from member
  owner_name?: string;
  owner_email?: string;
}

export interface CommunityInvite {
  id: string;
  token: string;
  created_by?: string;
  email?: string;
  used_at?: string;
  expires_at: string;
  created_at: string;
}

export const BUSINESS_CATEGORIES = [
  "Construction & Trades",
  "Technology & IT",
  "Healthcare & Wellness",
  "Food & Catering",
  "Education & Tutoring",
  "Finance & Accounting",
  "Legal Services",
  "Beauty & Grooming",
  "Transport & Logistics",
  "Retail & Shopping",
  "Creative & Media",
  "Cleaning & Home Services",
  "Real Estate",
  "Events & Entertainment",
  "Other",
] as const;

export type BusinessCategory = (typeof BUSINESS_CATEGORIES)[number];
