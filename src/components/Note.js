import React, { useCallback } from 'react';

const Note = ({ pattern, setPattern }) => {
  // Pattern: "avoid binding arrow functions in render"
  const onClickHandler = useCallback(() => setPattern(pattern === '-' ? 'x' : '-'), [pattern, setPattern]);

  // Pattern: "avoid binding arrow functions in render"
  const handleKeyDown = useCallback(
    (evt) => {
      const { key } = evt;
      switch (key) {
        case ' ':
          setPattern(pattern === '-' ? 'x' : '-');
          break;

        case 'Backspace':
        case 'Delete':
          setPattern('-');
          break;

        case 'r':
        case 'R':
        case 'Enter':
          setPattern('R');
          break;

        // TODO: Implement keyboard navigation (at upper component?)

        default:
          break;
      }
    },
    [pattern, setPattern]
  );

  const cls = pattern === '-' ? 'note-off' : 'note-on';
  const comp = (
    <div onKeyDown={handleKeyDown} onClick={onClickHandler} role="button" tabIndex={0} className={`note-cell ${cls}`} />
  );
  return comp;
};

export default Note;
