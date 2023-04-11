import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from '../styles';
import { useGlobalContext } from '../context';
import {CustomButton, CustomInput, GameLoad, PageHOC} from '../components';

const CreateBattle = () => {
  const {contract, battleName, setBattleName, gameData, setErrorMessage} = useGlobalContext();
  const [waitBattle, setWaitBattle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(gameData?.activateBattle?.battleStatus === 1){
      navigate(`/battle/${gameData.activateBattle.name}`)
    }else if(gameData?.activateBattle?.battleStatus === 0){
      setWaitBattle(true);
    }
  }, [gameData])

  const handleClick = async () => {
    if(!battleName || !battleName.trim()) return null;
    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  }
  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput 
          label="Battle"
          placeHolder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton 
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate('/join-battle')}>Or join a battle</p>
    </>
  )
};

export default PageHOC(
  CreateBattle, 
  <>Create <br /> a new Battle</>,
  <>Create your own battle and wait for other players to join you</>
);