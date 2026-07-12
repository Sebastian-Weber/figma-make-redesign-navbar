import NavbarC from "./NavbarC";

export default function App() {
  return (
    <div className="w-full min-h-screen" style={{ background: "#eef0f5" }}>
      <NavbarC />
      <div className="flex items-center justify-center h-[calc(100vh-68px)] text-gray-400 text-sm select-none">
        Seiteninhalt hier
      </div>
    </div>
  );
}