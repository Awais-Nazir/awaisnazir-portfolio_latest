import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function friendlyErrorMessage(raw: string | undefined): string | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed[0]?.message) {
      return parsed[0].message;
    }
  } catch {
    // not JSON, fall through to raw message
  }
  return raw;
}

export function ContactForm() {
  const submit = trpc.contact.submit.useMutation();
  const [focused, setFocused] = useState<keyof typeof form | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [success, setSuccess] = useState(false);


  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setSuccess(false);
  }

  function markTouched(key: keyof typeof form) {
    setTouched((previous) => ({ ...previous, [key]: true }));
  }

  const messageError =
    touched.message &&
      focused !== "message" &&
      form.message.length > 0 &&
      form.message.trim().length < 10
      ? "Please write at least 10 characters 😭"
      : null;

  const emailError =
    touched.email &&
      focused !== "email" &&
      form.email.length > 0 &&
      !EMAIL_RE.test(form.email)
      ? "Enter a valid email address."
      : null;

  const isValid =
    form.name.trim().length >= 2 &&
    EMAIL_RE.test(form.email) &&
    form.message.trim().length >= 10;

  const submitError = friendlyErrorMessage(submit.error?.message);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    submit.mutate(form, {
      onSuccess: () => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
      },
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-[#f6f1e9]">Name</label>
        <input
          id="name"
          value={form.name}
          onChange={(event) => update("name", event.target.value)}
          onBlur={() => markTouched("name")}
          required
          minLength={2}
          maxLength={80}
          className="mt-2 h-12 w-full rounded-xl border border-white/[0.12] bg-black/15 px-3 text-sm text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 focus:border-[#f0c276]/65"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-[#f6f1e9]">Email</label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          onBlur={() => markTouched("email")}
          required
          maxLength={320}
          aria-invalid={!!emailError}
          className={`mt-2 h-12 w-full rounded-xl border bg-black/15 px-3 text-sm text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 ${emailError ? "border-red-300/50 focus:border-red-300/70" : "border-white/[0.12] focus:border-[#f0c276]/65"
            }`}
          placeholder="you@domain.com"
        />
        {emailError && <p className="mt-1.5 text-xs text-red-300">{emailError}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-[#f6f1e9]">Message</label>
        <textarea
          id="message"
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          onFocus={() => setFocused("message")}
          onBlur={() => {
            setFocused(null);
            markTouched("message");
          }}

          required
          maxLength={5000}
          rows={6}
          aria-invalid={!!messageError}
          className={`mt-2 w-full resize-y rounded-xl border bg-black/15 px-3 py-3 text-sm leading-6 text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 ${messageError ? "border-red-300/50 focus:border-red-300/70" : "border-white/[0.12] focus:border-[#f0c276]/65"
            }`}
          placeholder="Tell me a little about the opportunity or challenge."
        />
        {messageError && <p className="mt-1.5 text-xs text-red-300">{messageError}</p>}
      </div>

      {submitError && (
        <p className="rounded-xl border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
          {submitError}
        </p>
      )}
      {success && (
        <p className="rounded-xl border border-[#f0c276]/25 bg-[#f0c276]/10 px-4 py-3 text-sm text-[#ffe0a5]">
          Thank you—your message has been sent successfully.
        </p>
      )}

      <button
        type="submit"
        className="button-primary w-full sm:w-auto"
        disabled={submit.isPending || !isValid}
      >
        {submit.isPending ? "Sending…" : <>Send Message <Send size={16} /></>}
      </button>
    </form>
  );
}