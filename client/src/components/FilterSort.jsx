function FilterSort({
  categoryOptions,
  selectedCategory,
  sortOrder,
  onCategoryChange,
  onSortChange,
  disabled,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="font-display text-lg font-bold text-slate-900">Filter & Sort</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Category
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
            disabled={disabled}
          >
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-semibold text-slate-700">
          Sort
          <select
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            disabled={disabled}
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default FilterSort;
