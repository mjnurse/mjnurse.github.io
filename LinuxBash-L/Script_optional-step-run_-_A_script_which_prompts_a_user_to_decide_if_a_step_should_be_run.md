---
title: optional-step-run - A script which prompts a user to decide if a step should be run
---

```bash
#!/bin/bash
help_text="
NAME
  optional-step-run - A template script which prompts a user to decide if steps should be run.

USAGE
  optional-step-run [options] [<start step number>]

OPTIONS
  -l|--list
    List the steps only.

  -h|--help
    Show help text.

DESCRIPTION
  A template script which prompts a user to decide if steps should be run.  An optional
  start step number can be passed in and all steps before this are automatically skipped.

AUTHOR
  mjnurse.dev - 2023
"
help_line="A script which prompts a user to decide if a step should be run"
web_desc_line="A script which prompts a user to decide if a step should be run"

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage="$(echo Usage: ${tmp%%OPTIONS*})"

list_steps_yn=n

case $1 in
  -l|--list)
    list_steps_yn=y
    ;;
esac

if [[ "$1" == "" ]]; then
  start_step=0
else
  start_step=$1
fi

#*
#* Determine if a step should be run.
#*
#* <step_number> - The step number.
#* <step_description>* - The step description.  All remaining parameter values.
#*
function step() {
  line="STEP $*"
  ul="--------------------------------------------------------------------------------"
  echo
  echo $line
  if [[ $list_steps_yn == y ]]; then
    run_step=n
  else
    echo ${ul:0:${#line}}
    echo
    if [[ $1 -lt $start_step ]]; then
      echo "Skipping Step"
      run_step=n
    else
      read -p "Press RTN to run step, s to skip, CTRL-C to exit: " x
      echo
      if [[ ${x^} == S ]]; then 
        run_step=n
        echo "Skipping Step"
      else
        run_step=y
        echo "Running Step"
      fi
      echo
    fi
  fi
}

step 1 This is the step one description

if [[ $run_step == y ]]; then
  echo Running step 1...
fi

step 2 This is the step two description

if [[ $run_step == y ]]; then
  echo Running step 2...
fi

step 3 This is the step three description

if [[ $run_step == y ]]; then
  echo Running step 3...
fi

```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 23/08/17 09:27</p>