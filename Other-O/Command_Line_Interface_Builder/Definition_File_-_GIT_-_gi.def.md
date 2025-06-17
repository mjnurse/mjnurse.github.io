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

push (p) [<-f|--force>] [<message>] :: \
    force_yn=n; \
    if [[ $1 == -f || $1 == --force ]]; then \
        force_yn=y; \
        shift; \
    fi; \
    if [[ "$1" == "" ]]; then \
        message="Various"; \
    else \
        message="$1"; \
    fi; \
    [ -f ./gen-readme ] && ./gen-readme; \
    git add .; \
    git status; \
    if [[ "$1" != "-f" ]]; then \
        read -p 'Press a key to continue, CTRL-C to abort' dummy; \
    fi; \
    git commit -m 'Various'; \
    git push origin
```
