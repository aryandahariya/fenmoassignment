import ExpenseItem from "./ExpenseItem";
import Spinner from "./Spinner";

function ExpenseList({ expenses, isLoading, error }) {
  if (isLoading) {
    return (
      <section className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
        <Spinner size="lg" />
        <p className="mt-3 text-sm font-medium text-slate-500">Loading expenses...</p>
      </section>
    );
  }

  if (!expenses.length && error) {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-soft">
        <h3 className="font-semibold">Could not load expenses</h3>
        <p className="mt-1 text-sm">{error}</p>
      </section>
    );
  }

  if (expenses.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="font-semibold text-slate-800">No expenses found</p>
        <p className="mt-1 text-sm text-slate-500">Try adding a new expense or adjusting your filter.</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <h2 className="font-display text-lg font-bold text-slate-900">Expense History</h2>

      {error && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
          Showing last loaded data: {error}
        </div>
      )}

      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 text-right font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <ExpenseItem key={expense._id} expense={expense} variant="table" />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} variant="card" />
        ))}
      </div>
    </section>
  );
}

export default ExpenseList;
