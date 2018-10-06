import React, { Component } from 'react';
import Step from './Step';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: props.totalSteps,
      currentlyLitStep: -1,
      selectedSteps: {},
      note: props.note
    };
  }

  componentDidMount() {
    let counter = 0;
    let synth = this.state.note && new Tone.Synth().toMaster();
    let player = this.props.sample && new Tone.Player(this.props.sample).toMaster();

    const seq = new Tone.Sequence((time, note) => {
      this.setState({currentlyLitStep: counter});
      if (this.state.selectedSteps[counter]) {
        this.state.note && synth.triggerAttackRelease(this.state.note, '8n');
        this.props.sample && player.start(time);
      }
      counter++;
      if (counter > this.state.totalSteps - 1) {
        counter = 0;
      }
    }, ['C4'], '16n');
    seq.start();
  }

  onChangeTotalSteps(e) {
    this.setState({ totalSteps: +e.target.value });
  }

  onChangeNote(e) {
    this.setState({ note: e.target.value });
  }

  onSelectStepHandler(selectedStepNum, selState) {
    let newSelectedSteps = this.state.selectedSteps;
    newSelectedSteps[selectedStepNum] = selState;
    this.setState({ selectedSteps: newSelectedSteps });
  }

  render() {
    const StepsList = [...Array(+this.state.totalSteps).keys()].map(
      (el, idx) => <Step key={idx} idx={idx} lit={this.state.currentlyLitStep} onSelectStep={this.onSelectStepHandler.bind(this)} />
    );
    return (
      <div className="seqContainer">
        <ul className="seq">{StepsList}</ul>
        <input 
          type="number" 
          onChange={this.onChangeTotalSteps.bind(this)} 
          min="1" 
          max="16" 
          value={this.state.totalSteps} 
        />
        <input type="text" value={this.state.note} onChange={this.onChangeNote.bind(this)} size="3"  />
      </div>
    );
  }
}

export default Steps;