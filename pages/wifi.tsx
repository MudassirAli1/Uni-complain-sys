'use client'

import { useState } from 'react'
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Network,
  Search,
  Settings,
  ShieldCheck,
  Ticket,
  UserRound,
  Wifi,
  X,
} from 'lucide-react'

const tickets = [
  { id: '#IT-9012', student: 'Ahmed Khan', issue: 'LMS Login issues for semester exams...', category: 'LMS Portal', time: '45m', status: 'Urgent' },
  { id: '#IT-8995', student: 'Zainab Bibi', issue: 'Wi-Fi password reset for Block A...', category: 'Network', time: '3h 12m', status: 'Assigned' },
  { id: '#IT-8978', student: 'Ali Raza', issue: 'Access card is not working at gate...', category: 'Access Control', time: '5h 40m', status: 'Pending' },
  { id: '#IT-8964', student: 'Sara Ahmed', issue: 'Unable to access LMS assignment portal...', category: 'LMS Portal', time: '1d', status: 'Assigned' },
]

export default function ResolverPage() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Active Tickets')

  return (
    <main className="min-h-screen bg-[#f5f7fa] font-sans text-[#172033]">
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-[#dfe5ec] bg-white transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between border-b border-[#e4e9ef] px-5">
          <div className="flex items-center gap-2 font-bold"><span className="flex size-7 items-center justify-center rounded-md bg-[#126b38] text-[10px] font-bold text-white">SA</span>SAU Resolver Portal</div>
          <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar"><X size={18} /></button>
        </div>
        <nav className="flex flex-col gap-1 p-4 text-sm">
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">Resolver Tools</p>
          {[
            [LayoutDashboard, 'Active Tickets'],
            [CheckCircle2, 'Resolved Cases'],
            [Settings, 'Server Status'],
          ].map(([Icon, label]) => (
            <button key={label as string} onClick={() => setActiveTab(label as string)} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left ${activeTab === label ? 'bg-[#eaf7ef] font-bold text-[#126b38]' : 'text-[#647794] hover:bg-[#f7f9fb]'}`}>
              <Icon size={17} />{label as string}
            </button>
          ))}
          <p className="mb-2 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#94a3b8]">Network Health</p>
          {[[Wifi, 'Campus Wi-Fi'], [Network, 'LMS Portal'], [ShieldCheck, 'Access Control']].map(([Icon, label]) => <a key={label as string} href="#" className="flex items-center gap-3 rounded-lg px-3 py-3 text-[#647794] hover:bg-[#f7f9fb]"><Icon size={17} />{label as string}</a>)}
          <a href="#" className="mt-8 flex items-center gap-3 rounded-lg px-3 py-3 text-[#647794] hover:bg-[#f7f9fb]"><LogOut size={17} />Sign Out</a>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b border-[#dfe5ec] bg-white px-5 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open sidebar"><Menu size={20} /></button>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#126b38]">IT & Wi-Fi Administration</p><h1 className="mt-1 text-lg font-extrabold">Resolver Workspace</h1></div>
          <div className="flex items-center gap-4"><button className="relative text-[#647794]" aria-label="Notifications"><Bell size={18} /><span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" /></button><div className="flex items-center gap-2 border-l border-[#e4e9ef] pl-4"><div className="flex size-8 items-center justify-center rounded-full bg-[#d9f2e2] text-xs font-bold text-[#126b38]">FQ</div><div className="hidden sm:block"><p className="text-xs font-bold">Mr. Farhan Qureshi</p><p className="text-[10px] text-[#94a3b8]">IT Specialist / Admin</p></div><ChevronDown size={14} className="text-[#94a3b8]" /></div></div>
        </header>

        <section className="mx-auto max-w-7xl px-5 py-7 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><h2 className="text-2xl font-extrabold">{activeTab}</h2><p className="mt-1 text-sm text-[#647794]">Manage and resolve IT-related student complaints.</p></div><div className="flex gap-3"><button className="rounded-lg border border-[#dce3ec] bg-white px-4 py-2.5 text-xs font-bold">Export Cases</button><button className="rounded-lg bg-[#126b38] px-4 py-2.5 text-xs font-bold text-white">New Internal Log</button></div></div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-[#e2e7ef] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">In Progress</p><Ticket size={19} className="text-[#126b38]" /></div><p className="mt-3 text-3xl font-extrabold">12</p><p className="mt-1 text-xs text-[#647794]">Active tickets assigned to you</p></div><div className="rounded-xl border border-[#e2e7ef] bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">Resolved Today</p><CheckCircle2 size={19} className="text-[#126b38]" /></div><p className="mt-3 text-3xl font-extrabold">08</p><p className="mt-1 text-xs text-[#126b38]">+2 from yesterday</p></div></div>

          <div className="mt-7 rounded-xl border border-[#e2e7ef] bg-white shadow-sm"><div className="flex flex-col gap-4 border-b border-[#e2e7ef] p-5 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full max-w-sm"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" /><input placeholder="Filter by Student ID..." className="h-10 w-full rounded-lg border border-[#dce3ec] bg-[#f8fafc] pl-9 pr-3 text-xs outline-none focus:border-[#126b38]" /></div><div className="flex gap-2"><button className="flex items-center gap-2 rounded-lg border border-[#dce3ec] px-3 py-2 text-xs font-bold">All urgency <ChevronDown size={13} /></button><button className="rounded-lg border border-[#dce3ec] p-2"><MoreHorizontal size={16} /></button></div></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-xs"><thead className="bg-[#f8fafc] text-[10px] uppercase tracking-wider text-[#94a3b8]"><tr><th className="px-5 py-3">Urgency</th><th className="px-5 py-3">ID</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Issue</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Waiting</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Actions</th></tr></thead><tbody>{tickets.map((ticket) => <tr key={ticket.id} className="border-t border-[#e7ebf0] hover:bg-[#fbfcfd]"><td className="px-5 py-4"><span className={`size-2.5 rounded-full ${ticket.status === 'Urgent' ? 'bg-red-500' : 'bg-amber-400'}`} /></td><td className="px-5 py-4 font-bold text-[#126b38]">{ticket.id}</td><td className="px-5 py-4"><div className="flex items-center gap-2 font-semibold"><span className="flex size-7 items-center justify-center rounded-full bg-[#edf2f7] text-[#647794]"><UserRound size={14} /></span>{ticket.student}</div></td><td className="px-5 py-4 font-semibold">{ticket.issue}</td><td className="px-5 py-4 text-[#647794]">{ticket.category}</td><td className="px-5 py-4 text-[#647794]"><span className="flex items-center gap-1"><Clock3 size={13} />{ticket.time}</span></td><td className="px-5 py-4"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${ticket.status === 'Urgent' ? 'bg-red-50 text-red-600' : ticket.status === 'Assigned' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{ticket.status}</span></td><td className="px-5 py-4"><button className="rounded-md bg-[#126b38] px-3 py-1.5 text-[10px] font-bold text-white hover:bg-[#0d592e]">Solve</button></td></tr>)}</tbody></table></div></div>

          <div className="mt-7 grid gap-5 md:grid-cols-3"><div className="rounded-xl border border-[#e2e7ef] bg-white p-5"><MessageSquareText className="text-[#126b38]" size={20} /><h3 className="mt-4 font-bold">Quick response</h3><p className="mt-2 text-xs leading-5 text-[#647794]">Send updates and request more details from students.</p></div><div className="rounded-xl border border-[#e2e7ef] bg-white p-5"><AlertCircle className="text-amber-500" size={20} /><h3 className="mt-4 font-bold">Escalation queue</h3><p className="mt-2 text-xs leading-5 text-[#647794]">Review complaints that need immediate attention.</p></div><div className="rounded-xl border border-[#e2e7ef] bg-white p-5"><ShieldCheck className="text-[#126b38]" size={20} /><h3 className="mt-4 font-bold">System health</h3><p className="mt-2 text-xs leading-5 text-[#647794]">All IT services are currently operational.</p></div></div>
        </section>
      </div>
    </main>
  )
}