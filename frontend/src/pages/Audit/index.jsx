import React from 'react'
import { FileCheck } from 'lucide-react'

function Audit() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-md p-8 text-center flex flex-col items-center">
                <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6">
                    <FileCheck className="h-10 w-10" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Audit Trail Ledger</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">
                    Immutable audit trails detailing decision rules, active model config hashes, and governance outcomes.
                </p>

                <div className="mt-8 px-4 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Status: Coming Soon
                </div>
            </div>
        </div>
    )
}

export default Audit
