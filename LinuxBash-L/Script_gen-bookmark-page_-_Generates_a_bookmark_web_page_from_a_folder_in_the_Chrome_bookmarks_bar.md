---
title: gen-bookmark-page - Generates a bookmark web page from a folder in the Chrome bookmarks bar
---

```bash
#!/bin/bash
help_text="
NAME
  gen-bookmark-page - generates a bookmark web page from a folder in the Chrome bookmarks bar.

USAGE
  gen-bookmark-page [options]

OPTIONS
  -h|--help
    Show help text.

DESCRIPTION
  Generates a bookmark web page from a folder in the Chrome bookmarks bar.

AUTHOR
  mjnurse.dev - 2022
"
help_line="Generates a bookmark web page from a folder in the Chrome bookmarks bar"
web_desc_line="Generates a bookmark web page from a folder in the Chrome bookmarks bar"

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage="$(echo Usage: ${tmp%%OPTIONS*})"

while [[ "$1" != "" ]]; do
  case $1 in 
    -h|--help)
      echo "$help_text"
      exit
      ;;
    *)
      echo "${usage}"
      echo "${try}"
      exit 1
      ;;
  esac 
  shift
done 

winroot="echo $MJNWINROOT | sed 's/\//\\/g; s/\\c/C:/'"

bm_page="$MJNWINROOT/MJN/bookmarks.html"
bm_file="/c/Users/MartinNurse/AppData/Local/Google/Chrome/User*Data/Default/Bookmarks"
tmp_file="/tmp/bm.tmp"

echo '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<head>
<TITLE>Bookmarks</TITLE>

<link rel="icon" type="image/x-icon" href="'"$winroot"'\MJN\github\mjnurse-github-io\images\Star.png">

<style>
  h3, p {
    font-family: Arial, Helvetica, sans-serif;
  }
  p {
    font-size: 12pt;
  }
  a {
    color: #155799;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  h3 {
    font-size: 20pt;
  }
  table {
    margin-left:auto;
    margin-right:auto;
  }
  table td  {
    vertical-align: top;
    width: 250px;
    border: 0px solid black;
  }
  .input {
    width: 300px;
    margin: 0 auto;
  }
  input {
    font-size: 12pt;
    margin: 10px;
  }
</style>
</head>

<body scroll="no" style="overflow: hidden">

<div>
<div class="input">
  <input type="text" id="search" onkeyup="search()" style="visibility: hidden">
</div>
<div id="links">
</div>

<p style="text-align: center; color: #BBBBBB; font-size: 12px">Last Updated: '$(date)'</p>

</div>
<script>
  const l=[' > "$bm_page"

cat $bm_file | jq '.roots.bookmark_bar.children[] |
  select(.name == "Page").children[] | .name' > $tmp_file

let c=0
for f in $(cat $tmp_file | sed 's/"//g'); do
  if [[ $c != 0 ]]; then
    echo "{c:$c}," >> "$bm_page"
  fi
  let c=c+1
  echo '{s:"'$f'"},' >> "$bm_page"
  cat $bm_file | jq '.roots.bookmark_bar.children[] | 
    select(.name == "Page").children[] | 
    select (.name == "'$f'").children[] | 
    "{t:#" + .name + "#, h:#" + .url + "#},"' | sed 's/"//g; s/#/"/g' >> "$bm_page"
done

rm -f $tmp_file

 echo '  ]
  let lDiv=document.getElementById("links");
  let h="<table><tr><td>";
  let s="";
  let pos=1
  for (i in l) {
    const lk=l[i];
    if (lk.c) {
      h+= "</td><td>";
    }
    if (lk.s && s!=lk.s) {
      s=lk.s;
      h+="<h3>"+s+"</h3>"
    }
    if (lk.h) {
      h += "<p><a id=\"item"+pos+"\" href=\""+lk.h+"\" target=\"_blank\">"+lk.t+" ("+pos+")</a></p>";
      pos++;
    }
  }
  lDiv.innerHTML = h + "</td></tr></table>";

  numTyped = "";
  maxNum=pos-1;
  lastKeyPress = Date.now();

  function highlightListItems() {
    try {
      document.getElementById("item"+numTyped).style.background = "lightgrey";
    } catch { }
    try {
      for (i=1; i<100; i++) {
        if (i != numTyped ) {
          document.getElementById("item"+i).style.background = "transparent";
          document.getElementById("item"+i).style.visibility = "visible";
        }
      }
    } catch { }
  }

  function addKeyListener() {
    document.addEventListener("keyup", function() {
      if (event.code == "Escape") {
        document.getElementById("search").blur();
        document.getElementById("search").value = "";
        document.getElementById("search").style.visibility = "hidden";
        for (let i = 1; i <= maxNum; i++) {
          const item = document.getElementById("item"+i);
          item.style.background = "transparent";
          item.style.color = "#155799";
        }
      }
      if (document.activeElement.tagName == "INPUT" ||
          document.activeElement.tagName == "TEXTAREA") {
        return;
      }

      if (event.ctrlKey) {
        return;
      }
      switch (event.code) {
        case "Slash":
          document.getElementById("search").style.visibility = "visible";
          document.getElementById("search").focus();
          document.getElementById("search").value = "";
          break;
        case "Backspace":
        case "Delete":
          numTyped = numTyped.slice(0, -1);
          highlightListItems();
          break;
        case "Escape":
          document.getElementById("search").blur();
          document.getElementById("search").style.visibility = "hidden";
          numTyped = "";
          highlightListItems();
          break;
        case "Enter":
          if (numTyped != "") {
            window.open( document.getElementById("item"+numTyped).href, "_blank").focus();
          }
          break;
        case "ArrowDown":
          if (numTyped == "") {
            numTyped = "1";
          } else {
            if (parseInt(numTyped) < maxNum) {
              const tmpNum = parseInt(numTyped) + 1;
              numTyped = tmpNum.toString();
            }
          }
          highlightListItems();
          break;
        case "ArrowUp":
          if (numTyped != "" && numTyped != "1") {
            const tmpNum = parseInt(numTyped) - 1;
            numTyped = tmpNum.toString();
          }
          if (numTyped == "0") {
            numTyped = "";
          }
          highlightListItems();
          break;
      }

      if (event.key >= "0" && event.key <= "9") {
        if ( (Date.now() - lastKeyPress) > 500 ) {
          numTyped = event.key;
        } else {
          numTyped += event.key;
        }
        if (numTyped == "0") {
          numTyped = "";
        }
        lastKeyPress = Date.now();
        highlightListItems();
      }
    });
  }

  function search() {
    let go = false;
    let href;
    const searchVal = document.getElementById("search").value.toUpperCase();

    if (event.code == "Enter") {
      go = true;
    }
    for (let i = 1; i <= maxNum; i++) {
      const item = document.getElementById("item"+i);
      const itemVal = item.innerHTML;
      if (itemVal.toUpperCase().indexOf(searchVal) > -1) {
        if (go) {
          if (!href) href = item.href;
        } else {
          item.style.color = "#155799";
        }
      } else {
        item.style.color = "#DDDDDD";
      }
    }
    if (go) {
      for (let i = 1; i <= maxNum; i++) {
        const item = document.getElementById("item"+i);
        item.style.background = "transparent";
        item.style.color = "#155799";
      }
      document.getElementById("search").blur();
      document.getElementById("search").value = "";
      document.getElementById("search").style.visibility = "hidden";
      window.open(href, "_blank").focus();
    }
  }
  addKeyListener();

</script>
</body>' >> "$bm_page"
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 25/06/13 10:59</p>
