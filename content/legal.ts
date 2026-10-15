/**
 * v1 legal copy — plain-language summaries of what the site actually does. Have counsel review
 * before launch; edit here, not in the page components.
 */
export interface LegalDoc {
  title: string;
  description: string;
  updatedAt: string;
  sections: { heading: string; body: string[] }[];
}

export const privacy: LegalDoc = {
  title: "Privacy policy",
  description: "What Chanium collects through chanium.com, why, and who processes it.",
  updatedAt: "2026-10-15",
  sections: [
    {
      heading: "What we collect",
      body: [
        "When you request a quote we collect the answers you give in the form — your business type, tools, what you want to automate, scale, timing, budget band — and your contact details: name, company, email, optional phone, state and how you heard about us.",
        "When you join an AI Employee waitlist we collect your email and the role you're interested in.",
        "We record the campaign parameters (utm_*) and referring site of your first visit in a first-party cookie so we know which channels bring people to us, and we use Vercel Analytics for aggregate, cookieless page analytics.",
      ],
    },
    {
      heading: "Why we use it",
      body: [
        "To prepare and email your proposal, follow up about it, and plan the build if you go ahead. To tell waitlist members when a self-serve AI Employee is ready. We do not sell your data.",
      ],
    },
    {
      heading: "Who processes it",
      body: [
        "Supabase (database and file storage), Resend (email delivery), Anthropic (drafting your proposal from your answers), Vercel (hosting and analytics) and, if configured, Slack (internal notifications). Each processes data only to provide its service to us.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "Email hello@chanium.com to access, correct or delete your data, or to stop receiving follow-up. Every email we send also lets you opt out.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of use",
  description: "Terms for using chanium.com.",
  updatedAt: "2026-10-15",
  sections: [
    {
      heading: "This site",
      body: [
        "chanium.com is operated by Chanium LLC. Content on this site, including playbooks, is provided for information and may change without notice.",
      ],
    },
    {
      heading: "Proposals",
      body: [
        "Proposals generated through the quote flow are estimates based on your answers. Scope, price and delivery date become binding only when confirmed in a signed agreement after the scoping call. The on-time guarantee and code ownership terms are set out in that agreement.",
      ],
    },
    {
      heading: "Contact",
      body: ["Questions about these terms: hello@chanium.com."],
    },
  ],
};
