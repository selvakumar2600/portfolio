import React, { useState, useEffect, useRef, useCallback } from 'react';
import emailjs from '@emailjs/browser';

// ──────────────────────────────────────────────────────────────
//  Constants
// ──────────────────────────────────────────────────────────────
const STORAGE_KEY = 'portfolio_messages';
const WHATSAPP_NUMBER = '919150831569';
const MY_EMAIL = 'selvakumarb2406@gmail.com';
const MY_PHONE = '+91 9150831569';
const MY_LOCATION = 'Tenkasi – 627811, Tamil Nadu';

// EmailJS IDs come from .env
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

// ──────────────────────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────────────────────
function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveMessages(msgs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

function formatTime(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = (now - d) / 1000;
  if (diff < 60)    return 'Just now';
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
}

// ──────────────────────────────────────────────────────────────
//  Toast
// ──────────────────────────────────────────────────────────────
function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div className={`contact-toast contact-toast--${toast.type} ${toast ? 'contact-toast--visible' : ''}`}>
      <span className="contact-toast-icon">{toast.type === 'success' ? '✓' : '✕'}</span>
      <span>{toast.message}</span>
      <button className="contact-toast-close" onClick={onDismiss} aria-label="Dismiss">×</button>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
//  CopyButton
// ──────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button className="contact-copy-btn" onClick={handleCopy} title="Copy to clipboard" aria-label="Copy email">
      {copied
        ? (<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
        : (<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/></svg>)
      }
      <span>{copied ? 'Copied!' : 'Copy'}</span>
    </button>
  );
}

// ──────────────────────────────────────────────────────────────
//  InboxPanel
// ──────────────────────────────────────────────────────────────
function InboxPanel({ messages, unreadCount, onMarkAllRead, onClearAll }) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  const filtered = messages.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="contact-inbox-panel">
      {/* Header */}
      <div className="contact-inbox-header">
        <div className="contact-inbox-title-row">
          <h3 className="contact-inbox-title">
            <span className="contact-inbox-icon">📬</span>
            Message Inbox
          </h3>
          {unreadCount > 0 && (
            <span className="contact-badge contact-badge--pulse">{unreadCount}</span>
          )}
        </div>
        <p className="contact-inbox-sub">Messages submitted via your contact form</p>
      </div>

      {/* Search */}
      <div className="contact-search-wrap">
        <svg className="contact-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <input
          className="contact-search-bar"
          type="text"
          placeholder="Search messages…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search messages"
        />
        {search && (
          <button className="contact-search-clear" onClick={() => setSearch('')} aria-label="Clear search">×</button>
        )}
      </div>

      {/* Actions */}
      {messages.length > 0 && (
        <div className="contact-inbox-actions">
          {unreadCount > 0 && (
            <button className="contact-inbox-action-btn" onClick={onMarkAllRead}>
              ✓ Mark all read
            </button>
          )}
          <button className="contact-inbox-action-btn contact-inbox-action-btn--danger" onClick={onClearAll}>
            🗑 Clear all
          </button>
        </div>
      )}

      {/* Message List */}
      <div className="contact-message-list">
        {filtered.length === 0 ? (
          <div className="contact-inbox-empty">
            <div className="contact-inbox-empty-icon">💬</div>
            <p>{search ? 'No messages match your search.' : 'No messages yet. Your inbox is empty!'}</p>
            <p className="contact-inbox-empty-sub">Messages sent via the form will appear here.</p>
          </div>
        ) : (
          filtered.map(msg => (
            <div
              key={msg.id}
              className={`contact-message-item ${!msg.read ? 'contact-message-item--unread' : ''} ${expanded === msg.id ? 'contact-message-item--expanded' : ''}`}
              onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}
            >
              {/* Avatar */}
              <div className="contact-msg-avatar">{initials(msg.name)}</div>

              <div className="contact-msg-body">
                <div className="contact-msg-top">
                  <div className="contact-msg-meta">
                    <span className="contact-msg-name">{msg.name}</span>
                    {!msg.read && <span className="contact-msg-unread-dot" />}
                  </div>
                  <span className="contact-msg-time">{formatTime(msg.timestamp)}</span>
                </div>
                <div className="contact-msg-email">{msg.email}</div>
                <p className="contact-msg-preview">
                  {expanded === msg.id ? msg.message : `${msg.message.slice(0, 90)}${msg.message.length > 90 ? '…' : ''}`}
                </p>
                {expanded === msg.id && (
                  <div className="contact-msg-full-actions">
                    <a href={`mailto:${msg.email}?subject=Re: Your message`} className="contact-msg-reply-btn">
                      ↩ Reply via Email
                    </a>
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi ${encodeURIComponent(msg.name)}, thanks for reaching out!`} target="_blank" rel="noreferrer" className="contact-msg-reply-btn contact-msg-reply-btn--whatsapp">
                      Reply on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer count */}
      {messages.length > 0 && (
        <div className="contact-inbox-footer">
          {filtered.length} of {messages.length} message{messages.length !== 1 ? 's' : ''}
          {search && ` matching "${search}"`}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
//  Main ContactSection
// ──────────────────────────────────────────────────────────────
export default function ContactSection() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [messages, setMessages] = useState(loadMessages);
  const [unreadCount, setUnreadCount] = useState(0);
  const [whatsappHover, setWhatsappHover] = useState(false);

  // Compute unread on mount and when messages change
  useEffect(() => {
    setUnreadCount(messages.filter(m => !m.read).length);
  }, [messages]);

  const dismissToast = useCallback(() => setToast(null), []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (sending) return;

    // EmailJS not configured yet → fall back to local-only mode
    const emailConfigured = EJS_SERVICE && EJS_TEMPLATE && EJS_KEY &&
      EJS_SERVICE !== 'your_service_id_here';

    setSending(true);

    // Build the local message record
    const newMsg = {
      id: Date.now().toString(),
      name: formState.name,
      email: formState.email,
      subject: formState.subject || '(No subject)',
      message: formState.message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    try {
      if (emailConfigured) {
        await emailjs.send(
          EJS_SERVICE,
          EJS_TEMPLATE,
          {
            from_name: formState.name,
            from_email: formState.email,
            subject: formState.subject || 'Portfolio Contact',
            message: formState.message,
            to_email: MY_EMAIL,
          },
          EJS_KEY
        );
        setToast({ type: 'success', message: '✉️ Message sent! I\'ll get back to you soon.' });
      } else {
        // Simulate a short send delay for UX polish
        await new Promise(r => setTimeout(r, 900));
        setToast({ type: 'success', message: '📥 Message saved! (Configure EmailJS to also send emails.)' });
      }

      // Save to local inbox
      const updated = [newMsg, ...messages];
      setMessages(updated);
      saveMessages(updated);

      // Reset form
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setToast({ type: 'error', message: '❌ Failed to send. Please try emailing directly.' });
    } finally {
      setSending(false);
    }
  };

  const handleMarkAllRead = () => {
    const updated = messages.map(m => ({ ...m, read: true }));
    setMessages(updated);
    saveMessages(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all messages from your inbox?')) {
      setMessages([]);
      saveMessages([]);
    }
  };

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Selvakumar! I visited your portfolio and I'd like to connect 👋")}`;

  return (
    <section id="contact" className="section-contact-v2">
      <Toast toast={toast} onDismiss={dismissToast} />

      <div className="padding-global" style={{ width: '100%' }}>
        <div className="container-large">
          <div className="padding-section-large">

            {/* ── Section Header ── */}
            <div className="text-align-center contact-v2-header">
              <p className="text-style-allcaps section-accent-label">Get In Touch</p>
              <h2 className="lets-talk-heading">Let's Work Together</h2>
              <p className="text-size-medium section-sub-text" style={{ marginTop: '1rem', maxWidth: '540px', margin: '1rem auto 0' }}>
                Have a project, collaboration, or just want to say hi? Pick your preferred way to reach out.
              </p>
            </div>

            {/* ── Top Row: Details + Form ── */}
            <div className="contact-v2-top-grid">

              {/* ── Contact Details Card ── */}
              <div className="contact-v2-details-card">
                <div className="contact-v2-card-label">CONTACT DETAILS</div>

                {/* Email */}
                <div className="contact-v2-info-item">
                  <div className="contact-v2-info-icon contact-v2-info-icon--email">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  </div>
                  <div className="contact-v2-info-text">
                    <span className="contact-v2-info-label">EMAIL</span>
                    <div className="contact-v2-info-value-row">
                      <a href={`mailto:${MY_EMAIL}`} className="contact-v2-info-value">{MY_EMAIL}</a>
                      <CopyButton text={MY_EMAIL} />
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="contact-v2-info-item">
                  <div className="contact-v2-info-icon contact-v2-info-icon--phone">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  </div>
                  <div className="contact-v2-info-text">
                    <span className="contact-v2-info-label">PHONE</span>
                    <a href={`tel:${MY_PHONE.replace(/\s/g, '')}`} className="contact-v2-info-value">{MY_PHONE}</a>
                  </div>
                </div>

                {/* Location */}
                <div className="contact-v2-info-item">
                  <div className="contact-v2-info-icon contact-v2-info-icon--location">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="1.8"/>
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.8"/>
                    </svg>
                  </div>
                  <div className="contact-v2-info-text">
                    <span className="contact-v2-info-label">LOCATION</span>
                    <span className="contact-v2-info-value">{MY_LOCATION}</span>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`contact-whatsapp-btn ${whatsappHover ? 'contact-whatsapp-btn--hover' : ''}`}
                  onMouseEnter={() => setWhatsappHover(true)}
                  onMouseLeave={() => setWhatsappHover(false)}
                  aria-label="Chat on WhatsApp"
                >
                  {/* WhatsApp SVG Logo */}
                  <svg className="contact-wa-logo" viewBox="0 0 48 48" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4C12.95 4 4 12.95 4 24c0 3.74 1.01 7.24 2.77 10.25L4 44l10.06-2.72A19.93 19.93 0 0 0 24 44c11.05 0 20-8.95 20-20S35.05 4 24 4z" fill="currentColor" fillOpacity="0.15"/>
                    <path d="M24 6.5C14.3 6.5 6.5 14.3 6.5 24c0 3.47.97 6.71 2.66 9.48L6.5 41.5l8.26-2.63A17.46 17.46 0 0 0 24 41.5c9.7 0 17.5-7.8 17.5-17.5S33.7 6.5 24 6.5z" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M32.4 27.9c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.3 1.6-.2.3-.5.3-.9.1-.4-.2-1.8-.7-3.4-2.1-1.3-1.1-2.1-2.5-2.4-2.9-.2-.4 0-.6.2-.8.2-.2.4-.5.6-.7.2-.2.2-.4.3-.7.1-.3 0-.5-.1-.7-.1-.2-1-2.3-1.3-3.2-.3-.8-.6-.7-.9-.7h-.7c-.3 0-.7.1-1 .4-.4.4-1.4 1.3-1.4 3.2 0 1.9 1.4 3.7 1.6 4 .2.3 2.7 4.1 6.5 5.7.9.4 1.6.6 2.2.8.9.3 1.7.2 2.4.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.8-.5z" fill="currentColor"/>
                  </svg>
                  <span className="contact-wa-text">
                    <span className="contact-wa-label">Chat on WhatsApp</span>
                    <span className="contact-wa-number">+91 9150831569</span>
                  </span>
                  <span className="contact-wa-arrow">↗</span>
                  <span className="contact-wa-pulse" />
                </a>

                {/* Social Links */}
                <div className="contact-v2-socials">
                  <a href="https://linkedin.com/in/selvakumar-b-4335b1290/" target="_blank" rel="noreferrer" className="contact-v2-social-chip">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                  <a href="https://github.com/selvakumar2600" target="_blank" rel="noreferrer" className="contact-v2-social-chip">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                </div>
              </div>

              {/* ── Contact Form Card ── */}
              <div className="contact-v2-form-card">
                <div className="contact-v2-card-label">SEND A MESSAGE</div>

                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="contact-v2-form-row">
                    <div className="contact-v2-form-group">
                      <label className="contact-v2-form-label" htmlFor="cf-name">YOUR NAME</label>
                      <input
                        id="cf-name"
                        name="name"
                        type="text"
                        className="contact-v2-form-input"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                      />
                    </div>
                    <div className="contact-v2-form-group">
                      <label className="contact-v2-form-label" htmlFor="cf-email">YOUR EMAIL</label>
                      <input
                        id="cf-email"
                        name="email"
                        type="email"
                        className="contact-v2-form-input"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div className="contact-v2-form-group" style={{ marginTop: '1.2rem' }}>
                    <label className="contact-v2-form-label" htmlFor="cf-subject">SUBJECT</label>
                    <input
                      id="cf-subject"
                      name="subject"
                      type="text"
                      className="contact-v2-form-input"
                      placeholder="Project inquiry, collaboration, etc."
                      value={formState.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="contact-v2-form-group" style={{ marginTop: '1.2rem' }}>
                    <label className="contact-v2-form-label" htmlFor="cf-message">MESSAGE</label>
                    <textarea
                      id="cf-message"
                      name="message"
                      className="contact-v2-form-textarea"
                      placeholder="Tell me about your project, idea, or just say hi! I read every message."
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                    <div className="contact-v2-char-count">
                      {formState.message.length} characters
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`contact-v2-send-btn ${sending ? 'contact-v2-send-btn--sending' : ''}`}
                    disabled={sending}
                    id="contact-send-btn"
                  >
                    {sending ? (
                      <>
                        <span className="contact-v2-spinner" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>

                {/* EmailJS not configured hint */}
                {(!EJS_SERVICE || EJS_SERVICE === 'your_service_id_here') && (
                  <div className="contact-v2-emailjs-hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    EmailJS not configured — messages saved locally only. <a href="https://www.emailjs.com" target="_blank" rel="noreferrer">Set up EmailJS ↗</a>
                  </div>
                )}
              </div>
            </div>

            {/* ── Bottom: Inbox Panel (full width) ── */}
            <div className="contact-v2-inbox-wrap">
              <InboxPanel
                messages={messages}
                unreadCount={unreadCount}
                onMarkAllRead={handleMarkAllRead}
                onClearAll={handleClearAll}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
