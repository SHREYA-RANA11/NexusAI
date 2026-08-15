import React from 'react'
import { Link } from 'react-router-dom'
import {
    Files,
    Cpu,
    AlertTriangle,
    CheckCircle2,
    Activity,
    ArrowRight,
    TrendingDown,
    TrendingUp,
    BrainCircuit
} from 'lucide-react'

function Dashboard() {
    const stats = [
        { name: 'Total Cases', value: '14,832', change: '+12%', changeType: 'increase', icon: Files, color: 'text-blue-500 bg-blue-500/10' },
        { name: 'Active Models', value: '8', change: 'Stable', changeType: 'neutral', icon: Cpu, color: 'text-indigo-500 bg-indigo-500/10' },
        { name: 'Drift Alerts', value: '2', change: '-4', changeType: 'decrease', icon: AlertTriangle, color: 'text-amber-500 bg-amber-500/10' },
        { name: 'Resolved Conflicts', value: '1,249', change: '+32.4%', changeType: 'increase', icon: CheckCircle2, color: 'text-emerald-500 bg-emerald-500/10' },
        { name: 'Healthy Models', value: '6 / 8', change: '85% Health Score', changeType: 'increase', icon: Activity, color: 'text-cyan-500 bg-cyan-500/10' },
    ]

    const recentDecisions = [
        { id: 'CASE-2026-9810', timestamp: '2026-08-15 10:34:12', payload: 'Analyze client credit score...', models: ['GPT-4', 'Claude-3', 'Llama-3'], conflict: false, resolution: 'Unanimous - Approved' },
        { id: 'CASE-2026-9809', timestamp: '2026-08-15 10:28:44', payload: 'Translate user legal terms...', models: ['GPT-4', 'Claude-3', 'Mistral-8x7B'], conflict: true, resolution: 'Reconciled via Rule #14' },
        { id: 'CASE-2026-9808', timestamp: '2026-08-15 10:21:05', payload: 'Extract entity key values...', models: ['Claude-3', 'Llama-3'], conflict: false, resolution: 'Unanimous - Entities Saved' },
        { id: 'CASE-2026-9807', timestamp: '2026-08-15 10:15:33', payload: 'Detect fraudulent IP logs...', models: ['GPT-4', 'Llama-3', 'Mistral-8x7B'], conflict: true, resolution: 'Reconciled via Consensus' },
        { id: 'CASE-2026-9806', timestamp: '2026-08-15 10:04:19', payload: 'Summarize clinical trial...', models: ['GPT-4', 'Claude-3'], conflict: false, resolution: 'Unanimous - Summarized' }
    ]

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Governance Dashboard</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time model decision orchestration overview.</p>
                </div>
                <div className="flex items-center space-x-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 shadow-sm text-sm">
                    <span className="font-medium text-slate-500">Platform Scope:</span>
                    <span className="font-semibold text-primary-500">Enterprise AI</span>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                        <div
                            key={stat.name}
                            className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.name}</span>
                                <div className={`p-2.5 rounded-xl ${stat.color} transition-transform group-hover:scale-105 duration-200`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-2xl font-bold tracking-tight">{stat.value}</span>
                                <div className="flex items-center mt-1.5 space-x-1">
                                    {stat.changeType === 'increase' && (
                                        <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                    )}
                                    {stat.changeType === 'decrease' && (
                                        <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
                                    )}
                                    <span className={`text-xs font-semibold ${stat.changeType === 'increase' ? 'text-emerald-500' :
                                            stat.changeType === 'decrease' ? 'text-rose-500' : 'text-slate-400'
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-900 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">Recent Decisions</h3>
                            <p className="text-xs text-slate-400 mt-0.5">Live streaming decisions from models proxy</p>
                        </div>
                        <Link
                            to="/decisions"
                            className="text-xs font-semibold text-primary-500 hover:text-primary-600 flex items-center space-x-1 bg-primary-500/5 hover:bg-primary-500/10 px-3 py-1.5 rounded-lg border border-primary-500/10 transition-colors"
                        >
                            <span>View All</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 font-semibold border-b border-slate-100 dark:border-slate-900">
                                    <th className="p-4 pl-6">Case ID</th>
                                    <th className="p-4">Input Prompt</th>
                                    <th className="p-4">Evaluators</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4 pr-6">Reconciliation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-900">
                                {recentDecisions.map((decision) => (
                                    <tr key={decision.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                                        <td className="p-4 pl-6 font-mono text-xs font-semibold tracking-tight text-slate-900 dark:text-slate-100">{decision.id}</td>
                                        <td className="p-4 truncate max-w-[150px] text-xs font-medium text-slate-500 dark:text-slate-400">{decision.payload}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {decision.models.map((model) => (
                                                    <span key={model} className="text-[10px] px-1.5 py-0.5 font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                                                        {model}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${decision.conflict
                                                    ? 'text-amber-600 bg-amber-500/10 border-amber-500/20'
                                                    : 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'
                                                }`}>
                                                {decision.conflict ? 'Conflict' : 'Consensus'}
                                            </span>
                                        </td>
                                        <td className="p-4 pr-6 text-xs font-semibold text-slate-700 dark:text-slate-300">{decision.resolution}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-955 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm p-6 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold text-lg">System Metrics</h3>
                            <p className="text-xs text-slate-400 mt-0.2">Compliance and operational rates</p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Deterministic Rule Sync</span>
                                    <span className="text-emerald-500">100% OK</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Drift Tolerance Buffer</span>
                                    <span className="text-amber-500">82% (Warning)</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '82%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span>Audit Trail Ledger Integrations</span>
                                    <span className="text-blue-500">96.8% Sync</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '96.8%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 p-4 rounded-xl flex items-start space-x-3">
                        <BrainCircuit className="h-8 w-8 text-primary-500 flex-shrink-0" />
                        <div>
                            <p className="text-xs font-semibold">Governance Node State</p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Node active across clusters client US, EU. Hot replicas live.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
