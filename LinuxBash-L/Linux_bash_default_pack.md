---
title: Linux bash default Pack
---

Packs contain bash scripts which have been compressed and converted to a
base64 string.  This is a convenient wat to copy a set of bash scripts
into a linux environment using only a command line terminal.

<script>
  let packText=`# --------------------------------------------------------------------------------------------------
# CONTENTS: calc, cls, file-watch-do
# --------------------------------------------------------------------------------------------------
# FILE: calc 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA41TXVPiMBR9z6+4xjoIIwbYfVq2zojrKOP6MYJP6jL9CDZrmzJJirjIf9+blhZxFH3INLk959x7T262t5
gvJPM9HZGIx5OR4TPjUnJxeH5MAAIvDqAJR2mSeDKEWEiex7LYM6ki5GZweFLhbtOJEanU9/CzxODxgJDLq2H/8mKAuGb00mzaPL
gHGETpE9gT2Kz7xAIEAoQ0XHmBEVOe4357mQwi8CS8+gO7flB/VUxB10jX4h/XOfEolVOuDMgs8bkCk8JZbw/OcZ3gGuK66iHv1/
Hg6LqfF4m0vgQTrdrEFiDTUJvVYJwqSLLYiEn8vIdBDjVVRC1hovhUpAhVXCMIdQ9vhqeX1yiZ/JWZ0nw/5FN0s9PqtAgt7LaOuv
QDfyl54v4o5Dr4DDfxgsdRwm2XLg352MMCKCFGPbt0qJ7Bmbe2txtsgRdQdJEqjmbiNsk7pMQkE5c682oGEJ5f7oKSTHsP3HV2eR
ClQG/s6QcqImNnZ3m1jQWFFzAKmiHQO2kPmuNWM4AGA/ZA64SIMdzeAnXaFFwXKIX7+651TqJDhbYzz3NhzlUEeyjOM2GgTcaCEO
v0CF3GgncDzwDDUpi1o06rJCXmnVwVvZWrPUUi5lVlWxU6TPPBxlt22uhVPlDV/NbzY1VlZRst41jtctvtFtQ3k10q+PjA4jfQao
rX0/QAfe/QtdhZD2PLq9HoAXc7XQSxdqvz3V5DLl9f55xv4GwknnxG3Mgefom9UeLq6xIf6PiKe4/rdjdKl+1zwBdlxypP4TRWcz
xjdw320AWcaFZ8FXPm5Sgt7ISXKYr3v1JZyi61apr9YUXt37oMau93WpFccAq99YErYhQOVsP/UYNce/afjsTYkDCVnJD/1Oy/0P
YFAAA=
' | base64 -d | gunzip > calc; chmod u+x calc
# --------------------------------------------------------------------------------------------------
# FILE: cls 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA5WQvU7DMBRG9/sUF3fIAmkhE0OGqFRQJFrUnwmkyHGuVVPbiewbQt8eI5CYkMp6pO/o6JtcTBvjp42MBz
iQ7WumDy4FrKqnBSAqG/EK55ZkQKbgjJcWpW+xH5hPv6gZtKYAsN9W9z87gLvFdr5ZPu+W61VC50pygGq/e1hv0sa9+SFEylt6Tx
k3s+tbEN+Z1ngqxblOASM1dUtR/XvYS3WsHbmGQinSTUbFy5a0HCwLgAm2HUWfMUo7ylPEsQtH1CZERjaOMHRDcscOeTSKcuiD8a
wxe50VxUvxmIH6KvkLfwKk3vGFngEAAA==
' | base64 -d | gunzip > cls; chmod u+x cls
# --------------------------------------------------------------------------------------------------
# FILE: file-watch-do 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA6VT32/aMBB+919xM6nYkEJK39Y1TGhDXR9WKn5oD4CQIZfFG3GQ45RWK//7zg6kkFaa1OXl7O+7+/ydz2
m8C5ZSBUuRJyzB9WZh8MGEnN32vvcZQCzX6G+FWSV+lIEPP+wShMNBqAhQ0N7IFEEakDmkWSRjiRHoQlHeKktTSmszNhn1rl8qXj
khJVLswtU+uQvTwxI2QhNnUOfdOWNf+6Mvw5u78c3glpTe7qU3GX8bDEki/aUKnWM7wntq7uK885Hx8hrWUmHI33gEZ1tcLiLMV/
+rsxGr34sU0yXqkEcYi2JtOGP2wkLvz3kwa8+CHTP6MeRj/QhNzzLgJ02IM02qmg5QtEyFkZmiygZco4EiFz8RYp2lUA29zRxKsh
XUaLTc2HYV5eLZ2cDNYNR6Qdz1hvRwxv3hK9zR9OpkEEy95kzNdHNeY8gCABxAPrHhEvbkjhqSMUynwL0OhzAE7vvWPYenpyMsOd
1/5jCffwKToKI3ALhKMiKrrrkDH6RhsXzWvyhrXy11ZvgRQAM5VbGDX5RT67A8kbFhG433C4dHwhD+3gbwNXhV8gfm9LzTVHZUVG
O2iX1gU+gAmYwya2EP2RaqvLKVWnHZWVlEX75G3EBnv/uXT0qJMoU21vt6dne4n9rB9OfBsFCX5Kjlbs1rMSfG/gKWG8WgnQQAAA
==
' | base64 -d | gunzip > file-watch-do; chmod u+x file-watch-do
`;
</script>

## Contents
```
c - calc:                Command line calculator 
    cls:                 Clear terminal and putty terminal buffer 
f - file-watch-do:       Watch a file and each time it is modified run a command 
```

<button onCLick='copyToClipboard(packText)'>Copy To Clipboard</button>

```bash
# --------------------------------------------------------------------------------------------------
# CONTENTS: calc, cls, file-watch-do
# --------------------------------------------------------------------------------------------------
# FILE: calc 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA41TXVPiMBR9z6+4xjoIIwbYfVq2zojrKOP6MYJP6jL9CDZrmzJJirjIf9+blhZxFH3INLk959x7T262t5
gvJPM9HZGIx5OR4TPjUnJxeH5MAAIvDqAJR2mSeDKEWEiex7LYM6ki5GZweFLhbtOJEanU9/CzxODxgJDLq2H/8mKAuGb00mzaPL
gHGETpE9gT2Kz7xAIEAoQ0XHmBEVOe4357mQwi8CS8+gO7flB/VUxB10jX4h/XOfEolVOuDMgs8bkCk8JZbw/OcZ3gGuK66iHv1/
Hg6LqfF4m0vgQTrdrEFiDTUJvVYJwqSLLYiEn8vIdBDjVVRC1hovhUpAhVXCMIdQ9vhqeX1yiZ/JWZ0nw/5FN0s9PqtAgt7LaOuv
QDfyl54v4o5Dr4DDfxgsdRwm2XLg352MMCKCFGPbt0qJ7Bmbe2txtsgRdQdJEqjmbiNsk7pMQkE5c682oGEJ5f7oKSTHsP3HV2eR
ClQG/s6QcqImNnZ3m1jQWFFzAKmiHQO2kPmuNWM4AGA/ZA64SIMdzeAnXaFFwXKIX7+651TqJDhbYzz3NhzlUEeyjOM2GgTcaCEO
v0CF3GgncDzwDDUpi1o06rJCXmnVwVvZWrPUUi5lVlWxU6TPPBxlt22uhVPlDV/NbzY1VlZRst41jtctvtFtQ3k10q+PjA4jfQao
rX0/QAfe/QtdhZD2PLq9HoAXc7XQSxdqvz3V5DLl9f55xv4GwknnxG3Mgefom9UeLq6xIf6PiKe4/rdjdKl+1zwBdlxypP4TRWcz
xjdw320AWcaFZ8FXPm5Sgt7ISXKYr3v1JZyi61apr9YUXt37oMau93WpFccAq99YErYhQOVsP/UYNce/afjsTYkDCVnJD/1Oy/0P
YFAAA=
' | base64 -d | gunzip > calc; chmod u+x calc
# --------------------------------------------------------------------------------------------------
# FILE: cls 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA5WQvU7DMBRG9/sUF3fIAmkhE0OGqFRQJFrUnwmkyHGuVVPbiewbQt8eI5CYkMp6pO/o6JtcTBvjp42MBz
iQ7WumDy4FrKqnBSAqG/EK55ZkQKbgjJcWpW+xH5hPv6gZtKYAsN9W9z87gLvFdr5ZPu+W61VC50pygGq/e1hv0sa9+SFEylt6Tx
k3s+tbEN+Z1ngqxblOASM1dUtR/XvYS3WsHbmGQinSTUbFy5a0HCwLgAm2HUWfMUo7ylPEsQtH1CZERjaOMHRDcscOeTSKcuiD8a
wxe50VxUvxmIH6KvkLfwKk3vGFngEAAA==
' | base64 -d | gunzip > cls; chmod u+x cls
# --------------------------------------------------------------------------------------------------
# FILE: file-watch-do 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA6VT32/aMBB+919xM6nYkEJK39Y1TGhDXR9WKn5oD4CQIZfFG3GQ45RWK//7zg6kkFaa1OXl7O+7+/ydz2
m8C5ZSBUuRJyzB9WZh8MGEnN32vvcZQCzX6G+FWSV+lIEPP+wShMNBqAhQ0N7IFEEakDmkWSRjiRHoQlHeKktTSmszNhn1rl8qXj
khJVLswtU+uQvTwxI2QhNnUOfdOWNf+6Mvw5u78c3glpTe7qU3GX8bDEki/aUKnWM7wntq7uK885Hx8hrWUmHI33gEZ1tcLiLMV/
+rsxGr34sU0yXqkEcYi2JtOGP2wkLvz3kwa8+CHTP6MeRj/QhNzzLgJ02IM02qmg5QtEyFkZmiygZco4EiFz8RYp2lUA29zRxKsh
XUaLTc2HYV5eLZ2cDNYNR6Qdz1hvRwxv3hK9zR9OpkEEy95kzNdHNeY8gCABxAPrHhEvbkjhqSMUynwL0OhzAE7vvWPYenpyMsOd
1/5jCffwKToKI3ALhKMiKrrrkDH6RhsXzWvyhrXy11ZvgRQAM5VbGDX5RT67A8kbFhG433C4dHwhD+3gbwNXhV8gfm9LzTVHZUVG
O2iX1gU+gAmYwya2EP2RaqvLKVWnHZWVlEX75G3EBnv/uXT0qJMoU21vt6dne4n9rB9OfBsFCX5Kjlbs1rMSfG/gKWG8WgnQQAAA
==
' | base64 -d | gunzip > file-watch-do; chmod u+x file-watch-do
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 21/02/23 14:30</p>
