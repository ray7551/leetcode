# Tenth Line
How would you print just the 10th line of a file?

For example, assume that file.txt has the following content:
```
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
```
Your script should output the tenth line, which is:  
```
Line 10
```

Hint:  
1. If the file contains less than 10 lines, what should you output?  
2. There's at least three different solutions. Try to explore all possibilities.

# Solution 1(awk)
```bash
awk 'NR == 10 {print}' file.txt

# awk 'NR == 10' file.txt
```
# Solution 2(sed)
```bash
sed -n '10p' file.txt
```
# Solution 3(grep)
```bash
cat file.txt|grep -n ""|grep "^10:"|cut -d ":" -f2
```
# Solution 4(tail&head)
```bash
tail -n+10 file.txt|head -1
```
# Soution 5(loop)
```bash
cnt=0
IFS=$'\n' # prevents leading/trailing whitespace from being trimmed.
while read -r line && [ $cnt -le 10 ]; do # read -r prevents backslash escapes from being interpreted.
  let 'cnt = cnt + 1'
  if [ $cnt -eq 10 ]; then
    echo $line
    exit 0
  fi
done < file.txt
```
