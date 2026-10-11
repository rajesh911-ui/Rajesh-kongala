import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const email = 'rajeshkongala@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setMessageSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section className="section-box relative z-10" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-2 border-[#e0e0e6] bg-[#0b0b0d] p-8 sm:p-12">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="label mb-3">// 06_COMMUNICATION</div>
            <h2 className="font-headline font-extrabold text-3xl sm:text-4xl uppercase tracking-[-0.04em] text-[#e0e0e6]">
              DIRECT MENTOR DISPATCH
            </h2>
            <p className="font-body text-sm text-[rgba(224,224,230,0.6)] mt-3 leading-relaxed">
              Have specific questions regarding course suitability, team licensing, or hardware specifications? Connect directly with lead instructor Rajesh Kongala.
            </p>

            {/* Email Dispatch Card */}
            <div className="mt-8 p-5 border border-[rgba(224,224,230,0.15)] bg-[rgba(255,255,255,0.015)]">
              <div className="font-mono text-[0.65rem] text-[rgba(224,224,230,0.5)] uppercase tracking-wider mb-2">
                OFFICIAL INBOX
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs sm:text-sm text-[#00ff7f] font-bold truncate">
                  {email}
                </span>
                <button
                  onClick={copyEmail}
                  className="btn py-1 px-3 text-[0.65rem] shrink-0 cursor-pointer"
                >
                  {copied ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Response SLA */}
            <div className="mt-6 flex flex-col gap-2 font-mono text-xs text-[rgba(224,224,230,0.5)]">
              <div>// RESPONSE_TIME: UNDER 12 HOURS</div>
              <div>// OFFICE_HOURS: TUES & THURS 5:00 PM EST</div>
              <div>// LOCATION: REMOTE / GLOBAL DISCORD HUB</div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Terminal Inquiry Form */}
        <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-[rgba(224,224,230,0.1)] pt-8 lg:pt-0 lg:pl-8">
          <div className="font-mono text-xs text-[#00ff7f] mb-4">
            // TRANSMIT ENCRYPTED INQUIRY:
          </div>

          {messageSent ? (
            <div className="p-8 border-2 border-[#00ff7f] bg-[rgba(0,255,127,0.04)] text-center">
              <span className="material-symbols-outlined text-4xl text-[#00ff7f] mb-2">
                mark_email_read
              </span>
              <h3 className="font-headline text-xl font-bold uppercase text-[#e0e0e6]">
                MESSAGE TRANSMITTED SUCCESSFULLY
              </h3>
              <p className="font-mono text-xs text-[rgba(224,224,230,0.6)] mt-2">
                Thank you! Rajesh will reply to your inquiry within 12 hours.
              </p>
              <button
                onClick={() => setMessageSent(false)}
                className="btn mt-6 py-2 px-4 text-xs cursor-pointer"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-1.5">
                  // YOUR_NAME:
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Alex Morgan"
                  className="w-full p-3 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-1.5">
                  // YOUR_EMAIL:
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="w-full p-3 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[rgba(224,224,230,0.7)] uppercase mb-1.5">
                  // INQUIRY_MESSAGE:
                </label>
                <textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Detail your question or team inquiry here..."
                  className="w-full p-3 bg-[#111116] border border-[rgba(224,224,230,0.2)] focus:border-[#00ff7f] text-[#e0e0e6] font-mono text-xs outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full py-3.5 text-xs tracking-wider cursor-pointer font-bold"
              >
                <span>TRANSMIT DISPATCH</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
