---
title: idid - Script to prompt user to do something!
---

```bash
#!/bin/bash
help_text="
NAME
  idid - Prompt to do something and create a note of what got done.

USAGE
  idid [options] 

OPTIONS

  -e|--editlog
    Opens the idid log file in vi to edit.

  -g
    To signify this is being run from git-bash

  -h|--help
    Show help text.

  -i|--interactive
    Run as an interactive tool.

  -l|--list
    Display the list of things I did.

  -r|--replace <current event> <replacement event>
    Replace a timed event name with a new name.

  -s|--schedule [<start date YY/MM/DD>]
    Display the timed events summary.

  -t|--tasksheet [<start date YY/MM/DD>]
    Display the timed events as an event focused timesheet.

  -u|--uniqueevents
    Display a unique list of event descriptions.

DESCRIPTION
  To keep a record of things done.

  Note: A timed event is text in the format XXX:HH - XXX - any characters, HH - hours.

AUTHOR
  mjnurse.dev - 2023
"

help_line="Script to prompt user to do something!"
web_desc_line="Script to prompt user to do something!"

gitbash_yn=n

# Regular Text Colours
txtblk='\e[0;30m' # Black
txtred='\033[01;31m' # Red
txtgrn='\e[0;32m' # Green
txtylw='\e[0;33m' # Yellow
txtblu='\e[0;34m' # Blue
txtpur='\e[0;35m' # Purple
txtcyn='\e[0;36m' # Cyan
txtwht='\e[0;37m' # White

# Bold Text Colours
bldblk='\e[1;30m' # Black
bldred='\e[1;31m' # Red
bldgrn='\e[1;32m' # Green
bldylw='\e[1;33m' # Yellow
bldblu='\e[1;34m' # Blue
bldpur='\e[1;35m' # Purple
bldcyn='\e[1;36m' # Cyan
bldwht='\e[1;37m' # White

# Underlined Text Colours
unkblk='\e[4;30m' # Black
undred='\e[4;31m' # Red
undgrn='\e[4;32m' # Green
undylw='\e[4;33m' # Yellow
undblu='\e[4;34m' # Blue
undpur='\e[4;35m' # Purple
undcyn='\e[4;36m' # Cyan
undwht='\e[4;37m' # White

# Background Colours
bakblk='\e[40m'   # Black
bakred='\e[41m'   # Red
badgrn='\e[42m'   # Green
bakylw='\e[43m'   # Yellow
bakblu='\e[44m'   # Blue
bakpur='\e[45m'   # Purple
bakcyn='\e[46m'   # Cyan
bakwht='\e[47m'   # White
txtrst='\e[0m'    # Text Reset

if [[ "$GITBASH" == "Y" || "$1" == "-g" || "$1" == "-gs" ]]; then
  i_did="/c/MJN/drive/i-did.txt"
  gitbash_yn=y
else
  i_did="/mnt/c/MJN/drive/i-did.txt"
fi

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage=$(echo "Usage: ${tmp%%OPTIONS*}" | tr -d "\n" | sed "s/  */ /g")

case $1 in
  -h|--help|?)
    echo "$help_text"
    exit
    ;;
  -l|--list)
    cat ${i_did}
    exit
    ;;
  -e|--editlog)
    vi ${i_did}
    exit
    ;;
  -s|--schedule|-gs)
    tmpfile=/tmp/dme
    tmpcsvfile=/tmp/dmecsv
    rm -rf $tmpfile $tmpcsvfile
    echo "dte,task,hrs" > $tmpcsvfile
    cat $i_did | grep -o " [^ ]*:[^ ]*\|^........" > $tmpfile
    dte=""
    out=""
    pdow=0
    while read line; do
      if [[ $line =~ ../../.. ]]; then
        if [[ $line != $dte ]]; then
          dte="$line"
          dow="$(date -d  ${line//\//-} +'%u')"
        fi
      else
        echo $dte:$line | sed "s/,//g;s/:/,/g" >> $tmpcsvfile
      fi
    done < $tmpfile
    csvsql $tmpcsvfile "
      SELECT dte, total, breakdown
      FROM (
      SELECT dte, SUM(hrs) AS total, GROUP_CONCAT(task||':'||hrs, ', ') AS breakdown
      FROM (
        SELECT dte, task, SUM(hrs)*1.0 AS hrs 
        FROM '$tmpcsvfile' 
        GROUP BY dte, task
        )
      GROUP BY dte
      UNION
      SELECT date, '-----',''
      FROM (
      WITH RECURSIVE dates(date) AS (
        VALUES('2023-07-01')
        UNION ALL
        SELECT date(date, '+1 day')
        FROM dates
        WHERE date <= DATE('now')
      )
      SELECT SUBSTR(REPLACE(date,'-','/'), 3) AS date
      FROM dates
      WHERE STRFTIME('%w', date) = '5')
      ORDER BY dte )
      WHERE dte >= '$2'
      "

    rm -rf $tmpfile $tmpcsvfile
    exit
    ;;
  -t|--tasksheet)
    clear
    tmpfile=/tmp/dme
    tmpcsvfile=/tmp/dmecsv
    rm -rf $tmpfile $tmpcsvfile
    echo "dte,task,hrs" > $tmpcsvfile
    cat $i_did | grep -o " [^ ]*:[^ ]*\|^........" > $tmpfile
    dte=""
    out=""
    pdow=0
    while read line; do
      if [[ $line =~ ../../.. ]]; then
        if [[ $line != $dte ]]; then
          dte="$line"
          dow="$(date -d  ${line//\//-} +'%u')"
        fi
      else
        echo $dte:$line | sed "s/,//g;s/:/,/g" >> $tmpcsvfile
      fi
    done < $tmpfile
    dt="$2"
    if [[ "$dt" == "" ]]; then
      dt="$(date -d'monday-14 days' +%y/%m/%d)"
    fi
    #echo -e "
    csvsql $tmpcsvfile "
    SELECT task, Mon, Tue, Wed, Thu, Fri, Tot
    FROM (
      SELECT 3 AS pos, week, task 
           , SUM(CASE WHEN day='1' THEN hrs ELSE 0 END) AS Mon
           , SUM(CASE WHEN day='2' THEN hrs ELSE 0 END) AS Tue
           , SUM(CASE WHEN day='3' THEN hrs ELSE 0 END) AS Wed
           , SUM(CASE WHEN day='4' THEN hrs ELSE 0 END) AS Thu
           , SUM(CASE WHEN day='5' THEN hrs ELSE 0 END) AS Fri
           , SUM(hrs) AS Tot
      FROM (
        SELECT STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
             , STRFTIME('%w',DATE('20'||REPLACE(dte,'/','-'))) AS day
             , dte
             , task
             , SUM(hrs)*1.0 AS hrs 
        FROM '$tmpcsvfile' 
        WHERE dte >= '"$dt"'
        GROUP BY dte, task 
        )
      GROUP BY week, task
      UNION
      SELECT 1, STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
           , '', SUBSTR(MIN(dte),4), '', '' ,'', SUBSTR(MAX(dte), 4),'Tot'
      FROM '$tmpcsvfile' 
      WHERE dte >= '"$dt"'
      GROUP BY 1, 2
      UNION
      SELECT 2, STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
           , '', '-----', '-----', '-----', '-----', '-----','-----'
      FROM '$tmpcsvfile' 
      WHERE dte >= '"$dt"'
      GROUP BY 1, 2
      UNION
      SELECT 4, STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
           , '', '-----', '-----', '-----', '-----', '-----','-----'
      FROM '$tmpcsvfile' 
      WHERE dte >= '"$dt"'
      GROUP BY 1, 2
      UNION
      SELECT 5 AS pos, week, 'TOTAL' as task
           , SUM(CASE WHEN day='1' THEN hrs ELSE 0 END) AS Mon
           , SUM(CASE WHEN day='2' THEN hrs ELSE 0 END) AS Tue
           , SUM(CASE WHEN day='3' THEN hrs ELSE 0 END) AS Wed
           , SUM(CASE WHEN day='4' THEN hrs ELSE 0 END) AS Thu
           , SUM(CASE WHEN day='5' THEN hrs ELSE 0 END) AS Fri
           , SUM(hrs) AS Tot
      FROM (
        SELECT STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
             , STRFTIME('%w',DATE('20'||REPLACE(dte,'/','-'))) AS day
             , dte
             , SUM(hrs)*1.0 AS hrs 
        FROM '$tmpcsvfile' 
        WHERE dte >= '"$dt"'
        GROUP BY dte
        ) 
      GROUP BY week, task
      UNION
      SELECT 6 AS pos, week, '' as task
           , CASE SUM(CASE WHEN day='1' THEN hrs ELSE 0 END) WHEN 8 THEN '' ELSE '^^^^^' END
           , CASE SUM(CASE WHEN day='2' THEN hrs ELSE 0 END) WHEN 8 THEN '' ELSE '^^^^^' END
           , CASE SUM(CASE WHEN day='3' THEN hrs ELSE 0 END) WHEN 8 THEN '' ELSE '^^^^^' END
           , CASE SUM(CASE WHEN day='4' THEN hrs ELSE 0 END) WHEN 8 THEN '' ELSE '^^^^^' END
           , CASE SUM(CASE WHEN day='5' THEN hrs ELSE 0 END) WHEN 8 THEN '' ELSE '^^^^^' END
           , ''
      FROM (
        SELECT STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
             , STRFTIME('%w',DATE('20'||REPLACE(dte,'/','-'))) AS day
             , dte
             , SUM(hrs)*1.0 AS hrs 
        FROM '$tmpcsvfile' 
        WHERE dte >= '"$dt"'
        GROUP BY dte
        ) 
      GROUP BY week, task
    )
    ORDER BY week, pos, task
    "
    # SELECT 6, STRFTIME('%W',DATE('20'||REPLACE(dte,'/','-'))) AS week
    #      , '', '', '', '', '', ''
    # FROM '$tmpcsvfile' 
    # WHERE dte >= '$2'
    # GROUP BY 1, 2

    rm -rf $tmpfile $tmpcsvfile
    exit
    ;;
  -u|--uniqueevents)
    for w in $(cat ${i_did}); do echo " $w "; done | \
      grep -o " [a-zA-Z][^:]*:[^ ]* " | sed "s/ //g; s/:.*//" | sort | uniq -c
    exit
    ;;
  -r|--replace)
    sed -i "s/ $2:/ $3:/g" $i_did
    idid -u
    exit
    ;;
  -i|--interactive) 
    while [ 1 ]; do
      echo
      echo "(h - help, x - exit)"
      echo
      read -p "> " i
      if [[ $i == x ]]; then
        exit
      fi
      idid -$i
    done
    exit
    ;;
esac

clear

dte="$(date +'%y/%m/%d')"
hour="$(date +'%H:00')"

repeat_yn=y

while [[ ${repeat_yn} == y ]]; do
  echo
  read -p "What did you do? " did
  echo
  echo "${dte}-{$hour} - ${did}"
  echo
  read -p "Save [yNq] (q - quit) " yn
  if [[ $yn == q ]]; then
    exit
  elif [[ $yn == y ]]; then
    repeat_yn=n
  fi
done

curr_max_date="$(sort /c/MJN/drive/i-did.txt | tail -1 | sed 's/-.*//')"

echo $curr_max_date $dte

if [[ $curr_max_date != $dte ]]; then
  echo >> ${i_did}
fi

echo "${dte}-${hour} - ${did}" >> ${i_did}

echo
cat ${i_did}

echo
read -p "Press RTN to close (e RTN to edit I did, s RTN to see schedule) " v

case $v in
  e)
    vi ${i_did}
    ;;
  s)
    if [[ $gitbash_yn == y ]]; then
      $0 -gs
    else
      $0 -s
    fi
    echo 
    read -p "Press RTN to close" w
    ;;
esac

```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 23/10/30 14:17</p>