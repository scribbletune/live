import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Selector from './Selector';
import { keys, scales, notesCountList, notesOrder, subdivOptions, subdivs } from './initialArpState';
import { getChordDegrees, getChordsProgressionForScale, getArpNotes } from './api';
import { updateClip } from './actions';

const Rpg8rs = ({ idx, dispatch }) => {
	const [keyIdx, setKeyIdx] = useState(2);
	const [scaleIdx, setScaleIdx] = useState(2);
  const [arpChordProgression, setArpChordProgression] = useState([0, 1, 0, 1, 0, 1, 0, 3]);
  const [notesCountIdx, setNotesCountIdx] = useState(1);
  const [notesOrderIdx, setNotesOrderIdx] = useState(0);
  const [subdivOptionsIdx, setSubdivOptionsIdx] = useState(3);
  const [pattern, setPattern] = useState('x-xx-xxx');

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
      <input type="text" value={pattern} onChange={(e) => {
        if (e.target.value.match(/[^x\-\[\]]/) || !e.target.value) {
          return;
        }
        setPattern(e.target.value);
      }}/>
      Use x and - only!
    </div>
	</div>);
}

// Use the default mapDispatchToProps by not passing it which is basically the same as passing dispatch => ({ dispatch })
export default connect()(Rpg8rs);
