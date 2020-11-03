import React from 'react';
import fatherStyles from '../Ranking.module.css'
import styles from './AllTimeBest_Table.module.css';

function AllTimeBest_Table() {
  return (
    <div className={styles.AllTimeBest}>

        <table className={fatherStyles.Ranking_table}>
    		<tr>
    			<th>ID</th>
    		    <th>Avatar</th>
    		    <th>Nickname</th>
    		    <th>Score</th>
                <th>Date of Record</th>
    		</tr>
    		<tr>
    			<td></td>
    		    <td>John Doe</td>
    		    <td>john@gmail.com</td>
    		    <td>USA</td>
                <td></td>
    		</tr>
    		<tr>
    			<td></td>
    		    <td>Stephen Thomas</td>
    		    <td>stephen@gmail.com</td>
    		    <td>UK</td>
                <td></td>
    		</tr>
    		<tr>
    			<td></td>
    		    <td>Natly Oath</td>
    		    <td>natly@gmail.com</td>
    		    <td>France</td>
                <td></td>
    		</tr>
		</table>

    </div>
  );
}

export default AllTimeBest_Table;

