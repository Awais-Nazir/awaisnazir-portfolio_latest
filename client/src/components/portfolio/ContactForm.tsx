import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { trpc } from "@/lib/trpc";

export function ContactForm() {
  const submit = trpc.contact.submit.useMutation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((previous) => ({ ...previous, [key]: value }));
    setSuccess(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit.mutate(form, {
      onSuccess: () => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      },
    });
  }

  return <form onSubmit={onSubmit} className="space-y-5" noValidate>
    <div><label htmlFor="name" className="text-sm font-medium text-[#f6f1e9]">Name</label><input id="name" value={form.name} onChange={(event) => update("name", event.target.value)} required minLength={2} maxLength={80} className="mt-2 h-12 w-full rounded-xl border border-white/[0.12] bg-black/15 px-3 text-sm text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 focus:border-[#f0c276]/65" placeholder="Your name" /></div>
    <div><label htmlFor="email" className="text-sm font-medium text-[#f6f1e9]">Email</label><input id="email" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required maxLength={320} className="mt-2 h-12 w-full rounded-xl border border-white/[0.12] bg-black/15 px-3 text-sm text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 focus:border-[#f0c276]/65" placeholder="you@company.com" /></div>
    <div><label htmlFor="message" className="text-sm font-medium text-[#f6f1e9]">Message</label><textarea id="message" value={form.message} onChange={(event) => update("message", event.target.value)} required minLength={10} maxLength={5000} rows={6} className="mt-2 w-full resize-y rounded-xl border border-white/[0.12] bg-black/15 px-3 py-3 text-sm leading-6 text-[#f6f1e9] outline-none transition placeholder:text-[#f6f1e9]/30 focus:border-[#f0c276]/65" placeholder="Tell me a little about the opportunity or challenge." /></div>
    {submit.error && <p className="rounded-xl border border-red-300/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">{submit.error.message}</p>}
    {success && <p className="rounded-xl border border-[#f0c276]/25 bg-[#f0c276]/10 px-4 py-3 text-sm text-[#ffe0a5]">Thank you—your message has been sent successfully.</p>}
    <button type="submit" className="button-primary w-full sm:w-auto" disabled={submit.isPending}>{submit.isPending ? "Sending…" : <>Send Message <Send size={16} /></>}</button>
  </form>;
}
