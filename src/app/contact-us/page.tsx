"use client";

import { Clock3, Globe2, Loader2, Mail, Send } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import Footer from "@/components/Nav/footer";
import Navbar from "@/components/Nav/navbar";
import {
  trackFormError,
  trackFormStart,
  trackFormSubmit,
  trackLeadGenerated,
} from "@/lib/analytics";
import publicApi from "@/publicApi";

type ContactForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const initialForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

const contactDetails = [
  {
    title: "Email",
    value: "contact@thehackbio.com",
    href: "mailto:contact@thehackbio.com",
    icon: Mail,
  },
  {
    title: "Response time",
    value: "Usually within 48 hours",
    icon: Clock3,
  },
  {
    title: "Availability",
    value: "Supporting learners worldwide",
    icon: Globe2,
  },
];

export default function ContactUsPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (field: keyof ContactForm, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart("contact_us", "contact_page");
    }
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.email.trim() && !form.phone.trim()) {
      setError("Please enter an email address or phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      await publicApi.post("/api/contact-messages/", {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
        website: form.website,
        source_page: typeof window !== "undefined" ? window.location.href : "",
      });

      setForm(initialForm);
      setSuccess("Thank you. Your message has been sent to the HackBio team.");
      trackFormSubmit("contact_us", "contact_page");
      trackLeadGenerated("contact_us", "contact_page");
    } catch {
      setError("We could not send your message. Please try again.");
      trackFormError("contact_us", "contact_page", "submission_failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    "h-12 w-full rounded-sm border border-gray-300 bg-white px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20 dark:border-white/20 dark:bg-[#111827] dark:text-white dark:placeholder:text-gray-500";

  return (
    <div className="w-full bg-white text-gray-800 dark:bg-[#080d18] dark:text-white">
      <Navbar />

      <main>
        <section className="bg-gray-100 px-5 pb-16 pt-40 dark:bg-[#101827] sm:px-8">
          <div className="mx-auto w-full max-w-5xl">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Home / Contact Us
            </p>
            <h1 className="mt-3 text-4xl font-medium text-[#27AE60] sm:text-5xl">
              Contact Us
            </h1>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto grid w-full max-w-5xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="text-3xl font-medium leading-tight text-[#27AE60]">
                Need more information?
                <br />
                Get in touch with us
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
                Questions about a course, pathway, internship, payment, or
                partnership? Send us a message and our team will help.
              </p>

              <div className="mt-10 space-y-7">
                {contactDetails.map(({ title, value, href, icon: Icon }) => (
                  <div key={title} className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#27AE60]/12 text-[#27AE60]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-base font-medium text-[#27AE60]">
                        {title}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block text-base text-gray-600 underline-offset-4 hover:text-[#27AE60] hover:underline dark:text-gray-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-base text-gray-600 dark:text-gray-300">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-medium text-[#27AE60]">
                Send Message
              </h2>
              <p className="mt-3 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
                Fill out the form with your details and message. An email or
                phone number is required so we can reply.
              </p>

              <form onSubmit={submitForm} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="contact-first-name">
                    First name
                  </label>
                  <input
                    id="contact-first-name"
                    required
                    autoComplete="given-name"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(event) =>
                      updateField("firstName", event.target.value)
                    }
                    className={inputClassName}
                  />

                  <label className="sr-only" htmlFor="contact-last-name">
                    Last name
                  </label>
                  <input
                    id="contact-last-name"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(event) =>
                      updateField("lastName", event.target.value)
                    }
                    className={inputClassName}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="contact-email">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    className={inputClassName}
                  />

                  <label className="sr-only" htmlFor="contact-phone">
                    Phone number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number (optional)"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className={inputClassName}
                  />
                </div>

                <label className="sr-only" htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={7}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  className="w-full resize-y rounded-sm border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/20 dark:border-white/20 dark:bg-[#111827] dark:text-white dark:placeholder:text-gray-500"
                />

                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) =>
                      updateField("website", event.target.value)
                    }
                  />
                </div>

                {error ? (
                  <p role="alert" className="text-base text-red-600 dark:text-red-400">
                    {error}
                  </p>
                ) : null}
                {success ? (
                  <p
                    role="status"
                    className="rounded-sm bg-[#27AE60]/10 px-4 py-3 text-base text-[#167a3e] dark:text-green-300"
                  >
                    {success}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#27AE60] px-7 text-base font-medium text-white transition hover:bg-[#219653] focus:outline-none focus:ring-2 focus:ring-[#27AE60] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-5 w-5" aria-hidden="true" />
                  )}
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
