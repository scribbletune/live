import React, { useState } from 'react';
import Selector from './Selector';
import { keys, scales, notesOrder, subdivOptions, subdivs } from './initialState';
import { getProgression } from './api';

const Rpg8rs = () => {
	const [keyIdx, setKeyIdx] = useState(2);
	const [scaleIdx, setScaleIdx] = useState(2);
  const [progression, setProgression] = useState([0, 1, 0, 1, 0, 1, 0, 3]);
  const [notesCountIdx, setNotesCountIdx] = useState(1);
  const [notesOrderIdx, setNotesOrderIdx] = useState(0);
  const [subdivOptionsIdx, setSubdivOptionsIdx] = useState(3);
  const [pattern, setPattern] = useState('x-xx-xxx');

  const chordDegrees = getProgression(scales[scaleIdx]); // [I, ii, iii, IV, V, vi, vii]
  const chordDegreeStrips = [...Array(8).keys()].map((el, idx) => {
    return (
      <Selector
        key={idx}
        data={chordDegrees}
        selectedIdx={progression[idx]}
        onClickHandler={(i) => {
          let newProgression = [...progression];
          newProgression[idx] = i;
          setProgression(newProgression);
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
      onClickHandler={(idx) => setScaleIdx(idx)}
    />

    {chordDegreeStrips}

    <div className="row">
      <div className="col-md-2">
        {/*ARP LENGTH OPTIONS*/}
        <Selector
          title="Arp length"
          data={[2, 4, 8]}
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
        setPattern(e.target.value)
      }}/>
      Use x and - only!
    </div>
	</div>);
}

export default Rpg8rs;