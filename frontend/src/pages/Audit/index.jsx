import { useEffect, useState } from "react";
import { getAudit } from "../../services/api";

export default function Audit() {
  const [audit, setAudit] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getAudit("CASE-001");
    setAudit(res.data);
  }

  if (!audit) return <h2>Loading...</h2>;

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Audit Trail
      </h1>

      <div className="space-y-4">

        <div>
          <strong>Case:</strong> {audit.caseId}
        </div>

        <div>
          <strong>Winning Model:</strong> {audit.winningModel}
        </div>

        <div>
          <strong>Decision:</strong> {audit.finalDecision}
        </div>

        <div>
          <strong>Resolution:</strong> {audit.resolutionLogic}
        </div>

        <div>
          <strong>Audit Version:</strong> {audit.auditVersion}
        </div>

      </div>

    </div>
  );
}