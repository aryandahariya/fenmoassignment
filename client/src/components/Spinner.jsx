function Spinner({ size = "md", className = "" }) {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-7 w-7 border-[3px]",
    lg: "h-10 w-10 border-4",
  };

  return (
    <span
      className={`inline-block animate-spin rounded-full border-slate-300 border-t-brand-600 ${sizes[size]} ${className}`}
      aria-hidden="true"
    />
  );
}

export default Spinner;
