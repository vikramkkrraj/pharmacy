import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { pushData } from '../firebase/firebaseFunctions';
import { useAuth } from '../context/AuthProvider';
import PrescriptionList from './PrescriptionList';

const storage = getStorage();

const PrescriptionUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setMessage('Only JPG, PNG, or PDF files are allowed.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size should be less than 5MB.');
      return;
    }

    setMessage('');
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    setUploading(true);
    const storageRef = ref(storage, `prescriptions/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Upload error:', error);
        setMessage('Failed to upload.');
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await pushData('/prescriptions', {
          userId: user.uid,
          fileName: file.name,
          fileUrl: downloadURL,
          uploadedAt: new Date().toISOString(),
        });
        setMessage('Prescription uploaded successfully!');
        setFile(null);
        setPreviewUrl(null);
        setUploadProgress(0);
        setUploading(false);
      }
    );
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-10">
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Upload Your Prescription</h2>

        <div
          className="w-full border-2 border-dashed border-blue-400 rounded p-4 text-center cursor-pointer hover:bg-blue-50"
          onClick={() => document.getElementById('fileInput').click()}
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Drag and drop your prescription here or click to select</p>
          )}
        </div>

        <input
          id="fileInput"
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {message && <p className="mt-2 text-sm text-red-600">{message}</p>}

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-1">Preview:</p>
            <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-contain border rounded" />
          </div>
        )}

        {uploading && (
          <div className="w-full bg-gray-200 rounded h-2 mt-4">
            <div
              className="bg-green-500 h-2 rounded"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Prescription'}
        </button>
      </div>
      <PrescriptionList />
    </div>
  );
};

export default PrescriptionUpload;