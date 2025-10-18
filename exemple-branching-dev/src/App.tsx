import React from "react";
import { AuthProvider } from "./Hooks/useAuth";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import RoutesFile from "./routes";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Header />
      <main className="container my-4">
        <RoutesFile />
      </main>
      <Footer />
    </AuthProvider>
  );
};

export default App;



