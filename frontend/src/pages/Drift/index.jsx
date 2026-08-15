import { useEffect, useState } from "react";
import { getDrift } from "../../services/api";

export default function Drift() {
  const [drift, setDrift] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await getDrift();
      setDrift(res.data || []);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h1 className="text-2xl font-bold mb-6">
        Drift Detection
      </h1>

      {drift.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          ✅ No model drift detected.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Case</th>
              <th className="p-3 text-left">Drift</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>

          <tbody>
            {drift.map((item) => (
              <tr key={item._id}>
                <td className="p-3">{item.caseId}</td>
                <td className="p-3">
                  {item.driftDetected ? "Yes" : "No"}
                </td>
                <td className="p-3">
                  {item.jsDivergence}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}