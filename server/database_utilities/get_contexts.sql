SELECT context_id, content
FROM context c
WHERE context_id NOT IN (
    SELECT context_id 
    FROM (
        SELECT context_id, MAX(label_count) as max_votes
        FROM (
            SELECT context_id, COUNT(*) as label_count
            FROM label
            WHERE intent_label != "SKIP" AND context_id NOT IN (
                SELECT context_id
                FROM label
                WHERE user_id = ?
                GROUP BY context_id
            )
            GROUP BY context_id, intent_label
        )
        GROUP BY context_id
        HAVING max_votes >= 3
    )
)
ORDER BY context_id
LIMIT 5;