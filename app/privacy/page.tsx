import { privacy } from "@/content/legal";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: privacy.title, description: privacy.description, path: "/privacy" });

export default function PrivacyPage() {
  return <LegalPage doc={privacy} />;
}
