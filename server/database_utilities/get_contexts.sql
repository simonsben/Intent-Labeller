SELECT context_id, mx, content 
FROM (
    SELECT c.context_id, MAX(l.cnt) as mx, c.content
    FROM context c 
        JOIN (
            SELECT context_id, abuse_label, COUNT(*) as cnt
            FROM label 
            WHERE abuse_label != "SKIP" AND user_id != ?
            GROUP BY context_id, abuse_label
        ) l 
        ON c.context_id = l.context_id
    GROUP BY c.context_id
    HAVING mx < 3
)
LIMIT 5;
