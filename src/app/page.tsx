'use client'
import Link from 'next/link'
import { Search, Plus, ArrowRight, CheckCircle2, Clock3, ShieldCheck, Menu, X } from 'lucide-react'
import { useState } from 'react'

const departments = [
  ['Hostel Facilities', 'Accommodation, maintenance, electricity, water, and cleanliness issues.'],
  ['IT & Wi-Fi', 'Campus Wi-Fi, LMS access, connectivity, and technical problems.'],
  ['Transport Director', 'Buses, routes, schedules, facilities, and related complaints.'],
  ['Academic & Grading', 'Marks discrepancies, grading, examination records, and result issues.'],
  ['Finance & Fees', 'Fee payments, challan issues, duplicate payments, and queries.'],
]

const steps = [
  ['1', 'Submit your complaint', 'Fill out a simple form with details about your issue and select the relevant department.'],
  ['2', 'Department reviews it', 'The assigned resolver team analyzes your request and starts the resolution process.'],
  ['3', 'Track progress', 'Receive real-time updates and track the status of your complaint until it is fully resolved.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans text-[#11182c]">
      <header className="sticky top-0 z-20 border-b border-[#e1e7ee] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          <a href="#home" className="flex items-center gap-2 text-[15px] font-bold">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#126b38] text-xs font-bold text-white">SA</span>
            SAU HelpDesk
          </a>
          <nav className="hidden items-center gap-8 text-sm text-[#647794] md:flex">
            <a href="#home" className="font-medium text-[#11182c] hover:text-[#126b38]">Home</a>
            <a href="#how-it-works" className="hover:text-[#126b38]">How It Works</a>
            <a href="#departments" className="hover:text-[#126b38]">Departments</a>
          </nav>
          <div className="hidden items-center gap-5 text-sm md:flex">
            <Link href="/login" className="text-[#647794] hover:text-[#126b38]">Login</Link>
            <a href="#submit" className="rounded-md bg-[#126b38] px-4 py-2.5 font-bold text-white shadow-lg shadow-[#126b38]/15 hover:bg-[#0d592e]">Get Started</a>
          </div>
          <button className="md:hidden" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-[#e1e7ee] bg-white px-5 py-5 text-sm md:hidden"><a href="#home">Home</a><a href="#how-it-works">How It Works</a><a href="#departments">Departments</a><Link href="/login">Login</Link></nav>}
      </header>

      <section id="home" className="relative overflow-hidden border-b border-[#e1e7ee] px-5 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(186,245,215,0.32),transparent_58%)]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfbf2] px-3 py-1 text-xs font-bold text-[#126b38]"><span className="size-1.5 rounded-full bg-[#126b38]" />Official SAU Complaint Portal</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-6xl">Your University Problems.<span className="block text-[#126b38]">One Place to Solve.</span></h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#647794] sm:text-lg">Report university issues, connect with the right department, and track your complaint from submission to resolution.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="#submit" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#126b38] px-6 text-sm font-bold text-white shadow-lg shadow-[#126b38]/20 hover:bg-[#0d592e]"><Plus size={17} />Submit a Complaint</a>
            <a href="#track" className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#d9e1eb] bg-white px-6 text-sm font-bold hover:border-[#126b38]/50 hover:text-[#126b38]"><Search size={16} />Track Complaint</a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20 lg:px-8">
        <div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#126b38]">How It Works</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Transparent and efficient problem resolution</h2><p className="mx-auto mt-4 max-w-xl text-[#647794]">Get support from the right university department in three simple steps.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">{steps.map(([number, title, text]) => <article key={number} className="rounded-xl border border-[#e1e7ee] bg-white p-7 shadow-sm"><div className="flex size-10 items-center justify-center rounded-full bg-[#ecfbf2] text-sm font-extrabold text-[#126b38]">{number}</div><h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#647794]">{text}</p></article>)}</div>
      </section>

      <section id="departments" className="border-y border-[#e1e7ee] bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#126b38]">Department Directory</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight">Find the right department</h2><p className="mt-3 text-[#647794]">Connect with the team responsible for your concern.</p></div><a href="#departments" className="flex items-center gap-2 text-sm font-bold text-[#126b38]">View all departments <ArrowRight size={16} /></a></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{departments.map(([title, text]) => <article key={title} className="rounded-xl border border-[#e1e7ee] bg-[#fbfcfe] p-6 transition hover:-translate-y-1 hover:border-[#126b38]/30 hover:shadow-lg"><div className="flex size-10 items-center justify-center rounded-lg bg-[#ecfbf2] text-[#126b38]"><CheckCircle2 size={20} /></div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-[#647794]">{text}</p><a href="#submit" className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[#126b38]">Report issue <ArrowRight size={13} /></a></article>)}</div></div>
      </section>

      <section id="track" className="mx-auto max-w-6xl px-5 py-20 lg:px-8"><div className="grid items-center gap-12 rounded-2xl bg-[#126b38] px-7 py-10 text-white sm:px-12 lg:grid-cols-[1fr_auto]"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#baf5d1]">Stay informed</p><h2 className="mt-3 text-3xl font-extrabold">Track every step of your complaint.</h2><p className="mt-4 max-w-xl leading-7 text-white/75">Receive updates from submission through resolution and know exactly who is handling your issue.</p></div><div className="grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1"><div className="flex items-center gap-3"><ShieldCheck size={19} /><span>Secure submissions</span></div><div className="flex items-center gap-3"><Clock3 size={19} /><span>Real-time updates</span></div><div className="flex items-center gap-3"><CheckCircle2 size={19} /><span>Verified resolutions</span></div></div></div></section>

      <footer className="border-t border-[#e1e7ee] bg-white px-5 py-12 lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3"><div><div className="flex items-center gap-2 font-bold"><span className="flex size-7 items-center justify-center rounded-md bg-[#126b38] text-xs text-white">SA</span>SAU HelpDesk</div><p className="mt-4 max-w-xs text-sm leading-6 text-[#647794]">A modern university management platform for Sindh Agriculture University, Tandojam.</p></div><div><h3 className="text-sm font-bold">Platform</h3><div className="mt-4 flex flex-col gap-3 text-sm text-[#647794]"><a href="#home">About the platform</a><a href="#how-it-works">How It Works</a><a href="#departments">Departments</a></div></div><div><h3 className="text-sm font-bold">Support</h3><div className="mt-4 flex flex-col gap-3 text-sm text-[#647794]"><a href="#submit">Submit a Complaint</a><Link href="/login">Contact Resolver</Link><a href="#">Report a Bug</a></div></div></div><div className="mx-auto mt-10 max-w-6xl border-t border-[#e1e7ee] pt-6 text-xs text-[#94a3b8]">© 2024 Sindh Agriculture University HelpDesk. All rights reserved.</div></footer>
    </main>
  )
}