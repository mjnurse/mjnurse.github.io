---
title: or - Connect to oracle using sqlplus
---

```bash
#!/bin/bash
help_text="
NAME
  or - Connect to oracle using sqlplus.

USAGE
  or

DESCRIPTION
  Connect to oracle using sqlplus.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Connect to oracle using sqlplus"
web_desc_line="Connect to oracle using sqlplus"

export ORACLE_PATH=.:/c/MJN/gdrive/code/oracle:/c/MJN/gdrive/code/private/oracle

rlwrap /c/MJN/oracle_client/product/11.2.0/client_1/bin/sqlplus.exe /NOLOG
#rlwrap sqlplus /NOLOG
```
