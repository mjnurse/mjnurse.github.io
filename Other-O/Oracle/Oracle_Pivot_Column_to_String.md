---
title: Oracle Pivot Column to String
---

```sql
SELECT
   dept_num
,  LISTAGG( emp_name, ',' ) WITHIN GROUP (ORDER BY emp_name) AS emps
FROM
   emp
GROUP BY
   dept_num
;
```
<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 20/11/30 18:32</p>
