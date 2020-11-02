-- Database Init (name of the db in .env)
CREATE DATABASE pshtest;

-- Rank Query
SELECT *
FROM( 
	SELECT DISTINCT ON ("winnerId")
	t1.*, t2.nickname, t2.profile_img, score
	FROM 
		matches as t1
	INNER JOIN players as t2 ON "winnerId" = t2.id
	ORDER BY "winnerId", winner_new_score DESC
) as ordered
ORDER BY winner_new_score DESC;