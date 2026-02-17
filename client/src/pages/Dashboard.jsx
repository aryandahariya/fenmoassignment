import { useCallback, useEffect, useMemo, useState } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterSort from "../components/FilterSort";
import TotalDisplay from "../components/TotalDisplay";
import { createExpense, getExpenses } from "../services/expenseService";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Education",
  "Travel",
  "Other",
];

const getErrorMessage = (error) => {
  const apiMessage = error?.response?.data?.message;
  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  if (error?.code === "ERR_NETWORK") {
    return "Cannot reach backend API. Start the server and check your API URL.";
  }

  if (error?.response?.status >= 500) {
    return "Backend error. Check server logs and verify MongoDB connection.";
  }

  return error?.message || "Something went wrong. Please try again.";
};

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("date_desc");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadExpenses = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await getExpenses({
        category: selectedCategory === "All" ? "" : selectedCategory,
        sort: sortOrder,
      });
      setExpenses(data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, sortOrder]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const categoryOptions = useMemo(() => {
    const merged = [...DEFAULT_CATEGORIES, ...expenses.map((expense) => expense.category).filter(Boolean)];
    return ["All", ...new Set(merged)];
  }, [expenses]);

  const totalAmount = useMemo(
    () => expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    [expenses]
  );

  const handleAddExpense = async (newExpense) => {
    setError("");
    setIsSubmitting(true);

    const optimisticId = `temp-${Date.now()}`;
    const optimisticExpense = {
      _id: optimisticId,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      description: newExpense.description,
      date: new Date(newExpense.date).toISOString(),
      pending: true,
    };

    const shouldShowInCurrentFilter =
      selectedCategory === "All" || selectedCategory === optimisticExpense.category;

    if (shouldShowInCurrentFilter) {
      setExpenses((previous) => [optimisticExpense, ...previous]);
    }

    try {
      await createExpense(newExpense);
      await loadExpenses();
    } catch (requestError) {
      if (shouldShowInCurrentFilter) {
        setExpenses((previous) => previous.filter((expense) => expense._id !== optimisticId));
      }
      const message = getErrorMessage(requestError);
      setError(message);
      throw requestError;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-700">
          Expense Tracker
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">Control spending with clarity</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
          Add expenses, filter by category, and monitor totals in real time.
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <ExpenseForm onSubmit={handleAddExpense} isSubmitting={isSubmitting} />
        <div className="space-y-6">
          <FilterSort
            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
            onCategoryChange={setSelectedCategory}
            onSortChange={setSortOrder}
            disabled={isLoading}
          />
          <TotalDisplay totalAmount={totalAmount} recordCount={expenses.length} />
        </div>
      </section>

      <section className="mt-6">
        <ExpenseList expenses={expenses} isLoading={isLoading} error={error} />
      </section>
    </main>
  );
}

export default Dashboard;
