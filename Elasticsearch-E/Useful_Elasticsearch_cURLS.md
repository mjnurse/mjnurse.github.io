---
title: Useful Elasticsearch cURLS
section: Elasticsearch
---

## Syntax Convention:

- `<parameter>` - a parameter to replace with actual values.

- `[<parameter>]` - an optional parameter.

# Cluster

## Clear Cache

Elasticsearch caches query results which can be use if the same query is run again.  This will clear results from the cache for a single named index or, if no index is specified, all indexes.

```bash
# .../[<index_name>]/_cache/clear

curl -X POST "http://localhost:9200/_cache/clear"
```

## Cluster Stats

```bash
# Basic Cluster Stats:

curl -X GET "http://localhost:9200/_cluster/stats?human"

#Comprehensive Cluster Stats:

curl -X GET "http://localhost:9200/_cluster/stats?pretty"
```

# Index Manipulation

## Create Index

```bash
curl -X PUT "http://localhost:9200/<index_name>" \ 
     -H "Content-Type: application/json" -d '
{ 
  "settings": { 
    "index": { 
      "number_of_shards": <number_of_shards>,
      "number_of_replicas": <number_of_replicas>
    }
  }
}'
```

## Delete Index

```bash
curl -X DELETE "http://localhost:9200/<index_name>"
```

## Open / Close Index

```bash
# Open Index

curl -X POST "http://localhost:9200/<index_name>/_open"

# Close Index

curl -X POST "http://localhost:9200/<index_name>/_close"
```

## Enable Read Write

```bash
curl -X PUT "http://localhost:9200/<index_name>/_settings" \
     -H "Content-Type: application/json" -d '
{ 
  "index.blocks.read_only_allow_delete": null
}'
```

## Reindex Index

```bash
curl -X POST "http://localhost:9200/_reindex" \
     -H "Content-Type: application/json" -d '
{
  "source": { "index": "<source_index_name>" },
  "dest": { "index": "<dest_index_name>" }
}'
```

## Forcemerge

```bash
curl -X POST "http://localhost:9200/<index_name>/_forcemerge?max_num_segments=<num>"
```

## Move Shard

```bash
curl -X POST "http://localhost:9200/_cluster/reroute" \
     -H "Content-Type: application/json" -d '
{ 
  "commands": [ {
    "move": {
      "index": "<index_name>",
      "shard": <shard_num>,
      "from_node": "<from_node_name>",
      "to_node": "<to_node_name>"
    } 
  } ]
}'
```

## Alter Number Replicas

```bash
curl -X PUT "http://localhost:9200/<index_name>/_settings" \
     -H "Content-Type: application/json" -d '
{
  "index": { "number_of_replicas": <number_of_replicas> }
}'
```

## Disable / Enable Shard Allocation

```bash
# Disable

curl -X PUT "http://localhost:9200/_cluster/settings" \
     -H "Content-Type: application/json" -d '
{
  "persistent": { "cluster.routing.allocation.enable": "primaries" }
}'

# Re-enable

curl -X PUT "http://localhost:9200/_cluster/settings" \
     -H "Content-Type: application/json" -d '
{ 
  "persistent": { "cluster.routing.allocation.enable": null }
}'
```

# Index Interrogation 

```bash
# List Aliases

curl -X GET "http://localhost:9200/_cat/aliases?v"

# List Indices (.../_cat/indices/[<index_name>]...)

curl -X GET "http://localhost:9200/_cat/indices/?v"\
"&h=health,status,index,pri,rep,docs.count,docs.deleted,store.size,pri.store.size"\
"&s=index"

# List Shards (.../_cat/shards/[<index_name>]...)

curl -X GET "http://localhost:9200/_cat/shards/?v"\
"&h=index,shard,prirep,state,docs,store,node&s=index,shard,prirep"\
"&s=index"

# List Shard Details

curl -X GET "http://localhost:9200/_cat/shards/?v"\
"&h=index,shard,prirep,state,docs,store,ip,segments.count,"\
"unassigned.reason,unassigned.for,node&s=[<order_by_field_name>]"

# List Segments

curl -X GET "http://localhost:9200/_cat/segments/?v&s=index,shard,prirep"

# Get Index Mapping

curl -X GET "http://localhost:9200/<index_name>/_mapping?pretty"

# Forcemerge Progress

curl -X GET "http://localhost:9200/_cat/nodes?v"\
"&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs"\
"&s=name"
```

# Index Entry Manipulation

```bash
# Add Entry

curl -X POST "http://localhost:9200/<index_name>/_doc" \
     -H "Content-Type: application/json" -d '
{ 
  <entry_json>
}'
```

# Nodes

```bash
# List Nodes

curl -X GET "http://localhost:9200/_cat/nodes?v"\
"&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent"\
"&s=name"

# List Nodes Queries

curl -X GET "http://localhost:9200/_cat/nodes?v"\
"&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent"\
"&s=name"

# Search Nodes

curl -X GET "http://localhost:9200/_nodes"

# Node Active Threads

curl -X GET "http://localhost:9200/_cat/thread_pool?v&s=node_name,name"
```

# Search

This need completing...

```bash
# Search

curl -X GET "http://localhost:9200/<index_name>/_search?q=<search_term>&pretty"

# Search Json

curl -X GET "http://localhost:9200/json/_search?q=<index_name>&pretty" \
     -H "Content-Type: application/json" -d '
{ 
  <search_json>
}'

# Search Summary

curl -X GET "http://localhost:9200/summary/_search?q=<index_name>&pretty"
```

# Tasks

```bash
# List Tasks

curl -X GET "http://localhost:9200/_cat/tasks?v"\
"&h=action,type,start_time,timestamp,running_time,node"

```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/02/09 18:40</p>
