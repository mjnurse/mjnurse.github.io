---
title: CLI builder
---

This bash script generates a cli (command line interface) bash script from a
definition file.  The structure of the definition file is code header below. 
This script also generates an alias file which contains a set of alias
commands which run each command in the definition file using the associated
shortcut prepended with an '@'.

```bash
#!/bin/bash
help_text="
NAME
  cli-builder - A bash script which generates a CLI bash script from a definition file.

USAGE
  cli-builder [-d] <definition_filename>

OPTIONS
  -d
    Run in debug mode.

  -h|--help
    Show help text.

DESCRIPTION
  This bash script generates a cli (command line interface) bash script from a definition file.
  The structure of the definition file is described below.  This script also generates an alias
  file which contains a set of alias commands which run each command in the definition file using
  the associated shortcut prepended with an '@'.

  Definition File Structure
   -------------------------

  # - a line starting with a # is a comment

  = - a line starting with a = is a group description for the set of commands following this
      line up until the next line starting with a = or the end of the file.

  ( / - is the line continuation character.  Any line ending / is joined to the next line. )

  All other lines in the file are command definitions.  These lines are structured as follows:

  name-1..name-n (shortcut) <param> [<opt_param] :: command \$1 \$2

  Where:

  name-1..name-n
    A list of words which describe the command and which are typed to run the command.

  shortcut
    A single word which can also be typed to run the command.  If the aliases are created
    then the alias can also be run direct from the command as @alias.

  param
    A mandatory parameter.  There can be 0 or more mandatory parameters.

  opt_param
    A optional parameter.  There can me 0 or more optional parameters.  The must always follow
    the mandatory parameters and there can be no gaps.  This means if optional parameter 3 is
    passed in so must optional parameters 1 and 2.

  ::
    Separates the command definition with the Linux command that is run.

  command
    Is an Linux command.  Parameter values entered after the command are specified using there
    position preceded by a \$.  e.g \$1, \$2.

  Example

  sort_cli.def:
  ----------------------------------------------------------------
  # FILE OPTIONS
  sort file (sf) <filename> <sort_parameter> :: cat \$1 | sort \$2
  ----------------------------------------------------------------

  This example sorts a file specified by a mandatory filename.  An optional sort parameter can
  be passed to modify the sort order.  Once the cli is built the command can be run as follows.
  Note: the name of the cli command is the same as the name of the definition file
  (without the .def).

  > sort_cli sort file my_file

  > sort_cli sf my_file --ignore_case

  > @sf my_file

AUTHOR
  mjnurse - 2019
"
name=${0##*/}
try="Try '$name -h' for more information"

# Get usage from help_text.
usage=${help_text##*USAGE}
usage=${usage%%OPTIONS*}
usage=${usage%%PARAMETERS*}
usage=${usage%%DESCRIPTION*}
usage=${usage//[$'\n\r']}
usage=${usage##*   }
usage="Usage: ${usage}"

function debug {
  if [[ $debug_yn == y ]]; then
    echo "$*"
  fi
}

debug_yn=n

if [[ "$1" == "" ]]; then
  echo $usage
  echo $try
  exit
elif [[ "$1" == "-h" || "$1" == "--help" ]]; then
  echo "$help_text" 
  exit
elif [[ "$1" == "-d" ]]; then
  debug_yn=y
  shift
fi

def_file="${1/.def/}"

if [[ ! -f $def_file.def ]]; then
  echo "Error: Definition file \"$def_file.def\" missing"
  exit
fi
cli_name=${def_file}
defns="$(cat $def_file.def | sed 's/^  *//' | sed ':a;/\\ *$/{N;s/\\ *\n//;ba}' | sed '/^ *#/d; s/(\(.*::\)/('${cli_name:0:1}'\1/')"

CCYA="\x1b[96m"
CGRE="\x1b[92m"
CMAG="\x1b[95m"
CWHI="\x1b[97m"
CDEF="\x1b[0m"

echo '#!/bin/bash

debug_yn=n
if [[ "$1" == "-d" ]]; then
  debug_yn=y
  shift
fi
if [[ "${CLI_DEBUG^^}" == "TRUE" ]]; then
  debug_yn=y
fi

l80="--------------------------------------------------------------------------------"
' > $cli_name

echo '# Shortcut aliases' > $cli_name.alias

defns=$defns'
= HELP
help ('${cli_name:0:1}'he) :: egrep "usage=|section=" "$0" | grep -v "grep" | sed "s/.*usage=/   /; s/.*section=/'$CGRE'/; s/\"//g"
'

echo '
function check_params() {
  # param 1 - actual number of parameters
  # param 2 - required number of parameters
  # param 3 - incorrect parameters message

  if [[ "$1" < "$2" ]]; then
    echo "$3"
    exit
  fi
}

function print_command() {
  # param 1 - command

  if [[ $debug_yn == y ]]; then
    echo "COMMAND: $*" | sed '"'"'s/./-/g'"'"'
    echo "COMMAND: $*" | sed '"'"'s/"/\"/g'"'"'
    echo "COMMAND: $*" | sed '"'"'s/./-/g'"'"'
  fi
}
' >> $cli_name

debug "Commands"
debug "--------"

echo "$defns" | \
while IFS= read -r line ; do

  if [[ "${line:0:1}" == "=" ]]; then
    echo "section=\"${line:2}\""  >> $cli_name
  elif [[ "${line:0:4}" == "cmd " ]]; then
    echo "${line:4:99999}" >> $cli_name
  elif [[ "$line" != "" ]]; then
    cmd="$(echo $line | sed 's/^.*:://; s/##.*//')"
    usage="$(echo ${line%% ::*} | sed "s/\[/\x1b[37m\[/g; s/\]/\]$CWHI/g; s/^/$CMAG/; s/(/$CCYA(/; s/)/)$CWHI/; s/$/$CDEF/")"
    if echo $line | grep "##" > /dev/null; then help="$(echo $line | sed "s/^.*## */$CGRE # /; s/$/\x1b[0m/")"; else help=""; fi
    word_list="${line%%::*}"
    word_list=${word_list//[/ [ }
    word_list=${word_list//]/ ] }

    key_word_template=""
    key_words=""
    num_mandatory_params=0
    optional_params_yn=n
    optional_params=""
    mandatory_params=""
    shortcut=""
    word_count=0

    for word in $word_list; do
      if [[ "$word" == "[" ]]; then
        optional_params_yn=y
      elif [[ "$word" == "]" ]]; then
        optional_params_yn=n
      elif [[ "${word:0:1}" == "<" ]]; then
        if [[ "$optional_params_yn" == "y" ]]; then
          optional_params="$optional_params $word"
        else
          mandatory_params="$mandatory_params $word"
          let num_mandatory_params=num_mandatory_params+1
        fi
      elif [[ "${word:0:1}" == "(" ]]; then
        shortcut=${word/(/}
        shortcut=${shortcut/)/}
        echo 'alias @'${shortcut}'="'$cli_name $shortcut'"' >> $cli_name.alias
      else
        let word_count=word_count+1
        key_words="$key_words $word"
        key_word_template="$key_word_template "'$'"$word_count"
      fi
    done

    key_words=${key_words:1}
    key_word_template=${key_word_template:1}
    mandatory_params=${mandatory_params:1}
    optional_params=${optional_params:1}
    while [[ "${cmd:0:1}" == " " ]]; do
      cmd=${cmd:1}
    done

    debug "- $key_words ($shortcut)"

    echo "if [[ \"$key_word_template\" == \"$key_words\" || \""'$1'"\" == \"$shortcut\" ]]; then"  >> $cli_name
    echo "   if [[ \""'$1'"\" == \"$shortcut\" ]]; then shift; else shift $word_count; fi"  >> $cli_name
    echo "   usage=\"$usage $help\""  >> $cli_name
    echo "   check_params "'$'"# $num_mandatory_params \"Usage: "'$'"usage\""  >> $cli_name
    if [[ "$key_words" != "h" && "$key_words" != "help" ]]; then
      echo "   print_command \" ${cmd//\"/\\\"}" \"  >> $cli_name
    fi
    echo "   $cmd"  >> $cli_name
    echo "   exit"  >> $cli_name
    echo "fi"  >> $cli_name
  fi
done

echo '
if [[ "$1" == "" ]]; then
  echo "No option passed"
else
  echo "$*: invalid option"
fi
echo "Try \"'$cli_name' help\" for more information."
' >> $cli_name

chmod +x $cli_name

cp $cli_name.alias ~
```
