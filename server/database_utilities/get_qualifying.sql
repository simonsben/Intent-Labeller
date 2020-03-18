WITH qualifying_counts AS (
    SELECT context_id, COUNT(*) as uses
    FROM label
    WHERE context_id < 0 AND user_id = ?
    GROUP BY context_id
)

SELECT context_id, content
FROM context
WHERE context_id NOT IN (
    SELECT context_id
    FROM qualifying_counts
    WHERE uses <= (
        SELECT MAX(uses)
        FROM qualifying_counts
    )
)
LIMIT 1;
