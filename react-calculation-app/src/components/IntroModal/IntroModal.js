import React, { useState } from 'react';
import styles from './IntroModal.module.css';

const IntroModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modal}>
        <h1>Welcome to BeCoMe</h1>
        <p>Here you will find an introduction to the BeCoMe method...</p>
        <button onClick={handleClose}>Get Started</button>
      </div>
    </div>
  );
};

export default IntroModal;
