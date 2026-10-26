
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  History,
  Settings,
  LogOut,
  Menu,
  Search,
  Bell,
  ShieldCheck,
} from 'lucide-react'

function AdminNavbar({ children }) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Visitors', path: '/admin/visitors', icon: Users },
    { name: 'Visit Requests', path: '/admin/requests', icon: ClipboardList },
    { name: 'Visit History', path: '/admin/history', icon: History },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ]

  function toggleSidebar() {
    if (window.innerWidth < 1024) {
      setSidebarOpen((previous) => !previous)
    } else {
      setSidebarCollapsed((previous) => !previous)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main horizontal navbar */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-white px-4 sm:px-6">
        {/* Clickable logo: returns to login */}
        <button
          type="button"
          onClick={() => navigate('/login')}
          aria-label="Go to login page"
          className="flex items-center gap-3 text-left"
        >
          <div className="rounded-lg bg-blue-600 p-2 text-white">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h1 className="font-bold text-gray-900">VisitorMS</h1>
            <p className="text-xs text-gray-500">Admin Portal</p>
          </div>
        </button>

        {/* Search */}
        <div className="mx-6 hidden w-full max-w-sm items-center rounded-lg border border-gray-200 px-3 md:flex">
          <Search size={18} className="text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="w-full bg-transparent px-2 py-2 text-sm outline-none"
          />
        </div>

        {/* Notifications and profile */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100"
          >
            <Bell size={20} />
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            A
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex flex-col bg-slate-950 text-slate-300 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <nav className="flex-1 space-y-2 overflow-x-hidden overflow-y-auto px-3 py-6">
          {!sidebarCollapsed && (
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin/dashboard'}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.name : undefined}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    sidebarCollapsed ? 'lg:justify-center' : ''
                  } ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon size={20} className="shrink-0" />
                <span className={sidebarCollapsed ? 'lg:hidden' : ''}>
                  {item.name}
                </span>
              </NavLink>
            )
          })}
        </nav>

        {/* Admin profile and logout */}
        <div className="border-t border-white/10 p-3">
          {!sidebarCollapsed && (
            <div className="mb-3 rounded-xl bg-white/5 p-3">
              <p className="text-sm font-semibold text-white">
                Administrator
              </p>
              <p className="text-xs text-slate-400">System Admin</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title={sidebarCollapsed ? 'Logout' : undefined}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-400 transition hover:bg-red-500/10 ${
              sidebarCollapsed ? 'lg:justify-center' : ''
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            <span className={sidebarCollapsed ? 'lg:hidden' : ''}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main dashboard area */}
      <main
        className={`min-h-screen pt-16 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Three-line menu button; no extra horizontal border */}
        <div className="sticky top-16 z-30 flex h-12 items-center bg-gray-50 px-4">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            title="Open or collapse sidebar"
            className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
          >
            <Menu size={23} />
          </button>
        </div>

        {/* Dashboard content from Dashboard.jsx */}
        {children}
      </main>
    </div>
  )
}

export default AdminNavbar
