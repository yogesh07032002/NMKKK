import { useEffect, useState } from "react";
import api from "../../utils/api";

export default function AdminCenters() {
  const [centers, setCenters] = useState([]);

  // form fields
  const [district, setDistrict] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [hours, setHours] = useState("10 AM - 5 PM");
  const [mapLink, setMapLink] = useState("");

  const load = () => {
    api.get("/centers").then((res) => setCenters(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    await api.post("/centers", {
      district,
      name,
      address,
      contact,
      hours,
      mapLink,
    });

    setDistrict("");
    setName("");
    setAddress("");
    setContact("");
    setHours("10 AM - 5 PM");
    setMapLink("");

    load();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this center?")) return;
    await api.delete(`/centers/${id}`);
    load();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Manage Help Centers</h1>

      {/* ADD NEW CENTER */}
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl border">
        <h2 className="text-xl font-semibold mb-4">Add New Center</h2>

        <form onSubmit={create} className="space-y-4">
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Center Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />

          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Working Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />

          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Google Maps Link (optional)"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add Center
          </button>
        </form>
      </div>

      {/* LIST OF CENTERS */}
      <div className="bg-white p-6 rounded-xl shadow border">
        <h2 className="text-xl font-semibold mb-4">All Centers</h2>

        <div className="space-y-4">
          {centers.map((c) => (
            <div key={c._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.district}</p>
              <p className="text-sm">{c.address}</p>
              <p className="text-sm">📞 {c.contact}</p>
              <p className="text-sm text-gray-600">⏰ {c.hours}</p>

              {c.mapLink && (
                <a
                  href={c.mapLink}
                  target="_blank"
                  className="text-blue-600 text-sm underline"
                >
                  View on Google Maps →
                </a>
              )}

              <button
                onClick={() => remove(c._id)}
                className="mt-3 bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
