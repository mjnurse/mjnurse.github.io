---
title: tidy - Fixes eg permission issues with files
---

```bash
#!/bin/bash
help_text="
NAME
  tidy - Fixes issues such as permission issues with files in current directory.

USAGE
  tidy [<folder>]

OPTIONS

DESCRIPTION
  Fixes issues such as permission issues with files in current directory.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Fixes issues such as permission issues with files in current directory"
web_desc_line="Fixes eg permission issues with files"

if [[ "$1" != "" ]]; then
  cd $1
fi

echo ================================================================================
echo Executable but not '#!/bin/bash'
echo ================================================================================

for f in $(find . -maxdepth 1 -executable); do

   if [[ -f $f && ! -L $f ]]; then
      line1="$(head -1 $f)"
      line1=${line1//[$' \t\r\n']}
      if [[ "$line1" != "#!/bin/bash" ]]; then
         echo --------------------------------------------------------------------------------
         echo FILE: $f
         echo --------------------------------------------------------------------------------
         echo First 5 lines:
         echo --------------
         head -5 $f
         echo
         read -p "[i]gnore rule, [r]emove exec, [a]dd '#!/bin/bash', [s]kip, q[uit]. [iraSq]?: " opt
         case $opt in
            r|R)
               chmod a-x $f;;
            a|A)
               sed -i '1i#!/bin/bash' $f;;
            i|I)
               break;;
            q|Q)
               exit;;
         esac
      fi 
   fi
done

echo ================================================================================
echo '#!/bin/bash' but not Executable
echo ================================================================================

for f in $(find . -maxdepth 1 ! -executable); do
   if [[ -f $f && ! -L $f ]]; then
      line1="$(head -1 $f)"
      line1=${line1//[$' \t\r\n']}
      if [[ "$line1" == "#!/bin/bash" ]]; then
         echo --------------------------------------------------------------------------------
         echo FILE: $f
         echo --------------------------------------------------------------------------------
         echo First 5 lines:
            echo --------------
         head -5 $f
         echo
         read -p "[i]gnore rule, [d]elete '#!/bin/bash', [m]ake exec, [s]kip, q[uit]. [idmSq]?: " opt
         case $opt in
            d|D)
               sed -i '1d' $f;;
            m|M)
               chmod u+x $f;;
            i|I)
               break;;
            q|Q)
               exit;;
         esac
      fi 
   fi
done

echo ================================================================================
echo Writable by Other
echo ================================================================================

for f in $(find . -maxdepth 1 -perm -o=w); do
   if [[ -f $f && ! -L $f ]]; then
      echo --------------------------------------------------------------------------------
      ls -al $f
      echo
      read -p "[i]gnore rule, [r]remove writeable other, [s]kip, q[uit]. [irSq]?: " opt
      case $opt in
         r|R)
            chmod o-w $f;;
         i|I)
            break;;
         q|Q)
            exit;;
      esac
   fi
done

echo ================================================================================
echo Writable by Group
echo ================================================================================

for f in $(find . -maxdepth 1 -perm -g=w); do
   if [[ -f $f && ! -L $f ]]; then
      echo --------------------------------------------------------------------------------
      ls -al $f
      echo
      read -p "[i]gnore rule, [r]remove writeable group, [s]kip, q[uit]. [irSq]?: " opt
      case $opt in
         r|R)
            chmod g-w $f;;
         i|I)
            break;;
         q|Q)
            exit;;
      esac
   fi
done

echo ================================================================================
echo Executable by Other
echo ================================================================================

for f in $(find . -maxdepth 1 -perm -o=x); do
   if [[ -f $f && ! -L $f ]]; then
      echo --------------------------------------------------------------------------------
      ls -al $f
      echo
      read -p "[i]gnore rule, [r]remove Exec other, [s]kip, q[uit]. [irSq]?: " opt
      case $opt in
         r|R)
            chmod o-x $f;;
         i|I)
            break;;
         q|Q)
            exit;;
      esac
   fi
done

echo ================================================================================
echo Executable by Group
echo ================================================================================

for f in $(find . -maxdepth 1 -perm -g=x); do
   if [[ -f $f && ! -L $f ]]; then
      echo --------------------------------------------------------------------------------
      ls -al $f
      echo
      read -p "[i]gnore rule, [r]remove Exec group, [s]kip, q[uit]. [irSq]?: " opt
      case $opt in
         r|R)
            chmod g-x $f;;
         i|I)
            break;;
         q|Q)
            exit;;
      esac
   fi
done

echo ================================================================================
echo No header
echo ================================================================================

for f in $(find . -maxdepth 1 -executable); do
   if [[ -f $f && ! -L $f ]]; then
      l2="$(cat $f | sed -n '2p')"
      if [[ "${l2:0:10}" != "help_text=" ]]; then
         echo --------------------------------------------------------------------------------
         ls -al $f
         echo
         read -p "[i]gnore , [a]dd header, [s]kip, q[uit]. [iaSq]?: " opt
         case $opt in
            a|A)
               tidytmp="/tmp/tidy.tmp"
echo '#!/bin/bash
help_text="
NAME
   '${f:2}' - One line description.

USAGE
   '${f:2}' [options] <parameters>

OPTIONS
   -x
      Description...

   -h|--help
      Show help text.

DESCRIPTION
   Description description description description.

AUTHOR
  mjnurse.dev - 2021
"
help_line="'tbc'"
web_desc_line="'tbc'"

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
' > $tidytmp
               tail +2 $f >> $tidytmp
               cp -f $tidytmp $f
               gvim $f
               ;;
            i|I)
               break;;
            q|Q)
               exit;;
         esac
      fi
   fi
done
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/10/05 13:55</p>
