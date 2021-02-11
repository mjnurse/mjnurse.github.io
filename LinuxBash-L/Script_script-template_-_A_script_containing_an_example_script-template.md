---
title: script-template - A script containing an example script-template
---

```bash
#!/bin/bash
help_text="
NAME
  script-template - A script containing an example script-template.

USAGE
  script-template [options] <parameters>

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
help_line="A script containing an example script-template"
web_desc_line="A script containing an example script-template"

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage="$(echo Usage: ${tmp%%OPTIONS*})"

if [[ "$1" == "" ]]; then
  echo "${usage}"
  echo "${try}"
  exit 1
fi

logging_yn=n
max_value=-1

while [[ "$1" != "" ]]; do
  case $1 in 
    -h|--help)
      echo "$help_text"
      exit
      ;;
    -l|--logging)
      logging_yn=y
      ;;
    -m|--max)
      shift
      max_value=$1
      ;;
    ?*)
      break
      ;;
  esac 
  shift
done 

echo logging_yn: $logging_yn
echo values: $*
```