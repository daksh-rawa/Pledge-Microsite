import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Certificate({ latestPledge }) {
  if (!latestPledge) return null;

  const hearts = "❤️".repeat(latestPledge.commitments || 1);

  const generatePDF = async () => {
    const element = document.getElementById("certificate-content");
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.setFontSize(12);
    pdf.text(`Issued on: ${new Date().toLocaleDateString()}`, 10, pdfHeight - 10);
    pdf.save(`${latestPledge.name}-ClimatePledge.pdf`);
  };

  return (
    <section
      id="certificate"
      className="flex flex-col items-center justify-center min-h-screen py-10"
      style={{ backgroundColor: "#fdfcf9" }}
    >
      <div
        id="certificate-content"
        className="relative bg-white border border-gray-300 rounded-xl p-10 text-center shadow-md"
        style={{
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    color: "#1a1a1a",
  }}
      >
        <p className="text-sm text-gray-600 mb-1">
          Deepwoods Initiatives on Environment Trust • {new Date().getFullYear()}
        </p>

        <h1
          className="mb-3"
          style={{
            color: "#14532d",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
        >
          CERTIFICATE FOR CLIMATE PLEDGE
        </h1>

        <p className="italic text-gray-700 mb-4 text-sm">
          Proudly presenting this <span style={{ fontWeight: "600" }}>Go Green Positive</span> certificate to
        </p>

        <h2
          style={{
            color: "#166534",
            fontSize: "30px",
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          {latestPledge.name}
        </h2>

        <p className="text-gray-700 mb-4" style={{ lineHeight: "1.5", fontSize: "15px" }}>
          for their ongoing commitment to sustainability and environmental well-being through the{" "}
          <span style={{ color: "#15803d", fontWeight: "600" }}>Climate Pledge</span>.
        </p>

        <div
          className="text-3xl mb-2"
          style={{ color: "#dc2626", fontSize: "26px" }}
        >
          {hearts}
        </div>

        <p className="text-gray-600 text-sm mb-6">Level of Commitment</p>

        <p
          style={{
            color: "#14532d",
            fontWeight: "600",
            letterSpacing: "0.5px",
          }}
        >
          "Together, we make the Earth greener 🌍"
        </p>

        <div className="mt-10 flex justify-center">
          <div className="w-40 border-t-2 border-gray-400"></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Authorized Signatory</p>
      </div>

      <button
        onClick={generatePDF}
        className="mt-8 bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
      >
        Download Certificate as PDF
      </button>
    </section>
  );
}

export default Certificate;
