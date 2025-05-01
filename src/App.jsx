import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./Pages/Home";
import PrequalificationForm from "./Pages/PrequalificationForm";
import ThankYou from "./Pages/ThankYou";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import PartnerReferral from "./Pages/PartnerReferral";
import DataViewer from "./Pages/DataViewer";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/prequalification"
              element={<PrequalificationForm />}
            />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/partners" element={<PartnerReferral />} />
            <Route path="/admin/data" element={<DataViewer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
