# GA4 Analytics Notes

GA4 is configured in `src/app/layout.tsx` with
`NEXT_PUBLIC_GA_MEASUREMENT_ID`. The existing HackBio property
`G-E5BTKCZEBN` is used as a non-secret fallback so a missing deployment
variable cannot silently disable analytics.

Microsoft Clarity is initialized separately in the same layout. It uses the
`clarity` global and does not replace GA4's `gtag` or `dataLayer`.

App Router page views are sent by
`src/components/analytics/google-analytics-page-view.tsx`. The GA base config
uses `send_page_view: false` so the explicit tracker does not duplicate the
initial page view.

Reusable event helpers live in `src/lib/analytics.ts`. Use those helpers instead of calling `window.gtag` directly inside components.

Do not send PII to GA4. Never include email, phone number, full name, username, free-form answers, or user-identifying text in analytics payloads.

Tracked key-event candidates:

- `sign_up_start`
- `sign_up_complete`
- `application_start`
- `application_submit`
- `generate_lead`
- `begin_checkout`
- `purchase`
- `login_success`
- `password_reset_start`
- `pricing_view`
- `course_view`
- `pathway_view`
- `internship_view`
- `curriculum_click`
- `faq_expand`
- `module_complete`
- `checkout_error`

Recommended GA4 Key events to mark in GA:

- `sign_up_complete`
- `application_submit`
- `generate_lead`
- `begin_checkout`
- `purchase`
- `login_success`

Ecommerce events use the GA4 `items` array shape with `item_id`, `item_name`, `item_category`, optional `item_variant`, `price`, and `quantity`.
