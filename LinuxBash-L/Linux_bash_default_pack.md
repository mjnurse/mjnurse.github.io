---
title: Linux bash default Pack
---

Packs contain bash scripts which have been compressed and converted to a
base64 string.  This is a convenient wat to copy a set of bash scripts
into a linux environment using only a command line terminal.

### Contents
```
c - calc:                Command line calculator 
    cls:                 Clear terminal and putty terminal buffer 
f - file-watch-do:       Watch a file and each time it is modified run a command 
```

### Pack
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
echo 'H4sIAAAAAAACA5WQvU7DMBRG9/sUF3fIAmkhE0OGqFRQJFrUnwmkyHGuVVPbiewbQt+eRAgxVSrrkb6jo29yNa2Mn1YyHu
BAti2ZvjgXsCpeFoCIyka8wbklGZApOOOlRelrbDvm0x+qOq0pAOy3xePvEOBhsZ1vlq+75Xo1sks1KUCx3z2tN+PIffguREpr+h
xK7ma39yB+Uq3xlItLpQJ6qsqaovr3sJXqWDpyFYVcDFcZFa9r0rKzLAAmWDcUfcIobS9PEfsmHFGbEBnZOMLQdIM7Nsi9UZRCG4
xnjcn7LMvesucE1FhyDn8DexD8WqIBAAA=
' | base64 -d | gunzip > cls; chmod u+x cls
# --------------------------------------------------------------------------------------------------
# FILE: file-watch-do 
# --------------------------------------------------------------------------------------------------
echo 'H4sIAAAAAAACA6VT32/aMBB+919xM6nYkEJK39Y1TGhDXR9WKn5oD4CQIZfFK3GQ44xWK//7zg6kkFaa1OXl7O+7+/ydz2
m8C5ZSBUuRJyzB9WZh8MGEnN32vvcZQCzX6G+FWSV+lIEPP+wShMNBqAhQ0N7IFEEakDmkWSRjiRHoQlHeKktTSmszNhn1rl8qXj
khJVLswtU+uQvTwxI2QhNnUOfdOWNf+6Mvw5u78c3glpTe7qU3GX8bDEki/aUKnWO7uKfeLs47Hxkvb2EtFYb8jSdwtsXlIsJ89b
86G7G6X6SYLlGHPMJYFGvDGbP3FXp/zoNZexbsmNGPIR/rR2h6lgE/aUKcaVLVdICiZSqMzBRVNuAaDRS5+IkQ6yyFauZt5lCSra
BGo+WmtqsoF8/OBm4Eo9YL4q43pHcz7g9f4Y6GVyeDYOo1Z2qmm/MaQxYA4ADyiQ2XsCd31JCMYToF7nU4hCFw37fuOTw9HWHJ6f
4zh/n8E5gEFT0BwFWSEVl1zR34IA2L5bP+RVn7aqkzw48AGsipih38opxah+WJjA3baPy9cHgkDOHvbQBfg1clf2BOzztNZUdFNW
ab2Ac2hQ6QySizFvaQbaHKK1upFZedlUX05WvEDXT2u3/5pJQoU2hjva9nd4f7qR1Mfx4MC3VJjlru1rwWc2LsL21v6eWcBAAA
' | base64 -d | gunzip > file-watch-do; chmod u+x file-watch-do
```