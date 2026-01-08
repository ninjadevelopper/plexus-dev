
import React, { useState, useRef, useEffect } from 'react';
import { 
  Home, 
  MessageSquare, 
  Layers, 
  Compass, 
  Search, 
  Plus, 
  Bell, 
  Menu,
  X,
  Share2,
  User as UserIcon,
  ChevronDown,
  Settings,
  LogIn,
  LogOut
} from 'lucide-react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: View;
  onViewChange: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const newDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isAuthView = activeView === 'auth';
  // Mock de estado logado (como o layout já exibe o nome do usuário, assumimos true para esta demonstração)
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navItems: { id: View; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'notifications', label: 'Notificações', icon: <Bell size={18} /> },
    { id: 'discussions', label: 'Discussões', icon: <MessageSquare size={18} /> },
    { id: 'projects', label: 'Projetos', icon: <Layers size={18} /> },
    { id: 'explore', label: 'Explorar', icon: <Compass size={18} /> },
  ];

  const handleNavClick = (view: View) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
    setIsNewDropdownOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    onViewChange('home');
    // Em um app real, aqui limparíamos tokens, localStorage, etc.
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (newDropdownRef.current && !newDropdownRef.current.contains(target)) {
        setIsNewDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="bg-gh-header border-b border-gh-border px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isAuthView && (
            <button 
              className="lg:hidden p-1 hover:bg-gh-hover rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-gh-blue rounded-lg p-1">
              <Share2 size={24} className="text-gh-bg" />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:inline">Plexus</span>
          </div>
        </div>

        <div className="flex-1 max-w-2xl px-4 hidden md:block">
          {!isAuthView && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gh-muted" size={16} />
              <input 
                type="text" 
                placeholder="Pesquisar ideias ou projetos..." 
                className="w-full bg-gh-bg border border-gh-border rounded-md pl-10 pr-4 py-1.5 focus:outline-none focus:border-gh-blue text-sm transition-colors"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* New Button with Dropdown - Hidden in Auth View */}
          {!isAuthView && (
            <div className="relative" ref={newDropdownRef}>
              <button 
                onClick={() => setIsNewDropdownOpen(!isNewDropdownOpen)}
                className="p-1.5 hover:bg-gh-hover rounded-md border border-gh-border flex items-center gap-1 text-sm font-medium transition-colors"
              >
                <Plus size={16} /> 
                <span className="hidden sm:inline">New</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isNewDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isNewDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gh-card border border-gh-border rounded-md shadow-xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                  <div className="py-1">
                    <button 
                      onClick={() => handleNavClick('discussions')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gh-text hover:bg-gh-blue hover:text-white transition-colors"
                    >
                      <MessageSquare size={14} />
                      Nova Discussão
                    </button>
                    <button 
                      onClick={() => handleNavClick('projects')}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gh-text hover:bg-gh-blue hover:text-white transition-colors"
                    >
                      <Layers size={14} />
                      Novo Projeto
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isAuthView && (
            <button 
              onClick={() => handleNavClick('notifications')}
              className={`p-2 hover:bg-gh-hover rounded-md border border-gh-border relative ${activeView === 'notifications' ? 'bg-gh-hover text-gh-blue' : ''}`}
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-gh-header"></span>
            </button>
          )}
          
          {/* User Menu with Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`w-8 h-8 rounded-full overflow-hidden border transition-all ${isUserMenuOpen || activeView === 'profile' ? 'border-gh-blue ring-2 ring-gh-blue/20' : 'border-gh-border'}`}
            >
              <img src="https://picsum.photos/seed/user1/100/100" alt="Avatar" className="w-full h-full object-cover" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-gh-card border border-gh-border rounded-md shadow-xl z-[60] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-gh-border bg-gh-header/50">
                  <p className="text-xs text-gh-muted">Logado como</p>
                  <p className="text-sm font-bold text-white truncate">alex_souza</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => handleNavClick('profile')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gh-text hover:bg-gh-blue hover:text-white transition-colors"
                  >
                    <UserIcon size={16} />
                    Perfil
                  </button>
                  <button 
                    onClick={() => handleNavClick('settings')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gh-text hover:bg-gh-blue hover:text-white transition-colors"
                  >
                    <Settings size={16} />
                    Configurações
                  </button>
                  <div className="h-px bg-gh-border my-1"></div>
                  <button 
                    onClick={() => handleNavClick('auth')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gh-text hover:bg-gh-blue hover:text-white transition-colors"
                  >
                    <LogIn size={16} />
                    Login / Cadastro
                  </button>
                  {isLoggedIn && (
                    <>
                      <div className="h-px bg-gh-border my-1"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 font-semibold hover:bg-red-500 hover:text-white transition-all"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar - Hidden in Auth View */}
        {!isAuthView && (
          <aside className="hidden lg:flex flex-col w-64 border-r border-gh-border bg-gh-bg p-4 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    activeView === item.id 
                    ? 'bg-gh-hover font-semibold text-white border-l-2 border-gh-blue' 
                    : 'text-gh-text hover:bg-gh-hover'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeView === 'profile' 
                  ? 'bg-gh-hover font-semibold text-white border-l-2 border-gh-blue' 
                  : 'text-gh-text hover:bg-gh-hover'
                }`}
              >
                <UserIcon size={18} />
                Meu Perfil
              </button>
            </nav>

            <div className="mt-8">
              <h3 className="text-xs font-semibold text-gh-muted uppercase tracking-wider px-3 mb-2">Principais Projetos</h3>
              <ul className="space-y-1">
                {['Design System', 'AI Researcher', 'Community Hub'].map(p => (
                  <li key={p}>
                    <a href="#" className="block px-3 py-1 text-xs text-gh-text hover:text-gh-blue transition-colors">
                      plexus/{p.toLowerCase().replace(' ', '-')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Mobile Navigation Sidebar - Hidden in Auth View */}
        {!isAuthView && isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <aside className="absolute top-0 left-0 w-3/4 max-w-xs h-full bg-gh-bg border-r border-gh-border p-4 flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={20} /></button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-base ${
                      activeView === item.id ? 'bg-gh-hover font-bold text-white' : 'text-gh-text hover:bg-gh-hover'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-base ${
                    activeView === 'profile' ? 'bg-gh-hover font-bold text-white' : 'text-gh-text hover:bg-gh-hover'
                  }`}
                >
                  <UserIcon size={18} />
                  Meu Perfil
                </button>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className={`flex-1 bg-gh-bg p-4 lg:p-8 overflow-x-hidden ${isAuthView ? 'flex items-center justify-center' : ''}`}>
          <div className={`${isAuthView ? 'w-full' : 'max-w-6xl mx-auto'}`}>
            {children}
          </div>
        </main>
      </div>

      <footer className="bg-gh-bg border-t border-gh-border py-8 px-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gh-muted text-xs gap-4">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-gh-blue" />
            <span>© 2024 Plexus, Inc.</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button onClick={() => handleNavClick('terms')} className="hover:text-gh-blue transition-colors">Termos</button>
            <button onClick={() => handleNavClick('privacy')} className="hover:text-gh-blue transition-colors">Privacidade</button>
            <button onClick={() => handleNavClick('docs')} className="hover:text-gh-blue transition-colors">Docs</button>
            <button onClick={() => handleNavClick('contact')} className="hover:text-gh-blue transition-colors">Contato</button>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
