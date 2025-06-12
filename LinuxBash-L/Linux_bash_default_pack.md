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
echo 'H4sIAAAAAAACA61UXW/aMBR996+4M6lokUJK39Y1TKhDXR9aKj60B0AoJM7iLXEix5RWK/99104IkHZapZIXO+ece33uvU
4an5wlF87SyyMSsThbKPakXErue3d9AhDymNlrT/mRHaRgww+9Bc/gcJpKCLhkvkrl8xl4IgDmIa14woAr4DkkacBDzgKQK4Fhfp
okKGsTMhn1bl4fcGXyCi9hXbgqxV2YbreQeRI5xWTenRPyrT+6Ht4+jG8H95jp/dZUxAoVikr9mquIC8NUYdo/5v1nCb3J+PtgqB
W/xErmrB2wR2zRxXnnM6FFM2MumEsPnL2/S5Ss2XIRsNz/aJ7M838vEpYsmXRpwEJvFStKiO6za/05d2btmbMhSj67dIx1Ny3NgB
01IcQWJanEAwRuE0/xVGBkA26YglXu/cROyjSB6uq0iUExbQU1Gi0z7U1FmfXkZGBGN2q9Ih56Q7x+4/7wDW5v6HXScaZWcyZmsj
mvMWgBALYgnejlEkpygwXxEKZToFaHgusCtW3tnsLLyx4WHb5/pTCff9FXRuAdAOZHKZJV1dSAT1yRkO/yXxSxb4YaM3QPwIEcZt
GDXxRT65A84qEimWSPC4MHnkL8VC9gSwyv1PSMmIzWoZjshdWYdaSv2BQ6gDaDVJsooek2sdYVxdSCi9qKIHzymLEMOuXb/52iKE
gF02u9tp2/ske7XtkfeHYtr1WCHzMMV+ISHbboEc+yWsc2TtEmXKdJFuPPkR45OzHzIH8BkfhVnSoGAAA=
' | base64 -d | gunzip > file-watch-do; chmod u+x file-watch-do
`;
</script>

## Contents
```
./h
files: calc cls file-watch-do
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
echo 'H4sIAAAAAAACA61UXW/aMBR996+4M6lokUJK39Y1TKhDXR9aKj60B0AoJM7iLXEix5RWK/99104IkHZapZIXO+ece33uvU
4an5wlF87SyyMSsThbKPakXErue3d9AhDymNlrT/mRHaRgww+9Bc/gcJpKCLhkvkrl8xl4IgDmIa14woAr4DkkacBDzgKQK4Fhfp
okKGsTMhn1bl4fcGXyCi9hXbgqxV2YbreQeRI5xWTenRPyrT+6Ht4+jG8H95jp/dZUxAoVikr9mquIC8NUYdo/5v1nCb3J+PtgqB
W/xErmrB2wR2zRxXnnM6FFM2MumEsPnL2/S5Ss2XIRsNz/aJ7M838vEpYsmXRpwEJvFStKiO6za/05d2btmbMhSj67dIx1Ny3NgB
01IcQWJanEAwRuE0/xVGBkA26YglXu/cROyjSB6uq0iUExbQU1Gi0z7U1FmfXkZGBGN2q9Ih56Q7x+4/7wDW5v6HXScaZWcyZmsj
mvMWgBALYgnejlEkpygwXxEKZToFaHgusCtW3tnsLLyx4WHb5/pTCff9FXRuAdAOZHKZJV1dSAT1yRkO/yXxSxb4YaM3QPwIEcZt
GDXxRT65A84qEimWSPC4MHnkL8VC9gSwyv1PSMmIzWoZjshdWYdaSv2BQ6gDaDVJsooek2sdYVxdSCi9qKIHzymLEMOuXb/52iKE
gF02u9tp2/ske7XtkfeHYtr1WCHzMMV+ISHbboEc+yWsc2TtEmXKdJFuPPkR45OzHzIH8BkfhVnSoGAAA=
' | base64 -d | gunzip > file-watch-do; chmod u+x file-watch-do
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 25/06/12 15:33</p>
