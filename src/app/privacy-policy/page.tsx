import LegalDocumentPage from "@/components/legal/legal-document-page";

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage
      documentType="privacy_policy"
      fallbackTitle="Privacy Policy"
      fallbackMarkdown="## Privacy Policy\n\nOur privacy policy is being prepared. Please check back soon."
    />
  );
}
