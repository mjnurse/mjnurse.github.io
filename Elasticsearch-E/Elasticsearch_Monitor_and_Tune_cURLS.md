---
title: Elasticsearch Monitor and Tune `cUR`````````LS
layout: page-with-contents-list
---

# General monitoring API endpoints

| Stats from all nodes | `curl 'localhost:9200/_nodes/stats'` |
| Stats from specific nodes | `curl 'localhost:9200/_nodes/node1,node2/stats'` |
| Stats from a specific index | `curl 'localhost:9200/<INDEX_NAME>/_stats'` |
| Cluster-wide stats | `curl 'localhost:9200/_cluster/stats'` |

### Cluster health—more info

| Cluster status & unassigned shards | `curl 'localhost:9200/_cat/health?v'` |
Search performance—more info

| Total number of queries | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryTotal'` |
| Total time spent on queries | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryTime'` |
| Number of queries currently in progress | `curl 'localhost:9200/_cat/nodes?v&h=name,searchQueryCurrent'` |
| Total number of fetches | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchTotal'` |
| Total time spent on fetches | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchTime'` |
| Number of fetches currently in progress | `curl 'localhost:9200/_cat/nodes?v&h=name,searchFetchCurrent'` |
Indexing performance—more info

| Total number of documents indexed | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexTotal'` |
| Total time spent indexing documents | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexTime'` |
Number of documents currently being
| indexed | `curl 'localhost:9200/_cat/nodes?v&h=name,indexingIndexCurrent'` |
| Total number of index flushes to disk | `curl 'localhost:9200/_cat/nodes?v&h=name,flushTotal'` |
| Total time spent on flushing indices to disk | `curl 'localhost:9200/_cat/nodes?v&h=name,flushTotalTime'` |
JVM heap usage—more info

| Garbage collection frequency and duration | `curl 'localhost:9200/_nodes/stats/jvm' | jq '.nodes[] | {node_` |
name: .name, young_gc_count:
.jvm.gc.collectors.young.collection_count, young_gc_time: .jvm.
gc.collectors.young.collection_time_in_millis,
old_gc_count: .jvm.gc.collectors.old.collection_count,
old_gc_time:
.jvm.gc.collectors.old.collection_time_in_millis}'
| Percent of JVM heap currently in use | `curl 'localhost:9200/_cat/nodes?v&h=name,heapPercent'` |
Pending tasks

| Number of pending tasks | `curl 'localhost:9200/_cluster/pending_tasks'` |
Thread pool queues & rejections—more info

| Number of queued threads in a thread pool | `curl 'localhost:9200/_nodes/stats/thread_pool' | jq '.nodes[] |` |
{node_name: .name, bulk_queue: .thread_pool.bulk.queue, search_
queue: .thread_pool.search.queue, index_queue: .thread_pool.
index.queue}'
| Number of rejected threads in a thread pool | `curl 'localhost:9200/_nodes/stats/thread_pool' |` |
jq '.nodes[] | {node_name: .name, bulk_rejected:
.thread_pool.bulk.rejected, search_rejected:
.thread_pool.search.rejected, index_rejected:
.thread_pool.index.rejected}'
Fielddata cache usage

| Size of the fielddata cache (bytes) | `curl 'localhost:9200/_cat/nodes?v&h=name,fielddataMemory'` |
Number of evictions from the fielddata
| cache | `curl 'localhost:9200/_cat/nodes?v&h=name,fielddataEvictions'` |
Number of times the fielddata circuit breaker
| has been tripped (ES version >=1.3) | `curl 'localhost:9200/_nodes/stats/breaker' | jq '.nodes[] |` |
{node_name: .name, fielddata: .breakers.fielddata}'
Host-level network and system metrics—more info

Disk space total, free,
| available | `curl 'localhost:9200/_nodes/stats/fs' | jq '.nodes[] | {node_name:` |
.name, disk_total_in_bytes: .fs.total.total_in_bytes,
disk_free_in_bytes: .fs.total.free_in_bytes, disk_available_in_bytes:
.fs.total.available_in_bytes}'
| Percent of disk in use | `curl 'localhost:9200/_cat/allocation?v'` |
| Memory | `curl 'localhost:9200/_nodes/stats/os'` |
| CPU | `curl 'localhost:9200/_nodes/stats/os'` |
I/O utilization Consult a tool like iostat
Used file descriptors
percentage
curl 'localhost:9200/_cat/nodes?v&h=host,name,fileDescriptorPercent'
| Network bytes sent/received | `curl 'localhost:9200/_nodes/stats/transport' | jq '.nodes[] |` |
{node_name: .name, network_bytes_sent: .transport.tx_size_in_bytes, network_
bytes_received: .transport.rx_size_in_bytes}'
HTTP connections currently
| open & total opened over time | `curl 'localhost:9200/_nodes/stats/http' | jq '.nodes[] | {node_name: .name,` |
http_current_open: .http.current_open, http_total_opened:
.http.total_opened}'
Default directories
DEBIAN/UBUNTU RHEL/CENTOS ZIP OR TAR INSTALLATION
Configuration /etc
↳/elasticsearch
/etc
↳/elasticsearch
<ELASTICSEARCH INSTALLATION HOME
DIRECTORY>/config
Logs /var/log
↳/elasticsearch
/var/log
↳/elasticsearch
<ELASTICSEARCH INSTALLATION HOME
DIRECTORY>/logs
Data /var/lib
↳/elasticsearch
 ↳/data
/var/lib
↳/elasticsearch
<ELASTICSEARCH INSTALLATION HOME
DIRECTORY>/data


Unassigned shards—more info
Check which shards are unassigned:
curl 'localhost:9200/_cat/shards' | grep UNASSIGNED
SUGGESTED ACTION COMMAND
Reduce number of replicas for an index
(master will not assign multiple copies of a
shard on the same node)
curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"number_
of_replicas": <DESIRED NUMBER OF REPLICAS>}'
| Re-enable shard allocation | `curl -XPUT 'localhost:9200/_cluster/settings' -d '{"transient":` |
{"cluster.routing.allocation.enable": "all"}}'
| Manually allocate an unassigned shard | `curl -XPOST 'localhost:9200/_cluster/reroute' -d '{"commands":` |
[{"allocate": {"index": "<INDEX_NAME>", "shard": <SHARD_NUMBER>,
"node": "<NODE_NAME>"}}]}'
Check disk usage; master node will not
assign shards to any node using >85% of
disk
curl 'localhost:9200/_cat/allocation?v'
Check that every node is running the same
version of Elasticsearch; master node will
not assign to older version
curl 'localhost:9200/_cat/nodes?v&h=host,name,version'
Search performance—more info
Log slow queries in slow search log (replace with your desired thresholds):
curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{
 "index.search.slowlog.threshold.query.warn" : "10s",
 "index.search.slowlog.threshold.fetch.debug": "500ms",
 "index.indexing.slowlog.threshold.index.info": "5s"
}'
SUGGESTED ACTION COMMAND
Route high-priority, low-volume documents
of
a <DOC_TYPE> to the same place so only one shard will be queried
curl -XPUT 'localhost:9200/<INDEX_NAME>' -d '{"mappings": {"<DOC_
TYPE>": {"_routing": {"required": true}}}}'
Merge segments in an index ES versions 2.1.0+:
curl -XPOST 'localhost:9200/<INDEX_NAME>/_forcemerge'
ES versions prior to 2.1.0:
curl -XPOST 'localhost:9200/<INDEX_NAME>/_optimize'
Indexing performance—more info
SUGGESTED ACTION COMMAND
Bulk index documents from a JSON
file
curl -XPOST 'localhost:9200/<INDEX_NAME>/<MY_TYPE>/_bulk?pretty'
--data-binary "@<YOUR_FILE>.json"
Increase refresh interval to optimize
indexing, rather than making new
data immediately searchable
curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"index":
{"refresh_interval": DESIRED_INTERVAL, e.g. "30s"}}'
Disable merge throttling to leave
more
resources for indexing, not merging
curl -XPUT 'localhost:9200/_cluster/settings' -d '{"transient":
{"indices.store.throttle.type": "none"}}'
| Disable shard replication | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d` |
'{"number_of_replicas": 0}'
Commit translog to disk less
| frequently | `curl -XPUT 'localhost:9200/<INDEX_NAME>/_settings' -d '{"index":` |
{"translog": {"durability": "async"}}}'
Tune the JVM heap size
Note: The Elasticsearch docs recommend setting your heap size below 50% of a node's available memory (and never going above 32GB), to leave more memory for the file system cache.
SUGGESTED ACTION COMMAND
Set heap size upon starting up Elasticsearch ES_HEAP_SIZE=DESIRED_SIZE (e.g. "3g")
./bin/elasticsearch
Set heap as an environment variable
(requires Elasticsearch restart) export ES_HEAP_SIZE=DESIRED_SIZE (e.g. 3g)
Bulk rejections—more info
Implement a linear or exponential backoff strategy until the bulk rejections decrease.
Backlog of pending tasks
ʒ Allocate more resources to master-eligible nodes. ʒ Create a new cluster if you suspect that the current cluster's demands have outgrown the master's capabilities. ʒ Make sure your mappings do not allow users to create an unlimited number of new fields in documents.
Fielddata usage
SUGGESTED ACTION COMMAND
Enable doc values for a non-analyzed string
field (enabled by default for ES versions
2.0+)
curl -XPUT 'localhost:9200/<INDEX_NAME>/_mapping/<DOC_TYPE>'
-d '{"properties": {"<FIELD_NAME>": {"type": "string", "index":
"not_analyzed", "doc_values": true }}}'



<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 23/06/20 14:23</p>
