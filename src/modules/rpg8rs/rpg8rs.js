import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Selector from './Selector';
import { keys, scales, notesCountList, notesOrder, subdivOptions, subdivs } from './initialArpState';
import { getChordDegrees, getChordsProgressionForScale, getArpNotes } from './api';
import { updateClip } from './actions';

const Rpg8rs = ({
  idx,
  dispatch,
  defaultKeyIdx = 2,
  defaultScaleIdx = 2,
  defaultArpChordProgression = [0, 1, 0, 1, 0, 1, 0, 3],
  defaultNotesCountIdx = 1,
  defaultNotesOrderIdx = 0,
  defaultSubdivOptionsIdx = 3,
  defaultPattern = 'x-xx-xxx'
}) => {
	const [keyIdx, setKeyIdx] = useState(defaultKeyIdx);
	const [scaleIdx, setScaleIdx] = useState(defaultScaleIdx);
  const [arpChordProgression, setArpChordProgression] = useState(defaultArpChordProgression);
  const [notesCountIdx, setNotesCountIdx] = useState(defaultNotesCountIdx);
  const [notesOrderIdx, setNotesOrderIdx] = useState(defaultNotesOrderIdx);
  const [subdivOptionsIdx, setSubdivOptionsIdx] = useState(defaultSubdivOptionsIdx);
  const [pattern, setPattern] = useState(defaultPattern);

  const getTheChords = () => {
    const theScale = keys[keyIdx] + '3 ' + scales[scaleIdx];
    const chordDegrees = getChordDegrees(scales[scaleIdx]);
    const theChordProgression = arpChordProgression.map(el => chordDegrees[el]);
    return getChordsProgressionForScale(
      theScale,
      theChordProgression.join(' ')
    );
  };

  useEffect(() => {
    updateClip(dispatch, {
      clipData: {
        notes: getArpNotes({
          chords: getTheChords(),
          count: notesCountList[notesCountIdx],
          order: notesOrder[notesCountIdx][notesOrderIdx]
        }),
        pattern,
        subdiv: subdivs[subdivOptionsIdx]
      },
      clipIdx: idx
    });
  });

  const chordDegrees = getChordDegrees(scales[scaleIdx]); // [I, ii, iii, IV, V, vi, vii]
  const chordDegreeStrips = [...Array(8).keys()].map((el, idx) => {
    return (
      <Selector
        key={idx}
        data={chordDegrees}
        selectedIdx={arpChordProgression[idx]}
        onClickHandler={(i) => {
          let newArpChordProgression = [...arpChordProgression];
          newArpChordProgression[idx] = i;
          setArpChordProgression(newArpChordProgression);
        }}
      />
    );
  });

	return (<div className="col">
		<Selector
      title="Key"
      data={keys}
      selectedIdx={keyIdx}
      onClickHandler={(idx) => setKeyIdx(idx)}
    />

		<Selector
      title="Scale"
      data={scales}
      selectedIdx={scaleIdx}
      onClickHandler={(idx) => setScaleIdx(idx) }
    />
    <div className="clips">{chordDegreeStrips}</div>

    <div className="row">
      <div className="col-md-2">
        {/*ARP LENGTH OPTIONS*/}
        <Selector
          title="Arp length"
          data={notesCountList}
          selectedIdx={notesCountIdx}
          onClickHandler={(idx) => {
            setNotesCountIdx(idx);
            setNotesOrderIdx(0);
          }}
        />
      </div>
      <div className="col-md-10">
        {/*ARP NOTES ORDER OPTIONS*/}
        <Selector
          title="Arp order"
          data={notesOrder[notesCountIdx]}
          selectedIdx={notesOrderIdx}
          onClickHandler={(idx) => setNotesOrderIdx(idx)}
        />
      </div>
    </div>

    <Selector
      title="Note Length"
      data={subdivOptions}
      selectedIdx={subdivOptionsIdx}
      onClickHandler={(idx) => setSubdivOptionsIdx(idx)}
    />

    <div>
      <h3>Pattern/Step Sequencer</h3>
      <p>Use x for step on and - for step off. Use square braces to subdivide a step. For example x-[xx]x</p>
      <input type="text" value={pattern} onChange={(e) => {
        if (e.target.value.match(/[^x\-\[\]]/) || !e.target.value) {
          return;
        }
        setPattern(e.target.value);
      }}/>
    </div>
	</div>);
}

// Use the default mapDispatchToProps by not passing it which is basically the same as passing dispatch => ({ dispatch })
export default connect()(Rpg8rs);
