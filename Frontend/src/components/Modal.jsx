import React from 'react';
import Modal from 'react-modal';
import Login from './Login';
import Register from './Register';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onClose, type, setUser }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={`${type} Modal`}
      className="modal"
      overlayClassName="overlay"
    >
        <h2>{type === 'login' ? 'Login' : 'Register'}</h2>

      {type === 'login' && <Login onClose={onClose} setUser={setUser} />}
      {type === 'register' && <Register onClose={onClose} setUser={setUser} />}
    </Modal>
  );
};

export default ModalComponent;
