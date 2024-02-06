import React from 'react';
import MainPage from './components/MainPage/MainPage';
import IntroModal from './components/IntroModal/IntroModal'; // Предполагается, что этот компонент уже создан
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <MainPage />
      <IntroModal />
    </div>
  );
}

export default App;
