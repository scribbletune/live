import { progression, arp, clip, midi } from 'scribbletune';

Tone.Transport.start();

let theClip;

const getClipNotes = (state) => {
  const theScale = state.keys[state.selectedKeyIdx] + '4 ' + state.scales[state.selectedScaleIdx];
  const theChordProgression = state.arpClipSelectedChord.map(el => state.arpChordProgression[el]);
  const theChords = progression.getChords(
    theScale,
    theChordProgression.join(' ')
  );

  return arp({
    chords: theChords,
    count: state.arpLengthOptions[state.selectedArpLengthOptionIdx],
    order: state.arpNotesOrderOptions[state.selectedArpNotesOrderOptionsIdx]
  });
};

export const playClip = (state) => {
  theClip = clip({
    synth: 'Synth',
    pattern: 'x',
    notes: getClipNotes(state),
    subdiv: '16n'
  });
  theClip.start();
}

export const stopClip = () => {
  theClip.stop();
};

export const getProgression = scale => progression.get(scale);

export const saveMidiFile = (state) => {
  const theNotes = getClipNotes(state);
  const c = clip({
    notes: theNotes,
    pattern: 'x'.repeat(theNotes.length),
    subdiv: '16n'
  });
  const b64 = btoa(midi(c, null)); // Encode byte string from Scribbletune as base64
  const uri = 'data:audio/midi;base64,' + b64;
  const link=document.createElement('a');
  link.href=uri;
  link.download = 'arp.mid';
  link.click();
};