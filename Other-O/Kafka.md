---
title: What Is Kafka?

---

# Overview

*"A distributed event streaming platform capable of handling trillions of events a day. Initially conceived as a messaging queue, Kafka is based on an abstraction of a distributed commit log. Since being created and open sourced by LinkedIn in 2011, Kafka has quickly evolved from messaging queue to a full-fledged event streaming platform."*

## Topic

- A Topic is a collection of related messages / events.
- Reading from a Topic does not remove / delete the message from he Topic.
- Think of a Topic as a log file with pointers;
  - One write pointer always pointing to end of log.
  - 'N' read pointers (one per consumer).

## Partition

- A Topic is stored in N Partitions.
- Partitions are stored on and managed by Brokers.
- Can be thought of as a log (file) - although see Segments.

## Segment

- A Partition is stored as Segments (rolling log files) on disks.
- Note: A log is a file which can only be appended to, previous records immutable.

## Broker

- A Broker is an instance of Kafka running on a server (or VM or Docker etc).
- A Broker manages Partitions (and their Segments - log files).

# Kafka In Operation

## Producers

- Producers (1..many) write messages to Kafka.
- Messages are sent to a Topic.
- Producers get and ACK / NACK (negative ACK / error).

## Consumers

- ...

note read from topic does not delete...<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 20/11/30 18:32</p>
