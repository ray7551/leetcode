# Word Frequency
Write a bash script to calculate the frequency of each word in a text file words.txt.

For simplicity sake, you may assume:

- words.txt contains only lowercase characters and space ' ' characters.
- Each word must consist of lowercase characters only.
- Words are separated by one or more whitespace characters.

For example, assume that words.txt has the following content:
```
the day is sunny the the
the sunny is is
```
Your script should output the following, sorted by descending frequency:
```
the 4
is 3
sunny 2
day 1
```
Note:  
Don't worry about handling ties, it is guaranteed that each word's frequency count is unique.

Hint:  
Could you write it in one-line using Unix pipes?

## Solutions

```bash
cat words.txt | tr -s ' ' '\n'|sort |uniq -c|sort -nr|awk '{print $2 " " $1}'
```

## Real Data
Lets think about this test case, which looks more real.
```
The day            is sunny,the   the
the sunny, Is is.
```
We have to consider:
1. upper and lower case of char
2. one or more space
3. punctuation

```bash
cat words.txt \
    | tr '[:punct:]' ' ' \
    | tr '[:upper:]' '[:lower:]' \
    | tr -s '[:space:]' '\n' \
    | sort | uniq -c\
    | sort -nr\
    | awk '{print $2 " " $1}'
    
# tr -s '[:space:]' '\n' replace one or more space like char to \n
# sort |uniq -c # uniq count only work on neighbouring repeated lines
```

## PHP version
```php
<?php
$fp = fopen('words.txt', 'r');
$arr = [];
while($line = fgets($fp)){
    $line = strtolower($line);
    $line = preg_replace('#[,.\s\n]+#', ' ', $line);
    $words = explode(' ', trim($line));
    $arr = array_merge($arr, $words);
}

$count = array_count_values($arr);
arsort($count);

print_r($count);

fclose($fp);
```
