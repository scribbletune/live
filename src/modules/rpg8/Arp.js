import React from 'react';
import Selector from './Selector';
import {
  changeArpLength,
  changeArpOrder
} from './actions';

const Arp = ({
  arpLengthOptions,
  arpNotesOrderOptions,
  selectedArpLengthOptionIdx,
  selectedArpNotesOrderOptionsIdx,
  dispatch
}) => {
  return (
    <div className="row">
      <div className="col-md-2">
        {/*ARP LENGTH OPTIONS*/}
        <Selector
          title="Arp length"
          data={arpLengthOptions}
          selectedIdx={selectedArpLengthOptionIdx}
          onClickHandler={changeArpLength.bind(null, dispatch)}
        />
      </div>
      <div className="col-md-10">
        {/*ARP NOTES ORDER OPTIONS*/}
        <Selector
          title="Arp order"
          data={arpNotesOrderOptions}
          selectedIdx={selectedArpNotesOrderOptionsIdx}
          onClickHandler={changeArpOrder.bind(null, dispatch)}
        />
      </div>
    </div>
  );
};

export default Arp;