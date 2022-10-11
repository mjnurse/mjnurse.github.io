---
title: Weight Converter
---
## Weight
<p><input type="text" id="st" name="st" min=0 size=3 value=0 autofocus onchange="stChng(this);">
<label for="st">St</label>
<input type="text" id="lb" name="lb" min=0 size=3 value=0 onchange="stChng(this);">
<label for="lb">Lb</label></p>
<p><input type="text" id="lbs" name="lbs" min=0 size=3 value=0 onchange="lbsChng(this);">
<label for="kg">lbs</label></p>
<p><input type="text" id="kg" name="kg" min=0 size=3 value=0 onchange="kgChng(this);">
<label for="kg">Kg</label></p>
<hr>
## Height
<p><input type="text" id="ft" name="ft" min=0 size=3 value=0 onchange="ftChng(this);">
<label for="st">Ft</label>
<input type="text" id="in" name="in" min=0 size=3 value=0 onchange="ftChng(this);">
<label for="lb">In</label></p>
<p><input type="text" id="m" name="m" min=0 size=3 value=0 onchange="mChng(this);">
<label for="m">m</label></p>
<hr>
## Target Weight
<p>Current BMI: <span id="bmi">0</span></p>
<p>Target Weight (BMI 20 - 25)</p>

<table>
  <tr><td></td><th>BMI 20 weight (lose/gain)</th><th>BMI 25 weight (lose/gain)</th></tr>
  <tr><th>Kg</th><td><span id="bmi20Kg">0</span></td><td><span id="bmi25Kg">0</span></td></tr>
  <tr><th>Lbs</th><td><span id="bmi20Lbs">0</span></td><td><span id="bmi25Lbs">0</span></td></tr>
  <tr><th>St Lb</th><td><span id="bmi20StLb">0</span></td><td><span id="bmi25StLb">0</span></td></tr>
</table>
<p id="message1"></p>
<hr>
**Notes:**
- BMI for adults only.  Doesn't account for body / bone structure, other formulae exist.
- BMI <20: Underweight. BMI 20-25: Healthy weight. BMI 25-30: Over Weight. BMI 30-35: Obese. BMI>35 very/morbidly obese.

<script>
  function bmiChng() {
    let stVal = parseFloat(document.getElementById('st').value);
    let lbVal = parseFloat(document.getElementById('lb').value);
    let lbsVal = parseFloat(document.getElementById('lbs').value);
    let kgVal = parseFloat(document.getElementById('kg').value);
    let m = parseFloat(document.getElementById('m').value);
    let bmi = document.getElementById('bmi');
    let bmi20Kg = document.getElementById('bmi20Kg');
    let bmi25Kg = document.getElementById('bmi25Kg');
    let message1 = document.getElementById('message1');

    let bmiVal = kgVal / (m * m);

    let bmi20KgVal = 20 * m * m;
    let bmi25KgVal = 25 * m * m;
    let bmi20KgLGVal = bmi20KgVal - kgVal;
    let bmi25KgLGVal = bmi25KgVal - kgVal;

    let bmi20LbsVal = bmi20KgVal * 2.20462;
    let bmi25LbsVal = bmi25KgVal * 2.20462;
    let bmi20LbsLGVal = bmi20LbsVal - lbsVal;
    let bmi25LbsLGVal = bmi25LbsVal - lbsVal;

    let bmi20StVal = Math.floor( bmi20LbsVal / 14 );
    let bmi20LbVal = Math.floor( bmi20LbsVal % 14 );
    let bmi25StVal = Math.floor( bmi25LbsVal / 14 );
    let bmi25LbVal = Math.floor( bmi25LbsVal % 14 );
   
    let stLbVal = 14 * stVal + lbVal; 
    let stLbMinLGVal = bmi20StVal * 14 + bmi20LbVal - stLbVal;
    let stLbMaxLGVal = bmi25StVal * 14 + bmi25LbVal - stLbVal;

    if ( stLbMinLGVal < 0 ) {
      bmi20StLGVal = -Math.floor( -stLbMinLGVal / 14 );
      bmi20LbLGVal = -Math.floor( -stLbMinLGVal % 14 );
    } else {
      bmi20StLGVal = Math.floor( stLbMinLGVal / 14 );
      bmi20LbLGVal = Math.floor( stLbMinLGVal % 14 );
    }
    if ( stLbMaxLGVal < 0 ) {
      bmi25StLGVal = -Math.floor( -stLbMaxLGVal / 14 );
      bmi25LbLGVal = -Math.floor( -stLbMaxLGVal % 14 );
    } else {
      bmi25StLGVal = Math.floor( stLbMaxLGVal / 14 );
      bmi25LbLGVal = Math.floor( stLbMaxLGVal % 14 );
    }
    
    let bmiGroup = '';
    if ( bmiVal < 20 ) {
      bmiGroup = 'Under weight';
    } else if ( bmiVal >= 20 && bmiVal < 25 ) {
      bmiGroup = 'Healthy weight';
    } else if ( bmiVal >= 25 && bmiVal < 30 ) {
      bmiGroup = 'Over weight';
    } else if ( bmiVal >= 30 && bmiVal < 35 ) {
      bmiGroup = 'Obese';
    } else {
      bmiGroup = 'Very / morbidly obese';
    }
    bmi.innerHTML = '<b>' + bmiVal.toFixed(1) + '</b> - Category: <b>' + bmiGroup + '</b>';

    bmi20Kg.innerHTML = bmi20KgVal.toFixed(1) + ' (' + bmi20KgLGVal.toFixed(1) + ')';
    bmi25Kg.innerHTML = bmi25KgVal.toFixed(1) + ' (' + bmi25KgLGVal.toFixed(1) + ')';

    bmi20Lbs.innerHTML = bmi20LbsVal.toFixed(1) + ' (' + bmi20LbsLGVal.toFixed(1) + ')';
    bmi25Lbs.innerHTML = bmi25LbsVal.toFixed(1) + ' (' + bmi25LbsLGVal.toFixed(1) + ')';

    bmi20StLb.innerHTML = bmi20StVal + 'st ' + bmi20LbVal +
        'lb (' + bmi20StLGVal + 'st ' + Math.abs(bmi20LbLGVal) + 'lb)';
    bmi25StLb.innerHTML = bmi25StVal + 'st ' + bmi25LbVal +
        'lb (' + bmi25StLGVal + 'st ' + Math.abs(bmi25LbLGVal) + 'lb)';

    if ( bmi25KgLGVal < 0 ) {
      let loss = -bmi25KgLGVal;
      message1.innerHTML = 
          '<hr><p>To get to a target BMI of <b>25</b> you need to lose <b>' +
          loss.toFixed(1) + 'kg.</b></p>' +
          '<p>This volume of fat is roughly the same as <b>' +
          ( loss / 0.9 *3.13 ).toFixed(0) + ' cans of coke.</b></p>' +
          '<p>This is roughly <b>' + (loss * 7778).toFixed(0) + '</b> calories.</p>';
    }
  }

  function ftChng() {
    let ft = document.getElementById('ft');
    let inch = document.getElementById('in');
    let m = document.getElementById('m');

    let inVal = parseFloat(ft.value) * 12 + parseFloat(inch.value);

    m.value = (inVal * 0.0254).toFixed(2);
    bmiChng();
  }
  function mChng() {
    let ft = document.getElementById('ft');
    let inch = document.getElementById('in');
    let m = document.getElementById('m');

    let inVal = parseFloat(m.value) / 0.0254 ;

    ft.value = Math.floor( inVal / 12 );
    inch.value = Math.round( inVal % 12 );
    bmiChng();
  }

  function stChng() {
    let st = document.getElementById('st');
    let lb = document.getElementById('lb');
    let lbs = document.getElementById('lbs');
    let kg = document.getElementById('kg');

    let lbsVal = parseFloat(st.value) * 14 + parseFloat(lb.value);

    lbs.value = lbsVal;
    kg.value = (lbsVal / 2.20462).toFixed(1);
    bmiChng();
  }
  function lbsChng() {
    let st = document.getElementById('st');
    let lb = document.getElementById('lb');
    let lbs = document.getElementById('lbs');
    let kg = document.getElementById('kg');

    let lbsVal = parseFloat(lbs.value);
    
    st.value = Math.floor( lbsVal / 14 );
    lb.value = Math.round( lbsVal % 14 );
    kg.value = (lbsVal / 2.20462).toFixed(1);
    bmiChng();
  }
  function kgChng() {
    let st = document.getElementById('st');
    let lb = document.getElementById('lb');
    let lbs = document.getElementById('lbs');
    let kg = document.getElementById('kg');

    let lbsVal = (kg.value * 2.20462).toFixed(1);

    st.value = Math.floor( lbsVal / 14 );
    lb.value = Math.round( lbsVal % 14 );
    lbs.value = lbsVal;
    bmiChng();
  }
</script>
<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 20/11/30 18:32</p>
