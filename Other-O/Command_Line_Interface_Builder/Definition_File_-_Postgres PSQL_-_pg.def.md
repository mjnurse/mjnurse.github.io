---
title: pg.def
---

```bash
# Postgres PSQL

cmd [ -f ./pg_conn_defaults ] && source ./pg_conn_defaults

cmd PG_HOST="${PG_HOST:-127.0.0.1}"
cmd PG_PORT="${PG_PORT:-5431}"
cmd PG_DB="${PG_DB:-postgres}"
cmd PG_USER="${PG_NAME:-postgres}"
cmd PG_PASSWORD="${PG_PASSWORD:-postgres}"
cmd export PGPASSWORD="$PG_PASSWORD"
cmd export PAGER=cat

# -------------------------------------------------------------------------------------------------
= SESSION
# -------------------------------------------------------------------------------------------------

connect (c) [<db_name>] :: \
    psql --host $PG_HOST -p $PG_PORT -d ${1:-$PG_DB} -U $PG_USER

set connection defaults (scd) <host> <port> <db_name> <username> <password> :: \
    echo "# Created: $(date)" > ./pg_conn_defaults; \
    echo "export PG_HOST=\"$1\"" >> ./pg_conn_defaults; \
    echo "export PG_PORT=\"$2\"" >> ./pg_conn_defaults; \
    echo "export PG_DB=\"$3\"" >> ./pg_conn_defaults; \
    echo "export PG_USER=\"$4\"" >> ./pg_conn_defaults; \
    echo "export PG_password=\"$5\"" >> ./pg_conn_defaults

# -------------------------------------------------------------------------------------------------
= DICTIONARY
# -------------------------------------------------------------------------------------------------

describe (d) <db_name> <schema_name> <object_name> :: \
    psql --host $PG_HOST -p $PG_PORT -d $1 -U $PG_USER -c "\d \"$2\".\"$3\""

list databases (ld) :: \
    psql --host $PG_HOST -p $PG_PORT -d $PG_DB -U $PG_USER -c "\l"

cmd iq=" \
    SELECT \
        n.nspname AS schema_name, \
        c.relname AS index_name, \
        t.relname AS table_name, \
        r.rolname AS owner, \
        pg_size_pretty(pg_relation_size(c.oid)) AS index_size \
    FROM \
        pg_class c \
        JOIN pg_index i ON c.oid = i.indexrelid \
        JOIN pg_class t ON i.indrelid = t.oid \
        JOIN pg_namespace n ON n.oid = c.relnamespace \
        JOIN pg_roles r ON r.oid = c.relowner \
    WHERE \
        c.relkind = 'i' \
        AND n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') \
        AND (LOWER(n.nspname) = LOWER('SCHEMANAME') OR 'SCHEMANAME' = '') \
    ORDER BY \
        1, 2"

list indices (li) <db_name> [<schema_name>] :: \
    psql --host $PG_HOST -p $PG_PORT -d $1 -U $PG_USER -c "${iq//SCHEMANAME/$2}"; \

cmd sq=" \
    SELECT \
        n.nspname AS schema_name, \
        r.rolname AS owner, \
        pg_size_pretty(SUM(pg_total_relation_size(c.oid))) AS total_size \
    FROM \
        pg_namespace n \
        JOIN pg_roles r ON r.oid = n.nspowner \
        LEFT JOIN pg_class c ON c.relnamespace = n.oid AND c.relkind IN ('r', 'i', 't', 'm') \
    WHERE \
        n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') \
    GROUP BY \
        n.nspname, r.rolname \
    ORDER BY \
        1, 2"

list schema (ls) [<db_name>] :: \
    echo "DATABASE: ${1:-$PG_DB}"; \
    psql --host $PG_HOST -p $PG_PORT -d ${1:-$PG_DB} -U $PG_USER -c "${sq}";

cmd tq=" \
    SELECT \
        n.nspname AS schema_name, \
        c.relname AS table_name, \
        r.rolname AS owner, \
        pg_size_pretty(pg_total_relation_size(c.oid)) AS total_size \
    FROM \
        pg_class c \
        JOIN pg_namespace n ON n.oid = c.relnamespace \
        JOIN pg_roles r ON r.oid = c.relowner \
    WHERE \
        c.relkind = 'r' \
        AND n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') \
        AND (LOWER(n.nspname) = LOWER('SCHEMANAME') OR 'SCHEMANAME' = '') \
    ORDER BY \
        1, 2"

list tables (lt) <db_name> [<schema_name>] :: \
    psql --host $PG_HOST -p $PG_PORT -d $1 -U $PG_USER -c "${tq//SCHEMANAME/$2}"

cmd sq=" \
    SELECT \
        CASE c.relkind \
            WHEN 'r' THEN 'table' \
            WHEN 'S' THEN 'sequence' \
            WHEN 'i' THEN 'index' \
            WHEN 'v' THEN 'view' \
            WHEN 'm' THEN 'materialised view' \
            ELSE c.relkind::TEXT \
        END AS object_type, \
        n.nspname AS schema, \
        c.relname AS name \
    FROM \
        pg_class c \
    JOIN \
        pg_namespace n ON n.oid = c.relnamespace \
    WHERE \
        (    c.relname ILIKE 'SEARCHTERM' \
          OR n.nspname ILIKE 'SEARCHTERM' ) \
    AND \
        n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') \
    UNION ALL \
    SELECT \
        'constraint' AS object_type, \
        n.nspname AS schema, \
        con.conname AS name \
    FROM \
        pg_constraint con \
    JOIN \
        pg_namespace n ON n.oid = con.connamespace \
    WHERE \
        (    con.conname ILIKE 'SEARCHTERM' \
          OR n.nspname ILIKE 'SEARCHTERM' ) \
    AND \
        n.nspname NOT IN ('pg_catalog', 'information_schema', 'pg_toast') \
    ORDER BY \
        object_type, schema, name"

search dictionary (sd) <db_name> <search_term> :: \
    psql --host $PG_HOST -p $PG_PORT -d $1 -U $PG_USER -c "${sq//SEARCHTERM/$2}" \
    ## % matches multiple chars (inc. none), _ matches a single char

```
