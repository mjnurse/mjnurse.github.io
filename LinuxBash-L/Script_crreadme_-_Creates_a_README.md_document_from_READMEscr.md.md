---
title: crreadme - Creates a README.md document from READMEscr.md
---

```bash
#!/bin/bash
help_text="
NAME
  crreadme - Creates a README.md document from READMEscr.md

USAGE
  crreadme <READMEscr.md document name>

DESCRIPTION
  Creates a README.md document from READMEscr.md

AUTHOR
  mjnurse.dev - 2020
"
help_line="Creates a README.md document from READMEscr.md"
web_desc_line="Creates a README.md document from READMEscr.md"

mv -f README.md /tmp

while read line; do
  if [[ "$line" == "[[help_lines]]" ]]; then
    echo '```' >> README.md
    h >> README.md
    echo '```' >> README.md
  elif [[ "$line" =~ \[\[.*\]\] ]]; then
    fn=${line//[/}
    line=${fn//]/}
    echo "File: $line" >> README.md
    if [[ "$line" =~ .*.js ]]; then
      echo '```javascript' >> README.md
    else
      echo '```bash' >> README.md
    fi
    cat $line >> README.md
    echo '```' >> README.md
  else
    echo "$line" >> README.md
  fi
done < READMEsrc.md
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/10/05 13:55</p>
