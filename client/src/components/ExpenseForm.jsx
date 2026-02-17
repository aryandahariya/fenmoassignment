import { useState } from "react";

import Spinner from "./Spinner";

const buildInitialState = () => ({
  amount: "",
  category: "Food",
  description: "",
  date: new Date().toISOString().split("T")[0],
});

function ExpenseForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(buildInitialState);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    const amountValue = Number(formData.amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) {
      setFormError("Amount must be a positive number.");
      return;
    }

    if (!formData.date) {
      setFormError("Date is required.");
      return;
    }

    try {
      await onSubmit({ ...formData, amount: amountValue });
      setFormData((previous) => ({
        ...buildInitialState(),
        category: previous.category,
      }));
    } catch (_error) {
      setFormError("Could not save expense. Please try again.");
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
      <h2 className="font-display text-lg font-bold text-slate-900">Add Expense</h2>
      <p className="mt-1 text-sm text-slate-500">Capture spending as it happens.</p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Amount
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="text-sm font-semibold text-slate-700">
            Category
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              name="category"
              type="text"
              placeholder="Food"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label className="block text-sm font-semibold text-slate-700">
          Description
          <textarea
            className="mt-2 min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            name="description"
            placeholder="Dinner with team"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          Date
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        {formError && (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">{formError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting && <Spinner size="sm" className="border-slate-200 border-t-white" />}
          {isSubmitting ? "Saving..." : "Add Expense"}
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;
