---
title: PySpark Create a DataFrame
---

File: test.json

```
{"name":"martin", "status":"cool"}
{"name":"phil", "status":"dull"}
```

```
> hdfs dfs -mkdir hdfs://localhost:9000/user/martin/
> hdfs dfs -put test.json hdfs://localhost:9000/user/martin/test.json
```

Start PySpark

```
> PySpark
```

```python
>>> df = spark.read.json("test.json")
>>> df.show()
+------+------+
|  name|status|
+------+------+
|martin|  cool|
|  phil|  dull|
+------+------+
```
