import { ref, set, get, push, update, remove, child } from 'firebase/database';
import { database } from './firebaseConfig';

// Write data to a specific path
export const writeData = (path, data) => {
  return set(ref(database, path), data);
};

// Read data from a specific path
export const readData = async (path) => {
  const snapshot = await get(ref(database, path));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return null;
  }
};

// Push data to a list
export const pushData = (path, data) => {
  return push(ref(database, path), data);
};

// Update data at a specific path
export const updateData = (path, updates) => {
  return update(ref(database, path), updates);
};

// Delete data from a specific path
export const deleteData = (path) => {
  return remove(ref(database, path));
};
