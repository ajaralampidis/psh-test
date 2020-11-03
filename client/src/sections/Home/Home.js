import React from 'react';
import styles from './Home.module.css';
import animation from "../../assets/giphy2.gif" ;


function Home() {
  return (
    <div className={styles.Home}>
      <div className={styles.Home_header}>
        <h1 className={styles.Home_header_title}>- Flip the Coin -</h1>
        <p className={styles.Home_header_subTitle}>... Are you ready to test your luck ?</p>
      </div>
      <img src={animation} alt="coin-gif" className={styles.Home_mainPic}></img>
    </div>
  );
}

export default Home;
