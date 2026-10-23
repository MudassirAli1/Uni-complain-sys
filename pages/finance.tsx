"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bell,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShieldCheck,
  WalletCards,
  X,
  Download,
  Eye,
  CircleDollarSign,
} from "lucide-react";

type PaymentStatus = "Verification Pending" | "Verified";

type Payment = {
  id: string;
  student: string;
  issue: string;
  amount: string;
  status: PaymentStatus;
  category: "Challan Verification" | "Refund Requests" | "Duplicate Payments";
};

type NavigationItem = {
  label: string;
  icon: LucideIcon;
};

const initialPayments: Payment[] = [
  {
    id: "#CH-2024-8812",
    student: "Bilal Shah",
    issue: "Duplicate fee payment via online portal.",
    amount: "Rs. 45,000",
    status: "Verification Pending",
    category: "Duplicate Payments",
  },
  {
    id: "#CH-2024-8795",
    student: "Sara Ahmed",
    issue: "Refund requested for cancelled hostel fee.",
    amount: "Rs. 28,500",
    status: "Verification Pending",
    category: "Refund Requests",
  },
  {
    id: "#CH-2024-8761",
    student: "Ahmed Khan",
    issue: "Challan payment confirmation required.",
    amount: "Rs. 62,000",
    status: "Verified",
    category: "Challan Verification",
  },
];

const menuItems: NavigationItem[] = [
  { label: "Challan Verification", icon: ClipboardCheck },
  { label: "Refund Requests", icon: WalletCards },
  { label: "Duplicate Payments", icon: FileText },
];

const complianceItems: NavigationItem[] = [
  { label: "Audit Logs", icon: ShieldCheck },
  { label: "Privacy Controls", icon: LayoutDashboard },
];

export default function FinanceResolverPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Challan Verification");
  const [query, setQuery] = useState("");
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [notice, setNotice] = useState("");

  const filteredPayments = useMemo(() => {
    const search = query.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch = [
        payment.id,
        payment.student,
        payment.issue,
        payment.amount,
        payment.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);

      const matchesCategory =
        !menuItems.some((item) => item.label === activeItem) ||
        payment.category === activeItem;

      return matchesSearch && matchesCategory;
    });
  }, [payments, query, activeItem]);

  const pendingCount = payments.filter(
    (payment) => payment.status === "Verification Pending",
  ).length;

  const verifiedCount = payments.filter(
    (payment) => payment.status === "Verified",
  ).length;

  function updatePaymentStatus(id: string) {
    setPayments((currentPayments) =>
      currentPayments.map((payment) =>
        payment.id === id
          ? { ...payment, status: "Verified" }
          : payment,
      ),
    );

    setSelectedPayment((current) =>
      current && current.id === id
        ? { ...current, status: "Verified" }
        : current,
    );

    setNotice(`Record ${id} marked as verified.`);
  }

  function exportReport() {
    const headers = [
      "Challan ID",
      "Student Name",
      "Payment Issue",
      "Amount",
      "Status",
      "Category",
    ];

    const rows = payments.map((payment) => [
      payment.id,
      payment.student,
      payment.issue,
      payment.amount,
      payment.status,
      payment.category,
    ]);

    const escapeCSV = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sau-financial-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  function selectNavigation(item: string) {
    setActiveItem(item);
    setSidebarOpen(false);
    setQuery("");
    setNotice("");

    if (item === "Audit Logs" || item === "Privacy Controls") {
      setNotice(
        `${item} is a navigation placeholder. Connect it to an authorized backend before using it.`,
      );
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {sidebarOpen && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-20 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        activeItem={activeItem}
        onClose={() => setSidebarOpen(false)}
        onSelect={selectNavigation}
      />

      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <PageHeader
            activeItem={activeItem}
            onExport={exportReport}
          />

          <SummaryCards
            pendingCount={pendingCount}
            verifiedCount={verifiedCount}
          />

          <PrivacyNotice />

          {notice && (
            <div
              role="status"
              className="mt-4 flex items-start justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <p>{notice}</p>
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <PaymentTable
            payments={filteredPayments}
            query={query}
            onQueryChange={setQuery}
            onView={setSelectedPayment}
          />
        </section>
      </div>

      {selectedPayment && (
        <PaymentModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          onVerify={updatePaymentStatus}
        />
      )}
    </main>
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
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
        <a href="#home" className="flex items-center gap-2 text-sm font-bold">
          <span className="flex size-7 items-center justify-center rounded-md bg-emerald-700 text-[10px] font-bold text-white">
            SA
          </span>
          SAU Resolver Portal
        </a>

        <button
          className="lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Payments
          </p>

          <nav className="mt-4 flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                active={activeItem === item.label}
                onClick={() => onSelect(item.label)}
              />
            ))}
          </nav>

          <p className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Compliance
          </p>

          <nav className="mt-4 flex flex-col gap-1">
            {complianceItems.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                active={activeItem === item.label}
                onClick={() => onSelect(item.label)}
              />
            ))}
          </nav>
        </div>

        <button
          onClick={() =>
            onSelect("Logout")
          }
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}

function NavItem({
  label,
  icon: Icon,
  active,
  onClick,
}: NavigationItem & {
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
        active
          ? "bg-emerald-50 font-bold text-emerald-700"
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      <Icon size={17} />
      {label}
    </button>
  );
}

function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 lg:px-8">
      <button
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden sm:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">
          Finance &amp; Fees
        </p>
        <h1 className="mt-1 text-lg font-extrabold">
          Finance Workspace
        </h1>
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button
          className="relative text-slate-500"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
            SA
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-bold">Mr. Shakeel Ahmed</p>
            <p className="text-[10px] text-slate-400">Finance Officer</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function PageHeader({
  activeItem,
  onExport,
}: {
  activeItem: string;
  onExport: () => void;
}) {
  const descriptions: Record<string, string> = {
    "Challan Verification":
      "Review student challans and confirm payment records.",
    "Refund Requests":
      "Review refund requests and verify their financial details.",
    "Duplicate Payments":
      "Investigate duplicate fee payments and payment discrepancies.",
    "Audit Logs":
      "Audit records require a secure, server-side logging implementation.",
    "Privacy Controls":
      "Manage access through your authorized authentication system.",
    Logout:
      "Sign-out requires integration with your authentication provider.",
  };

  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          {activeItem === "Logout" ? "Sign Out" : activeItem}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {descriptions[activeItem] ?? "Manage financial records."}
        </p>
      </div>

      <button
        onClick={onExport}
        className="flex w-fit items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800"
      >
        <Download size={15} />
        Export Financial Report
      </button>
    </div>
  );
}

function SummaryCards({
  pendingCount,
  verifiedCount,
}: {
  pendingCount: number;
  verifiedCount: number;
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <SummaryCard
        label="PENDING VERIFICATIONS"
        value={`${pendingCount} Cases`}
        description="Require financial review"
        icon={WalletCards}
        color="amber"
      />

      <SummaryCard
        label="VERIFIED RECORDS"
        value={`${verifiedCount} Challans`}
        description="Verified in the current sample dataset"
        icon={CheckCircle2}
        color="green"
      />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color: "amber" | "green";
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            color === "amber" ? "text-amber-600" : "text-emerald-700"
          }`}
        >
          {label}
        </p>
        <Icon
          size={19}
          className={
            color === "amber" ? "text-amber-600" : "text-emerald-700"
          }
        />
      </div>

      <p className="mt-3 text-2xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </article>
  );
}

function PrivacyNotice() {
  return (
    <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">
      <ShieldCheck size={17} className="mt-0.5 shrink-0" />
      <p>
        Financial records should only be accessible to authorized personnel.
        Implement server-side authorization and audit logging before using real
        student payment data.
      </p>
    </div>
  );
}

function PaymentTable({
  payments,
  query,
  onQueryChange,
  onView,
}: {
  payments: Payment[];
  query: string;
  onQueryChange: (value: string) => void;
  onView: (payment: Payment) => void;
}) {
  return (
    <article className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold">Financial Records</h2>
          <p className="mt-1 text-xs text-slate-400">
            Search and review student payment requests.
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
            placeholder="Search financial records..."
            aria-label="Search financial records"
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-xs">
          <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-5 py-3">Challan ID</th>
              <th className="px-5 py-3">Student Name</th>
              <th className="px-5 py-3">Payment Issue</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <PaymentRow
                key={payment.id}
                payment={payment}
                onView={() => onView(payment)}
              />
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="p-10 text-center text-sm text-slate-500">
            No financial records found.
          </p>
        )}
      </div>

      <div className="border-t border-slate-200 px-5 py-3 text-xs text-slate-400">
        Showing {payments.length} record{payments.length === 1 ? "" : "s"}
      </div>
    </article>
  );
}

function PaymentRow({
  payment,
  onView,
}: {
  payment: Payment;
  onView: () => void;
}) {
  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">
      <td className="px-5 py-5 font-bold text-emerald-700">
        {payment.id}
      </td>

      <td className="px-5 py-5 font-bold text-slate-800">
        {payment.student}
      </td>

      <td className="max-w-xs px-5 py-5 text-slate-600">
        {payment.issue}
      </td>

      <td className="px-5 py-5 font-bold text-slate-800">
        {payment.amount}
      </td>

      <td className="px-5 py-5">
        <span
          className={`rounded-full px-2 py-1 text-[10px] font-bold ${
            payment.status === "Verified"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {payment.status}
        </span>
      </td>

      <td className="px-5 py-5">
        <button
          onClick={onView}
          className="flex items-center gap-1.5 rounded-md bg-emerald-700 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-800"
        >
          <Eye size={13} />
          {payment.status === "Verified" ? "View Record" : "Review Record"}
        </button>
      </td>
    </tr>
  );
}

function PaymentModal({
  payment,
  onClose,
  onVerify,
}: {
  payment: Payment;
  onClose: () => void;
  onVerify: (id: string) => void;
}) {
  const isVerified = payment.status === "Verified";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Financial Record
            </p>
            <h2
              id="payment-modal-title"
              className="mt-2 text-xl font-extrabold"
            >
              {payment.id}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close payment details"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <Detail label="Student" value={payment.student} />
          <Detail label="Payment Issue" value={payment.issue} />
          <Detail label="Amount" value={payment.amount} />
          <Detail label="Request Type" value={payment.category} />

          <div>
            <p className="text-xs font-semibold text-slate-500">Status</p>
            <p
              className={`mt-1 text-sm font-bold ${
                isVerified ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {payment.status}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            Close
          </button>

          {!isVerified && (
            <button
              onClick={() => {
                onVerify(payment.id);
                onClose();
              }}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800"
            >
              <CheckCircle2 size={16} />
              Mark as Verified
            </button>
          )}
        </div>

        {!isVerified && (
          <p className="mt-4 text-xs leading-5 text-amber-700">
            Demo only: verify the actual bank or university payment record
            before confirming a transaction in a production system.
          </p>
        )}
      </section>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
