import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import {
    LayoutDashboard,
    Boxes,
    Activity,
    FileCheck,
    History,
    Menu,
    X,
    Sun,
    Moon,
    ShieldCheck,
    User
} from 'lucide-react'

function Layout() {
    const { theme, toggleTheme } = useTheme()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const location = useLocation()

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Decisions', href: '/decisions', icon: Boxes },
        { name: 'Drift Detection', href: '/drift', icon: Activity },
        { name: 'Audit Trail', href: '/audit', icon: FileCheck },
        { name: 'History', href: '/history', icon: History },
    ]

    const isActive = (path) => {
        if (path === '/history') {
            return location.pathname.startsWith('/history')
        }
        if (path === '/audit') {
            return location.pathname.startsWith('/audit')
        }
        return location.pathname === path
    }

    return (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200">

            <aside className="hidden md:flex md:w-64 md:flex-col fixed md:inset-y-0 z-20 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
                <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800 space-x-2">
                    <ShieldCheck className="h-8 w-8 text-primary-500" />
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">
                        NexusAI
                    </span>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href)
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 group ${active
                                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-200'
                                    }`}
                            >
                                <Icon className={`mr-3 h-5 w-5 ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                            <User className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold">Enterprise Gov</p>
                            <p className="text-[10px] text-slate-400">admin@nexusai.io</p>
                        </div>
                    </div>
                </div>
            </aside>

            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    <aside className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 z-50 p-4">
                        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
                            <div className="flex items-center space-x-2">
                                <ShieldCheck className="h-8 w-8 text-primary-500" />
                                <span className="font-bold text-xl bg-gradient-to-r from-primary-500 to-indigo-500 bg-clip-text text-transparent">NexusAI</span>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <nav className="flex-1 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all group ${active
                                                ? 'bg-primary-500 text-white shadow-md'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                                            }`}
                                    >
                                        <Icon className="mr-3 h-5 w-5" />
                                        {item.name}
                                    </Link>
                                )
                            })}
                        </nav>
                        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-3">
                            <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                <User className="h-5 w-5 text-slate-500" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold">Enterprise Gov</p>
                                <p className="text-[10px] text-slate-400">admin@nexusai.io</p>
                            </div>
                        </div>
                    </aside>
                </div>
            )}

            <div className="flex-1 flex flex-col md:pl-64">

                <header className="h-16 flex items-center justify-between px-4 sm:px-6 md:px-8 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-905"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                        <h1 className="ml-2 md:ml-0 text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100 hidden sm:block">
                            AI Decision Governance Portal
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-600" />}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

                        <div className="flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/30 px-3 py-1 rounded-full">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Governance Engine Active</span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}

export default Layout
