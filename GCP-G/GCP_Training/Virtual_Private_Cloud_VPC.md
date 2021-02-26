---
title: Virtual Private Cloud (VPC) Networks
---

# Overview

- Contained within in a project.

- Global Scope.

- Two VMs on same network and communicate using internal IP addresses even if they are in different regions.

- Two VMS in the same region but on different networks must use external IP addresses to communicate.  Note - this does not mean they go over the internet but to Google edge routers.

- Subnets in regions and Subnets can span zones.  Subnet are an IP address range.

- Have routing tables to forward traffic

- Have a global firewalls

- Have define rules based on metadata tags (eg tag all web servers as web and open all port 80 on these).

- VPC peering - allow two VPC to share traffic.

- Shared VPC.
  
## VPC Types

### Default

- Every project.
- One subnet per region.
- Default firewalls.

### Auto Mode

- Default Networking
- One subnet per region
- Regional IP allocation.
- Fixed /20 subnet per region.
- In the 10.128.0.0/9 cidr block.
- Expandable to /16.

### Customer Mode

- No default subnets.
- Full control of IP ranges.
- Regional IP allocation.
- Expandable to any RFC 1918 size. (Note can expand without recreating, can not shrink).

## External IP Addresses

Note: will get charged for these.

- External IP addresses map to internal IP addresses.

- FQDN - Fully Qualified Domain Name.

- External IP are unknown to the internal OS.

- Allow access from outside the Project.

## Cloud DNS

- GCP DNS translating domain names to IP addresses.

## Alias IP Ranges

- Can assign a range of IP addresses to a single VM.  For example multiple services or containers could each use a different IP address.

## Cloud Load Balancing

- Users get a single, global anycast IP address.

- Cross region load balancing.

- Traffic over Google backbone to closest point-of-presence.

- Traffic route based on backend load.

- Only healthy backends get traffic.

- No pre-warming required.

## 5 VPC Load-balancing Options

(For external traffic)

1. Global HTTP(S) - Layer 7 based on load, Can route different URLS to different backends.

2. Global SSL Proxy - Layer 4 of non-HTTPS SSL based on load.  Supported on specific port numbers.

3. Global TCP Proxy - Layer 4 non-SSL TCP.  Supported on specific port numbers.

4. Regional - Any traffic (TCP, UDP). anycast port number.

(For internal traffic)

5. Regional Internal - Load balancer inside a VPC.  Use for internal tiers of multi-tier apps .  (eg between presentations and business layers).

## Cloud DNS

- Create managed zones then add, edit, delete.

- Programmable using API.

## Cloud CDN (content Delivery Network)

- Uses distributed edge caches to cache content close to users.

- Can use CDN interconnect to use of CDN.

## Interconnect Options

- **VPN** - Secure multi-Gbps over VPN tunnels.

- **Direct Peering** - Private connection between you and Google.  (No SLA).

- **Carrier Peering** - Connect through largest partners network of service providers.

- **Dedicated Interconnect** - Connect N x 10G transport circuits at Google POPs.

## Route and Firewall Rules

### Routes

- Map traffic to destination Networks.

- Are created when a subnet is created.

- Have Network and Instance tags.  No instance tags then all instances can use it.

- Creates routing tables.

- Apply to traffic egressing a VM.

= Forward traffic to the most specific route.

- Destination is in CIDR notation.

- Enable VMs on the same NW to communicate.

### Firewall Rules

- VPC networks functions as a distributed firewall.
  
- Are applied to NW as a whole.
  
- Connections allowed / disallowed and an instance level.
  
- Are stateful.  Once traffic allow, subsequent traffic allowed.
  
- Implied deny all ingress allow all egress even if all firewall rules deleted.

### Firewall Parameters

`direction` - inbound rules matched against **ingress** and outbound rules matched against **egress**

`source` or `destination` - for ingress source can be specified with IP address's, source tags or a source service account.  For egress the destination can be specified with (see ingress).

`protocol` and `port` - Can restrict on protocol or protocol and port.

`action` - allow or deny packets.

`priority` - The order the rules are evaluated until the first matching rule is found.

**Rule Assignment** - rules can be assigned to all instances or specific instances.

With out any firewall there is an implied deny all ingress  allow all egress rule.

### GCP Firewall use case: Egress

**Conditions:**
- Destination CIDR ranges.
- Protocols
- Ports

**Action:**
- Allow: permit the matching egress connection.
- Deny: block the matching egress connection.
  
### GCP Firewall use case: Ingress

Protect against incoming connections.

**Conditions:**
- Destination CIDR ranges
- Protocols
- Ports

**Action:**
- Allow: permit the matching ingress connection.
- Deny: block the matching ingress connection.

### Default Firewalls

![](/GCP-G/GCP_Training/images/default-firewalls.png)

## Pricing

**Ingress** not charged unless a load balancer.

**Egress** not charged where:
- to same zone (internal IP)
- to Google product (YouTube, Maps etc)
- to different GCP service (within same regions - some exceptions)

**Egress** is charged:
- between zones in the same region (per GB)
- ti the same zone (external IP) (per GB)
- between regions (per GB)

**External Ip Addresses** charges (as of 2021):
- Static External IP assign but unused $0.010
- Static and Ephemeral on standard machines $0.004
- Static and Ephemeral on preemptible machines $0.002
- Static and Ephemeral attatched to forwarding rules: no charge.

# Worked Examples

## Expand a Subnet

In the VPC network - change IP address range.


<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 21/03/01 18:36</p>
