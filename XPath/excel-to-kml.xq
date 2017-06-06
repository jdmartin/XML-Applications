xquery version "3.0";

(: a transformation from excel 2003 XML file to KML :)
declare default element namespace "http://www.opengis.net/kml/2.2";
declare namespace xl="urn:schemas-microsoft-com:office:spreadsheet";

(: for the exercise, skip the functions until the end:)
declare function local:translatePoints($input) {
    let $x := substring-after($input, ','),
        $y := substring-before($input, ','),
        $output := concat($x, ',', $y, ',0')
    return $output
};

(: this function translates the values from (lat,long) to (x,y), which is valid for KML :)
declare function local:translateCoordinates ($input) {
    let $value := $input/xl:Cell[3]//text()
    let $output := 
        if (matches($input/xl:Cell[2]//text(), 'Point'))
        then (concat(substring-after($value, ','), ',', substring-before($value, ','), ',0'))
        
    (: our coordinates for Holland were created in Google Earth, so they don't need to be translated to X,Y format.  Hence the following choice.  However, if we did need to reverse the polygon coordinates, we would need to make a somewhat more complex function, perhaps using Regular Expressions.  Luckily... :)
    else if (matches($input/xl:Cell[2]//text(), 'Polygon')) then $value else ('ERROR') 
    return $output
};

let $inputDoc := doc('../KML/cooper-locations.xml')
let $rows := $inputDoc/xl:Workbook/xl:Worksheet/xl:Table/xl:Row[position()>1]

return 
<kml>
    <Document>
    {(: each placemark in our output corresponds to a row in the spreadsheet, hence ... :)
    for $n in $rows where matches($n/xl:Cell[2]//text(), 'Point') return 
    <Placemark>
        <name>{$n/xl:Cell[1]//text()}</name>
        <description>{$n/xl:Cell[4]//text()}</description>
        <Point>
            <coordinates>{local:translateCoordinates($n)}</coordinates>
        </Point>
    </Placemark>},
    {(: as we did for points, but with the KML structure for polygons.  We don't have any lines, but if we did, we'd do this once more.  n.b. best practices would suggest we get rid of the redundant lines, such as the name and description elements and text nodes, but this way of writing it better displays the KML structure, and should therefore be easier for us humans to follow.  If you have time, try rewriting this XQ so as to elimate the redundancies. :)
    
    for $n in $rows where matches($n/xl:Cell[2]//text(), 'Polygon') return 
    <Placemark>
        <name>{$n/xl:Cell[1]//text()}</name>
        <description>{$n/xl:Cell[4]//text()}</description>
        <Polygon>
            <tesellate>1</tesellate>
            <outerBoundaryIs>
                <LinearRing>
                    <coordinates>{local:translateCoordinates($n)}</coordinates>
                </LinearRing>
            </outerBoundaryIs>
        </Polygon>
    </Placemark>}
    </Document>
</kml>