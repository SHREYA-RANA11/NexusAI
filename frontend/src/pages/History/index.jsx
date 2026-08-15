import { useEffect, useState } from "react";
import { getHistory } from "../../services/api";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getHistory("CASE-001");
    setHistory(res.data);
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold mb-6">
        Decision History
      </h1>

      <table className="w-full">

        <thead>

          <tr className="border-b">
            <th className="p-3 text-left">Model</th>
            <th className="p-3 text-left">Decision</th>
            <th className="p-3 text-left">Confidence</th>
          </tr>

        </thead>

        <tbody>

          {history.map((item) => (

            <tr key={item._id}>

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