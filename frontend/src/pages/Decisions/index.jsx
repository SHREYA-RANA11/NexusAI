import { useEffect, useState } from "react";
import { getDecisions } from "../../services/api";

export default function Decisions() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDecisions();
  }, []);

  async function loadDecisions() {
    try {
      const res = await getDecisions();
      setDecisions(res.data.items);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2 className="text-xl">Loading...</h2>;
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        AI Decisions
      </h1>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left p-3">Case</th>
            <th className="text-left p-3">Input</th>
            <th className="text-left p-3">Model</th>
            <th className="text-left p-3">Decision</th>
            <th className="text-left p-3">Confidence</th>

          </tr>

        </thead>

        <tbody>

          {decisions.map((item) => (

            <tr key={item._id} className="border-b">

              <td className="p-3">{item.caseId}</td>

              <td className="p-3">
                {item.inputText}
              </td>

              <td className="p-3">
                {item.modelName}
              </td>

              <td className="p-3">
                {item.decision}
              </td>

              <td className="p-3">
                {(item.confidence * 100).toFixed(1)}%
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}