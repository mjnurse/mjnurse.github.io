---
title: Set Default User For WSL Ubuntu
---

To do this you need to switch the default user for WSL Ubuntu to root.  WSL will not promot for a root password.  Run WSL, update the user password and then reset the default user back to your username.

The command depend on the version of Ubuntu you have installed.  Press the windows key and type "Ubuntu" and you should see the Unbuntu app listed which may include a version number.  If so, add this to the end on the `ubuntu` command.

### Step 1 - Update WSL Ubuntu Default User to Root

In a windows `cmd` shell.

```
> ubuntu config --default-user root

# Or for, for example, version 22.04:

> ubuntu2204 -- default-user root
```

### Step 2 - Reset Password

Run WSL Ubuntu password command.

In a windows `cmd` shell.

```
> wsl passwd martin
```

### Step 3 - Reset WSL Ubuntu Default User Back to Your Username

In a windows `cmd` shell.

```
> ubuntu config --default-user martin 

# Or for, for example, version 22.04:

> ubuntu2204 -- default-user martin
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 24/08/05 10:31</p>
