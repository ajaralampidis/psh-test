import React from 'react';
import fatherStyles from '../Ranking.module.css'
import styles from './AllTimeBest_Table.module.css';

function AllTimeBest_Table(props) {
    const info = props.info

    // ===================( Event Handlers )=============== //

    const handleExportCsv = event => {

        function download_csv(csv) {
            var csvFile;
            var downloadLink;
        
            // CSV FILE
            csvFile = new Blob([csv], {type: "text/csv"});
        
            // Download link
            downloadLink = document.createElement("a");
        
            // File name
            downloadLink.download = 'Flip_the_Coin_All_Time_Best_Ones';
        
            // We have to create a link to the file
            downloadLink.href = window.URL.createObjectURL(csvFile);
        
            // Make sure that the link is not displayed
            downloadLink.style.display = "none";
        
            // Add the link to your DOM
            document.body.appendChild(downloadLink);
        
            // Lanzamos
            downloadLink.click();
        }
        
        function export_table_to_csv(html) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");
            
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");
                
                for (var j = 0; j < cols.length; j++) 
                    row.push(cols[j].innerText);
                
                csv.push(row.join(","));        
            }
        
            // Download CSV
            download_csv(csv.join("\n"));
        }

        export_table_to_csv()

    }

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

            <div className={styles.AllTimeBest_exportButtonContainer}>
                <button onClick={handleExportCsv} className={styles.AllTimeBest_exportButton}>
                    Export to CSV !
                </button>
            </div>

        </div>
    );
}

export default AllTimeBest_Table;

