---
title: Bash / Linux Cheatsheet
layout: page-with-contents-list
---

# BASH

## Variables

```bash
${#var}                # var length.
${var:-default}        # If missing use default.
${var:0:4} ${var:(-3)} # Substr if -n then take from end (need brackets as :- sets default)
${var/hello/bye}       # Search/replace
${var//hello/bye}      # Search/replace all
$s ${s^} ${s^^}        # Change case - hello Hello HELLO.  (uppercase)
$s ${s,} ${s,,}        # Change case - HELLO hELLO hello.  (lowercase)
${var##*str}           # Left Trim - trim up to and inc this string.
${var%%str*}           # Right Trim - trim from and inc this string.
```
```bash
$RANDOM                # eg echo $((RANDOM%100)).
$?                     # Last command exit status.
${var//[$'\n\r']}      # Strip newlines from var.
```

### Indirect variable references

```bash
export varname=size; export size=100; echo ${varname} ${!varname} # Yields: size 100
```

### Setting session path to include current directory

```bash
export PATH=$PATH:.
```

----

## Arrays

```bash
declare -a arr=("Martin" "is" "cool")

echo ${arr[@]}  # Yields: Martin, is, cool
echo ${arr[1]}  # Yields: is,

arr[10]="ace"

echo ${arr[@]}   # Yields: Martin is cool ace
echo ${arr[3]}   # Yields nothing
echo ${arr[10]}  # Yields: ace
```

----

## Files

```bash
if [[ -f $filename ]]; then "echo $filename exists"; fi

Check for files: [ -<see below> "<filename>" ] # Check for files.

#   -d dirname    - Check for directory Existence.
#   -e filename   - Check for file existence, regardless of type.
#   -f filename   - Check for regular file existence not a directory.
#   -r filename   - Check if file is readable.
#   -s filename   - Check if file is nonzero size.
#   -w filename   - Check if file is writable.
#   -x filename   - Check if file is executable.
```

----

## IF THEN ELSE, CASE

```bash
if [[ "$1" == "-a" || "$1" == "" ]]; then
   echo great!
fi
```
```bash
case $1 in
   [1-3])      echo "matches 1 to 3" ;;
   [4-6]*)     echo "matches 4 to 6 followed by any thing" ;;
   1[0-5]*)    echo "matches 1 followed by 0 to 5" ;;
   *[8-9])     echo "matches anything ending 8 to 9" ;;
   *ing)       echo "matches string ending ing" ;;
   -h|--help)  echo "matches -h or --help" ;;
   ?*)         echo "matches anything except nothing" ;;
   *)          echo "matches anything including nothing" ;;
esac
```
```bash
[[ $var =~ .*hello.* ]] # Regexp match.
```

----

## Looping

### Infinite loop

```bash
while [ 1 ]; do 
  echo 'infinite loop';
done
```

### Numeric Loop

```bash
for ((i=0; i< 10; i++)); do
  echo $1
done

# Using seq.  seq <start value> [<step>] <end value>
for i in $(seq 10 -2 2); do
  echo $i
done
```

### Loop Through Files

```bash
for file in *.txt; do echo $f; done
for file in $(find .); do vi file: $f; done
```

### Loop Through Dates

```bash
start_date="2015-01-27"; end_date="2015-02-02"
d=$start_date
while [[ "$d" < "$end_date" || "$d" = "$end_date" ]]; do
   echo $d
   d=$(date -I -d "$d + 1 day")
done
```

### Process File Line By Line

```bash
while read line; do
done < filename
```

----

## Functions

```bash
function check_params() {
   # param 1 - actual number of parameters
   # param 2 - required number of parameters
   # param 3 - incorrect parameters message
 
   if [[ "$1" != "$2" ]]; then
      echo "$3"
      exit
   fi
}

check_params #$ 2 "Usage: this_script <username>"

# Parameter / Variable Validation
if ! [[ $sleep_sec =~ ^[0-9]+$ ]] ; then
   echo "Error: Sleep seconds: \"$sleep_sec\" is not a number"
   exit 1
fi
```

----

## Generate a Random String (Password)

```bash
# openssl generate strings in lengths of multiple of 4 (starting position 0) so need to trim
# 10 character string.
openssl rand -base64 10 | cut -c -10
```

----

## Exit Traps

Run a command when a script exists for any reason.

Example script `example.sh`:

```bash
#!/bin/bash

tmp-dir=$(mkdir /tmp/test)

function cleanup {
  rm -rf "$tmp-dir"
}

trap cleanup EXIT

# The rest of the scripts
```

----

## Scripts

```bash
# Process command line parameters

while [ "$1" != "" ]; do
   case $1 in
      -l) list_only=Y ;;
      -d) shift
          run_date=$1 ;;
      *)  db=$1 ;;
   esac
   shift
done
```

----

# LINUX

## System

```bash
uname -a     # Display linux system information 
uname -r     # Display kernel release information 
uptime       # Show how long the system has been running + load 
hostname     # Show system host name 
hostname -i  # Display the IP address of the host 
last reboot  # Show system reboot history 
cal          # Show this month calendar 
w            # Display who is online 
whoami       # Who you are logged in as 
finger user  # Display information about user 
```

----

## Hardware

```bash
dmesg                  # Detected hardware and boot messages
cat /proc/cpuinfo      # CPU model
cat /proc/meminfo      # Hardware memory
cat /proc/interrupts   # Lists the number of interrupts per CPU per I/O device
lshw                   # Displays information on hardware configuration
lsblk                  # Displays block device related information in Linux
free -m                # Used and free memory (-m for MB)
lspci -tv              # Show PCI devices
lsusb -tv              # Show USB devices
dmidecode              # Show hardware info from the BIOS
hdparm -i /dev/sda     # Show info about disk sda
hdparm -tT /dev/sda    # Do a read speed test on disk sda
badblocks -s /dev/sda  # Test for unreadable blocks on disk sda
```

----

## Users

```bash
id                                     # Show the active user id with login and group
last                                   # Show last logins on the system
who                                    # Show who is logged on the system
groupadd admin                         # Add group "admin"
useradd -c "Sam Tosh" -g admin -m sam  # Create user "sam"
userdel sam                            # Delete user sam
adduser sam                            # Add user "sam"
usermod                                # Modify user information
```

----

## File Commands

```bash
cat > file                          # Place standard input into file

cp -r dir1 dir2                     # Copy dir1 to dir2, create dir2 if it doesn't exist
cp file1 file2                      # Copy file1 to file2

gpg -c file                         # Encrypt file
gpg file.gpg                        # Decrypt file

head file                           # Output first 10 lines of file

ln -s /path/to/file-name link-name  # Create symbolic link to file-name

ls -al                              # Display all information about files/ directories

mkdir dir-name                      # Create a directory

more file                           # Output contents of file

mv file1 file2                      # Rename source to dest / move source to directory

pwd                                 # Show the path of current directory

rm -f file-name                     # Forcefully remove file
rm -r dir-nam                       # Delete directory recursively
rm file-name                        # Delete file

tail -f file                        # Output contents of file as it grows
tail file                           # Output last 10 lines of file

touch file                          # Create or update file

wc                                  # print the number of bytes, words, and lines in files

xargs                               # Execute command lines from standard input
```

----

## Diff

```bash
> echo -e "aaa\\nbbb" > a; echo -e "bbb\\nccc" > b; diff a b
1d0
< aaa
2a2
> ccc
# To change a into b, remove line with aaa and add line with ccc.
```

----

## Process

```bash
ps                      # Display your currently active processes
ps aux | grep 'telnet'  # Find all process id related to telnet process
pmap                    # Memory map of process
top                     # Display all running processes
kill pid                # Kill process with mentioned pid id
killall proc            # Kill all processes named proc
pkill process-name      # Send signal to a process with its name
bg                      # Resumes suspended jobs without bringing them to
foreground fg           # Brings the most recent job to foreground
fg n                    # Brings job n to the foreground:$
```

----

## File Permissions

```bash
chmod octal file-name                 # Change the permissions of file to octal
chmod 777 /data/test.c                # Set rwx permission for owner,group,world
chmod 755 /data/test.c                # Set rwx permission for owner,rx for group and world
chown owner-user file                 # Change owner of the file or directory
chown owner-user:owner-group filename # Change owner and group owner of the file
```

----

## Network 

```bash
ip addr show                         # Display all network interfaces and ip address
ip address add 192.168.0.1 dev eth0  # Set ip address
ethtool eth0                         # Linux tool to show ethernet status
mii-tool eth0                        # Linux tool to show ethernet status
ping host                            # Send echo request to test connection
whois domain                         # Get who is information for domain
dig domain                           # Get DNS information for domain
dig -x host                          # Reverse lookup host
host google.com                      # Lookup DNS ip address for the name
hostname ip                          # Lookup local ip address
wget file                            # Download file
netstat -tupl                        # Listing all active listening ports
```

----

## Compression / Archives

```bash
tar cf home.tar home       # Create tar named home.tar containing home
tar xf file.tar            # Extract the files from file.tar
tar czf file.tar.gz files  # Create a tar with gzip compression
gzip file                  # Compress file and renames it to file.gz
```

----

## Install Package

```bash
rpm -i pkgname.rpm  # Install rpm based package
rpm -e pkgname      # Remove package
```

----

## Search

```bash
grep pattern files            # Search for pattern in files
grep -r pattern dir           # Search recursively for pattern in dir
locate file                   # Find all instances of file
find /home/tom -name 'index*' # Find files names that start with "index"
find /home -size +10000k      # Find files larger than 10000k in /home
```

----

## Login (SSH And TELNET) 

```bash
ssh user@host          # Connect to host as user
ssh -p port user@host  # Connect to host using specific port
telnet host            # Connect to the system using telnet port
```

----

## File Transfer

```bash
scp file.txt server2:/tmp      # Secure copy file.txt to remote host /tmp folder
rsync -a /home/apps /backup/   # Synchronize source to destination
```

----

## Disk Usage

```bash
df -h                          # Show free space on mounted filesystems
df -i                          # Show free inodes on mounted filesystems
fdisk -l                       # Show disks partitions sizes and types
du -ah                         # Display disk usage in human readable form
du -sh                         # Display total disk usage on the current directory
findmnt                        # Displays target mount point for all filesystem
mount device-path mount-point  # Mount a device
```

----

## Security

```bash
sudo /usr/sbin/visudo  # Alter sudo
```

# Useful / Other

## tarballs

```bash
> tar -cvzf filename sourcedir # Create tarball
> tar -xvzf filename           # Extract tarball
```

## date

```bash
> date +'%y%m%d-%H%M'          # yields 20180101-2301 etc.
```

## stderr Redirect

```bash
# Redirect stderr :: 2>&1 - redirect errors, error, linux
> myprogram > log 2>&1

```

## Counting Values In A List

```bash
> echo "aaa
aaa
bbb
ccc
ccc
ccc" | uniq -c

      2 aaa
      1 bbb
      3 ccc
```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 23/08/03 11:23</p>
