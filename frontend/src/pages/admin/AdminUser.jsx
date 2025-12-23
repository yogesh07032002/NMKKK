import React, { useEffect, useState } from "react";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE;

  const fetchUsers = async (department = "", city = "") => {
    setLoading(true);
    try {
      let url = `${API_BASE}/api/auth/get-list`;
      const query = [];

      if (department) query.push(`department=${encodeURIComponent(department)}`);
      if (city) query.push(`city=${encodeURIComponent(city)}`);

      if (query.length > 0) {
        url += "?" + query.join("&");
      }

      const response = await fetch(url);
      const data = await response.json();

      const normalizedUsers = data.data.map((user) => ({
        ...user,
        name: user.name || "-",
        email: user.email || "-",
        mobile: user.mobile || "-",
        department: user.department || "-",
        city: user.address?.city || "-",
      }));

      setUsers(normalizedUsers);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    fetchUsers(
      departmentFilter.trim().toLowerCase(),
      cityFilter.trim().toLowerCase()
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleReset = () => {
    setDepartmentFilter("");
    setCityFilter("");
    fetchUsers();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex flex-wrap gap-4 items-end">
        <h2 className="text-3xl font-bold text-gray-800 w-full">Registered Users</h2>

        <input
          type="text"
          placeholder="Search Department"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border rounded-md px-4 py-2 w-64"
        />

        <input
          type="text"
          placeholder="Search City"
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          onKeyDown={handleKeyPress}
          className="border rounded-md px-4 py-2 w-64"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>

        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading users...</div>
      ) : users.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No users found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">City</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id || index} className="border-t hover:bg-gray-50">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.mobile}</td>
                  <td className="p-4 capitalize">{user.department}</td>
                  <td className="p-4 capitalize">{user.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUser;
