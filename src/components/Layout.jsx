import { useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <TopNavbar />

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 60px)", // ocupa o espaço abaixo da navbar
        }}
      >
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main
          style={{
            marginLeft: sidebarOpen ? "9vw" : "60px",
            marginTop: "50px",
            width: "88.5vw",
            flex: 1,
            padding: "20px",
            transition: "margin-left 0.3s ease",
            overflowY: "auto", // evita estourar tela
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}
