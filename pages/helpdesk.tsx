
'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Download,
  FileImage,
  Paperclip,
  Send,
  Wifi,
} from 'lucide-react';

// Types

type Sender = 'student' | 'resolver';

type ChatMessage = {
  id: string;
  sender: Sender;
  text: string;
  time: string;
};

type TimelineItem = {
  title: string;
  description: string;
  date: string;
  complete: boolean;
};

// Static data

const timeline: TimelineItem[] = [
  {
    title: 'SUBMITTED',
    description: 'Complaint successfully lodged in the system.',
    date: 'Oct 20, 11:30 AM',
    complete: true,
  },
  {
    title: 'ASSIGNED',
    description: 'Assigned to IT specialist for initial review.',
    date: 'Oct 20, 11:35 AM',
    complete: true,
  },
  {
    title: 'UNDER REVIEW',
    description: 'The team is currently investigating the technical logs.',
    date: 'Oct 20, 12:05 PM',
    complete: true,
  },
  {
    title: 'RESOLVED',
    description: 'The solution will be applied once verified.',
    date: '',
    complete: false,
  },
];

// Header

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-4">
          <a
            href="/complaints"
            aria-label="Back to complaints"
            className="text-slate-500 hover:text-emerald-700"
          >
            <ArrowLeft size={19} />
          </a>

          <a
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-900"
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-emerald-700 text-[10px] text-white">
              SA
            </span>
            SAU HelpDesk
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-slate-500 hover:text-emerald-700"
          >
            <Bell size={18} />
            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
            <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
              AK
            </span>
            <span className="hidden text-xs font-bold sm:block">
              Ahmed Khan
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Reusable information field

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

// Complaint details

function ComplaintCard() {
  return (
    <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Wifi size={20} />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  Complaint #CMP-7842
                </p>
                <h1 className="mt-1 text-xl font-extrabold text-slate-900">
                  Wi-Fi connection issue in Block C
                </h1>
              </div>
            </div>

            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Clock3 size={14} />
              Submitted on Oct 20, 2024 at 11:30 AM
            </p>
          </div>

          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold text-amber-700">
            UNDER REVIEW
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid gap-5 border-b border-slate-200 pb-6 sm:grid-cols-2">
          <Info label="DEPARTMENT" value="IT & Wi-Fi Admin" />
          <Info label="CATEGORY" value="Network Connectivity" />
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          The Wi-Fi signal on the ground floor of Block C has been extremely
          weak for the last 3 days. It keeps disconnecting every 5 minutes,
          making it impossible to work on LMS assignments.
        </p>

        <a
          href="/attachments/speedtest-result.png"
          className="mt-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 hover:border-emerald-300"
        >
          <span className="flex size-9 items-center justify-center rounded-md bg-white text-emerald-700">
            <FileImage size={17} />
          </span>

          <span>
            <strong className="block text-xs">
              speedtest-result.png
            </strong>
            <small className="text-[10px] text-slate-400">
              View attachment
            </small>
          </span>

          <Download className="ml-auto text-slate-500" size={15} />
        </a>
      </div>
    </article>
  );
}

// Reusable chat bubble

function MessageBubble({
  sender,
  time,
  children,
}: {
  sender: Sender;
  time: string;
  children: ReactNode;
}) {
  const isStudent = sender === 'student';

  return (
    <div className={`flex gap-3 ${isStudent ? 'justify-end' : ''}`}>
      <div className={isStudent ? 'order-1' : ''}>
        <div
          className={`flex gap-2 ${
            isStudent ? 'justify-end' : ''
          }`}
        >
          <strong className="text-xs">
            {isStudent ? 'You' : 'Mr. Farhan'}
          </strong>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>

        <div
          className={`mt-2 max-w-lg px-4 py-3 text-xs leading-5 ${
            isStudent
              ? 'rounded-bl-xl rounded-t-xl bg-emerald-700 text-white'
              : 'rounded-br-xl rounded-t-xl bg-slate-100 text-slate-600'
          }`}
        >
          {children}
        </div>
      </div>

      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
        {isStudent ? 'AK' : 'FQ'}
      </span>
    </div>
  );
}

// Conversation

function Conversation() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = message.trim();

    if (!text) return;

    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'student',
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((current) => [...current, newMessage]);
    setMessage('');
  }

  return (
    <article className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="font-bold text-slate-900">
          Conversation with Resolver
        </h2>

        <p className="mt-1 flex items-center gap-2 text-xs text-emerald-700">
          <span className="size-2 rounded-full bg-emerald-500" />
          Resolver is online
        </p>
      </div>

      <div className="space-y-5 p-6">
        <MessageBubble sender="resolver" time="11:32 AM">
          Hello, I&apos;ve attached the speed test results. As you can see,
          the latency is very high.
        </MessageBubble>

        <MessageBubble sender="resolver" time="12:05 PM">
          Thank you for reporting this issue. Our team is checking the
          router configurations for Block C. We will update you shortly.
        </MessageBubble>

        {messages.map((item) => (
          <MessageBubble
            key={item.id}
            sender={item.sender}
            time={item.time}
          >
            {item.text}
          </MessageBubble>
        ))}

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-slate-200 pt-5"
        >
          <button
            type="button"
            aria-label="Attach file"
            className="p-2 text-slate-400 hover:text-emerald-700"
          >
            <Paperclip size={17} />
          </button>

          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type your reply here..."
            aria-label="Your reply"
            className="h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs outline-none focus:border-emerald-600"
          />

          <button
            type="submit"
            aria-label="Send reply"
            className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </article>
  );
}

// Progress timeline

function ComplaintTimeline() {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold">Progress Timeline</h2>

      <div className="relative mt-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-slate-200">
        {timeline.map((item) => (
          <div key={item.title} className="relative flex gap-3">
            <span
              className={`z-10 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border-2 border-white ${
                item.complete ? 'bg-emerald-700' : 'bg-slate-300'
              }`}
            >
              {item.complete && (
                <Check size={11} className="text-white" />
              )}
            </span>

            <div>
              <p
                className={`text-[10px] font-bold ${
                  item.complete ? 'text-emerald-700' : 'text-slate-400'
                }`}
              >
                {item.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.description}
              </p>

              {item.date && (
                <p className="mt-1 text-[10px] text-slate-400">
                  {item.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

// Sidebar

function ComplaintSidebar() {
  return (
    <aside className="space-y-6">
      <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold">Assigned Resolver</h2>

        <div className="mt-5 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
            FQ
          </span>

          <div>
            <p className="text-sm font-bold">Mr. Farhan</p>
            <p className="mt-1 text-xs text-slate-500">
              IT Specialist, Dept. of CS
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
          <Info label="AVG. RESPONSE TIME" value="~2 hours" />
          <Info label="RESOLUTION RATE" value="98%" />
        </div>
      </article>

      <ComplaintTimeline />

      <article className="rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="text-sm font-bold">Not satisfied?</h2>

        <p className="mt-2 text-xs leading-5 text-amber-800">
          If the resolution does not solve your problem, you can request
          to reopen the case within 48 hours.
        </p>

        <a
          href="/policies/reopen"
          className="mt-3 inline-flex items-center text-xs font-bold text-emerald-700"
        >
          Read Reopen Policy
          <ChevronRight size={14} />
        </a>
      </article>
    </aside>
  );
}

// Main page

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />

      <section className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <a
            href="/complaints"
            className="hover:text-emerald-700"
          >
            My Complaints
          </a>

          <ChevronRight size={13} />

          <span className="font-medium text-slate-900">
            #CMP-7842
          </span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            <ComplaintCard />
            <Conversation />
          </div>

          <ComplaintSidebar />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-6">
        <div className="mx-auto flex max-w-7xl justify-between text-xs text-slate-400">
          <span>SAU HelpDesk</span>
          <span>ID: #CMP-7842</span>
        </div>
      </footer>
    </main>
  );
}
