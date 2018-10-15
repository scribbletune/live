import React, { Component } from 'react';
import Checklist from './Checklist';
import { Scale } from 'tonal';

class DetectApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
      selectedNotes: [],
      selectedScales: [],
      scales: Scale.names(),
      chromatic: 'C Db D Eb E F Gb G Ab A B Bb'.split(' ')
    };
  }

  onNoteChangeHandler(e) {
    if (this.state.selectedNotes.includes(e.target.value)) {
      let currentSelectedNotes = this.state.selectedNotes;
      currentSelectedNotes.splice(currentSelectedNotes.indexOf(e.target.value), 1);
      this.setState({
        selectedNotes: currentSelectedNotes
      });
    } else {
      let currentSelectedNotes = this.state.selectedNotes;
      currentSelectedNotes.push(e.target.value);
      this.setState({
        selectedNotes: currentSelectedNotes
      });
    }
  }

  onScaleChangeHandler(e) {
    if (this.state.selectedScales.includes(e.target.value)) {
      let currentSelectedScales = this.state.selectedScales;
      currentSelectedScales.splice(currentSelectedScales.indexOf(e.target.value), 1);
      this.setState({
        selectedScales: currentSelectedScales
      });
    } else {
      let currentSelectedScales = this.state.selectedScales;
      currentSelectedScales.push(e.target.value);
      this.setState({
        selectedScales: currentSelectedScales
      });
    }
  }

  render() {
    let outArr = [];
    this.state.chromatic.forEach(chromaticNote => {
      this.state.selectedScales.forEach(scale => {
        var bool = true;
        this.state.selectedNotes.forEach(n => {
          let chromaticNoteScale = Scale.notes(chromaticNote + ' ' + scale);
          if (!chromaticNoteScale.includes(n)) {
            bool = false
          }
        });
        if (bool) {
          outArr.push(chromaticNote + ' ' + scale)
        }
      });
    });

    const resultItems = outArr.map((el, idx) => <li key={idx}>{el}</li>);
    return (
      <div>
        <h1>Detect Scales from Notes</h1>
        <div className="row">
          <Checklist name="Scales to check" data={this.state.scales} onChangeHandler={this.onScaleChangeHandler.bind(this)} />
          <Checklist name="Notes" data={this.state.notes} onChangeHandler={this.onNoteChangeHandler.bind(this)}  />
          <div>
            <h3>Scales to use</h3>
            <ul>{resultItems}</ul>
          </div>
        </div>
      </div>
    );
  };
}

export default DetectApp;
