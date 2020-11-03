import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './Ranking.module.css';
import CurrentBest_Table from './CurrentBest_Table/CurrentBest_Table.js'
import AllTimeBest_Table from './AllTimeBest_Table/AllTimeBest_Table.js'

const urlBack = process.env.REACT_APP_API_URL;

function Ranking() {
	const [ currentTable, setCurrentTable ] = useState('CurrentBest');
	const [ refreshFlag, setRefreshFlag ] = useState(true)
	const [ currentBestInfo, setCurrentBestInfo ] = useState([]);
	const [ allTimeBestInfo, setAllTimeBestInfo ] = useState([]);

	// ======================( Event Handlers )========================= //

	const handleTableChange = event => {
		currentTable === 'CurrentBest'
		? setCurrentTable('AllTimeBest')
		: setCurrentTable('CurrentBest')
	}

	// ========================( Use Effects )========================= //

	useEffect(() => {

		if (currentTable === 'CurrentBest'){

			console.log('current best')

			axios.get(`${urlBack}/ranking/currentTopTen`)
			.then(response => {
				setCurrentBestInfo(response.data)
			})
			.catch(error => {
				alert('Algo ha salido mal, revisa la consola')
				console.log(error)
			})

		} else {

			console.log('all time best')

			axios.get(`${urlBack}/ranking/allTimeTop`)
			.then(response => {
				setAllTimeBestInfo(response.data)
			})
			.catch(error => {
				alert('Algo ha salido mal, revisa la consola')
				console.log(error)
			})

		}

		const interval = setInterval(() => {
      	setRefreshFlag(refreshFlag => !refreshFlag);
    	}, 10000);
    	
    	return () => clearInterval(interval);

	}, [refreshFlag, currentTable])

 	return (
    	<div className={styles.Ranking}>
    		<br/>
        	
        	<h2 className={styles.Ranking_title} onClick={handleTableChange}>
        		<span> ⇐ </span> 
        		{currentTable === 'CurrentBest' ? 'Current Best Ones': 'All Time Best'}
        		<span> ⇒ </span>
        	</h2>

        	<div className={styles.Ranking_tableContainer}>
        		
        		{

        			currentTable === 'CurrentBest' 
        			? <CurrentBest_Table info={currentBestInfo} />
        			: <AllTimeBest_Table info={allTimeBestInfo}/>

        		}

        	</div>
	    </div>
  	);
}

export default Ranking;
