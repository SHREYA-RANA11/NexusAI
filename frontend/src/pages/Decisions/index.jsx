import React from 'react'
import { Boxes } from 'lucide-react'

function Decisions() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-md p-8 text-center flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-primary-500/10 text-primary-500 mb-6">
                    <Boxes className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">AI Decisions Management</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">
                    Model execution output matching, rule-based reconciliation, and outcome reporting modules.
                </p>

                <div className="mt-8 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Status: Coming Soon
                </div>
            </div>
        </div>
    )
}

export default Decisions
