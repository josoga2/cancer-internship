import LegalDocumentPage from "@/components/legal/legal-document-page";

export default function TermsOfServicePage() {
  return (
    <LegalDocumentPage
      documentType="terms_of_service"
      fallbackTitle="Terms of Service"
      fallbackMarkdown="## Terms of Service\n\nOur terms of service are being prepared. Please check back soon."
    />
  );
}
