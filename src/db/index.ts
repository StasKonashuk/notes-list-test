import { openDB } from 'idb';
import { Note, setNotes, setTags } from '../redux/slices';
import { Dispatch } from '@reduxjs/toolkit';

const DB_NAME = 'test_db';
const NOTES_STORE = 'notes';

export const initDB = async (dispatch: Dispatch) => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(NOTES_STORE, { keyPath: 'id', autoIncrement: true });
    },
  });

  const storedNotes = (await db.getAll(NOTES_STORE)) as Note[];
  dispatch(setNotes({ notes: storedNotes }));

  const storedTags = Array.from(new Set(storedNotes.flatMap((note) => note.tags || [])));
  dispatch(setTags({ tags: storedTags }));
};

export const insertData = async (storeName: string, data: any) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  const dataId = await store.add(data);

  await tx.done;

  db.close();

  return dataId;
};

export const updateData = async (storeName: string, data: any) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  await store.put(data);

  await tx.done;

  db.close();
};

export const deleteData = async (storeName: string, params: any) => {
  const db = await openDB(DB_NAME, 1);
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);

  await store.delete(params);

  await tx.done;

  db.close();
};
