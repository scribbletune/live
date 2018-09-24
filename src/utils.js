import { chord } from 'scribbletune';

export const mangle = c => {
  let arr = chord(c);
  let counterpoint = arr.pop();
  return arr.reduce((a, b) => [...a, counterpoint, b], []);
};

export const multiply = (arr, count) => {
  let finalArr = [];
  while (count > 0) {
    finalArr = [...finalArr, ...arr];
    count--;
  }
  return finalArr;
};

export const rpg8Chords = (chords, times) => {
  chords = chords || 'Gm-3 BbMsus2-3 Cm AbMsus2';
  const arr = chords.split(/\s|\,/);
  let finalArr = [];
  arr.forEach(el => {
    finalArr.push(...multiply(mangle(el), times || 12))
  });
  return finalArr;
};

export const rpg8Notes = () => {
  return [
    ...multiply(['g3', 'g4'], 8),
    ...multiply(['g3', 'a4'], 8),
    ...multiply(['f3', 'a#4'], 8),
    ...multiply(['f3', 'a4'], 8),
    ...multiply(['g3', 'g4'], 8),
    ...multiply(['g3', 'a4'], 8),
    ...multiply(['f3', 'a#4'], 8),
    ...multiply(['c3', 'c5'], 8)
  ];
};