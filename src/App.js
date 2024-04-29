import React, { useState } from 'react';
import FormeEquipe from './FormeEquipe';
import './FormeEquipe.css';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [nomEquipe1, setNomEquipe1] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [nomEquipe2, setNomEquipe2] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [scoresEquipe1, setScoresEquipe1] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [scoresEquipe2, setScoresEquipe2] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [predictionReady, setPredictionReady] = useState(false);

  const handleScoreSubmission = (nomEquipe, scores) => {
    if (!nomEquipe1) {
      setNomEquipe1(nomEquipe);
      setScoresEquipe1(scores);
    } else {
      setNomEquipe2(nomEquipe);
      setScoresEquipe2(scores);
      setPredictionReady(true);
    }
  };

  return (
    <div>
      <FormeEquipe onScoreSubmit={handleScoreSubmission} />
    </div>
  );
}

export default App;
