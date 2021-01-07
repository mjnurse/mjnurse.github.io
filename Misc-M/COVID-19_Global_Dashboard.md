---
title: Covid-19 Global Dashboard
layout: covid
---
<style>
#gChartBox {
  position: relative;
  width: 100%;
  padding-top: 50%;
}
#gChart {
  position: absolute;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
}
</style>

<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript" src="/assets/javascript/covid19GlobalData.js"></script>

<h1 id="chartTitle"></h1>
<label for="vmax" style="font-size: 0.8em;">Vertical Axis Max:</label>
<input type="text" id="vmax" name="vmax" style="font-size:0.8em;">
<button type="button" onClick="setChartMax();" style="font-size:0.8em;">Set</button>
<div id="gChartBox"><div id="gChart"></div></div>
<hr>
<div>
<form id="measureForm">
<div class="measureBox">
<p><b>Cases</b></p>
<input type="radio" name="measure" id="measure1" onchange="drawCht();" value="0"> - Per Day<br>
<input type="radio" name="measure" id="measure2" onchange="drawCht();" value="1" checked> - Total<br>
</div>
<div class="measureBox">
<p><b>Deaths</b></p>
<input type="radio" name="measure" id="measure2" onchange="drawCht();" value="2"> - Per Day<br>
<input type="radio" name="measure" id="measure3" onchange="drawCht();" value="3"> - Total<br>
</div>
<div class="measureBox">
<p><b>Cases Per Million</b></p>
<input type="radio" name="measure" id="measure4" onchange="drawCht();" value="4"> - Per Day<br>
<input type="radio" name="measure" id="measure5" onchange="drawCht();" value="5"> - Total<br>
</div>
<div class="measureBox">
<p><b>Deaths Per Million</b></p>
<input type="radio" name="measure" id="measure6" onchange="drawCht();" value="6"> - Per Day<br>
<input type="radio" name="measure" id="measure7" onchange="drawCht();" value="7"> - Total<br>
</div>
</form>
</div>
<div class="clearfloat"></div>
<hr>
<div>

<div class="ctryBox"><input type="checkbox" id="ctryCb1" name="ctryCb1" value="Argentina" onchange="ctryChange(this);" /> - <label for="ctryCb1">Argentina</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb2" name="ctryCb2" value="Australia" onchange="ctryChange(this);" /> - <label for="ctryCb2">Australia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb3" name="ctryCb3" value="Austria" onchange="ctryChange(this);" checked /> - <label for="ctryCb3">Austria</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb4" name="ctryCb4" value="Belarus" onchange="ctryChange(this);" /> - <label for="ctryCb4">Belarus</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb5" name="ctryCb5" value="Belgium" onchange="ctryChange(this);" checked /> - <label for="ctryCb5">Belgium</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb6" name="ctryCb6" value="Brazil" onchange="ctryChange(this);" /> - <label for="ctryCb6">Brazil</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb7" name="ctryCb7" value="Bulgaria" onchange="ctryChange(this);" /> - <label for="ctryCb7">Bulgaria</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb8" name="ctryCb8" value="Canada" onchange="ctryChange(this);" /> - <label for="ctryCb8">Canada</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb9" name="ctryCb9" value="China" onchange="ctryChange(this);" /> - <label for="ctryCb9">China</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb10" name="ctryCb10" value="Croatia" onchange="ctryChange(this);" /> - <label for="ctryCb10">Croatia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb11" name="ctryCb11" value="Denmark" onchange="ctryChange(this);" /> - <label for="ctryCb11">Denmark</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb12" name="ctryCb12" value="Finland" onchange="ctryChange(this);" /> - <label for="ctryCb12">Finland</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb13" name="ctryCb13" value="France" onchange="ctryChange(this);" checked /> - <label for="ctryCb13">France</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb14" name="ctryCb14" value="Germany" onchange="ctryChange(this);" /> - <label for="ctryCb14">Germany</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb15" name="ctryCb15" value="Greece" onchange="ctryChange(this);" /> - <label for="ctryCb15">Greece</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb16" name="ctryCb16" value="Hungary" onchange="ctryChange(this);" /> - <label for="ctryCb16">Hungary</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb17" name="ctryCb17" value="India" onchange="ctryChange(this);" /> - <label for="ctryCb17">India</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb18" name="ctryCb18" value="Indonesia" onchange="ctryChange(this);" /> - <label for="ctryCb18">Indonesia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb19" name="ctryCb19" value="Iran" onchange="ctryChange(this);" /> - <label for="ctryCb19">Iran</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb20" name="ctryCb20" value="Ireland" onchange="ctryChange(this);" checked /> - <label for="ctryCb20">Ireland</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb21" name="ctryCb21" value="Israel" onchange="ctryChange(this);" /> - <label for="ctryCb21">Israel</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb22" name="ctryCb22" value="Italy" onchange="ctryChange(this);" checked /> - <label for="ctryCb22">Italy</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb23" name="ctryCb23" value="Japan" onchange="ctryChange(this);" /> - <label for="ctryCb23">Japan</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb24" name="ctryCb24" value="Luxembourg" onchange="ctryChange(this);" /> - <label for="ctryCb24">Luxembourg</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb25" name="ctryCb25" value="Malaysia" onchange="ctryChange(this);" /> - <label for="ctryCb25">Malaysia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb26" name="ctryCb26" value="Mexico" onchange="ctryChange(this);" /> - <label for="ctryCb26">Mexico</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb27" name="ctryCb27" value="Netherlands" onchange="ctryChange(this);" checked /> - <label for="ctryCb27">Netherlands</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb28" name="ctryCb28" value="Norway" onchange="ctryChange(this);" /> - <label for="ctryCb28">Norway</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb29" name="ctryCb29" value="Pakistan" onchange="ctryChange(this);" /> - <label for="ctryCb29">Pakistan</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb30" name="ctryCb30" value="Poland" onchange="ctryChange(this);" /> - <label for="ctryCb30">Poland</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb31" name="ctryCb31" value="Portugal" onchange="ctryChange(this);" /> - <label for="ctryCb31">Portugal</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb32" name="ctryCb32" value="Russia" onchange="ctryChange(this);" /> - <label for="ctryCb32">Russia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb33" name="ctryCb33" value="Serbia" onchange="ctryChange(this);" /> - <label for="ctryCb33">Serbia</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb34" name="ctryCb34" value="South_Africa" onchange="ctryChange(this);" /> - <label for="ctryCb34">South_Africa</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb35" name="ctryCb35" value="South_Korea" onchange="ctryChange(this);" /> - <label for="ctryCb35">South_Korea</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb36" name="ctryCb36" value="Spain" onchange="ctryChange(this);" checked /> - <label for="ctryCb36">Spain</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb37" name="ctryCb37" value="Sweden" onchange="ctryChange(this);" checked /> - <label for="ctryCb37">Sweden</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb38" name="ctryCb38" value="Switzerland" onchange="ctryChange(this);" /> - <label for="ctryCb38">Switzerland</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb39" name="ctryCb39" value="Turkey" onchange="ctryChange(this);" /> - <label for="ctryCb39">Turkey</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb40" name="ctryCb40" value="UK" onchange="ctryChange(this);" checked /> - <label for="ctryCb40">UK</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb41" name="ctryCb41" value="USA" onchange="ctryChange(this);" checked /> - <label for="ctryCb41">USA</label></div>
<div class="ctryBox"><input type="checkbox" id="ctryCb42" name="ctryCb42" value="Ukraine" onchange="ctryChange(this);" /> - <label for="ctryCb42">Ukraine</label></div>

</div>
<div class="clearfloat"></div>
<hr>
<h2 id="tableTitle"></h2>
<div id="statsTable"></div>
<script type="text/javascript" src="/assets/javascript/covid19Global.js"></script>

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 21/01/07 16:34</p>
