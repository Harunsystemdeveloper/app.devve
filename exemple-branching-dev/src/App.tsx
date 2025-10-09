import { useLocation, Outlet } from 'react-router-dom';
import Header from "./partials/Header";
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';

const showBootstrapBreakpoints = true;

export default function App() {
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* Här renderas Home, Start, CreatePost, EditPost, NotFound */}
      </main>
      <Footer />
      {showBootstrapBreakpoints && <BootstrapBreakpoints />}
    </>
  );
}


