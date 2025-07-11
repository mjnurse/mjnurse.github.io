---
title: dc.def
---

```bash
# Docker

# -------------------------------------------------------------------------------------------------
= CONTAINERS
# -------------------------------------------------------------------------------------------------

delete container (rm) <container_name> :: \
    read -p "Are you sure [yN]? " yn; \
    if [[ ${yn^} == Y ]]; then \
        docker rm $1; \
    fi

list containers (ps) [-d] :: \
    if [[ $1 == -d ]]; then docker ps --all; \ 
    else \
        tmp="$(docker ps --all --format 'table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Size}}')"; \
        echo "$tmp" | head -n1; \
        echo "$tmp" | tail -n+2 | grep 'Up [0-9]* min' | sort -k2,2; \
        echo "$tmp" | tail -n+2 | grep -v 'Up [0-9]* min' | sort -k 2,2; \
    fi \
    ## -d: show details

logs (lo) [-f] <container-name> :: \
    if [[ $1 == -f ]]; then docker logs -f $2; else docker logs $1; fi \
    ## -f: follow log

pull container (pu) <container_name> :: \
    docker pull $1

rename container (mv) <current_name> <new_name> :: \
    docker rename $1 $2

restart container (re) <container_name> :: \
    docker restart $1

run container (ru) <source-container-name> <deployed-container-name> [-p <host-port>:<container-port>] :: \
    if [[ $3 == -p ]]; then \
        docker run -d $3 $4 $5 $6 --name $2 $1; \
    else \
        docker -d --name $2 $1; \
    fi

shell (sh) [-s] [-r] <container_name> :: \
    tmp_shell=bash; tmp_user=""; \
    while [[ "$1" != "" ]]; do \
        case $1 in \
            -s) tmp_shell=sh;; \
            -r) tmp_user="--user root";; \
            *) break;; \
        esac; \
        echo $1; shift; \ 
    done; \
    docker exec -it $tmp_user $1 $tmp_shell \
    ## bash shell. -s: sh, -r: user root

start container (st) [-a] <container_name> :: docker start $1

stats (s) :: docker stats

stop container (so) [-a] <container_name> :: \
    if [[ $1 == -a ]]; then \
        conts="$(docker ps -q)"; \
        if [[ "$conts" != "" ]]; then \
            docker stop $conts; \
        fi; \
    else \
        docker stop $1; \
    fi \
    ## -a: Stop all containers

# -------------------------------------------------------------------------------------------------
= COMPOSE
# -------------------------------------------------------------------------------------------------

compose down (cdo) [<service>] :: \
    if [[ "$1" == "" ]]; then \
        docker compose down; \
    else \
        docker compose -f $1 down; \
    fi; \
    ## Stop and remove containers, networks

compose restart (cre) [<service>] :: \
    if [[ "$1" == "" ]]; then \
        docker compose restart; \
    else \
        docker compose -f $1 restart; \
    fi; \
    ## Restart all containers

compose up (cup) [<service>] :: \
    if [[ "$1" == "" ]]; then \
        docker compose up -d; \
    else \
        docker compose -f $1 up -d; \
    fi; \
    ## Deploy and run containers, networks

# -------------------------------------------------------------------------------------------------
= NETWORKS
# -------------------------------------------------------------------------------------------------

list networks (ln) :: docker network ls

prune networks (pn) :: docker network prune ## Remove all unusaed custom networks

remove network (rn) <network-name> :: docker network rm $1
```
