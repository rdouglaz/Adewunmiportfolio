import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight hover:text-neutral-700 transition-colors">
            Adewunmi Saliu
          </Link>
          
          <div className="flex items-center gap-10">
            <Link 
              to="/" 
              className={`text-base hover:text-neutral-900 transition-colors ${
                isActive('/') ? 'text-neutral-900 font-medium' : 'text-neutral-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`text-base hover:text-neutral-900 transition-colors ${
                isActive('/projects') ? 'text-neutral-900 font-medium' : 'text-neutral-600'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/about" 
              className={`text-base hover:text-neutral-900 transition-colors ${
                isActive('/about') ? 'text-neutral-900 font-medium' : 'text-neutral-600'
              }`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-base hover:text-neutral-900 transition-colors ${
                isActive('/contact') ? 'text-neutral-900 font-medium' : 'text-neutral-600'
              }`}
            >
              Contact
            </Link>
            <a
              href="https://demo.podsystem.ng"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-blue-600 text-white text-base font-medium hover:bg-blue-700 transition-all hover:shadow-md"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}