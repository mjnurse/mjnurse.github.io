---
title: Useful Elasticsearch cURLS
section: Elasticsearch
---

## Syntax Convention:

- `<parameter>` - a parameter to replace with actual values.

- `[<parameter>]` - an optional parameter.

- `${HOSTNAME}` - a bash variable containing the Elasticsearch Host Name.

- `${PORT}` - a bash variable containing the Elasticsearch Port Number.

# Cluster

## Clear Cache

Elasticsearch caches query results which can be use if the same query is run again.  This will clear results from the cache for a single named index or, if no index is specified, all indexes.

```basic
curl -X POST http://${HOSTNAME}:${PORT}/[<index_name>]/_cache/clear
```

## Cluster Stats

Basic Cluster Stats:

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cluster/stats?human
```

Comprehensive Cluster Stats:

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cluster/stats?pretty
```

# Index Manipulation

## Create Index

```basic
curl -X PUT http://${HOSTNAME}:${PORT}/<index_name> -H Content-Type: application/json -d '
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

```basic
curl -X DELETE http://${HOSTNAME}:${PORT}/<index_name>
```

## Open Index

```basic
curl -X POST http://${HOSTNAME}:${PORT}/<index_name>/_open
```

## Close Index

```basic
curl -X POST http://${HOSTNAME}:${PORT}/<index_name>/_close
```

## Enable Read Write

```basic
curl -X PUT http://${HOSTNAME}:${PORT}/<index_name>/_settings -H Content-Type: application/json -d '
{ 
  "index.blocks.read_only_allow_delete": null
}'
```

## Reindex Index

```basic
curl -X POST http://${HOSTNAME}:${PORT}/_reindex -H Content-Type: application/json -d '
{
  "source": {
    "index": "<source_index_name>"
  },
  "dest": {
    "index": "<dest_index_name>"
  }
}'
```

## Forcemerge

```basic
curl -X POST http://${HOSTNAME}:${PORT}/<index_name>/_forcemerge?max_num_segments=<max_num_segments>
```

## Move Shard

```basic
curl -X POST http://${HOSTNAME}:${PORT}/_cluster/reroute -H Content-Type: application/json -d '
{ "commands":[ { "move": { "index": "<index_name>","shard": <shard_num>,"from_node": "<from_node_name>","to_node": "<to_node_name>" } } ] }
'
```

## Alter Number Replicas

```basic
curl -X PUT http://${HOSTNAME}:${PORT}/<index_name>/_settings -H Content-Type: application/json -d '
{ "index": { "number_of_replicas": <number_of_replicas> } }
'
```

## Disable Shard Allocation

```basic
curl -X PUT http://${HOSTNAME}:${PORT}/_cluster/settings -H Content-Type: application/json -d '
{ "persistent": { "cluster.routing.allocation.enable": "primaries" } }
'
```

## Re-enable Shard Allocation

```basic
curl -X PUT http://${HOSTNAME}:${PORT}/_cluster/settings -H Content-Type: application/json -d '
{ "persistent": { "cluster.routing.allocation.enable":null } }
'
```

# Index Interrogation 

## List Aliases

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/aliases?v&s=[<order_by_field_name>]
```

## List Indices

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/indices/[<index_name>]?v&h=health,status,index,pri,rep,docs.count,docs.deleted,store.size,pri.store.size&s=index
```

## List Shards

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/shards/[<index_name>]?v&h=index,shard,prirep,state,docs,store,node&s=index,shard,prirep
```

## List Shard Details

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/shards/[<index_name>]?v&h=index,shard,prirep,state,docs,store,ip,segments.count,unassigned.reason,unassigned.for,node&s=[<order_by_field_name>]
```

## List Segments

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/segments/[<index_name>]?v&s=index,shard,prirep
```

## List Segmented Shards

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/shards/[<index_name>]?v&h=index,shard,prirep,state,docs,node,segments.count&s=index,shard,prirep,node
```

## Get Index Mapping

```basic
curl -X GET http://${HOSTNAME}:${PORT}/<index_name>/_mapping?pretty
```

## List Unassigned Shards

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/shards?v&h=index,shard,prirep,state,docs,segments.count&s=index,shard,prirep
```

## Forcemerge Progress

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/nodes?v&h=name,cpu,load_1m,merges.current,merges.current_docs,merges.total,merges.total_docs&s=name
```

# Index Entry Manipulation

## Add Entry

```basic
curl -X POST http://${HOSTNAME}:${PORT}/<index_name>/_doc -H Content-Type: application/json -d <entry_json>
```

# Nodes

## List Nodes

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name
```

## List Nodes Queries

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/nodes?v&h=name,ip,nodeRole,m,heapPercent,ramPercent,cpu,load_1m,load_5m,load_15m,disk.total,disk.used_percent&s=name
```

## Search Nodes

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_nodes
```

## Node Active Threads

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/thread_pool?v&s=node_name,name
```

# Search

## Search

```basic
curl -X GET http://${HOSTNAME}:${PORT}/<index_name>/_search?q=<search_term>&pretty
```

## Search Json

```basic
curl -X GET http://${HOSTNAME}:${PORT}/json/_search?q=<index_name>&pretty
```

## Search Summary

```basic
curl -X GET http://${HOSTNAME}:${PORT}/summary/_search?q=<index_name>&pretty
```

# Tasks

## List Tasks

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=[<sort_field>]
```

## List Tasks Detail

```basic
curl -X GET http://${HOSTNAME}:${PORT}/_cat/tasks?v&h=action,type,start_time,timestamp,running_time,node&s=detail
```


<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 21/02/23 12:14</p>
