// import React from 'react';
// import Modal from 'react-modal';
// import Login from './Login';
// import Register from './Register';

// // Set the app element for the Modal
// Modal.setAppElement('#root');

// // Define the modal styles
// const modalStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: '1000px',
//     height: '500px',
//     backgroundColor: 'white',
//     borderRadius: '10px',
//     padding: '20px',
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.1)',
//     fontFamily: 'Roboto, sans-serif',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   imageSection: {
//     width: '50%',
//     backgroundImage: 'url(src\assets\Company_logo\CC_logo.png)', // Update with the path to your image
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     borderRadius: '10px 0 0 10px',
//   },
//   formSection: {
//     width: '50%',
//     padding: '20px',
//   },
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     zIndex: 1000,
//   },
// };

// const ModalComponent = ({ isOpen, onClose, type, setUser }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       contentLabel={`${type} Modal`}
//       style={modalStyles}
//       shouldCloseOnOverlayClick={true}
//       shouldCloseOnEsc={true}
//     >
//       <div style={{ display: 'flex', height: '100%' }}>
//         <div style={modalStyles.imageSection}></div>
//         <div style={modalStyles.formSection}>
//           <h2 className="modal-header">{type === 'login' ? 'Login' : 'Register'}</h2>
//           {type === 'login' && <Login onClose={onClose} setUser={setUser} />}
//           {type === 'register' && <Register onClose={onClose} setUser={setUser} />}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ModalComponent;
