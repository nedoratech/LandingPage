export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-base font-bold text-black">
      {children}
      {required ? <span className="text-neutral-500"> *</span> : null}
    </label>
  );
}
