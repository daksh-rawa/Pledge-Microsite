import { useEffect, useState } from "react";
import Papa from "papaparse";

function PledgeWall() {
  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse("/pledges.csv", {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const validPledges = results.data.filter((p) => p.name);
        setPledges(validPledges);
        setLoading(false);
      },
      error: (error) => {
        console.error("CSV Parse Error:", error);
        setLoading(false);
      },
    });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading pledges...
      </div>
    );
  }
  console.log(pledges[0]);

  return (
    <section className="py-10 bg-white">
      <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
        🌿 Community Pledge Wall
      </h2>

      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {pledges.map((p, i) => (
          <div
            key={i}
            className="p-5 rounded-xl shadow-md border border-gray-200 bg-green-50 hover:bg-green-100 transition"
          >
            <h3 className="text-lg font-semibold text-green-900">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.state}</p>
            <p className="text-sm italic text-gray-500 mb-2">{p.profile}</p>

            <div className="mt-2 text-lg">
              {"❤️".repeat(Number(p.commitments) || 1)}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(p.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PledgeWall;
