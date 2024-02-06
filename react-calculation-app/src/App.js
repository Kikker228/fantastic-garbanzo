import React from 'react';
import Background from './components/BackgroundAnimation/Background';
import IntroModal from './components/IntroModal/IntroModal'; // Предполагается, что этот компонент уже создан
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Background />
      <IntroModal />
    </div>
  );
}

export default App;
