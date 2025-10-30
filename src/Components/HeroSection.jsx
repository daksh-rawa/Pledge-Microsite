function Hero() {
  const scrollToForm = () => {
    document.getElementById("pledge-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="text-center py-16 bg-green-100 rounded-b-3xl">
      <img/>
      <h1 className="text-4xl font-bold text-green-800 mb-4">Take the Climate Action Pledge 🌎</h1>
      <p className="text-lg text-gray-600 mb-6">Small steps today can create a sustainable tomorrow.</p>
      <button
        onClick={scrollToForm}
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
      >
        Take the Pledge
      </button>
    </section>
  );
}

export default Hero;
