'use client';

import { FormEvent, useState } from 'react';
import FadeIn from './FadeIn';

const EMAIL = 'nuessertom@gmail.com';

// Echte Profil-Links (von tomnuesser.com übernommen).
const SOCIALS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@recordingsequence', icon: YouTubeIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/recsequence', icon: InstagramIcon },
];

export default function ContactSection() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  }

  // Statisches Hosting = kein eigener Server für Formulare.
  // Aktuell öffnet der Button den Mail-Client (mailto:) vorausgefüllt.
  // Für echtes Inline-Versenden ohne Backend: z. B. Formspree oder Getform
  // einbinden und hier stattdessen einen fetch()-POST an deren Endpoint schicken.
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Anfrage von ${values.name || 'Website'}`);
    const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="scroll-mt-28 grid gap-10 md:grid-cols-2 md:gap-16">
      <FadeIn direction="up">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md">
          <Field label="Your name" name="name" value={values.name} onChange={handleChange} />
          <Field label="Your email" name="email" type="email" value={values.email} onChange={handleChange} />
          <Field label="Your message" name="message" as="textarea" value={values.message} onChange={handleChange} />
          <button
            type="submit"
            className="mt-2 rounded-pill bg-black text-white font-bold py-3 hover:opacity-85 active:scale-[0.98] transition-all"
          >
            {sent ? 'Danke!' : 'Send'}
          </button>
        </form>
      </FadeIn>

      <FadeIn direction="up" delay={0.15} className="flex md:justify-end">
        <div className="flex gap-4 h-fit">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="h-9 w-9 flex items-center justify-center rounded-md border border-black/10 hover:bg-black hover:text-white transition-colors"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  as = 'input',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  as?: 'input' | 'textarea';
}) {
  const shared =
    'w-full bg-transparent border-b border-black/40 focus:border-black outline-none py-1.5 text-sm transition-colors resize-none';
  return (
    <label className="flex flex-col gap-1 text-xs text-black/60">
      {label}
      {as === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} className={shared} />
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} className={shared} />
      )}
    </label>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .53 1.5 1 .47.47.76.9 1 1.5.17.4.36 1.2.42 2.4.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4-.24.6-.53 1-1 1.5-.47.47-.9.76-1.5 1-.4.17-1.2.36-2.4.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42-.6-.24-1-.53-1.5-1-.47-.47-.76-.9-1-1.5-.17-.4-.36-1.2-.42-2.4C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4.24-.6.53-1 1-1.5.47-.47.9-.76 1.5-1 .4-.17 1.2-.36 2.4-.42C8.4 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51 0-4.75.07-1.02.05-1.57.22-1.94.36-.49.19-.84.42-1.2.79-.37.36-.6.71-.79 1.2-.14.37-.31.92-.36 1.94-.06 1.24-.07 1.6-.07 4.75s0 3.51.07 4.75c.05 1.02.22 1.57.36 1.94.19.49.42.84.79 1.2.36.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.06 1.6.07 4.75.07s3.51 0 4.75-.07c1.02-.05 1.57-.22 1.94-.36.49-.19.84-.42 1.2-.79.37-.36.6-.71.79-1.2.14-.37.31-.92.36-1.94.06-1.24.07-1.6.07-4.75s0-3.51-.07-4.75c-.05-1.02-.22-1.57-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.79c-.37-.14-.92-.31-1.94-.36-1.24-.06-1.61-.07-4.75-.07Zm0 3.06a4.94 4.94 0 1 1 0 9.88 4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-2a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
