import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';
import { Button } from 'reactstrap';
const PopUp = () => {
  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });
  return (
    <div>
      <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
      <Button style={{background: '#2DCECB', border: 'none'}} onClick={open} className="my-4" color="primary" type="submit">
                  Open
                </Button>
      <Modal>
        <div>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <Button style={{background: '#2DCECB', border: 'none'}} onClick={close} className="my-4" color="primary" type="submit">
                  Close
                </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PopUp;