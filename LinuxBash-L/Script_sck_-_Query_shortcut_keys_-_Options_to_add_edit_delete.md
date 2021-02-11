---
title: sck - Query shortcut keys - Options to add edit delete
---

```bash
#!/bin/bash
help_text="
NAME
  sck - Query shortcut keys.  Options to add, edit, delete.

USAGE
  sck [options] <parameters>

OPTIONS
  -h|--help
    Show help text.

DESCRIPTION
  Query shortcut keys. To show all records use \".\" as the search string.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Query shortcut keys.  Options to add, edit, delete."
web_desc_line="Query shortcut keys - Options to add edit delete"

sck_csv="/c/MJN/github/shortcut-keys/sck.csv"
tmp_file="/tmp/sck.tmp"

try="Try \"${0##*/} -h\" for more information"
tmp="${help_text##*USAGE}"
usage="$(echo Usage: ${tmp%%OPTIONS*})"

if [[ "$1" == "" ]]; then
  echo "${usage}"
  echo "${try}"
  echo "     \"sck .\" to list all records"
  exit 1
fi

gen_md_yn=n

while [[ "$1" != "" ]]; do
  case $1 in 
    -h|--help)
      echo "$help_text"
      exit
      ;;
    -a|--add)
      shift
      if [[ "$1" == "" ]]; then
        read -p "Application: " a
        read -p "ShortCut Keys: " k
        read -p "Description: " d
      else
        a="$1"
        k="$2"
        d="$3"
      fi
      echo "\"$a\",\"$k\",\"$d\"" >> sck.csv
      exit
      ;;
    -e|--edit)
      gvim $sck_csv
      exit
      ;;
    -m|--markdown)
      gen_md_yn=y
      ;;
    -*)
      echo "Error: $1 - bad option"
      exit
      ;;
    ?*)
      break
      ;;
  esac 
  shift
done 

if [[ $gen_md_yn == y ]]; then
  sort $sck_csv | \
    sed 's/^"\(.*\)","\(.*\)","\(.*\)","\(.*\)"$/\1\n\2\n| \`\3\` | \4 |/' \
    > $tmp_file
  prev_heading=""
  prev_subheading=""
  while read heading; do
    read subheading
    read line
    if [[ "$heading" != "$prev_heading" ]]; then
      echo
      echo "# $heading"
      echo
      prev_subheading=""
      prev_heading="$heading"
    fi
    if [[ "$subheading" != "$prev_subheading" ]]; then
      echo
      echo "## $subheading"
      echo
      prev_subheading="$subheading"
    fi
    echo "$line"
  done < $tmp_file 
  rm -f $tmp_file
else
  srch="$1"
  if [[ "$srch" == "" ]]; then
    srch="*"
  fi
  words="$*"
  words="${words// /\\|}"
  echo
  grep -i --color=auto "$words" $sck_csv | sort | \
    sed "s/\",\"/ - /g; s/^\"//; s/\"$//; s/ -  - / - /" | grep -i --color=auto "$words"
  echo
fi
```