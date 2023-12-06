import React, { useState } from 'react';
import { Note } from '../../redux/slices';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { getHighlightedText } from '../../utils/getHighlightedText';

export interface NoteProps {
  note: Note;
  editHandler: (id: number, newText: string) => void;
  removeHandler: (id: number) => void;
}

export function NoteCard(props: NoteProps) {
  const { note, editHandler, removeHandler } = props;

  const [noteText, setNoteText] = useState(note.text);
  const [editMode, setEditMode] = useState(false);

  const onSaveButtonHandler = () => {
    if (noteText.trim().length) {
      editHandler(note.id, noteText);
      setEditMode(false);
    }
  };

  const highlightedText = getHighlightedText(noteText);

  return (
    <Box
      width="600px"
      p="20px"
      display="flex"
      justifyContent="space-between"
      flexDirection="row"
      alignItems="center"
      borderRadius="8px"
      gap="10px"
      sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
    >
      {editMode ? (
        <TextField
          fullWidth
          placeholder="Put new note"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      ) : (
        <Typography>
          <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
        </Typography>
      )}

      <Stack flexDirection="row" gap="10px">
        {editMode ? (
          <Button type="button" onClick={onSaveButtonHandler}>
            Save
          </Button>
        ) : (
          <>
            <Button type="button" onClick={() => setEditMode(true)}>
              Edit
            </Button>
            <Button type="button" onClick={() => removeHandler(note.id)} color="error">
              Remove
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}
