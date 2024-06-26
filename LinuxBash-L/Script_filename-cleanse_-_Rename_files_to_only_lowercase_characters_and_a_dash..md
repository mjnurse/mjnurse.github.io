---
title: filename-cleanse - Rename files to only lowercase characters and a dash.
---

```bash
#!/bin/bash
help_text="
NAME
  filename-cleanse - Rename files to only lowercase characters and a dash.

USAGE
  filename-cleanse [options] <filename(s)>

OPTIONS
  -h|--help
    Show help text.

DESCRIPTION
  Search for filenames which contain any characters which are not either lowercase or a dash
  and rename these.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Rename files to only lowercase characters and a dash."
web_desc_line="Rename files to only lowercase characters and a dash."

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

files_found_yn=n

for f in $*; do
  nf="${f,,}"
  nf="${nf//_/-}"
  if [[ "$nf" != "$f" && ! $f =~ .*\* ]]; then
    files_found_yn=y
    echo "$f -> $nf"
  fi
done

echo
if [[ $files_found_yn == y ]]; then
  read -p "Rename Files [yN]? " yn

  if [[ "${yn^^}" == "Y" ]]; then
    for f in $*; do
      nf="${f,,}"
      nf="${nf//_/-}"
      if [[ "$nf" != "$f" ]]; then
        # mv thinks two files with only case differences are the same so mv twice
        mv $f $f.filename-cleanse-tmp
        mv $f.filename-cleanse-tmp $nf
      fi
    done
  fi
else
  echo "No files found"
fi
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/10/05 13:55</p>
