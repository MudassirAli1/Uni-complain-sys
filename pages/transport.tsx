"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  Bus,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Fuel,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
  Wrench,
  AlertTriangle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ComplaintStatus = "Pending" | "Assigned" | "Resolved";

type TransportComplaint = {
  id: string;
  route: string;
  issue: string;
  date: string;
  status: ComplaintStatus;
};

type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

const initialComplaints: TransportComplaint[] = [
  {
    id: "SAU-B04",
    route: "Tandojam to Hyderabad (Route A)",
    issue: "Bus delay and overcrowding in morning shift.",
    date: "Oct 21, 08:30 AM",
    status: "Pending",
  },
  {
    id: "SAU-B12",
    route: "Internal Campus Shuttle",
    issue: "AC not working in the new shuttle bus.",
    date: "Oct 20, 02:15 PM",
    status: "Assigned",
  },
];

const navigation: NavigationItem[] = [
  { label: "Route Complaints", icon: ClipboardList },
  { label: "Vehicle Maintenance", icon: Settings },
  { label: "Schedule Issues", icon: CalendarDays },
];

const fleetNavigation: NavigationItem[] = [
  { label: "Driver Profiles", icon: UserRound },
  { label: "Fuel Logs", icon: Fuel },
];

function StatusBadge({ status }: { status: ComplaintStatus }) {
  const styles: Record<ComplaintStatus, string> = {
    Pending: "bg-amber-50 text-amber-700",
    Assigned: "bg-blue-50 text-blue-700",
    Resolved: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function Sidebar({
  open,
  activeItem,
  onClose,
  onSelect,
}: {
  open: boolean;
  activeItem: string;
  onClose: () => void;
  onSelect: (item: string) => void;
}) {
  function renderItems(items: NavigationItem[]) {
    return items.map(({ label, icon: Icon }) => (
      <button
        key={label}
        onClick={() => {
          onSelect(label);
          onClose();
        }}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
          activeItem === label
            ? "bg-emerald-50 font-bold text-emerald-700"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <Icon size={17} />
        {label}
      </button>
    ));
  }

  return (
    <>
      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <span className="flex size-7 items-center justify-center rounded-md bg-emerald-700 text-[10px] font-bold text-white">
              SA
            </span>
            SAU Resolver Portal
          </div>

          <button
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Operations
            </p>

            <nav className="mt-4 flex flex-col gap-1">
              {renderItems(navigation)}
            </nav>

            <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Fleet Management
            </p>

            <nav className="mt-4 flex flex-col gap-1">
              {renderItems(fleetNavigation)}
            </nav>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => alert("Connect authentication to implement logout.")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <button
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden sm:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
          Transport Director
        </p>
        <h1 className="mt-1 text-lg font-extrabold">
          Transport Workspace
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50"
          aria-label="Notifications"
          onClick={() => alert("Connect a notification service to enable alerts.")}
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
            KB
          </div>

          <div className="hidden sm:block">
            <p className="text-xs font-bold">Mr. Karim Bux</p>
            <p className="text-[10px] text-slate-400">
              Transport Manager
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHeader({
  activeItem,
}: {
  activeItem: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {activeItem}
        </h2>
        <p className="mt-1 max-w-2xl text-sm text-slate-500">
          Review and manage student complaints related to university
          transport services at Sindh Agriculture University.
        </p>
      </div>

      <button
        onClick={() =>
          alert("Connect a notes form and backend to add route notes.")
        }
        className="w-fit rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
      >
        Add Route Note
      </button>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>
        <span className="text-emerald-700">
          <Icon size={19} />
        </span>
      </div>

      <p className="mt-3 text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </article>
  );
}

function SummaryCards({
  complaints,
}: {
  complaints: TransportComplaint[];
}) {
  const activeCount = complaints.filter(
    (complaint) => complaint.status !== "Resolved"
  ).length;

  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <SummaryCard
        icon={ClipboardList}
        label="Active Complaints"
        value={String(activeCount).padStart(2, "0")}
        description="Complaints requiring action"
      />

      <SummaryCard
        icon={Bus}
        label="Scheduled Today"
        value="12 Buses"
        description="Demo figure — connect schedule data"
      />
    </div>
  );
}

function ComplaintTable({
  search,
  onSearchChange,
  complaints,
  onResolve,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  complaints: TransportComplaint[];
  onResolve: (complaint: TransportComplaint) => void;
}) {
  return (
    <article className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold">Active Route Complaints</h2>
          <p className="mt-1 text-xs text-slate-400">
            Manage complaints assigned to Transport Operations.
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search routes or IDs..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3">Bus ID</th>
              <th className="px-5 py-3">Route Name</th>
              <th className="px-5 py-3">Student Issue</th>
              <th className="px-5 py-3">Report Date</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-5 py-5 font-bold text-emerald-700">
                  {complaint.id}
                </td>

                <td className="px-5 py-5">
                  <p className="font-bold text-slate-800">
                    {complaint.route}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <UserRound size={15} />
                    </span>
                    <p className="max-w-xs text-slate-600">
                      {complaint.issue}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-5">
                  <span className="flex items-center gap-1 whitespace-nowrap text-slate-500">
                    <Clock3 size={13} />
                    {complaint.date}
                  </span>
                </td>

                <td className="px-5 py-5">
                  <StatusBadge status={complaint.status} />
                </td>

                <td className="px-5 py-5">
                  {complaint.status === "Resolved" ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <CheckCircle2 size={14} />
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => onResolve(complaint)}
                      className="rounded-md bg-emerald-700 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-800"
                    >
                      Manage
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {complaints.length === 0 && (
          <p className="p-10 text-center text-sm text-slate-500">
            No complaints found.
          </p>
        )}
      </div>
    </article>
  );
}

function ComplaintModal({
  complaint,
  onClose,
  onSave,
}: {
  complaint: TransportComplaint;
  onClose: () => void;
  onSave: (id: string, status: ComplaintStatus) => void;
}) {
  const [status, setStatus] = useState<ComplaintStatus>(complaint.status);

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
        aria-labelledby="complaint-dialog-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-emerald-700">
              {complaint.id}
            </p>
            <h2
              id="complaint-dialog-title"
              className="mt-1 text-xl font-extrabold"
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

        <div className="mt-5 rounded-xl bg-slate-50 p-4">
          <p className="font-bold text-slate-900">{complaint.route}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {complaint.issue}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Reported: {complaint.date}
          </p>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Complaint status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ComplaintStatus)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="Pending">Pending</option>
            <option value="Assigned">Assigned</option>
            <option value="Resolved">Resolved</option>
          </select>
        </label>

        <p className="mt-3 text-xs text-slate-500">
          Demo only: changes stay in the current page and are not saved to a
          database.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(complaint.id, status)}
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TransportResolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Route Complaints");
  const [search, setSearch] = useState("");
  const [complaints, setComplaints] =
    useState<TransportComplaint[]>(initialComplaints);
  const [selectedComplaint, setSelectedComplaint] =
    useState<TransportComplaint | null>(null);

  const filteredComplaints = useMemo(() => {
    const query = search.trim().toLowerCase();

    return complaints.filter((complaint) =>
      [
        complaint.id,
        complaint.route,
        complaint.issue,
        complaint.date,
        complaint.status,
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [complaints, search]);

  function updateComplaintStatus(
    id: string,
    status: ComplaintStatus
  ) {
    setComplaints((current) =>
      current.map((complaint) =>
        complaint.id === id ? { ...complaint, status } : complaint
      )
    );
    setSelectedComplaint(null);
  }

  return (
    <main className="min-h-screen bg-[#f5f7fa] font-sans text-slate-900">
      <Sidebar
        open={sidebarOpen}
        activeItem={activeItem}
        onClose={() => setSidebarOpen(false)}
        onSelect={setActiveItem}
      />

      <div className="min-w-0 lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <PageHeader activeItem={activeItem} />

          <SummaryCards complaints={complaints} />

          <ComplaintTable
            search={search}
            onSearchChange={setSearch}
            complaints={filteredComplaints}
            onResolve={setSelectedComplaint}
          />

          <p className="mt-6 text-center text-xs text-slate-400">
            SAU HelpDesk · Transport Resolver Portal · Demo data
          </p>
        </section>
      </div>

      {selectedComplaint && (
        <ComplaintModal
          key={selectedComplaint.id}
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onSave={updateComplaintStatus}
        />
      )}
    </main>
  );
}
