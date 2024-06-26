---
title: csvplot - Generates a HTML page containing a Google Chart plotting the csv data
---

```bash
#!/bin/bash
help_text="
NAME
  csvplot - Generates a HTML page containing a Google Chart plotting the csv data.

USAGE
  csvplot [options] <csv filename>

OPTIONS
  -f|--fontsize
    The font size for the chart

  -h|--help
    Show help text.

  -s|--smooth
    Adds smoothing to the plotted line.

  -x|--xaxis|--haxis <name>
    sets the xaxis / haxis.

  -y|--yaxis|--vaxis <name>
    sets the yaxis / vaxis.

DESCRIPTION
  Generates a HTML page containing a Google Chart plotting the csv data.

AUTHOR
  mjnurse.dev - 2020
"
help_line="Generates a HTML page containing a Google Chart plotting the csv data"
web_desc_line="Generates a HTML page containing a Google Chart plotting the csv data"

try="Try ${0##*/} -h for more information"
tmp="${help_text##*USAGE}"
usage="$(echo Usage: ${tmp%%OPTIONS*})"

if [[ "$1" == "" ]]; then
  echo "${usage}"
  echo "${try}"
  exit 1
fi

font_size=12
smooth=n
haxis="H-Axis"
vaxis="V-Axis"

while [[ "$1" != "" ]]; do
   case $1 in 
      -h|--help|?)
         echo "$help_text"
         exit
         ;;
      -f|--fontsize)
         shift
         font_size=$1
         ;;
      -s|--smooth)
         smooth=y
         ;;
      -x|--xaxis|--haxis)
         shift
         haxis="$1"
         ;;
      -y|--yaxis|--vaxis)
         shift
         vaxis="$1"
         ;;
      ?*)
         break
         ;;
   esac 
   shift
done 

if [[ $smooth == y ]]; then
  smooth_cmd='curveType: "function",'
else
  smooth_cmd=''
fi

cf=$1
html_doc=${cf/.csv/}.html
rm -f $html_doc

echo '<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <style>
      #gChart {
        position: absolute;
        top:0;
        left:0;
        right: 0;
        bottom: 0;
      }
    </style>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
      google.charts.load("current", {"packages": ["corechart"]});
      google.charts.setOnLoadCallback(drawCht);
      function drawCht() {
        const gChtData = google.visualization.arrayToDataTable([' > $html_doc

cat $cf | sed "s/\"/'/g; s/^/[/; s/$/],/" | \
          sed "1s/\]/'\]/; 1s/\[/\['/; 1s/,/','/g; 1s/''/'/g; 1s/','$/,/" >> $html_doc

echo '    ]);
        const chtOptions = {
          backgroundColor: "#FFFFFF",
          chartArea: { left: "10%", top: "6%", height: "80%", width: "84%" },
          pointsVisible: false,
          fontSize: '$font_size',
          height: "100%",
          width: "100%",
          legend: "bottom",
          vAxis: { 
            viewWindow: {min: 0},
            title: "'$vaxis'",
            titleTextStyle: {
              // color: <string>,
              // fontName: <string>,
              fontSize: '$font_size',
              bold: true,
              italic: false,
            },
          },
          hAxis: {
            title: "'$haxis'",
            titleTextStyle: {
              // color: <string>,
              // fontName: <string>,
              fontSize: '$font_size',
              bold: true,
              italic: false,
            },
          }, '$smooth_cmd'
        };
        const chart = new google.visualization.LineChart( document.getElementById("gChart"));
        chart.draw(gChtData, chtOptions);
      }
    </script>
    <div id="gChartBox"><div id="gChart"></div></div><div>
  </body>
</html>
' >> $html_doc

```

<hr>
<p class="pagedate">This page was generated by <a href=".">GitHub Pages</a>.  Page last modified: 22/10/05 13:55</p>
