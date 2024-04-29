import React, { useState } from 'react';
import './FormeEquipe.css';

function FormeEquipe({ onScoreSubmit }) {
  // État initial pour les équipes
  const initialState = {
    nom: '',
    scores: [],
    butM: '',
    butC: '',
  };

  // États des différentes données
  const [equipe1, setEquipe1] = useState({ ...initialState });
  const [equipe2, setEquipe2] = useState({ ...initialState });
  const [totalScoreEquipe1, setTotalScoreEquipe1] = useState(0);
  const [totalScoreEquipe2, setTotalScoreEquipe2] = useState(0);
  const [goalAverageEquipe1, setGoalAverageEquipe1] = useState(0);
  const [goalAverageEquipe2, setGoalAverageEquipe2] = useState(0);
  const [calculsEffectues, setCalculsEffectues] = useState(false);
  const [equipeFavorite, setEquipeFavorite] = useState('');

  // Fonction pour gérer le changement de nom d'équipe
  const handleTeamNameChange = (e, equipeNum) => {
    const newNom = e.target.value;
    if (equipeNum === 1) {
      setEquipe1({ ...equipe1, nom: newNom });
    } else {
      setEquipe2({ ...equipe2, nom: newNom });
    }
  };

  // Fonction pour ajouter un score
  const handleAddScore = (e, equipeNum) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const butM = parseInt(formData.get('butM'), 10);
    const butC = parseInt(formData.get('butC'), 10);
    const newScore = { butM, butC };
    if (equipeNum === 1) {
      setEquipe1({
        ...equipe1,
        scores: [...equipe1.scores, newScore],
        butM: '',
        butC: '',
      });
    } else {
      setEquipe2({
        ...equipe2,
        scores: [...equipe2.scores, newScore],
        butM: '',
        butC: '',
      });
    }
    if (equipe1.scores.length > 0 && equipe2.scores.length > 0) {
      onScoreSubmit(1, equipe1.nom, equipe1.scores);
      onScoreSubmit(2, equipe2.nom, equipe2.scores);
    }
    // Calculer et mettre à jour les scores totaux
    const totalScore1 = equipe1.scores.reduce((acc, cur) => acc + cur.butM, 0);
    const totalScore2 = equipe2.scores.reduce((acc, cur) => acc + cur.butM, 0);
    setTotalScoreEquipe1(totalScore1);
    setTotalScoreEquipe2(totalScore2);
  };
  
  // Fonction pour calculer les résultats
  const handleCalculate = () => {
    if (equipe1.scores.length === 5 && equipe2.scores.length === 5 && !calculsEffectues) {
      onScoreSubmit(1, equipe1.nom, equipe1.scores);
      onScoreSubmit(2, equipe2.nom, equipe2.scores);
  
      // Calculer et mettre à jour le goal average
      const goalAverage1 = calculateGoalAverage(equipe1);
      const goalAverage2 = calculateGoalAverage(equipe2);
      setGoalAverageEquipe1(goalAverage1);
      setGoalAverageEquipe2(goalAverage2);
  
      // Mettre à jour les scores cumulé
      const totalScore1 = equipe1.scores.reduce((acc, cur) => acc + cur.butM, 0);
      const totalScore2 = equipe2.scores.reduce((acc, cur) => acc + cur.butM, 0);
      setTotalScoreEquipe1(totalScore1);
      setTotalScoreEquipe2(totalScore2);
  
      // Conditio pour determiner l'équipe favorite
      if (goalAverage1 > goalAverage2) {
        setEquipeFavorite(equipe1.nom);
      } else if (goalAverage1 < goalAverage2) {
        setEquipeFavorite(equipe2.nom);
      } else {
        setEquipeFavorite("Les deux équipes vont faire un jeu égal");
      }
  
      // Mise à jour l'état de calcul effectué
      setCalculsEffectues(true);
      
    } else {
      alert("Veuillez entrer les résultats des cinq derniers matchs pour chaque équipe pour poursuivre.");
    }
  };
  

  // Fonction pour calculer le goal average
  const calculateGoalAverage = (equipe) => {
    const totalButM = equipe.scores.reduce((total, score) => total + score.butM, 0);
    const totalButC = equipe.scores.reduce((total, score) => total + score.butC, 0);
    return totalButM - totalButC;
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setEquipe1({ ...initialState });
    setEquipe2({ ...initialState });
    setTotalScoreEquipe1(0);
    setTotalScoreEquipe2(0);
    setGoalAverageEquipe1(0);
    setGoalAverageEquipe2(0);
    setCalculsEffectues(false);
    setEquipeFavorite('');
  };

  return (
    <div className='form-container'>
      <h1>Predictions Matches</h1>
      <div className='team'>
        <h2>Équipe 1</h2>
        <form onSubmit={(e) => handleAddScore(e, 1)} className='team-form'>
          <input
            type="text"
            placeholder="Nom de l'équipe 1"
            value={equipe1.nom}
            onChange={(e) => handleTeamNameChange(e, 1)}
            className='input-field'
          />
          <div className='score-inputs'>
            <input
              type="number"
              name="butM"
              placeholder="Buts marqués"
              value={equipe1.butM}
              onChange={(e) => setEquipe1({ ...equipe1, butM: parseInt(e.target.value, 10) })}
              className='input-field'
              required  
            />
            <input
              type="number"
              name="butC"
              placeholder="Buts encaissés"
              value={equipe1.butC}
              onChange={(e) => setEquipe1({ ...equipe1, butC: parseInt(e.target.value, 10) })}
              className='input-field'
              required 
            />
          </div>
          <button type="submit" className='submit-button'>Ajouter Score</button>
        </form>
        <h3 className='team-heading'>Scores {equipe1.nom}</h3>
        <ul className='score-list'>
          {equipe1.scores.map((score, index) => (
            <li key={index} className='score-item'>{score.butM}  -  {score.butC}</li>
          ))}
        </ul>
      </div>

      <div className='team'>
        <h2>Équipe 2</h2>
        <form onSubmit={(e) => handleAddScore(e, 2)} className='team-form'>
          <input
            type="text"
            placeholder="Nom de l'équipe 2"
            value={equipe2.nom}
            onChange={(e) => handleTeamNameChange(e, 2)}
            className='input-field'
            required
          />
          <div className='score-inputs'>
            <input
              type="number"
              name="butM"
              placeholder="Buts marqués"
              value={equipe2.butM}
              onChange={(e) => setEquipe2({ ...equipe2, butM: parseInt(e.target.value, 10) })}
              className='input-field'
              required
            />
            <input
              type="number"
              name="butC"
              placeholder="Buts encaissés"
              value={equipe2.butC}
              onChange={(e) => setEquipe2({ ...equipe2, butC: parseInt(e.target.value, 10) })}
              className='input-field'
            />
          </div>
          <button type="submit" className='submit-button'>Ajouter Score</button>
        </form>
        <h3 className='team-heading'>Scores {equipe2.nom}</h3>
        <ul className='score-list'>
          {equipe2.scores.map((score, index) => (
            <li key={index} className='score-item'>{score.butM}  -  {score.butC}</li>
          ))}
        </ul>
      </div>
      <div className='calculate'>
        {!calculsEffectues && (
          <button onClick={handleCalculate} className='calculate-button'>
            Calculer
          </button>
        )}
        
        <button onClick={resetForm} className='reset-button'>Réinitialiser</button>
      </div>
      
      
      {calculsEffectues && (
        <div className='results-container'>
          <h3>Résultats</h3>
          <p>
            <strong>{equipe1.nom}</strong> Totalise : {totalScoreEquipe1} buts marqués et a un Goal Average de :{' '}
            {goalAverageEquipe1} buts
          </p>
          <p>
            <strong>{equipe2.nom}</strong> Totalise : {totalScoreEquipe2} buts marqués et a un Goal Average de :{' '}
            {goalAverageEquipe2} buts
          </p>
          <h2>Prediction</h2>
          <p className='prediction-text'>
            {equipeFavorite !== 'Les deux équipes vont faire un jeu égal' ? (
              <>L'équipe favorite pour gagner le prochain match est : <strong>{equipeFavorite}</strong></>
            ) : (
              <>Il y aura égalité entre les deux équipes pour le prochain match.</>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default FormeEquipe;
