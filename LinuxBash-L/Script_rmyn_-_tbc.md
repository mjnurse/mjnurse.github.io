---
title: rmyn - tbc
---

```bash
#!/bin/bash
help_text="
NAME
   rmyn - One line description.

USAGE
   rmyn [options] <parameters>

OPTIONS
   -x
      Description...

   -h|--help
      Show help text.

DESCRIPTION
   Description description description description.

AUTHOR
  mjnurse.dev - 2020
"
help_line="tbc"
web_desc_line="tbc"

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage=$(echo "Usage: ${tmp%%OPTIONS*}" | tr -d "\n" | sed "s/  */ /g")

if [[ "$1" == "" ]]; then
  echo "${usage}"
  echo "${try}"
  exit 1
fi

if [[ "$1" == "--help" || "$1" == "-h" || "$1" == "?" ]]; then
   echo "$help_text"
   exit
fi

for f in $*; do
  echo "--------------------------------------------------------------------------------"
  echo FILE: $f
  echo "--------------------------------------------------------------------------------"
  more $f
  echo
  read -p "Delete: $f [yN]? " yn
  if [[ "${yn,,}" == "y" ]]; then
    rm  $f
  fi
done
  
```