import React from 'react'
import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-250 dark:border-slate-800 shadow-xl p-8 max-w-md w-full text-center flex flex-col items-center animate-fade-in">
                <div className="p-4 rounded-full bg-rose-500/10 text-rose-500 mb-4 animate-bounce">
                    <Compass className="h-10 w-10" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">404</h1>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mt-2">Page Not Found</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    The requested resource does not exist or may have been archived.
                </p>
                <Link
                    to="/dashboard"
                    className="mt-6 px-5 py-2.5 bg-primary-500 text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors shadow-md shadow-primary-500/20"
                >
                    Return to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default NotFound
