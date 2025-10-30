import React, { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 bg-green-600 text-white p-2 rounded-md sm:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖" : "☰"}
      </button>

      <aside
        className={`fixed top-0 left-0 h-full bg-green-700 text-white w-56 p-4 transition-transform duration-300 z-40 
          ${open ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 text-center">Page Content</h2>

        <nav className="space-y-4 text-lg">
          <button
            onClick={() => scrollToSection("hero")}
            className="block w-full text-left hover:text-green-200"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("kpis")}
            className="block w-full text-left hover:text-green-200"
          >
            Live Stats
          </button>
          <button
            onClick={() => scrollToSection("why")}
            className="block w-full text-left hover:text-green-200"
          >
            Why Action
          </button>
          <button
            onClick={() => scrollToSection("pledge-form")}
            className="block w-full text-left hover:text-green-200"
          >
            Take Pledge
          </button>
          <button
            onClick={() => scrollToSection("wall")}
            className="block w-full text-left hover:text-green-200"
          >
            Pledge Wall
          </button>
        </nav>

        <footer className="absolute bottom-4 left-0 w-full text-center text-xs text-green-200">
          © 2025 Climate Action
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
