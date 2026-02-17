const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function TotalDisplay({ totalAmount, recordCount }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Filtered Total</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-slate-900">{currencyFormatter.format(totalAmount)}</p>
      <p className="mt-2 text-sm text-slate-500">
        {recordCount} {recordCount === 1 ? "expense" : "expenses"}
      </p>
    </section>
  );
}

export default TotalDisplay;
