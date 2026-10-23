"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle2,
  ClipboardList,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
  Wrench,
  Droplets,
  Sparkles,
  ChartNoAxesColumn,
  History,
  FileText,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Priority = "Critical" | "High" | "Normal";
type Status = "Assigned" | "In Progress" | "Open";

type Complaint = {
  id: string;
  student: string;
  title: string;
  category: string;
  duration: string;
  status: Status;
  priority: Priority;
};

type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

const initialComplaints: Complaint[] = [
  {
    id: "CMP-7810",
    student: "Ahmed Khan",
    title: "Water leakage in Room 204",
    category: "Plumbing",
    duration: "2 hours ago",
    status: "Assigned",
    priority: "Critical",
  },
  {
    id: "CMP-7822",
    student: "Sara Gul",
    title: "Broken chair in study room",
    category: "Furniture",
    duration: "5 hours ago",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "CMP-7840",
    student: "Bilal Shah",
    title: "Mess food quality complaint",
    category: "Mess",
    duration: "1 day ago",
    status: "Open",
    priority: "Normal",
  },
];

const mainMenu: NavigationItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Assigned Complaints", icon: ClipboardList },
  { label: "Resolution History", icon: History },
  { label: "Performance Stats", icon: ChartNoAxesColumn },
];

const hostelMenu: NavigationItem[] = [
  { label: "Maintenance Requests", icon: Wrench },
  { label: "Water & Electricity", icon: Droplets },
  { label: "Cleanliness Logs", icon: Sparkles },
];

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    Assigned: "bg-blue-50 text-blue-700",
    "In Progress": "bg-amber-50 text-amber-700",
    Open: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const styles: Record<Priority, string> = {
    Critical: "bg-red-50 text-red-700",
    High: "bg-orange-50 text-orange-700",
    Normal: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${styles[priority]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function Sidebar({
  open,
  onClose,
  activeMenu,
  setActiveMenu,
}: {
  open: boolean;
  onClose: () => void;
  activeMenu: string;
  setActiveMenu: (label: string) => void;
}) {
  function renderItems(items: NavigationItem[]) {
    return items.map(({ label, icon: Icon }) => {
      const active = activeMenu === label;

      return (
        <button
          key={label}
          onClick={() => {
            setActiveMenu(label);
            onClose();
          }}
          className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
            active
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          <Icon size={19} />
          <span>{label}</span>
          {active && <ChevronRight size={16} className="ml-auto" />}
        </button>
      );
    });
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-600 p-2.5 text-white">
              <Building2 size={23} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">SAU HelpDesk</h1>
              <p className="text-xs text-slate-500">Resolver Portal</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto px-4 py-6">
          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Workspace
            </p>
            <nav className="space-y-1">{renderItems(mainMenu)}</nav>
          </div>

          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Hostel Services
            </p>
            <nav className="space-y-1">{renderItems(hostelMenu)}</nav>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
          <button
            onClick={() => {
              setActiveMenu("Settings");
              onClose();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
              activeMenu === "Settings"
                ? "bg-emerald-50 text-emerald-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Settings size={19} />
            Settings
          </button>

          <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <UserRound size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                Hostel Resolver
              </p>
              <p className="text-xs text-slate-500">Hostel Administration</p>
            </div>
            <button
              aria-label="Log out"
              title="Log out"
              onClick={() =>
                alert("Connect authentication to implement logout.")
              }
              className="rounded-lg p-2 text-slate-500 hover:bg-white"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({
  onMenuClick,
  query,
  setQuery,
}: {
  onMenuClick: () => void;
  query: string;
  setQuery: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          aria-label="Open sidebar"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <span>SAU HelpDesk</span>
          <ChevronRight size={15} />
          <span className="font-semibold text-slate-900">Hostel Resolver</span>
        </div>

        <span className="font-semibold text-slate-900 sm:hidden">
          Hostel Resolver
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <label className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search complaints..."
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 lg:w-72"
          />
        </label>

        <button
          aria-label="Notifications"
          onClick={() => alert("Connect notifications to enable this feature.")}
          className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="hidden h-9 w-px bg-slate-200 sm:block" />

        <div className="hidden items-center gap-2 sm:flex">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">Resolver</p>
            <p className="text-xs text-slate-500">Hostel Department</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
            HR
          </div>
        </div>
      </div>
    </header>
  );
}

function ComplaintsTable({
  complaints,
  onManage,
}: {
  complaints: Complaint[];
  onManage: (complaint: Complaint) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div>
          <h2 className="font-bold text-slate-900">Recent Complaints</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review and manage student complaints
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          {complaints.length} complaints
        </span>
      </div>

      {complaints.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <Search className="mx-auto mb-3 text-slate-300" size={32} />
          <p className="font-semibold text-slate-700">
            No complaints found
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Try another search term.
          </p>
        </div>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Complaint</th>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Priority</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Submitted</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {complaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="transition hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {complaint.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {complaint.id} · {complaint.category}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-700">
                      {complaint.student}
                    </td>
                    <td className="px-5 py-4">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">
                      {complaint.duration}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => onManage(complaint)}
                        className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 p-4 md:hidden">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="rounded-xl border border-slate-200 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {complaint.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {complaint.id} · {complaint.category}
                    </p>
                  </div>
                  <PriorityBadge priority={complaint.priority} />
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  Student: {complaint.student}
                </p>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <StatusBadge status={complaint.status} />
                  <span className="text-xs text-slate-500">
                    {complaint.duration}
                  </span>
                </div>

                <button
                  onClick={() => onManage(complaint)}
                  className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Manage Complaint
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ComplaintModal({
  complaint,
  onClose,
  onSave,
}: {
  complaint: Complaint;
  onClose: () => void;
  onSave: (id: string, status: Status) => void;
}) {
  const [status, setStatus] = useState<Status>(complaint.status);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="complaint-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              {complaint.id}
            </p>
            <h2
              id="complaint-modal-title"
              className="mt-1 text-xl font-bold text-slate-900"
            >
              Manage Complaint
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">{complaint.title}</p>
          <p className="mt-2 text-sm text-slate-600">
            Student: {complaint.student}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Category: {complaint.category}
          </p>
          <div className="mt-3">
            <PriorityBadge priority={complaint.priority} />
          </div>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Update status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as Status)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 font-normal outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
          </select>
        </label>

        <p className="mt-3 text-xs text-slate-500">
          This demo saves changes in the current page only. Connect a database
          to save them permanently.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(complaint.id, status)}
            className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HostelResolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Assigned Complaints");
  const [query, setQuery] = useState("");
  const [complaints, setComplaints] =
    useState<Complaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] =
    useState<Complaint | null>(null);

  const filteredComplaints = useMemo(() => {
    const search = query.trim().toLowerCase();

    return complaints.filter((complaint) =>
      [
        complaint.id,
        complaint.student,
        complaint.title,
        complaint.category,
        complaint.status,
        complaint.priority,
      ].some((value) => value.toLowerCase().includes(search))
    );
  }, [complaints, query]);

  const pendingCount = complaints.filter(
    (complaint) =>
      complaint.status === "Open" || complaint.status === "Assigned"
  ).length;

  const criticalCount = complaints.filter(
    (complaint) => complaint.priority === "Critical"
  ).length;

  function saveComplaintStatus(id: string, status: Status) {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id ? { ...complaint, status } : complaint
      )
    );
    setSelectedComplaint(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />

        <div className="min-w-0 flex-1">
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            query={query}
            setQuery={setQuery}
          />

          <main className="mx-auto max-w-[1600px] space-y-7 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <Building2 size={16} />
                  <span>Hostel Administration</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {activeMenu}
                </h1>
                <p className="mt-2 text-sm text-slate-500 sm:text-base">
                  Monitor student complaints and manage hostel service
                  requests.
                </p>
              </div>

              <button
                onClick={() =>
                  alert("Connect your backend to add and assign internal notes.")
                }
                className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:self-auto"
              >
                <FileText size={18} />
                Internal Note
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Complaints"
                value={String(complaints.length).padStart(2, "0")}
                description="Complaints in this demo"
                icon={ClipboardList}
                iconClass="bg-blue-50 text-blue-700"
              />
              <SummaryCard
                title="Pending Complaints"
                value={String(pendingCount).padStart(2, "0")}
                description="Open or assigned for action"
                icon={Clock3}
                iconClass="bg-amber-50 text-amber-700"
              />
              <SummaryCard
                title="Critical Issues"
                value={String(criticalCount).padStart(2, "0")}
                description="Require urgent attention"
                icon={AlertTriangle}
                iconClass="bg-red-50 text-red-700"
              />
              <SummaryCard
                title="In Progress"
                value={String(
                  complaints.filter((c) => c.status === "In Progress").length
                ).padStart(2, "0")}
                description="Currently being handled"
                icon={CheckCircle2}
                iconClass="bg-emerald-50 text-emerald-700"
              />
            </div>

            <div className="md:hidden">
              <label className="relative block">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search complaints..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-emerald-500"
                />
              </label>
            </div>

            <ComplaintsTable
              complaints={filteredComplaints}
              onManage={setSelectedComplaint}
            />

            <p className="text-center text-xs text-slate-400">
              SAU HelpDesk · Hostel Resolver Portal · Demo data
            </p>
          </main>
        </div>
      </div>

      {selectedComplaint && (
        <ComplaintModal
          key={selectedComplaint.id}
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onSave={saveComplaintStatus}
        />
      )}
    </div>
  );
}
