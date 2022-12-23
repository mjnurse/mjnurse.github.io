---
title: Section 4 - Managed Services
layout: page-with-contents-list
---

# Overview

We have:

### IaaS (Infrastructure as a Service)

Cloud provides: VMs.

We are responsible for: Application Code and Runtime, Configuring load balancing, Auto scaling, OS upgrades and patches, Availability, etc..

### PaaS (Platform as a Service)

Cloud provides: OS (incl. upgrades and patches), Application Runtime, Auto scaling, Availability & Load balancing etc..

we are responsible for: Configuration (of Application and Services), Application code.

Also:

- CaaS (Container as a Service) - containers instead of apps.
- FaaS (Function as a Service) - functions instead of apps.
- Databases - Relational & NoSQL (Amazon RDS, Google Cloud SQL, Azure SQL Database etc) 
- Queues, AI, ML, Operations, etc..

### Serverless

We don't need to worry about servers, OS, scaling, availability.

Typically pay for use - no use - no cost.

# GCP Managed Services For Compute

Service | Details | Category
--------|---------|---------
Compute Engine | High-performance and general purpose VMs that scale globally. | IaaS
Google Kubernetes Engine | Orchestrate containerized microservices on Kubernetes.  Needs advanced cluster configuration and monitoring. | CaaS
App Engine  | Build highly scalable applications on a fully managed platform using open and familiar languages and tools. | PaaS (CaaS, Serverless)
Cloud Functions | Build event driven applications using simple, single-purpose functions. | FaaS, Serverless
Cloud Run | Develop and deploy highly scalable containerized applications. | CaaS (Serverless)

# App Engine

Simple way to deploy and scale your applications in GCP.  Provides end-to-end application management.

Supports:

- Go, Java, .NET, Node.js, PHP, Python, Ruby using pre-configured runtimes.
- Use custom run-time and write code in any language.
- Connect to variety of Google Cloud storage products (Cloud SQL etc).

No usage charges - Pay for resources provisioned

Features:

- Automatic load balancing & Auto scaling.
- Managed platform updates & Application health monitoring.
- Application versioning.
- Traffic splitting.

## App Engine Environments

### Standard - Applications run in language specific sandboxes

- Complete isolation from OS/Disk/Other Apps.
- V1: Java, Python, PHP, Go (OLD Versions).
  - ONLY for Python and PHP runtimes: Restricted network Access, Only white-listed extensions and libraries are allowed.
  - No Restrictions for Java and Go runtimes.
- V2: Java, Python, PHP, Node.js, Ruby, Go (NEWER Versions).
  - Full Network Access and No restrictions on Language Extensions.

### Flexible - Application instances run within Docker containers

- Makes use of Compute Engine virtual machines.
- Support ANY runtime (with built-in support for Python, Java, Node.js, Go, Ruby, PHP, or .NET) so long as it can be made into a container.
- Provides access to background processes and local disks.

## Application Hierarchy

**Application** (one per project).

Contains one or more:

**Services** (previously called modules.  Each service can have different settings).
   
Contain one or more:

**Versions** (multiple versions of a service can be deployed with options to rollback and divide traffic).

Contain one or more:

**Instances** (multiple instances of each service version can be deployed).

## Standard vs Flexible

Feature | Standard | Flexible
--------|----------|---------
Pricing Factors | Instance hours | vCPU, Memory & Persistent Disks
Scaling | Manual, Basic, Automatic | Manual, Automatic
Scaling to zero | Yes | No. Minimum one instance
Instance startup time | Seconds | Minutes
Rapid Scaling | Yes | No
Max. request timeout | 1 to 10 minutes | 60 minutes
Local disk | Yes (except for Python, PHP). Can write to /tmp. | Yes. Ephemeral. New Disk on startup.
SSH (for debugging) | No | Yes



<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/12/23 14:07</p>