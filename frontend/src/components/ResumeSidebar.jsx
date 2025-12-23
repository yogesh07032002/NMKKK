import { Menu } from "lucide-react";

export default function ResumeSidebar({ steps, step, collapsed, setCollapsed, setStep }) {
  return (
    <aside
      className={`
        bg-white shadow-xl transition-all duration-300
        md:sticky md:top-0
        min-h-screen
        ${collapsed ? "md:w-20 w-full" : "md:w-64 w-full"}
      `}
    >
      {/* Toggle Button */}
      <button
        className="p-4 text-gray-600 hover:text-black"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu size={22} />
      </button>

      {/* Navigation Buttons */}
      <nav className="mt-4 flex flex-col gap-2 pb-10">
        {steps.map((item, index) => (
          <button
            key={index}
            onClick={() => setStep(index + 1)}
            className={`
              flex items-center gap-4 px-5 py-3 transition-all
              hover:bg-blue-50
              ${step === index + 1 ? "bg-blue-100 text-blue-600" : ""}
            `}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
