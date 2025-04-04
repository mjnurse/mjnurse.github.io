---
title: Hash Value Clash Probability
section: Notes
---

I needed to know what the probability of a clash was if I used only the first 16 characters of a 32 hexadecimal character MD5 hash was.

I found the function for this is `1-EXP(-(([Number of Values]^2)/(2*2^[Number of bits])))`.

MD5 is a 128 bit hash. The first 16 hexadecimal characters is effectively a 64 bit hash.

The table below show the percentage probability of a clash for an increasing number of values.

The table below that shows the number of values that would need to be hashed to get to the stated percentage of a clash.

| Number of Values | Description | 32 bit | 64 bit | 128 bit | 256 bit |
| ---------------- | ----------- | ------ | ------ | ------- | ------- |
| 10,000 | Ten thousand | 1.15740% | 0.00000% | 0.00000% | 0.00000% | 
| 100,000 | One hundred thousand | 68.78131% | 0.00000% | 0.00000% | 0.00000% | 
| 1,000,000 | One million | 100.00000% | 0.00000% | 0.00000% | 0.00000% | 
| 10,000,000 | Ten million | 100.00000% | 0.00027% | 0.00000% | 0.00000% | 
| 100,000,000 | One hundred million | 100.00000% | 0.02710% | 0.00000% | 0.00000% | 
| 1,000,000,000 | One billion | 100.00000% | 2.67410% | 0.00000% | 0.00000% | 
| 10,000,000,000 | Ten billion | 100.00000% | 93.34968% | 0.00000% | 0.00000% | 
| 100,000,000,000 | One hundred billion | 100.00000% | 100.00000% | 0.00000% | 0.00000% | 
| 1,000,000,000,000 | One trillion | 100.00000% | 100.00000% | 0.00000% | 0.00000% | 
| 10,000,000,000,000 | Ten trillion | 100.00000% | 100.00000% | 0.00000% | 0.00000% | 
| 100,000,000,000,000 | One hundred trillion | 100.00000% | 100.00000% | 0.00000% | 0.00000% | 
| 1,000,000,000,000,000 | One quadrillion | 100.00000% | 100.00000% | 0.00000% | 0.00000% | 
| 10,000,000,000,000,000 | Ten quadrillion | 100.00000% | 100.00000% | 0.00001% | 0.00000% | 
| 100,000,000,000,000,000 | One hundred quadrillion | 100.00000% | 100.00000% | 0.00147% | 0.00000% | 
| 1,000,000,000,000,000,000 | One quintillion | 100.00000% | 100.00000% | 0.14683% | 0.00000% | 
| 10,000,000,000,000,000,000 | Ten quintillion | 100.00000% | 100.00000% | 13.66515% | 0.00000% | 
| 100,000,000,000,000,000,000 | One hundred quintillion | 100.00000% | 100.00000% | 99.99996% | 0.00000% | 
| 1,000,000,000,000,000,000,000 | One sextillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 
| 10,000,000,000,000,000,000,000 | Ten sextillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 
| 100,000,000,000,000,000,000,000 | One hundred sextillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 
| 1,000,000,000,000,000,000,000,000 | One septillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 
| 10,000,000,000,000,000,000,000,000 | Ten septillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 
| 100,000,000,000,000,000,000,000,000 | One hundred septillion | 100.00000% | 100.00000% | 100.00000% | 0.00000% | 

The table below shows the number of values that would need to be hashed to get to the stated percentage of a clash.

| percentage | 32 bit | 64 bit | 128 bit | 256 bit |
| ---------- | ------ | ------ | ------- | ------- |
| 0.0000001% | 2 | 140,000 | 580,000,000,000,000 | 11,000,000,000,000,000,000,000,000,000,000,000 |
| 0.000001% | 7 | 430,000 | 1,800,000,000,000,000 | 34,000,000,000,000,000,000,000,000,000,000,000 |
| 0.00001% | 21 | 1,400,000 | 5,800,000,000,000,000 | 110,000,000,000,000,000,000,000,000,000,000,000 |
| 0.0001% | 66 | 4,300,000 | 18,000,000,000,000,000 | 340,000,000,000,000,000,000,000,000,000,000,000 |
| 0.001% | 210 | 14,000,000 | 58,000,000,000,000,000 | 1,100,000,000,000,000,000,000,000,000,000,000,000 |
| 0.1% | 2,100 | 140,000,000 | 580,000,000,000,000,000 | 11,000,000,000,000,000,000,000,000,000,000,000,000 |
| 0.5% | 4,600 | 300,000,000 | 1,300,000,000,000,000,000 | 24,000,000,000,000,000,000,000,000,000,000,000,000 |
| 1% | 6,600 | 430,000,000 | 1,800,000,000,000,000,000 | 34,000,000,000,000,000,000,000,000,000,000,000,000 |
| 5% | 15,000 | 970,000,000 | 4,200,000,000,000,000,000 | 77,000,000,000,000,000,000,000,000,000,000,000,000 |
| 10% | 21,000 | 1,400,000,000 | 6,000,000,000,000,000,000 | 110,000,000,000,000,000,000,000,000,000,000,000,000 |
| 25% | 35,000 | 2,300,000,000 | 9,900,000,000,000,000,000 | 180,000,000,000,000,000,000,000,000,000,000,000,000 |
| 50% | 55,000 | 3,600,000,000 | 15,000,000,000,000,000,000 | 280,000,000,000,000,000,000,000,000,000,000,000,000 |
| 75% | 77,000 | 5,100,000,000 | 22,000,000,000,000,000,000 | 400,000,000,000,000,000,000,000,000,000,000,000,000 |
| 95% | 110,000 | 7,400,000,000 | 32,000,000,000,000,000,000 | 590,000,000,000,000,000,000,000,000,000,000,000,000 |
| 99% | 140,000 | 9,200,000,000 | 40,000,000,000,000,000,000 | 730,000,000,000,000,000,000,000,000,000,000,000,000 |
| 100% | 390,000 | 25,000,000,000 | 110,000,000,000,000,000,000 | 2,000,000,000,000,000,000,000,000,000,000,000,000,000 |



<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 25/02/11 16:09</p>
