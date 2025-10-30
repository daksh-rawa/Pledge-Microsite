import { useState } from "react";

const PledgeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    profile: "",
    commitments: [],
  });

  const commitmentThemes = {
    "Save Energy": ["Switch off lights", "Use public transport", "Unplug devices"],
    "Reduce Waste": ["Avoid plastic", "Recycle more", "Compost at home"],
    "Green Lifestyle": ["Plant trees", "Buy local", "Use reusable items"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCommitment = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      commitments: checked
        ? [...prev.commitments, value]
        : prev.commitments.filter((c) => c !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile) {
      alert("Please fill all required fields!");
      return;
    }

    const newPledge = {
      name: form.name,
      email: form.email,
      mobile: form.mobile,
      state: form.state,
      profile: form.profile,
      commitments: form.commitments.length,
    };

    onAdd(newPledge);

    setForm({
      name: "",
      email: "",
      mobile: "",
      state: "",
      profile: "",
      commitments: [],
    });
  };

  return (
    <section id="pledge-form" className="p-8 bg-green-50 rounded-2xl my-10 shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-800">
        🌍 Take the Climate Action Pledge
      </h2>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name *"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email *"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number *"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="text"
            name="state"
            value={form.state}
            onChange={handleChange}
            placeholder="State"
            className="p-2 border rounded-md w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Profile Type:</label>
          <select
            name="profile"
            value={form.profile}
            onChange={handleChange}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Select</option>
            <option>Student</option>
            <option>Working Professional</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Commitments:</h3>
          {Object.entries(commitmentThemes).map(([theme, commitments]) => (
            <div key={theme} className="mb-2">
              <p className="font-medium text-green-700">{theme}</p>
              <div className="grid sm:grid-cols-3 gap-2 ml-2">
                {commitments.map((c) => (
                  <label key={c} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={c}
                      checked={form.commitments.includes(c)}
                      onChange={handleCommitment}
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-2">
          * Mobile Number and Email are required for validation but never shown publicly.
          Data is used only for verification and engagement.
        </p>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
        >
          Submit Pledge
        </button>
      </form>
    </section>
  );
};

export default PledgeForm;
