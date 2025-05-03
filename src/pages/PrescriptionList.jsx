import React, { useEffect, useState } from 'react';
import { readData, deleteData } from '../firebase/firebaseFunctions';
import { useAuth } from '../context/AuthProvider';

const PrescriptionList = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState([]);

  const fetchPrescriptions = async () => {
    const data = await readData('/prescriptions');
    if (data && user) {
      const filtered = Object.entries(data)
        .map(([id, values]) => ({ id, ...values }))
        .filter((item) => item.userId === user.uid);
      setPrescriptions(filtered);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this prescription?')) {
      await deleteData(`/prescriptions/${id}`);
      fetchPrescriptions();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h3 className="text-xl font-bold text-blue-700 mb-4">My Uploaded Prescriptions</h3>
      {prescriptions.length === 0 ? (
        <p>No prescriptions uploaded yet.</p>
      ) : (
        <div className="grid gap-4">
          {prescriptions.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <p className="font-medium mb-2">{item.fileName}</p>
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View File
              </a>
              <p className="text-sm text-gray-500 mt-1">
                Uploaded at: {new Date(item.uploadedAt).toLocaleString()}
              </p>
              <button
                onClick={() => handleDelete(item.id)}
                className="mt-2 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;
