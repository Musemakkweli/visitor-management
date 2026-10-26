
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  House,
  CalendarPlus,
  ClipboardList,
  UserRound,
  Menu,
  X,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react'

function VisitorNavbar({ children }) {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  const navItems = [
    { name: 'Home', path: '/visitor/dashboard', icon: House },
    { name: 'Request a Visit', path: '/visitor/request', icon: CalendarPlus },
    { name: 'My Requests', path: '/visitor/requests', icon: ClipboardList },
    { name: 'My Profile', path: '/visitor/profile', icon: UserRound },
  ]

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-4 shadow-sm sm:px-6">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="flex items-center gap-3"
          aria-label="Return to login"
        >
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <ShieldCheck size={22} />
          </div>
          <div className="text-left">
            <h1 className="font-bold text-gray-900">VisitorMS</h1>
            <p className="text-xs text-gray-500">Visitor Portal</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800">Visitor</p>
            <p className="text-xs text-gray-500">My account</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            V
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 sm:flex"
          >
            <LogOut size={17} />
            Logout
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex flex-col bg-slate-950 text-slate-300 transition-all duration-300
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 pb-2 pt-6">
          {!collapsed && (
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Visitor Menu
            </p>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white lg:block"
          >
            {collapsed ? <PanelLeftOpen size={19} /> : <PanelLeftClose size={19} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/visitor/home'}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    collapsed ? 'lg:justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className={collapsed ? 'lg:hidden' : ''}>
                  {item.name}
                </span>
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 hover:bg-red-500/10 ${
              collapsed ? 'lg:justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={collapsed ? 'lg:hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      <main
        className={`min-h-screen pt-16 transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <div className="flex h-12 items-center px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle sidebar"
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-200 lg:hidden"
          >
            <Menu size={22} />
          </button>
        </div>

        <div className="px-4 pb-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}

export default VisitorNavbar
