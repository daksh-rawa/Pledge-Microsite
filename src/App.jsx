import { useState,useEffect } from 'react'

import './App.css'
import PledgeForm from './Components/PledgeForm'
import PledgeWall from './Components/PledgeWall'
import Hero from './Components/HeroSection'
import KPIs from './Components/KPIs'
import Motivaiton from './Components/Motivation'
import Certificate from './Components/Certificate'
import Sidebar from './Components/Sidebar'

function App() {

  const [pledges, setPledges] = useState([]);
  const [latestPledge, setLatestPledge] = useState(null);

  const GOOGLE_SHEET_URL = "  https://script.google.com/macros/s/AKfycbwAPoCb6TB77VneQ3AxlzEvWH1zknJqVVOjfSS0oaUOCxEa2SK4CzV6WLLjlW2to7hF/exec";

  useEffect(() => {
    fetch(GOOGLE_SHEET_URL)
      .then((res) => res.json())
      .then((data) => {
        setPledges(data);
      })
      .catch((err) => console.error("Error fetching Google Sheet data:", err));
  }, []);

  const addPledge = (newPledge) => {
    const newEntry = {
      id: Date.now(),
      ...newPledge,
      date: new Date().toISOString().split("T")[0],
    };

    setPledges((prev) => [...prev, newEntry]);
    setLatestPledge(newEntry);

    // Save new pledge to Google Sheets
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: JSON.stringify(newEntry),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => console.log("Saved:", result))
      .catch((err) => console.error("Error saving to sheet:", err));
  };

    return (
    <div className="flex bg-green-50 text-gray-800">
      <Sidebar />
      <main className="flex-1 sm:ml-56 p-4">
        <Hero />
        <KPIs />
        {/* <WhyAction /> */}
        <Motivaiton />
        <PledgeForm onAdd={addPledge} />
        <Certificate latestPledge={latestPledge} />
        <PledgeWall />
      </main>
    </div>
  )
}

export default App
