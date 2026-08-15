import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Files,
    Cpu,
    AlertTriangle,
    CheckCircle2,
    Activity,
    ArrowRight,
    TrendingDown,
    TrendingUp,
    BrainCircuit,
} from "lucide-react";

import { getDecisions, getDrift } from "../../services/api";

function Dashboard() {
    const [stats, setStats] = useState([]);
    const [recentDecisions, setRecentDecisions] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
  try {
    const decisionResponse = await getDecisions();
    const driftResponse = await getDrift();

    const decisionData = decisionResponse.data;
    const driftData = driftResponse.data || [];

    const items = decisionData.items || [];

    setRecentDecisions(items);

    const activeModels = [...new Set(items.map((d) => d.modelName))];

    const driftAlerts = driftData.filter(
      (d) => d.driftDetected
    ).length;

    setStats([
      {
        name: "Total Cases",
        value: decisionData.total,
        change: "",
        changeType: "neutral",
        icon: Files,
        color: "text-blue-500 bg-blue-500/10",
      },
      {
        name: "Active Models",
        value: activeModels.length,
        change: "",
        changeType: "neutral",
        icon: Cpu,
        color: "text-indigo-500 bg-indigo-500/10",
      },
      {
        name: "Drift Alerts",
        value: driftAlerts,
        change: "",
        changeType: "decrease",
        icon: AlertTriangle,
        color: "text-amber-500 bg-amber-500/10",
      },
      {
        name: "Resolved Conflicts",
        value: items.length,
        change: "",
        changeType: "increase",
        icon: CheckCircle2,
        color: "text-emerald-500 bg-emerald-500/10",
      },
      {
        name: "Healthy Models",
        value: activeModels.length,
        change: "Running",
        changeType: "increase",
        icon: Activity,
        color: "text-cyan-500 bg-cyan-500/10",
      },
    ]);
  } catch (err) {
    console.error("Dashboard Error:", err);
  }
};

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Governance Dashboard
                    </h2>

                    <p className="text-slate-500 mt-1">
                        Real-time NLP Decision Reconciliation Platform
                    </p>
                </div>

                <div className="bg-white border rounded-lg px-4 py-2 shadow-sm">
                    <span className="text-sm font-medium">
                        Enterprise AI Governance
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-xl border p-6 shadow-sm"
                        >
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">
                                    {stat.name}
                                </span>

                                <div className={`p-2 rounded-lg ${stat.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="mt-4">
                                <h3 className="text-2xl font-bold">
                                    {stat.value}
                                </h3>

                                <div className="flex items-center mt-2">

                                    {stat.changeType === "increase" && (
                                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                                    )}

                                    {stat.changeType === "decrease" && (
                                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                                    )}

                                    <span className="text-xs">
                                        {stat.change}
                                    </span>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 bg-white rounded-xl border shadow-sm">

                    <div className="flex justify-between items-center p-6 border-b">

                        <div>
                            <h3 className="font-bold text-lg">
                                Recent Decisions
                            </h3>

                            <p className="text-xs text-slate-500">
                                Live decision stream
                            </p>
                        </div>

                        <Link
                            to="/decisions"
                            className="text-primary-500 text-sm flex items-center"
                        >
                            View All
                            <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>

                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead>

                                <tr className="bg-slate-100">

                                    <th className="p-4 text-left">Case</th>

                                    <th className="p-4 text-left">Input</th>

                                    <th className="p-4 text-left">Model</th>

                                    <th className="p-4 text-left">Decision</th>

                                    <th className="p-4 text-left">Confidence</th>

                                </tr>

                            </thead>

                            <tbody>

                                {recentDecisions.map((decision) => (

                                    <tr key={decision._id} className="border-b">

                                        <td className="p-4 font-mono">
                                            {decision.caseId}
                                        </td>

                                        <td className="p-4 max-w-xs truncate">
                                            {decision.inputText}
                                        </td>

                                        <td className="p-4">
                                            <span className="px-2 py-1 rounded bg-slate-100 text-xs">
                                                {decision.modelName}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {decision.decision}
                                        </td>

                                        <td className="p-4">
                                            {(decision.confidence * 100).toFixed(1)}%
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="bg-white rounded-xl border shadow-sm p-6">

                    <div>

                        <h3 className="font-bold text-lg">
                            System Health
                        </h3>

                        <p className="text-xs text-slate-500">
                            Platform metrics
                        </p>

                    </div>

                    <div className="mt-6 space-y-5">

                        <div>

                            <div className="flex justify-between text-sm">

                                <span>Deterministic Engine</span>

                                <span className="text-green-500">
                                    100%
                                </span>

                            </div>

                            <div className="h-2 bg-gray-200 rounded mt-1">
                                <div
                                    className="h-2 bg-green-500 rounded"
                                    style={{ width: "100%" }}
                                />
                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between text-sm">

                                <span>Drift Monitor</span>

                                <span className="text-amber-500">
                                    Active
                                </span>

                            </div>

                            <div className="h-2 bg-gray-200 rounded mt-1">
                                <div
                                    className="h-2 bg-amber-500 rounded"
                                    style={{ width: "80%" }}
                                />
                            </div>

                        </div>

                        <div>

                            <div className="flex justify-between text-sm">

                                <span>Audit Engine</span>

                                <span className="text-blue-500">
                                    Online
                                </span>

                            </div>

                            <div className="h-2 bg-gray-200 rounded mt-1">
                                <div
                                    className="h-2 bg-blue-500 rounded"
                                    style={{ width: "95%" }}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="mt-8 border-t pt-6 flex items-start gap-3">

                        <BrainCircuit className="text-indigo-500" />

                        <div>

                            <h4 className="font-semibold">
                                Governance Engine
                            </h4>

                            <p className="text-xs text-slate-500">
                                Decision reconciliation and drift detection
                                services are running.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;