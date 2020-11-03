import React from 'react';
import fatherStyles from '../Ranking.module.css'
import styles from './CurrentBest_Table.module.css';

function CurrentBest_Table(props) {
    const info = props.info

    return (
    <div className={styles.CurrentBest}>
            
            <table className={fatherStyles.Ranking_table}>
                <tr>
                    <th>Position</th>
                	<th>ID</th>
                    <th>Avatar</th>
                    <th>Nickname</th>
                    <th>Score</th>
                </tr>
                {   
                    info.length > 0 &&
                    
                    info.map((player, index) => {
                        return (
                            <tr key={'row'+player.id}>
                                <td key={'index'+player.id}>
                                    <strong>{index + 1}</strong>
                                </td>

                                <td key={'id'+player.id}>
                                    {player.id}
                                </td>

                                <td key={'avatarCell'+player.id}>
                                    <img 
                                        src={player.profile_img} 
                                        key={'avatarImg'+player.id} 
                                        alt="avatar"
                                        className={styles.CurrentBest_avatar}
                                    >
                                    </img>
                                </td>

                                <td key={'nickname'+player.id}>
                                    {player.nickname}
                                </td>

                                <td key={'score'+player.id}>
                                    {player.score}
                                </td>

                            </tr>
                        )
                    })
                }
            </table>

        </div>
    );
}

export default CurrentBest_Table;




        	