"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type RecordStatus = "In Review" | "Pending" | "Verified";

type AcademicRecord = {
  id: string;
  name: string;
  issue: string;
  session: string;
  status: RecordStatus;
};

type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

const initialRecords: AcademicRecord[] = [
  {
    id: "22-SAU-042",
    name: "Ahmed Khan",
    issue: "Marks discrepancy in mid-term of CS-201.",
    session: "Spring 2024",
    status: "In Review",
  },
  {
    id: "21-SAU-118",
    name: "Sara Ahmed",
    issue: "Missing marks for final examination.",
    session: "Fall 2023",
    status: "Pending",
  },
  {
    id: "23-SAU-076",
    name: "Bilal Raza",
    issue: "Incorrect grade displayed on transcript.",
    session: "Spring 2024",
    status: "Verified",
  },
];

const navigation: NavigationItem[] = [
  { label: "Marks Discrepancies", icon: ClipboardList },
  { label: "Degree Issuance", icon: GraduationCap },
  { label: "Exam Scheduling", icon: BookOpen },
];

const verification: NavigationItem[] = [
  { label: "Enrollment Status", icon: UserRound },
  { label: "Transcript Requests", icon: FileCheck2 },
];

function StatusBadge({ status }: { status: RecordStatus }) {
  const styles: Record<RecordStatus, string> = {
    "In Review": "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Verified: "bg-emerald-50 text-emerald-700",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
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
          aria-label="Close sidebar overlay"
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
            onClick={onClose}
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
          <div>
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Records
            </p>

            <nav className="mt-4 flex flex-col gap-1">
              {renderItems(navigation)}
            </nav>

            <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Verification
            </p>

            <nav className="mt-4 flex flex-col gap-1">
              {renderItems(verification)}
            </nav>
          </div>

          <button
            onClick={() =>
              alert("Connect authentication to implement logout.")
            }
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden sm:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
          Academic &amp; Grading
        </p>
        <h2 className="mt-1 text-lg font-extrabold">
          Resolver Workspace
        </h2>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-50"
          aria-label="Notifications"
          onClick={() =>
            alert("Connect a notification service to enable alerts.")
          }
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
            TM
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-bold">Prof. Tariq Mahmood</p>
            <p className="text-[10px] text-slate-400">
              Academic Registrar
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
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

function StatCards({ records }: { records: AcademicRecord[] }) {
  const activeCount = records.filter(
    (record) => record.status !== "Verified"
  ).length;

  const verifiedCount = records.filter(
    (record) => record.status === "Verified"
  ).length;

  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <StatCard
        label="Grading Issues"
        value={String(activeCount).padStart(2, "0")}
        description="Records awaiting verification"
        icon={ClipboardList}
      />

      <StatCard
        label="Records Verified"
        value={String(verifiedCount).padStart(2, "0")}
        description="Verified records in this demo"
        icon={CheckCircle2}
      />
    </div>
  );
}

function RecordsTable({
  query,
  onQueryChange,
  records,
  onManage,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  records: AcademicRecord[];
  onManage: (record: AcademicRecord) => void;
}) {
  return (
    <article className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold">Student Records</h2>
          <p className="mt-1 text-xs text-slate-400">
            Review academic requests assigned to your department.
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search student records..."
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3">Student ID</th>
              <th className="px-5 py-3">Full Name</th>
              <th className="px-5 py-3">Grading Issue</th>
              <th className="px-5 py-3">Exam Session</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-5 py-5 font-bold text-emerald-700">
                  {record.id}
                </td>

                <td className="px-5 py-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <UserRound size={15} />
                    </span>
                    <span className="font-bold">{record.name}</span>
                  </div>
                </td>

                <td className="px-5 py-5 text-slate-600">
                  {record.issue}
                </td>

                <td className="px-5 py-5 text-slate-600">
                  {record.session}
                </td>

                <td className="px-5 py-5">
                  <StatusBadge status={record.status} />
                </td>

                <td className="px-5 py-5">
                  <button
                    onClick={() => onManage(record)}
                    className="whitespace-nowrap rounded-md bg-emerald-700 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-800"
                  >
                    {record.status === "Verified" ? "View Record" : "Review"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <p className="p-10 text-center text-sm text-slate-500">
            No student records found.
          </p>
        )}
      </div>
    </article>
  );
}

function RecordModal({
  record,
  onClose,
  onSave,
}: {
  record: AcademicRecord;
  onClose: () => void;
  onSave: (id: string, status: RecordStatus) => void;
}) {
  const [status, setStatus] = useState<RecordStatus>(record.status);

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
        aria-labelledby="record-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold text-emerald-700">
              {record.id}
            </p>
            <h2
              id="record-modal-title"
              className="mt-1 text-xl font-extrabold"
            >
              Review Academic Record
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

        <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4 text-sm">
          <p>
            <span className="font-semibold text-slate-800">Student: </span>
            {record.name}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Session: </span>
            {record.session}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Issue: </span>
            {record.issue}
          </p>
        </div>

        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Update record status
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as RecordStatus)
            }
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          >
            <option value="Pending">Pending</option>
            <option value="In Review">In Review</option>
            <option value="Verified">Verified</option>
          </select>
        </label>

        <p className="mt-3 text-xs text-slate-500">
          Demo only: this change is held in page state and is not saved to a
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
            onClick={() => onSave(record.id, status)}
            className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AcademicResolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Marks Discrepancies");
  const [query, setQuery] = useState("");
  const [records, setRecords] =
    useState<AcademicRecord[]>(initialRecords);
  const [selectedRecord, setSelectedRecord] =
    useState<AcademicRecord | null>(null);

  const filteredRecords = useMemo(() => {
    const value = query.trim().toLowerCase();

    return records.filter((record) =>
      [
        record.id,
        record.name,
        record.issue,
        record.session,
        record.status,
      ].some((field) => field.toLowerCase().includes(value))
    );
  }, [query, records]);

  function updateRecordStatus(id: string, status: RecordStatus) {
    setRecords((current) =>
      current.map((record) =>
        record.id === id ? { ...record, status } : record
      )
    );

    setSelectedRecord(null);
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
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
                Academic &amp; Grading
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
                {activeItem}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Review and verify student academic records.
              </p>
            </div>

            <button
              onClick={() =>
                alert("Connect a notes form and backend to add record notes.")
              }
              className="w-fit rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800"
            >
              Create Record Note
            </button>
          </div>

          <StatCards records={records} />

          <RecordsTable
            query={query}
            onQueryChange={setQuery}
            records={filteredRecords}
            onManage={setSelectedRecord}
          />
        </section>
      </div>

      {selectedRecord && (
        <RecordModal
          key={selectedRecord.id}
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onSave={updateRecordStatus}
        />
      )}
    </main>
  );
}
