---
title: move-mail - Move images of mail from Google Scanner a chosen folder
---

```bash
#!/bin/bash
help_text="
NAME
  move-mail - Takes images of mail from Google Scanner and moves these to a chosen folder.

USAGE
  move-mail [options] <parameters>

OPTIONS
  -h|--help
    Show help text.

DESCRIPTION
  Takes images of mail from Google Scanner and moves these to a chosen folder.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Move images of mail from Google Scanner a chosen folder"
web_desc_line="Move images of mail from Google Scanner a chosen folder"

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

tmp="/tmp/move.tmp"

files="$1"
echo $files
if [[ "$1" == "" ]]; then
  files="Scanned*"
fi

for file in $files; do
  if [[ "$file" == "Scanned*" ]]; then
    echo "No files found starting with 'Scanned*'"
    echo
    exit
  fi
  echo
  echo FILE :$file
  echo
  read -p "View file in Chrome [yN]: " yn
  if [[ ${yn^^} == Y ]]; then
    /c/Program\ Files\ \(x86\)/Google/Chrome/Application/chrome.exe "$file"
  fi
  echo

  d="$(echo $file | sed 's/^.*_//; s/-.*//;')"

  read -p "Date: $d - RTN to keep or enter new date (YYYYMMDD): " nd

  if [[ "$nd" != "" ]]; then
    d="$nd"
  fi 

  echo
  echo "Select Destination"
  echo
  ls /c/MJN/gdrive/mail > $tmp
  num=1
  while read line; do
    echo $num: $line
    let num=num+1
  done < $tmp
  echo
  read -p "Enter number or type new destination: " dest

  if [[ "$(echo $dest | sed 's/[0-9]//g')" == "" ]]; then
    num=1
    while read line; do
      if [[ "$num" == "$dest" ]]; then
        dest=$line
      fi
      let num=num+1
    done < $tmp
  else
    echo
    read -p "Create folder $dest [yN]? : " yn
    if [[ ${yn^^} == Y ]]; then
      mkdir /c/MJN/gdrive/mail/$dest
    else
      exit
    fi
  fi

  echo
  echo "Existing file constructs:"
  echo
  ls /c/MJN/gdrive/mail/$dest | sed "s/[0-9]//g; s/-.pdf//" | sort -u

  echo
  read -p "Enter description (no spaces, blank allowed): " desc
  if [[ "$desc" != "" ]]; then
    desc="-$desc"
  fi
 
  target="/c/MJN/gdrive/mail/${dest}/${dest}${desc}-${d}.pdf"
  echo
  read -p "Move: $file to $target [yN]? : " yn
  if [[ ${yn^^} == Y ]]; then
    mv "$file" "$target"
  else
    echo
    echo "Skipped $file"
  fi

  echo
  echo "--------------------------------------------------------------------------------"
  echo
done
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/10/05 13:55</p>
