---
title: gi.def
---

```bash
# GIT

# ---------------------------------------------------------------------------------------
= HISTORY
# ---------------------------------------------------------------------------------------

history (h) :: \
  git log > /tmp/gi1; \
  while read line; do echo $line; \ 
    if [[ ${line:0:6} == commit ]]; then \
      git diff-tree --no-commit-id --name-only -r ${line:7:99} | \
        tr "\n" " " | fold -s -w 100; echo; \
    fi; \
  done < /tmp/gi1 | \
  sed "s/^  *//; /^$/d; s/^commit/${l80}\n${c_yel}Commit:/" | \
  sed "s/^Author/${c_lcya}Author/; s/^Date/${c_lgre}Date/; s/$/${c_whi}/" > /tmp/gi2; \
  echo -e "$(cat /tmp/gi2)"; \
  rm -f /tmp/gi1 /tmp/gi2

# ---------------------------------------------------------------------------------------
= STATUS
# ---------------------------------------------------------------------------------------

status (s) :: git status

# ---------------------------------------------------------------------------------------
= ADD/COMMIT
# ---------------------------------------------------------------------------------------

push (p) [-f|--force] [<message>] :: \
  force_yn=n; \
  if [[ $1 == -f || $1 == --force ]]; then \
    force_yn=y; \
    shift; \
  fi; \
  echo $1


git add .
git status

if [[ "$1" != "-f" ]]; then
  read -p 'Press a key to continue'
fi

git commit -m 'Various'
git push origin master

# 
# list aliases (la) [<filter>] [<order_by_field_name>] :: \
#    query-es -o GET -a "_cat/aliases?v&s=$2" -r 1 -f '1p;t; s/\(.*'$1'.*$\)/\1/;t;d'
# 
# list indices (li) [<index_name>] :: \
#    query-es -o GET -a "_cat/indices/$1?v&h=health,status,index,pri,rep,docs.count,docs.deleted,store.size,pri.store.size&s=index" -r 1
# 
# list shards (ls) [<index_name>] :: \
#    query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,node&s=index,shard,prirep" -r 1
# 
# list shard details (lsd) [<index_name>] [<order_by_field_name>] :: \
#    query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=$2"
# 
# list segments (le) [<index_name>] :: \
#    query-es -o GET -a "_cat/segments/$1?v&s=index,shard,prirep"
# 
# list segmented shards (lss) [<index_name>] :: \
#    query-es -o GET -a "_cat/shards/$1?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node" -f '/ 1$/d'
# 
# get index mapping (gim) <index_name> :: \
#    query-es -o GET -a "/$1/_mapping?pretty"
# 
# list unassigned shards (lus) :: query-es -o GET -a "_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep" \
#    -f 's/\(.* \(INITIALIZING\|UNASSIGNED\) .*\)/\1/;t;d'
# 
# forcemerge progress (fmp) :: \
#    query-es -o GET -a "/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name"
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = INDEX MANIPULATION
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# create index (ci) <index_name> <number_of_shards> <number_of_replicas> :: \
#    query-es -o PUT -a "$1" -j '{"settings":{"index":{"number_of_shards":'$2',"number_of_replicas":'$3'}}}'
# 
# delete index (di) <index_name> :: \
#    query-es -o DELETE -a "$1"
# 
# open index (opi) <index_name> :: \
#    query-es -o POST -a "$1/_open"
# 
# close index (cli) <index_name> :: \
#    query-es -o POST -a "$1/_close"
# 
# enable read write (erw) <index_name> :: \
#    query-es -o PUT -a "$1/_settings" -j '{"index.blocks.read_only_allow_delete": null}'
# 
# reindex index (ri) <source_index_name> <dest_index_name> :: \
#    query-es -o POST -a "_reindex" -j '{"source":{"index":"'$1'"},"dest":{"index":"'$2'"}}'
# 
# forcemerge (fm) <index_name> <max_num_segments> :: \
#    query-es -o POST -a "$1/_forcemerge?max_num_segments=$2"
# 
# move shard (ms) <index_name> <shard_num> <from_node_name> <to_node_name> :: \
#    query-es -o POST -a "_cluster/reroute" -j '{"commands":[{"move":{"index":"'$1'","shard":'$2',"from_node":"'$3'","to_node":"'$4'"}}]}'
# 
# alter number replicas (anr) <index_name> <number_of_replicas> :: \
#    query-es -o PUT -a "$1/_settings" -j '{"index":{"number_of_replicas":'$2'}}'
# 
# disable shard allocation (dsa) :: \
#    query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":"primaries"}}'
# 
# reenable shard allocation (rsa) :: \
#    query-es -o PUT -a "_cluster/settings" -j '{"persistent":{"cluster.routing.allocation.enable":null}}'
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = INDEX ENTRY MANIPULATION
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# add entry (ae) <index_name> <entry_json> :: query-es -o POST -a /$1/_doc -j "$2"
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = NODES
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# list nodes (ln) :: \
#    query-es -r 1 -o GET -a "_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name"
# 
# list nodes queries (lnq) :: \
#    query-es -r 1 -o GET -a "_cat/nodes?v&h=name,nodeRole,search,queryTotal,searchFetchTotal,requestCacheHitCount&s=name"
# 
# search nodes (sn) :: \
#    query-es -o GET -a "_nodes" -f "$1"
# 
# node active threads (at) :: \
#    query-es -o GET -a "_cat/thread_pool?v&s=node_name,name" \
#             -f 's/\(.*node_name.*\|.* [1-9] .*$\)/\1/;t;d'
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = SEARCH
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# search (s) <index_name> <search_term> :: \
#    query-es -o GET -a "$1/_search?q=$2&pretty"
# 
# search json (sj) <index_name> <search_json> :: \
#    query-es -o GET -a "$1/_search?pretty" -j "$2"
# 
# search summary (ss) <index_name> <search_term> :: \
#    query-es -o GET -a "$1/_search?q=$Qzz\("took":[0-9]*\).*\("_shards":{[^}]*}\).*\("total":[0-9]*,"max_score":[0-9\.]*\)/\1 \2 \3"
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = TASKS
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# list tasks (lt) [<sort_field>] :: \
#    query-es -o GET -a "/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=$1" \
#             -f '/monitor\/tasks\/lists/d'
# 
# list tasks detail (ltd) [<sort_field>] :: \
#    query-es -o GET -a "/_cat/tasks?v&s=$1"
# 
# # ----------------------------------------------------------------------------------------------------------------------------------
# = GENERIC
# # ----------------------------------------------------------------------------------------------------------------------------------
# 
# generic (g) <type-GET/POST/PUT> <api_call> :: query-es -o $1 -a "$2"
# 
# 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/indices?help'
# 
# ### _cat api provides compact columns for human readability
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cluster/stats?human&pretty'
# 
# ### overview perf:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/nodes?v&h=ip,port,role,master,cpu,ft,ftt,iic,iif,mt,mtt,d,mcs' | sort
# 
# ### disk space:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/allocation?v'
# 
# ### list node attributes:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/nodeattrs?v&s=node'
# 
# ### get cluster settings - shows what has been set through api, does not show config file settings:
# ### 
# ### curl -s -u $CRED - XGET $EHOST'/_cluster/settings?pretty'
# 
# ### debug
# ### enable debug for every node:
# ### 
# ### curl -s -u $CRED -XPUT $EHOST'/_cluster/settings?pretty' -d'{"transient": {"logger.discovery.zen":"TRACE"}}'
# 
# ### debug security logger:
# ### 
# ### "logger.org.elasticsearch.xpack.security" : "TRACE"
# ### debug ldap logger:
# ### 
# ### "logger.org.elasticsearch.xpack.security.authc.ldap" : "TRACE" 
# ### dump of all cluster state: nodes, indexes, shards and placements - BIG:
# ### 
# ### curl -s -u $CRED -XPUT $EHOST'/_cluster/state'
# 
# ### overview:
# ### 
# ### get _cat/nodes?v&s=name&h=name,fielddataMemory,fielddataEvictions
# ### detailed stats on a per field/node basis:
# ### 
# ### GET /_nodes/stats/indices/fielddata?fields=* 
# ### performance: request cache
# ### This cache is hit first on the coordinating node and caches a result in its entirety
# ### 
# ### full request cache stats on a per cluster and per index basis:
# ### 
# ### GET /_stats/request_cache?human
# ### TODO: more 
# ### 
# ### performance: shard cache
# ### This cache is hit second on the participating nodes and caches the shard contents
# ### 
# ### https://www.elastic.co/guide/en/elasticsearch/reference/master/shard-request-cache.html
# ### 
# ### TODO: more
# ### 
# ### threads
# ### whats running:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/thread_pool'
# 
# ### thread pool sizes:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/thread_pool?v&h=node_name,name,size,active,queue,queue_size,largest,min,max&s=node_name,name'
# 
# ### aliases
# ### list aliases:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/aliases?v'
# 
# ### change security/kibana index:
# ### 
# ### curl -s -u $CRED -XPUT $EHOST'/.kibana/_settings?pretty' -d' {"index" : {"number_of_replicas" : 9, "auto_expand_replicas" : false} }'
# 
# ### templates
# ### list templates:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/templates?v'
# 
# ### get security templates:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_template/security-index-template?pretty'
# 
# ### shards, replicas & recovery
# ### view the shard states for an index:
# ### 
# ### curl -k -s -u $CRED -XGET $EHOST'/_cat/shards/ams-txn-061918_jaro?v&s=index,node,sh&h=index,node,sh,pr,state,docs,store,recoverysource.type,unassigned.reason,unassigned.for'
# 
# ### set replicas for all gsna* indices that are open:
# ### 
# ### curl -s -u $CRED -XPUT $EHOST'/gsna*/_settings?pretty&expand_wildcards=open' -d' {   "index" : {"number_of_replicas" : 2} }'
# 
# ### explain allocation - explain why we have unallocated shards:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cluster/allocation/explain?pretty'
# 
# ### list . indices repl:
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/indices/.*?v'
# 
# ### recovery status: 
# ### 
# ### curl -s -u $CRED -XGET $EHOST'/_cat/recovery?v' 
# 
# # PUT _cluster/settings
# # {
# #   "transient": {
# #     "cluster.routing.allocation.disk.watermark.low": "100gb",
# #     "cluster.routing.allocation.disk.watermark.high": "50gb",
# #     "cluster.routing.allocation.disk.watermark.flood_stage": "10gb",
# #     "cluster.info.update.interval": "1m"
# #   }
# # }
```
