import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f0e8] text-[#161616]">
      <div className="text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.2em]">Dealpost</p>
        <h1 className="mb-4 text-7xl font-extrabold tracking-[-0.09em]">404</h1>
        <p className="mb-6 text-sm text-[#595750]">This page hasn&apos;t been shaped yet.</p>
        <Link to="/" className="border-b border-[#161616] pb-1 text-xs font-bold uppercase tracking-[0.1em]">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
