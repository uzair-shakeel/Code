import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase/firebase";

const DataViewer = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reference to the leads node in the database
    const leadsRef = ref(database, "leads");

    // Listen for changes to the leads data
    const unsubscribe = onValue(
      leadsRef,
      (snapshot) => {
        setLoading(true);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert object of objects to array of objects with ID
          const leadsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setLeads(leadsArray);
          console.log("Fetched leads:", leadsArray);
        } else {
          console.log("No leads data available");
          setLeads([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching leads:", error);
        setError("Error fetching data: " + error.message);
        setLoading(false);
      }
    );

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Loading data...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] text-white py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Form Submissions</h1>

        {leads.length === 0 ? (
          <p>No submissions found in the database.</p>
        ) : (
          <>
            <p className="mb-4">Found {leads.length} submissions:</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#1A1A1A]">
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      Email
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      Phone
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      ZIP
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      First Time Buyer
                    </th>
                    <th className="border border-gray-700 px-4 py-2 text-left">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#1A1A1A]">
                      <td className="border border-gray-700 px-4 py-2">
                        {lead.fullName}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {lead.email}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {lead.phone}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {lead.zipCode}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {lead.firstTimeBuyer === true
                          ? "Yes"
                          : lead.firstTimeBuyer === false
                          ? "No"
                          : "N/A"}
                      </td>
                      <td className="border border-gray-700 px-4 py-2">
                        {new Date(lead.submissionDate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataViewer;
