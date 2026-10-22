import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  MessageCircle,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Phone,
  ExternalLink,
  ChevronRight,
  User,
} from 'lucide-react';
import {
  ChatMessage,
  createChatMessage,
  generateAutomatedAcknowledgment,
  validateChatEmail,
  buildWhatsAppChatUrl,
  WHATSAPP_CONFIG,
} from '../utils/chat';

interface LiveChatWidgetProps {
  onOpenConsultationModal?: (topic?: string) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  onOpenConsultationModal,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState<boolean>(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleToggleOpen = () => {
    const next = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(next);
    }
    onOpenChange?.(next);
  };

  const handleClose = () => {
    if (!isControlled) {
      setInternalIsOpen(false);
    }
    onOpenChange?.(false);
  };
  const [activeTab, setActiveTab] = useState<'chat' | 'whatsapp'>('chat');
  const [hasUnread, setHasUnread] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showWhatsAppBanner, setShowWhatsAppBanner] = useState<boolean>(true);
  const [whatsappDraft, setWhatsappDraft] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'team',
      senderName: 'Elena Rostova (Growth Desk)',
      text: 'Welcome to Magentrix! How can our senior squad assist your acquisition pipeline today? Send an inquiry, select a topic, or jump to our direct WhatsApp channel.',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    '💬 Connect with Utkarsh on WhatsApp',
    '📊 Request Free Account Audit',
    '💰 Monthly Retainer Pricing',
    '⚡ Speak Directly to a Growth Engineer',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping, activeTab]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    // Check if user clicked the WhatsApp quick prompt
    if (text.includes('Connect with Utkarsh on WhatsApp')) {
      setActiveTab('whatsapp');
      setInputText('');
      return;
    }

    // Add user message
    const userMsg = createChatMessage('user', text);
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate real-time engineering response
    setTimeout(() => {
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const ack = generateAutomatedAcknowledgment(text, ticketNum);
      const teamMsg: ChatMessage = {
        id: `team-${Date.now()}`,
        sender: 'team',
        senderName: ack.isWhatsAppSuggested ? 'Utkarsh Giri (Founder)' : 'Alexander Vance (Growth Lead)',
        text: ack.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ticketId: ack.ticketId,
      };
      setMessages((prev) => [...prev, teamMsg]);
      setIsTyping(false);
    }, 850);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateChatEmail(userEmail)) return;

    setEmailSubmitted(true);
    const confMsg = createChatMessage(
      'team',
      `Proposal confirmation and transcript linked to ${userEmail}. Our growth engineer will email full telemetry within 2 business hours.`
    );
    setMessages((prev) => [...prev, confMsg]);
  };

  return (
    <aside
      aria-label="Support chat"
      className="fixed bottom-6 right-6 z-50 pointer-events-auto"
    >
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={handleToggleOpen}
        aria-expanded={isOpen}
        aria-controls="live-chat-panel"
        aria-label={isOpen ? 'Close live support chat' : 'Open live support chat'}
        className="group relative w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-[0_4px_25px_rgba(239,68,68,0.45)] hover:shadow-[0_6px_30px_rgba(239,68,68,0.6)] flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95"
      >
        {/* Ambient Ring */}
        <span
          className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-25 pointer-events-none"
          aria-hidden="true"
        />

        {isOpen ? (
          <X className="w-6 h-6 transition-transform duration-200 rotate-90 group-hover:rotate-0" />
        ) : (
          <MessageSquare className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" />
        )}

        {/* Live Status Indicator Dot */}
        <span
          className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black"
          aria-hidden="true"
        />

        {/* Unread Message Pill */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1.5 -left-1.5 bg-white text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-red-500">
            1
          </span>
        )}
      </button>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div
          id="live-chat-panel"
          className="absolute bottom-16 right-0 w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[84vh] bg-[#0c0c0c]/95 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-b from-neutral-900/90 to-transparent border-b border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 border-2 border-black flex items-center justify-center text-[9px] font-bold text-white font-mono">
                  ER
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 border-2 border-black flex items-center justify-center text-[9px] font-bold text-white font-mono">
                  UG
                </div>
              </div>

              <div>
                <div className="text-xs sm:text-sm font-bold text-white tracking-tight flex items-center gap-1.5 leading-none">
                  <span>Magentrix AI Growth Desk</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="text-[10px] text-neutral-400 flex items-center gap-1.5 mt-1 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Instant WhatsApp & AI Desk</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Minimize chat window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat / WhatsApp View Switcher Tabs */}
          <div className="flex border-b border-white/10 bg-black/60 p-1.5 gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat Desk</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-600 text-white shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          </div>

          {/* TAB 1: AI Chat Desk */}
          {activeTab === 'chat' ? (
            <>
              {/* WhatsApp Quick-Transfer Banner */}
              {showWhatsAppBanner && (
                <div className="px-3.5 py-2 bg-emerald-950/40 border-b border-emerald-500/30 flex items-center justify-between gap-2 text-xs animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div className="text-[11px] leading-tight text-neutral-200 truncate">
                      <span className="font-semibold text-white">Prefer WhatsApp? </span>
                      <span className="text-emerald-300">Direct with Utkarsh Giri</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTab('whatsapp')}
                      className="px-2 py-0.5 rounded-md bg-emerald-500/30 hover:bg-emerald-500/50 text-emerald-300 hover:text-white font-semibold text-[10px] transition-colors cursor-pointer"
                    >
                      View Section
                    </button>
                    <a
                      href={buildWhatsAppChatUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 text-emerald-400 hover:text-white transition-colors"
                      title="Open WhatsApp directly"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setShowWhatsAppBanner(false)}
                      className="p-0.5 text-neutral-400 hover:text-white transition-colors"
                      title="Dismiss hint"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Scrollable Message Thread */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mb-1 px-1">
                        <span className="font-semibold text-neutral-300">{msg.senderName}</span>
                        <span>·</span>
                        <span>{msg.timestamp}</span>
                        {msg.ticketId && (
                          <span className="font-mono text-red-400 font-semibold bg-red-950/40 px-1 rounded">
                            #{msg.ticketId}
                          </span>
                        )}
                      </div>

                      <div
                        className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                          isUser
                            ? 'bg-red-600 text-white rounded-br-none shadow-md'
                            : 'bg-white/[0.06] text-neutral-200 border border-white/10 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Direct WhatsApp Fast-Track Button if suggested */}
                        {msg.ticketId && (
                          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="text-[10px] text-neutral-400">Fast-track on WhatsApp:</span>
                            <a
                              href={buildWhatsAppChatUrl(`Regarding Ticket #${msg.ticketId}`, msg.ticketId)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 hover:text-white font-semibold text-[11px] transition-colors"
                            >
                              <MessageCircle className="w-3 h-3 text-emerald-400" />
                              <span>Open WhatsApp</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Simulated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-neutral-400 text-xs py-1">
                    <span className="text-[11px] text-neutral-400">Growth Engineer is typing</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce delay-200" />
                    </span>
                  </div>
                )}

                {/* Quick Prompt Chips */}
                <div className="pt-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Fast Inquiry Topics:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className={`text-left px-3 py-2 rounded-xl border transition-all text-xs cursor-pointer flex items-center justify-between ${
                          idx === 0
                            ? 'bg-emerald-950/30 hover:bg-emerald-900/40 border-emerald-500/40 text-emerald-300 font-semibold shadow-sm'
                            : 'bg-white/[0.03] hover:bg-red-950/30 border-white/10 hover:border-red-500/40 text-neutral-200 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {idx === 0 && <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{prompt}</span>
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inline Email Lead Capture */}
                {!emailSubmitted && messages.length >= 3 && (
                  <form
                    onSubmit={handleEmailSubmit}
                    className="p-3 rounded-xl bg-white/[0.03] border border-red-500/30 space-y-2 mt-2"
                  >
                    <div className="text-[11px] font-semibold text-white">
                      Send transcript & proposal to your inbox:
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="founder@company.com"
                        className="flex-1 bg-black/60 border border-white/15 focus:border-red-500 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none"
                        required
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-xs cursor-pointer transition-colors"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Composer Footer */}
              <div className="p-3 bg-neutral-900/90 border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask our growth engineers a question..."
                    className="flex-1 bg-neutral-950 border border-white/15 focus:border-red-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="mt-1.5 text-[10px] text-center text-neutral-400 flex items-center justify-center gap-1.5">
                  <span>Direct connection to senior engineers</span>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('whatsapp')}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    Switch to WhatsApp
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: Dedicated WhatsApp Section */
            <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-4 text-xs animate-in fade-in duration-150">
              <div className="space-y-4">
                {/* Founder Profile Card */}
                <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-neutral-900 to-black p-4 shadow-lg relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-sm text-emerald-300 font-mono">
                          UG
                        </div>
                      </div>
                      <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-black" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm truncate">
                          {WHATSAPP_CONFIG.founderName}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <div className="text-[11px] text-emerald-300 font-medium">
                        {WHATSAPP_CONFIG.founderTitle}
                      </div>
                      <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>Active Now · Typically replies in {WHATSAPP_CONFIG.typicalResponseTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">Direct Number:</span>
                    <a
                      href={`tel:${WHATSAPP_CONFIG.phoneNumber.replace(/\s+/g, '')}`}
                      className="font-mono font-semibold text-white hover:text-emerald-300 transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      <span>{WHATSAPP_CONFIG.phoneNumber}</span>
                    </a>
                  </div>
                </div>

                {/* Why WhatsApp with Magnetrix */}
                <div className="space-y-1.5">
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold px-1">
                    Direct Founder Access
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-emerald-400 font-bold block mb-0.5">⚡ 1-on-1 Review</span>
                      <span className="text-neutral-300 text-[10px] leading-tight block">
                        Work directly with Utkarsh Giri, no junior handoffs
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-emerald-400 font-bold block mb-0.5">📊 Fast Scoping</span>
                      <span className="text-neutral-300 text-[10px] leading-tight block">
                        Get custom quotes, audit previews & strategy calls
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pre-Filled Discussion Starters */}
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold mb-2 px-1">
                    Quick Discussion Starters:
                  </div>
                  <div className="space-y-1.5">
                    {[
                      'Hi Utkarsh, I would like to scale Meta & Google Ads for our brand.',
                      'Hi Utkarsh, what is your retainer pricing for SEO & Web Development?',
                      'Hi Utkarsh, can we schedule a free 30-minute growth consultation?',
                      'Hi Utkarsh, I need a technical CRO and conversion tracking review.',
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setWhatsappDraft(preset);
                          window.open(buildWhatsAppChatUrl(preset), '_blank');
                        }}
                        className="w-full text-left p-2.5 rounded-xl bg-white/[0.03] hover:bg-emerald-950/30 border border-white/10 hover:border-emerald-500/40 text-neutral-200 hover:text-white transition-all text-xs flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-2">{preset}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom WhatsApp Composer */}
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
                  <label htmlFor="custom-wa-msg" className="block text-[11px] font-semibold text-neutral-200">
                    Or Type a Custom WhatsApp Message:
                  </label>
                  <textarea
                    id="custom-wa-msg"
                    rows={2}
                    value={whatsappDraft}
                    onChange={(e) => setWhatsappDraft(e.target.value)}
                    placeholder="Describe your goals, current monthly spend, or website..."
                    className="w-full bg-black/60 border border-white/15 focus:border-emerald-500 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none resize-none transition-colors"
                  />

                  <a
                    href={buildWhatsAppChatUrl(whatsappDraft)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Launch WhatsApp (+91 92113 74014)</span>
                  </a>
                </div>
              </div>

              {/* Bottom Switch back to AI Chat */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('chat')}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <ArrowRight className="w-3 h-3 rotate-180" />
                  <span>Return to AI Chatbot Desk</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
