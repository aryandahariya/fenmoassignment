const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

function ExpenseItem({ expense, variant = "table" }) {
  const pendingStyles = expense.pending ? "opacity-75" : "";
  const pendingBadge = expense.pending ? (
    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Pending</span>
  ) : null;

  if (variant === "card") {
    return (
      <article className={`rounded-xl border border-slate-200 bg-white p-4 ${pendingStyles}`}>
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold text-slate-900">{expense.category}</p>
          <p className="font-display text-base font-bold text-slate-900">{currencyFormatter.format(expense.amount)}</p>
        </div>

        <p className="mt-2 text-sm text-slate-600">{expense.description || "No description"}</p>
        <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
          <span>{formatDate(expense.date)}</span>
          <span>{pendingBadge}</span>
        </div>
      </article>
    );
  }

  return (
    <tr className={`border-b border-slate-100 last:border-0 ${pendingStyles}`}>
      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
        {expense.category}
        {pendingBadge}
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{expense.description || "No description"}</td>
      <td className="px-4 py-3 text-sm text-slate-600">{formatDate(expense.date)}</td>
      <td className="px-4 py-3 text-right text-sm font-bold text-slate-900">{currencyFormatter.format(expense.amount)}</td>
    </tr>
  );
}

export default ExpenseItem;
