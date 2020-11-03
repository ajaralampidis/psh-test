import React from 'react';
import fatherStyles from '../Ranking.module.css'
import styles from './AllTimeBest_Table.module.css';

function AllTimeBest_Table(props) {
    const info = props.info

    return (
        <div className={styles.AllTimeBest}>

           <table className={fatherStyles.Ranking_table}>
                <tr>
                    <th>#</th>
                    <th>Stat ID</th>
                    <th>Avatar</th>
                    <th>Nickname</th>
                    <th>Record</th>
                    <th>Date of Record</th>
                </tr>
                {   
                    info.length > 0 &&
                    info.map((player, index) => {
                        let fecha = player.createdAt.split("T")
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
                                        className={styles.AllTimeBest_avatar}
                                    >
                                    </img>
                                </td>

                                <td key={'nickname'+player.id}>
                                    {player.nickname}
                                </td>

                                <td key={'score'+player.id}>
                                    {player.winner_new_score}
                                </td>

                                <td className={styles.AllTimeBest_date} key={'date'+player.id}>
                                    {fecha[0]}
                                </td>

                            </tr>
                        )
                    })
                }
            </table>

        </div>
    );
}

export default AllTimeBest_Table;

