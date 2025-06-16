---
title: es.def
---

```bash
# ES

cmd ES_AUTH=""
cmd ES_HOST="${ES_HOST:-localhost}"
cmd ES_PORT="${ES_PORT:-9200}"

# ----------------------------------------------------------------------------------------------------------------------------------
= CLUSTER
# ----------------------------------------------------------------------------------------------------------------------------------

clear cache (cc) [<index_name>] :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_cache/clear"

cluster overview (co) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/"

cluster health (ch) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/health?human&pretty"

cluster stats (cs) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cluster/stats?human&pretty"

# ----------------------------------------------------------------------------------------------------------------------------------
= INDEX INTERROGATION
# ----------------------------------------------------------------------------------------------------------------------------------

count (c) <index_name> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_count?pretty"

list aliases (la) [<filter>] [<order_by_field_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/aliases/$1?v&s=$2"

list indices (li) [<index_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/indices/$1?v&h=health,status,index,pri,rep,sc,docs.count,docs.deleted,store.size,pri.store.size&s=index"

list shards (ls) [<index_name>] [<order_by_field_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,sc,state,docs,store,node&s=index,shard,prirep&s=$2"

list shard details (lsd) [<index_name>] [<order_by_field_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"

list segments (le) [<index_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/segments/$1?v&s=index,shard,prirep"

list segmented shards (lss) [<index_name>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node"

get index mapping (gim) <index_name> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_mapping?pretty"

list unassigned shards (lus) :: curl -X GET "http://$ES_HOST:$ES_PORT/_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep" 

forcemerge progress (fmp) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"

# ----------------------------------------------------------------------------------------------------------------------------------
= INDEX MANIPULATION
# ----------------------------------------------------------------------------------------------------------------------------------

add index to alias (aita) <index_name> <alias_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/_aliases" -H 'Content-Type: application/json' -d '{"actions":[{"add":{"index":"'$1'","alias":"'$2'"}}]}'

remove index from alias (rifa) <index_name> <alias_name> :: \
   read -p "Are you sure [yN]? " yn; \
   if [[ ${yn^} == Y ]]; then \
      curl -X DELETE "http://$ES_HOST:$ES_PORT/$1/_aliases/$2"; \
   fi

create index (ci) <index_name> <number_of_shards> <number_of_replicas> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}'

create index from mapping (cifm) <index_name> <number_of_shards> <number_of_replicas> <mapping-json> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1" -H 'Content-Type: application/json' -d '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}},"mappings":'$4'}'

clone index (clni) <index_name> <new_index_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_clone/$2"

delete index (di) <index_name> :: \
   read -p "Are you sure [yN]? " yn; \
   if [[ ${yn^} == Y ]]; then \
      curl -X DELETE "http://$ES_HOST:$ES_PORT/$1"; \
   fi

open index (opi) <index_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_open"

close index (cli) <index_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_close"

enable read only (ero) <index_name> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": true}'

enable read write (erw) <index_name> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index.blocks.write": false}'

reindex index (ri) <source_index_name> <dest_index_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/_reindex" -H 'Content-Type: application/json' -d '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}'

move shard (ms) <index_name> <shard_num> <from_node_name> <to_node_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/_cluster/reroute" -H 'Content-Type: application/json' -d '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}'

alter number replicas (anr) <index_name> <number_of_replicas> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/$1/_settings" -H 'Content-Type: application/json' -d '{"index":{"number_of_replicas":'$2'}}'

disable shard allocation (dsa) :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'

reenable shard allocation (rsa) :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/_cluster/settings" -H 'Content-Type: application/json' -d '{"persistent":{"cluster.routing.allocation.enable":null}}'

forcemerge (fm) <index_name> <max_num_segments> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_forcemerge?max_num_segments=$2"

refresh (r) <index_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/$1/_refresh"

# ----------------------------------------------------------------------------------------------------------------------------------
= INDEX ENTRY MANIPULATION
# ----------------------------------------------------------------------------------------------------------------------------------

add entry (ae) <index_name> <entry_json> :: curl -X POST "http://$ES_HOST:$ES_PORT/$1/_doc" -H 'Content-Type: application/json' -d "$2"

# ----------------------------------------------------------------------------------------------------------------------------------
= NODES
# ----------------------------------------------------------------------------------------------------------------------------------

list nodes (ln) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"

list nodes queries (lnq) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"

search nodes (sn) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_nodes"

node active threads (at) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/thread_pool?v&s=node_name,name"

# ----------------------------------------------------------------------------------------------------------------------------------
= SEARCH
# ----------------------------------------------------------------------------------------------------------------------------------

search (s) <index_name> <search_term> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?q=$2&pretty"

search json (sj) <index_name> <search_json> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d "$2"

search match (sm) <index_name> <field_name> <value> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "match": { "'$2'": "'$3'" } } }'

search term (st) <index_name> <field_name> <value> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?pretty" -H 'Content-Type: application/json' -d '{"query": { "term": { "'$2'": "'$3'" } } }'

search summary (ss) <index_name> <search_term> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/$1/_search?size=0&pretty" -H 'Content-Type: application/json' -d '{"aggs": {"count": {"terms": { "field" : "'$2'", "size" : 100 } } } }'

# ----------------------------------------------------------------------------------------------------------------------------------
= TASKS
# ----------------------------------------------------------------------------------------------------------------------------------

list tasks (lt) [<sort_field>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1"

list tasks detail (ltd) [<sort_field>] :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/tasks?v&s=$1"

# ----------------------------------------------------------------------------------------------------------------------------------
= REPOS / SNAPSHOTS
# ----------------------------------------------------------------------------------------------------------------------------------

add repo (are) <repo_name> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty" -H 'Content-Type: application/json' -d '{ "type": "fs", "settings": { "location": "'$1'" } } '

delete repo (dre) <repo_name> :: \
   read -p "Are you sure [yN]? " yn; \
   if [[ ${yn^} == Y ]]; then \
      curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1?pretty"; \
   fi

list repos (lre) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/repositories?v"

create snapshot (csn) <repo_name> <snapshot_name> :: \
   curl -X PUT "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"

delete snapshot (dsn) <repo_name> <snapshot_name> :: \
   read -p "Are you sure [yN]? " yn; \
   if [[ ${yn^} == Y ]]; then \
      curl -X DELETE "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"; \
   fi

list snapshots (lsn) :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_cat/snapshots?v"

snapshot details (snd) <repo_name> <snapshot_name> :: \
   curl -X GET "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2?pretty"

restore snaphot (rsn) <repo_name> <snapshot_name> :: \
   curl -X POST "http://$ES_HOST:$ES_PORT/_snapshot/$1/$2/_restore?pretty"

# ----------------------------------------------------------------------------------------------------------------------------------
= GENERIC
# ----------------------------------------------------------------------------------------------------------------------------------

generic (g) <type-GET/POST/PUT> <api_call> :: curl -X $1 "http://$ES_HOST:$ES_PORT/$2"

query-es settings (qes) :: query-es -s



### overview perf:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/nodes?v&h=ip,port,role,master,cpu,ft,ftt,iic,iif,mt,mtt,d,mcs' | sort

### disk space:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/allocation?v'

### list node attributes:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/nodeattrs?v&s=node'

### get cluster settings - shows what has been set through api, does not show config file settings:
###
### curl -s -u $CRED - XGET $EHOST'/_cluster/settings?pretty'

### debug
### enable debug for every node:
###
### curl -s -u $CRED -XPUT $EHOST'/_cluster/settings?pretty' -d'{"transient": {"logger.discovery.zen":"TRACE"}}'

### debug security logger:
###
### "logger.org.elasticsearch.xpack.security" : "TRACE"
### debug ldap logger:
###
### "logger.org.elasticsearch.xpack.security.authc.ldap" : "TRACE"
### dump of all cluster state: nodes, indexes, shards and placements - BIG:
###
### curl -s -u $CRED -XPUT $EHOST'/_cluster/state'

### overview:
###
### get _cat/nodes?v&s=name&h=name,fielddataMemory,fielddataEvictions
### detailed stats on a per field/node basis:
###
### GET /_nodes/stats/indices/fielddata?fields=*
### performance: request cache
### This cache is hit first on the coordinating node and caches a result in its entirety
###
### full request cache stats on a per cluster and per index basis:
###
### GET /_stats/request_cache?human
### TODO: more
###
### performance: shard cache
### This cache is hit second on the participating nodes and caches the shard contents
###
### https://www.elastic.co/guide/en/elasticsearch/reference/master/shard-request-cache.html
###
### TODO: more
###
### threads
### whats running:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/thread_pool'

### thread pool sizes:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/thread_pool?v&h=node_name,name,size,active,queue,queue_size,largest,min,max&s=node_name,name'

### aliases
### list aliases:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/aliases?v'

### change security/kibana index:
###
### curl -s -u $CRED -XPUT $EHOST'/.kibana/_settings?pretty' -d' {"index" : {"number_of_replicas" : 9, "auto_expand_replicas" : false} }'

### templates
### list templates:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/templates?v'

### get security templates:
###
### curl -s -u $CRED -XGET $EHOST'/_template/security-index-template?pretty'

### shards, replicas & recovery
### view the shard states for an index:
###
### curl -k -s -u $CRED -XGET $EHOST'/_cat/shards/ams-txn-061918_jaro?v&s=index,node,sh&h=index,node,sh,pr,state,docs,store,recoverysource.type,unassigned.reason,unassigned.for'

### explain allocation - explain why we have unallocated shards:
###
### curl -s -u $CRED -XGET $EHOST'/_cluster/allocation/explain?pretty'

### list . indices repl:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/indices/.*?v'

### recovery status:
###
### curl -s -u $CRED -XGET $EHOST'/_cat/recovery?v'

# PUT _cluster/settings
# {
#   "transient": {
#     "cluster.routing.allocation.disk.watermark.low": "100gb",
#     "cluster.routing.allocation.disk.watermark.high": "50gb",
#     "cluster.routing.allocation.disk.watermark.flood_stage": "10gb",
#     "cluster.info.update.interval": "1m"
#   }
# }
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 25/04/22 16:59</p>
