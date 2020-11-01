module.exports = function matchFunction(playerA, playerB) {
		// ============( Setting player by score )============ //

	let player1; // player with bigger score
	let player2; // player with smaller score

	if (playerA.score >= playerB.score) {
		player1 = playerA;
		player2 = playerB;
	} else {
		player1 = playerB;
		player2 = playerA;
	}

	// =============( Define scoreDfference )============== //

	let scoreDifference;

	if (player1.score === player2.score) {
		scoreDifference = 0
	} else {
		scoreDifference = player1.score - player2.score
	}

	// =============( Random winner decition )============== //

	let winner;
	let loser;

	if (Math.random() >= 0.5) {
		winner = player1;
		loser = player2;
	} else {
		winner = player2;
		loser = player1;
	}

	// =======( Calculating new players scores based on previous score difference )====== //

	let scorePriceConstant = 5;

	let winner_prev_score = winner.score
	let loser_prev_score = loser.score

	let winner_new_score;
	let loser_new_score;

	if (scoreDifference === 0) {


	 	winner_new_score = winner_prev_score + scorePriceConstant;
	 	loser_new_score = loser_prev_score - scorePriceConstant;

	} else {

		if (winner === player1) {
			winner_new_score = Math.ceil( winner_prev_score + (scorePriceConstant / (scoreDifference + 1)) )
			loser_new_score = Math.floor( loser_prev_score - (scorePriceConstant / (scoreDifference + 1)) )
		}

		if (winner === player2) {
			winner_new_score = Math.ceil( winner_prev_score + (scorePriceConstant + scoreDifference) )
			loser_new_score = Math.floor( loser_prev_score - (scorePriceConstant + scoreDifference) )
		}

	}

	if (winner_new_score >= 100) {
		winner.score = 100
		winner_new_score = 100
	} else {
		winner.score = winner_new_score
	}

	if (loser_new_score <= 0) {
		loser.score = 0
		loser_new_score = 0
	} else {
		loser.score = loser_new_score
	}


	const matchData = {
		winnerId: winner.id,
		winner_prev_score: winner_prev_score,
		winner_new_score: winner_new_score,
		loserId: loser.id,
		loser_prev_score: loser_prev_score,
		loser_new_score: loser_new_score
	}

	return matchData;

}