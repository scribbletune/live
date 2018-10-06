import React, { Component } from 'react';
import Step from './Step';

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSteps: props.totalSteps,
      currentlyLitStep: -1,
      selectedSteps: {}
    };
  }

  componentDidMount() {
    let counter = 0;
    const synth = new Tone.Synth().toMaster();
    const seq = new Tone.Sequence((time, note) => {
      this.setState({currentlyLitStep: counter});
      if (this.state.selectedSteps[counter]) {
        console.log('play');
        synth.triggerAttackRelease(this.props.note, '8n');
      }
      counter++;
      if (counter > this.state.totalSteps - 1) {
        counter = 0;
      }
    }, ['C4'], '16n');
    seq.start();
  }

  onChangeHandler(e) {
    this.setState({ totalSteps: +e.target.value });
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
          onChange={this.onChangeHandler.bind(this)} 
          min="1" 
          max="16" 
          value={this.state.totalSteps} 
        />
      </div>
    );
  }
}

export default Steps;