import { useEffect, useState } from "react";
import api from "../../utils/api"; // axios instance

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const [profilePic, setProfilePic] = useState("");
  const [fileName, setFileName] = useState("");

  // profile edit fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch Admin Profile
  useEffect(() => {
    api.get("/auth/me").then((res) => {
      setProfile(res.data);
      setName(res.data.name);
      setEmail(res.data.email);

      if (res.data.profilePic) {
        setProfilePic(res.data.profilePic);

        // extract file name from URL
        const parts = res.data.profilePic.split("/");
        setFileName(parts[parts.length - 1]);
      }

      setLoading(false);
    });
  }, []);

  // Upload Photo
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name); // show file name in UI

    const formData = new FormData();
    formData.append("photo", file);

    setUploading(true);

    try {
      const res = await api.post("/auth/admin/upload-photo", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProfilePic(res.data.profilePic);
      alert("Profile photo updated!");
    } catch (err) {
      alert("Failed to upload photo");
    }

    setUploading(false);
  };

  // Remove Photo
  const removePhoto = async () => {
    const confirmRemove = window.confirm("Remove profile picture?");
    if (!confirmRemove) return;

    try {
      await api.delete("/auth/admin/remove-photo");

      setProfilePic("");
      setFileName("");

      alert("Profile picture removed");
    } catch (err) {
      alert("Failed to remove photo");
    }
  };

  // Update Profile
  const updateProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);

    try {
      await api.put("/auth/admin/update-profile", { name, email });
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    }

    setSavingProfile(false);
  };

  // Change Password
  const changePassword = async (e) => {
    e.preventDefault();
    setSavingPassword(true);

    try {
      await api.post("/auth/admin/change-password", {
        oldPassword,
        newPassword,
      });

      alert("Password updated!");
      setOldPassword("");
      setNewPassword("");
    } catch {
      alert("Failed to change password.");
    }

    setSavingPassword(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Admin Settings</h1>

      {/* PROFILE PICTURE */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl border mb-10">
        <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>

        <div className="flex items-center gap-6">
          {/* Avatar */}
          {profilePic ? (
            <img
              src={profilePic}
              className="w-20 h-20 rounded-full object-cover border shadow"
              alt="Admin Profile"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold shadow">
              {profile?.name?.charAt(0).toUpperCase() ?? "A"}
            </div>
          )}

          <div className="space-y-3">
            <label className="block text-sm font-medium">Upload new photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={uploadPhoto}
              className="border p-2 rounded w-60"
            />

            {/* Show selected file name */}
            {fileName && (
              <p className="text-sm text-gray-600 mt-1">Selected: {fileName}</p>
            )}

            {/* Remove Button */}
            {profilePic && (
              <button
                onClick={removePhoto}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Remove Photo
              </button>
            )}

            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>
        </div>
      </div>

      {/* PROFILE INFORMATION */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl border">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>

        <form onSubmit={updateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Admin Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={savingProfile}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="bg-white p-6 rounded-xl shadow max-w-xl border">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={changePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Old Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-300"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
