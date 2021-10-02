/* eslint-disable react/jsx-no-bind */ // TODO: Fix arrow function props
/* eslint-disable react/jsx-props-no-spreading */

import { ImFileMusic, FiSave } from 'react-icons/all';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Dropzone from 'react-dropzone';

import './Toolbar.css';

import NumberWithSpinners from './NumberWithSpinners';
import Sidebar from './Sidebar';
import Transport from './Transport';

function Toolbar({
  enableSidebar,
  onSidebarMenu,
  sidebarMenu,
  enableMenubar,
  // eslint-disable-next-line no-unused-vars
  onMenubarMenu,
  showGears,
  setShowGears,
  logNotes,
  setLogNotes,
  tempoBpm,
  handleBpmValueChangeEvent,
  isPlaying,
  startStopTrack,
  currentFileIsDirty,
  onFileOpenReject,
  onFileOpen,
  currentFileState,
  handleFileSave,
  appInfo,
}) {
  const handleShowGearsChangeEvent = () => {
    setShowGears(!showGears);
  };

  return (
    <Navbar bg="primary" variant="dark" className="toolbar">
      {enableSidebar && (
        <Sidebar onMenu={onSidebarMenu} appInfo={appInfo}>
          {sidebarMenu?.map((item) => (
            <Sidebar.Item key={item.id} id={item.id}>
              {item.title}
            </Sidebar.Item>
          ))}
        </Sidebar>
      )}

      <Navbar.Brand href="#home">
        <img src="logo192.png" className="d-inline-block" alt="Live logo" />
        <span>{appInfo.name}</span>
      </Navbar.Brand>

      {enableMenubar && (
        <>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
          </Nav>
        </>
      )}

      <Navbar.Text>
        <Form>
          <Form.Switch onChange={handleShowGearsChangeEvent} id="custom-switch1" label="⚙" checked={showGears} />
          <Form.Switch
            onChange={setLogNotes}
            id="custom-switch"
            data-tip="log notes to console"
            label="log"
            checked={logNotes}
          />
        </Form>
      </Navbar.Text>

      <Navbar.Collapse className="justify-content-end">
        <Nav className="file">
          <Dropzone
            onDropRejected={(rejectedFiles) => onFileOpenReject(rejectedFiles)}
            onDropAccepted={(acceptedFiles) => onFileOpen(acceptedFiles)}
            accept={
              ['text/javascript', 'application/javascript'] /* see https://react-dropzone.js.org/#section-components */
            }
            maxFiles={1}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()}>
                <Nav.Link className="file-name">
                  <input {...getInputProps()} />

                  {
                    // TODO: untangle
                    // eslint-disable-next-line no-nested-ternary
                    isDragActive ? (
                      '> Drop File Here <'
                    ) : currentFileState?.name ? (
                      <>
                        <ImFileMusic size="1.25rem" /> {currentFileState?.name}
                      </>
                    ) : (
                      'Open File'
                    )
                  }
                </Nav.Link>
              </div>
            )}
          </Dropzone>
          {currentFileIsDirty && (
            <Nav.Link className="file-dirty" onClick={handleFileSave}>
              <FiSave size="1.25rem" /> Save
            </Nav.Link>
          )}
        </Nav>

        <Navbar.Text className="field-bpm">
          <Form>
            <NumberWithSpinners
              value={tempoBpm}
              setValue={handleBpmValueChangeEvent}
              units="bpm"
              controlId="bpm"
              repeatingBtnSlowTimeMs="200"
              repeatingBtnFastTimeMs="100"
              repeatingBtnFastDelayMs="2000"
            />
          </Form>
        </Navbar.Text>

        <Navbar.Text className="transport">
          <Transport isPlaying={isPlaying} startStopTrack={startStopTrack} />
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Toolbar;
