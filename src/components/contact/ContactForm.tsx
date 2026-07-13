"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function ContactForm() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Enter a valid email address";
    if (!subject.trim()) return "Subject is required";
    if (message.trim().length < 10)
      return "Message should be at least 10 characters";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setError("");
    setSubmitting(true);
    try {
      await apiFetch("/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });
      setSubmitted(true);
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-cream/20 bg-espresso-light px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none";

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-sage/30 bg-sage/10 px-6 py-16 text-center">
        <CheckCircle2 className="text-sage" size={36} />
        <h3 className="mt-4 font-display text-xl text-cream">Message Sent</h3>
        <p className="mt-2 text-sm text-cream/60">
          Thanks for reaching out — we typically respond within 1–2 business
          days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-gold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm text-cream/70">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={`mt-1 ${inputClass}`}
          />
        </div>
        <div>
          <label className="text-sm text-cream/70">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`mt-1 ${inputClass}`}
          />
        </div>
      </div>
      <div>
        <label className="text-sm text-cream/70">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What's this about?"
          className={`mt-1 ${inputClass}`}
        />
      </div>
      <div>
        <label className="text-sm text-cream/70">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us more..."
          rows={5}
          className={`mt-1 ${inputClass}`}
        />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-medium text-espresso transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <Send size={16} />
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
