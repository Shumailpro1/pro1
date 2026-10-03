export type SocialIconName =
  | "github"
  | "linkedin"
  | "twitter"
  | "instagram"
  | "whatsapp";

export type FooterSocial = {
  label: string;
  url: string;
  icon: SocialIconName;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterData = {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  ctaHeading: string;
  ctaText: string;
  ctaButton: string;
  socials: FooterSocial[];
  quickLinks: FooterLink[];
  services: string[];
  builtWith: string;
};

/**
 * Edit this file to update footer content, links, and contact info.
 */
export const footerData: FooterData = {
  name: "Shumail Rizwan",
  role: "Visual Designer & Frontend Developer",
  tagline: "Building clean, fast and beautiful web experiences.",
  email: "galaxyasbro@gmail.com",
  phone: "+92 329 5359129",
  location: "Gujranwala, Pakistan",
  ctaHeading: "Let's work together",
  ctaText:
    "Have a project in mind? I'm open to freelance, collaborations, and full-time opportunities.",
  ctaButton: "Get In Touch",
  socials: [
    {
      label: "GitHub",
      url: "https://github.com",
      icon: "github",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      label: "Twitter / X",
      url: "https://x.com",
      icon: "twitter",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/shumail_butt123",
      icon: "instagram",
    },
    {
      label: "WhatsApp",
      url: "https://wa.me/923295359129",
      icon: "whatsapp",
    },
  ],
  quickLinks: [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#portfolio" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  services: [
    "Web Development",
    "UI/UX Design",
    "API Development",
    "Freelance Work",
  ],
  builtWith: "Built with Next.js & Tailwind CSS",
};
