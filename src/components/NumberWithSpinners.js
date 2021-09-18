/* eslint-disable react/jsx-props-no-spreading */
/**
 * NumberWithSpinners UI component
 * Provides a Form input element with numberic value and 2 buttons for value increment and decrement.
 *
 * Usage:
 * ```js
 * import NumberWithSpinners from './components/NumberWithSpinners';
 * function App() {
 *   return <Form>
 *     <NumberWithSpinners
 *       value={myValue}       <-- from useState()
 *       setValue={setMyValue} <-- from useState()
 *       label="Speed"
 *       units="Mph"
 *       controlId="speed"
 *       repeatingBtnSlowTimeMs="200"
 *       repeatingBtnFastTimeMs="100"
 *       repeatingBtnFastDelayMs="2000"
 *     />
 *   </Form>;
 * }
 * ```
 *
 * Component markup (inherited from first use in NavBar) is organized as:
 *   <Form.Group as={Row} className="numberspinner"
 *     {children}
 *     <Col md=3
 *       label && <Form.Label
 *                  label
 *     <Col md=6 className="btn-group"
 *       <div
 *         <Button
 *           -
 *       <Form.Control
 *       <div
 *         <Button
 *           +
 *     <Col md=3
 *       units && <Form.Label
 *                  units
 *
 */

import React, { useCallback } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './NumberWithSpinners.css';

// Globals for mouse/pointer tracking in number spinner control.
// There's only one pointer, so global context for those is ok.
let repeatingBtnIntervalId;
let repeatingBtnTimeoutId;
let repeatingBtnClickCnt;
let repeatingBtnPointerIn;

function NumberWithSpinners({
  value,
  setValue,
  label,
  units,
  controlId = 'number',
  repeatingBtnSlowTimeMs = 200,
  repeatingBtnFastTimeMs = 100,
  repeatingBtnFastDelayMs = 2000,

  children,
  ...otherProps
}) {
  // Pattern: "avoid binding arrow functions in render"
  // Handler for mouse/pointer tracking in number spinner control (bpm)
  // Produce repeating clicks action on the button while mouse is being held down.
  // TODO: Find a way to stop repeating action while pointer being pressed down and leaves the button.
  // With    evt.target.setPointerCapture() stops all enter/leave events from being delivered.
  // Without evt.target.setPointerCapture() up events are not delivered when pointer is outside of button.
  // Perhaps can attach mouseup listener to the body element and work without evt.target.setPointerCapture()
  const handleSpinnerButtonPointerEvents = useCallback(
    (evt) => {
      // console.log('handleSpinnerButtonPointerEvents(evt.type=%o evt.button=%o evt.target=%o evt.srcElement=%o) repeatingBtnPointerIn=%o repeatingBtnClickCnt=%o', evt.type, evt.button, evt.target, evt.srcElement, repeatingBtnPointerIn, repeatingBtnClickCnt);

      // Track pointer regardless of which mouse button
      if (evt.type === 'pointerenter' || evt.type === 'mouseenter' || evt.type === 'mouseover') {
        repeatingBtnPointerIn = true;
      } else if (
        evt.type === 'pointerout' ||
        evt.type === 'pointerleave' ||
        evt.type === 'mouseleave' ||
        evt.type === 'mouseout'
      ) {
        repeatingBtnPointerIn = false;
      }

      // The rest of events of interest should be for left-click
      if (evt.button !== 0) {
        return;
      }

      if (evt.type === 'pointerdown') {
        evt.preventDefault();
        // console.log('click first');
        // evt.target.click();
        repeatingBtnPointerIn = true;
        repeatingBtnClickCnt = 0;
        evt.target.setPointerCapture(evt.pointerId);

        clearTimeout(repeatingBtnTimeoutId);
        clearInterval(repeatingBtnIntervalId);

        // Start repeating with slow interval
        repeatingBtnIntervalId = setInterval(() => {
          if (repeatingBtnPointerIn) {
            // console.log('click repeat slow repeatingBtnPointerIn=%o', repeatingBtnPointerIn);
            evt.target.click();
            repeatingBtnClickCnt += 1;
          }
        }, repeatingBtnSlowTimeMs);

        // Set delay to switch repeating to fast interval
        repeatingBtnTimeoutId = setTimeout(() => {
          // Change repeating to fast interval
          clearInterval(repeatingBtnIntervalId);
          repeatingBtnIntervalId = setInterval(() => {
            if (repeatingBtnPointerIn) {
              // console.log('click repeat fast repeatingBtnPointerIn=%o', repeatingBtnPointerIn);
              evt.target.click();
              repeatingBtnClickCnt += 1;
            }
          }, repeatingBtnFastTimeMs);
        }, repeatingBtnFastDelayMs);
      } else if (evt.type === 'pointerup' || evt.type === 'pointercancel') {
        // evt.preventDefault();
        evt.target.releasePointerCapture(evt.pointerId);
        clearTimeout(repeatingBtnTimeoutId);
        // console.log('after clearTimeout(repeatingBtnTimeoutId)');
        clearInterval(repeatingBtnIntervalId);
        // console.log('after clearInterval(repeatingBtnIntervalId)');
        repeatingBtnIntervalId = undefined;
        repeatingBtnTimeoutId = undefined;
        if (repeatingBtnClickCnt !== 0) {
          // evt.preventDefault();
        } else if (repeatingBtnPointerIn) {
          // console.log('click once repeatingBtnPointerIn=%o', repeatingBtnPointerIn);
          repeatingBtnClickCnt += 1;
        }
        repeatingBtnPointerIn = false;
      }
    },
    [repeatingBtnFastDelayMs, repeatingBtnFastTimeMs, repeatingBtnSlowTimeMs]
  );

  // TODO: Implement validations (range)
  // Pattern: "avoid binding arrow functions in render"
  const handleBpmDecrEvent = useCallback(() => setValue?.(value - 1), [setValue, value]);
  const handleBpmIncrEvent = useCallback(() => setValue?.(value + 1), [setValue, value]);
  const onSetValue = useCallback((event) => setValue?.(+event.target.value), [setValue]);

  const containerProps = { ...otherProps };
  containerProps.className = `${containerProps.className || ''} numberspinner my-0 my-auto`.trim();

  /* TODO: (when needed) Allow user to choose which components to use
   *    Here's a JSX trick to choose component in runtime by a string:
   *    ```jsx
   *    const Button = ({ Component = 'button', ...props }) => <Component {...props} />
   *    <Button>A Button</Button> // Renders a button element
   *    <Button Component="a">A Link</Button> // Renders an anchor element
   *    ```
   *    Yes, you can use a string as a component in JSX - just make sure that the string component name starts with a capital letter.
   */

  return (
    <React.Fragment key={controlId}>
      <Form.Group as={Row} className="numberspinner my-0 my-auto" controlId={controlId}>
        {children}
        <Col md={3} className="mx-0 my-auto px-0 py-0">
          {label && <Form.Label className="mx-0 my-auto">{label}</Form.Label>}
        </Col>
        <Col md={6} className="mx-0 my-auto px-0 py-0 btn-group">
          <div as="div" className="mx-0 my-auto px-1 py-0">
            <Button
              onClick={handleBpmDecrEvent}
              onPointerDown={handleSpinnerButtonPointerEvents}
              onPointerUp={handleSpinnerButtonPointerEvents}
              onPointerLeave={handleSpinnerButtonPointerEvents}
              onPointerEnter={handleSpinnerButtonPointerEvents}
              onMouseLeave={handleSpinnerButtonPointerEvents}
              onMouseEnter={handleSpinnerButtonPointerEvents}
              onMouseOut={handleSpinnerButtonPointerEvents}
              onMouseOver={handleSpinnerButtonPointerEvents}
            >
              -
            </Button>
          </div>
          <Form.Control
            className="mx-0 my-auto px-0"
            type="number"
            size="sm"
            htmlSize="5"
            name={controlId}
            value={value}
            onChange={onSetValue}
          />
          <div as="div" className="mx-0 my-auto px-0 py-0">
            <Button
              onClick={handleBpmIncrEvent}
              onPointerDown={handleSpinnerButtonPointerEvents}
              onPointerUp={handleSpinnerButtonPointerEvents}
              onPointerLeave={handleSpinnerButtonPointerEvents}
              onPointerEnter={handleSpinnerButtonPointerEvents}
              onMouseLeave={handleSpinnerButtonPointerEvents}
              onMouseEnter={handleSpinnerButtonPointerEvents}
              onMouseOut={handleSpinnerButtonPointerEvents}
              onMouseOver={handleSpinnerButtonPointerEvents}
            >
              +
            </Button>
          </div>
        </Col>
        <Col md={3} className="mx-0 my-auto px-1 py-0">
          {units && <Form.Label className="mx-0 my-auto">{units}</Form.Label>}
        </Col>
      </Form.Group>
    </React.Fragment>
  );
}

export default NumberWithSpinners;
