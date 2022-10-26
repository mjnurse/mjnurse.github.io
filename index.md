---
title: mjnurse.dev
layout: front
---
Some stuff that interests me or made me smile.  The scripts I write.  GCP, Hadoop, Oracle, SQL, Python, PostgreSQL, Scala, AHK.  OK, I'm a geek - an *Entrprenerd*. Only good is good enough.   "I'll format it later" - no you won't - find a new job.

<hr>
<div id='quote'></div>
<hr>

<script type='text/javascript'>
const getQuote = async () => {
  const response = await fetch('https://favqs.com/api/qotd');
  const myJson = await response.json(); 
  document.getElementById('quote').innerHTML =
      myJson.quote.body + ' - <i>' + myJson.quote.author + '</i>';
}
getQuote();
</script>
<div class="row">
