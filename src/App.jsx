import React from "react";
import SimpleForm from "./components/SimpleForm";

export default function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6">UI Automation Demo</h1>
        <p className="text-muted mb-0">
          A compact playground for Playwright tests
        </p>
      </header>

      <SimpleForm />

      <footer className="mt-5 pt-4 border-top text-center text-muted">
        Built with React + Vite + Bootstrap.
      </footer>
    </div>
  );
}
