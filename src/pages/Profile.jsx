import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { readData, updateData } from '../firebase/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    displayName: user?.displayName || '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await readData(`/profiles/${user.uid}`);
      if (data) {
        setProfile((prev) => ({ ...prev, ...data }));
      }
    };

    const fetchOrders = async () => {
      const data = await readData('/orders');
      if (data && user) {
        const userOrders = Object.entries(data)
          .map(([id, values]) => ({ id, ...values }))
          .filter((order) => order.userId === user.uid);
        setOrderCount(userOrders.length);
      }
    };

    if (user?.uid) {
      fetchData();
      fetchOrders();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await updateData(`/profiles/${user.uid}`, profile);
    toast.success('Profile updated successfully!');
    setEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6 relative">
        <div className="absolute right-6 top-6">
          <button
            onClick={() => navigate('/order-tracking')}
            className="text-sm text-blue-600 hover:underline"
          >
            View Orders ({orderCount})
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/100'}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-2xl font-bold text-blue-800">
              {editMode ? (
                <input
                  type="text"
                  name="displayName"
                  value={profile.displayName}
                  onChange={handleChange}
                  className="px-2 py-1 border rounded"
                />
              ) : (
                profile.displayName || 'Anonymous User'
              )}
            </h2>
            <p className="text-sm text-gray-500">UID: {user?.uid}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <div className="mt-1 p-2 border rounded bg-gray-50">{user?.email}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Phone</label>
            {editMode ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            ) : (
              <div className="mt-1 p-2 border rounded bg-gray-50">{profile.phone || 'Not Provided'}</div>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600">Address</label>
            {editMode ? (
              <textarea
                name="address"
                value={profile.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            ) : (
              <div className="mt-1 p-2 border rounded bg-gray-50 min-h-[60px]">
                {profile.address || 'Not Provided'}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Joined</label>
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-500">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : 'Unknown'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <div className="mt-1 p-2 border rounded bg-gray-100 text-gray-400">•••••••• (Change in settings)</div>
          </div>
        </div>

        <div className="mt-6">
          {editMode ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;