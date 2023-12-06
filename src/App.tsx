import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NoteCard } from './components';
import { deleteData, initDB, insertData, updateData } from './db';
import { Stack, Typography, TextField, Button, Chip } from '@mui/material';
import { addNote, removeNote, editNote, setTags, Note } from './redux/slices';
import { useAppSelector } from './hooks';
import { getNoteTags } from './utils';

import './App.css';

function App() {
  const [noteText, setNoteText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  const dispatch = useDispatch();

  const notes = useAppSelector((store) => store.notesReducer).notes;
  const tags = useAppSelector((store) => store.tagsReducer).tags;

  useEffect(() => {
    initDB(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const filteredNotes =
      selectedTags.length > 0
        ? notes.filter(
            (note) => note.tags.length && selectedTags.every((tag) => note.tags.includes(tag)),
          )
        : notes;

    setFilteredNotes(filteredNotes);

    const tags = notes.reduce<string[]>((acc, note) => {
      note.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, []);

    dispatch(setTags({ tags }));
  }, [selectedTags, notes, dispatch]);

  const removeHandler = async (id: number) => {
    dispatch(removeNote({ id }));

    const tagsList = new Set(tags);

    const tagsToRemove = notes.find((n) => n.id === id)?.tags;

    tagsToRemove?.forEach((t) => {
      tagsList.delete(t);
    });

    await deleteData('notes', id);
  };

  const editHandler = async (id: number, newText: string) => {
    const noteTags = getNoteTags(newText);

    const updatedNote = {
      id,
      text: newText,
      tags: noteTags,
    };

    dispatch(editNote(updatedNote));

    await updateData('notes', updatedNote);
  };

  const note = filteredNotes.map((n) => {
    return <NoteCard key={n.id} note={n} removeHandler={removeHandler} editHandler={editHandler} />;
  });

  const addNoteHandler = async () => {
    if (noteText.trim().length) {
      const noteTags = getNoteTags(noteText);

      const newNote = {
        id: new Date().getTime(),
        text: noteText,
        tags: noteTags,
      };

      dispatch(addNote(newNote));

      await insertData('notes', newNote);

      setNoteText('');
    }
  };

  const choseTagHandler = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  const tag = tags.map((t) => {
    return (
      <Chip
        key={t}
        label={t}
        variant={selectedTags.includes(t) ? 'filled' : 'outlined'}
        onClick={() => choseTagHandler(t)}
      />
    );
  });

  return (
    <Stack minWidth="100%" paddingTop="150px" paddingBottom="150px" gap="20px" alignItems="center">
      <Typography variant="h3" component="h3">
        Notes List
      </Typography>
      <Stack direction="row" gap="20px" justifyContent="space-between" width="600px">
        <TextField
          fullWidth
          placeholder="Put new note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <Button variant="contained" onClick={addNoteHandler}>
          Add
        </Button>
      </Stack>

      {tags.length > 0 && (
        <Stack direction="row" gap="5px">
          {tag}
        </Stack>
      )}

      {filteredNotes.length ? (
        <Stack gap="10px" width="100%" alignItems="center">
          {note}
        </Stack>
      ) : (
        <Stack>
          <Typography variant="h5" component="h5">
            No results
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

export default App;
