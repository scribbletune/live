import React, { Component } from 'react';

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sel: false
    };
  }

  onClickHandler() {
    this.props.onSelectStep(this.props.idx, !this.state.sel);
    this.setState({ sel: !this.state.sel });
  }

  render() {
    const stepClassName = (this.state.sel ? ' sel' : '') + (this.props.lit === this.props.idx ? ' lit' : '');
    return (
      <li className={stepClassName} onClick={this.onClickHandler.bind(this)}></li>
    )
  }

}

export default Step;
