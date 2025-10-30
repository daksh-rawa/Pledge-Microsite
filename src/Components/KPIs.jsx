import { useEffect, useState } from "react";
import Papa from "papaparse";

function KPIs() {
  const [stats, setStats] = useState({
    totalPledges: 0,
    totalCommitments: 0,
    topState: "Loading...",
  });

  useEffect(() => {
    const loadData = async () => {
      Papa.parse("/pledges.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: (results) => {
          const data = results.data;

          if (!data || data.length === 0) return;

          const totalPledges = data.length;

          const totalCommitments = data.reduce(
            (sum, p) => sum + Number(p.commitments || 0),
            0
          );

          const stateCount = {};
          data.forEach((p) => {
            if (p.state) {
              stateCount[p.state] = (stateCount[p.state] || 0) + 1;
            }
          });

          const topState =
            Object.entries(stateCount).sort((a, b) => b[1] - a[1])[0]?.[0] ||
            "N/A";

          setStats({ totalPledges, totalCommitments, topState });
        },
        error: (err) => console.error("Error parsing CSV:", err),
      });
    };

    loadData();
  }, []);

  return (
    <section className="py-12 bg-green-50 text-center">
      <h2 className="text-3xl font-bold text-green-900 mb-10">
        🌍 Climate Impact Dashboard
      </h2>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 px-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-4xl font-bold text-green-700">
            {stats.totalPledges}
          </h3>
          <p className="text-gray-600 mt-2 text-sm">Total Pledges</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-4xl font-bold text-green-700">
            {stats.totalCommitments}
          </h3>
          <p className="text-gray-600 mt-2 text-sm">Total Commitments</p>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-2xl font-semibold text-green-800">
            {stats.topState}
          </h3>
          <p className="text-gray-600 mt-2 text-sm">Most Active State</p>
        </div>
      </div>
    </section>
  );
}

export default KPIs;