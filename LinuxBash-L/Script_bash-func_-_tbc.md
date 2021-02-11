---
title: bash-func - tbc
---

```bash
#!/bin/bash
help_text="
NAME
   bash-func - One line description.

USAGE
   bash-func [options] <parameters>

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

#*
#* This function runs through a set of parameters and generates a function description header.
#* In other words generate this header.
#*
#* {flag-value} -o optional_yn - signifies that any further parameters are optional.
#* {flag-value} -f <flag_value> - describes a flag_value parameter.
#* {opt-param} <parameter_1> - describes parameter in position 1.
#* {opt-param} <parameter_2> - describes parameter in position 2.
#* etc..
#*
function desc() {
  optional_yn=n
  echo "#*"
  echo "#* DESC"
  echo "#*"
  shift
  while [[ "$1" ]]; do
    case $1 in
      -o|--optional)
        optional_yn=y
        ;;
      -f|--flag)
        shift
        echo "#* {flag} -${1} ${2}_yn - DESC"
        shift
        ;;
      -fv|--flag-value)
        shift
        echo "#* {flag-value} -${1} <${2}> - DESC"
        shift
        ;;
      ?*)
        if [[ ${optional_yn} == n ]]; then
          echo "#* {param} <${1}> - DESC"
        else
          echo "#* {opt-param} <${1}> - DESC"
        fi
        ;;
    esac
    shift
  done
  echo "#*"
}

#*
#* Function to print an flag error message.
#*
function flag_error() {
  echo
  echo "########################################################"
  echo "ERROR: Flag or flag with value listed after a parameter."
  echo "       Flags cannot follow a parameter."
  echo "########################################################"
  exit 1
}

function func() {
  optional_yn=n
  param_pos=1
  flags_yn=n
  function_name="$1"
  shift
  echo "function ${function_name} () {"
  echo ""
  if [[ $1 =~ -.* ]]; then
    echo "  while [[ \"\$1 ]]; do"
    echo "    case \$1 in"
    flags_yn=y
  fi
  while [[ "$1" ]]; do
    case $1 in
      -o|--optional)
        optional_yn=y
        ;;
      -f|--flag)
        if [[ ${flags_yn} == n ]]; then
          flag_error
        fi
        shift
        echo "      -${1})"
        echo "        ${2}_yn=y"
        echo "        ;;"
        shift
        ;;
      -fv|--flag-value)
        if [[ ${flags_yn} == n ]]; then
          flag_error
        fi
        shift
        echo "      -${1})"
        echo "        ${2}=\"\${2}\""
        echo "        shift"
        echo "        ;;"
        shift
        ;;
      ?*)
        if [[ ${flags_yn} == y ]]; then
          flags_yn=n;
          echo "    esac"
          echo "    shift"
          echo "  done"
        fi
        if [[ ${optional_yn} == n ]]; then
          echo "  ${1}=\"\${${param_pos}}\""
          echo "  if [[ \"\$$1\" == \"\" ]]; then"
          echo "    echo \"Error: Function: $function_name.  Mandatory parameter <$1> not set\""
          echo "    exit 1"
          echo "  fi"
        else
          echo "  ${1}=\"\${${param_pos}}\" # Optional parameter"
        fi
        let param_pos=param_pos+1
        ;;
    esac
    shift
  done
}

desc $*
func $*
```