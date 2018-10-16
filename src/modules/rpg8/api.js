import { progression, arp, clip } from 'scribbletune';

Tone.Transport.start();

let theClip;

export const playClip = state => {
  const theScale = state.keys[state.selectedKeyIdx] + '4 ' + state.scales[state.selectedScaleIdx];
  const theChordProgression = state.arpClipSelectedChord.map(el => state.arpChordProgression[el]);
  const theChords = progression.getChords(
    theScale,
    theChordProgression.join(' ')
  );

  const theNotes = arp({
    chords: theChords,
    count: state.arpLengthOptions[state.selectedArpLengthOptionIdx],
    order: state.arpNotesOrderOptions[state.selectedArpNotesOrderOptionsIdx]
  });

  theClip = clip({
    synth: 'Synth',
    pattern: 'x',
    notes: theNotes,
    subdiv: '16n'
  });
  theClip.start();
}

export const stopClip = () => {
  theClip.stop();
};

export const getProgression = scale => progression.get(scale);