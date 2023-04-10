export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="p-3 bg-slate-800 text-amber-300">
        Currently under (test) layout:
        <div>{children}</div>
      </h1>
    </>
  );
}
