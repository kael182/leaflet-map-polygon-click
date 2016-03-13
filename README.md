# leaflet-map-polygon
Leaflet thematic polygon (choropleth) map, with US and Connecticut examples

## demos
- US example http://jackdougherty.github.io/leaflet-map-polygon/ct.html
- CT example http://jackdougherty.github.io/leaflet-map-polygon/us.html

## credits
- Leaflet choropleth tutorial: http://leafletjs.com/examples/choropleth.html
- Connecticut Mirror: http://ctmirror.org

## how to create your own

Strategy 1: See detailed tutorial steps in http://DataVizForAll.org

**TO DO** simplify file names to index.html, data.js, etc.

- Start with GeoJSON polygon map with no numerical data, such as: ct-towns-simple.geojson
- Import polygon map into http://MapShaper.org. Simplify to reduce size as needed.
- Export as CSV to create spreadsheet of polygon names. In this example, column header is "town"
- Open CSV with any spreadsheet tool. Insert columns of data into the CSV sheet. Use VLOOKUP function if needed.
- Save CSV with new name: ct-towns.csv
- Import ct-towns.csv as second layer into MapShaper.org.
- Use the drop-down to select the polygon map (ct-towns-simple.geojson) as the active, displayed layer.
- Click the Console and enter command to join the CSV table to the GeoJSON polygon
  ```
  -join ct-towns.csv keys=town,town
  ```
- Export the newly joined map with a new filename in GeoJSON format: ct-towns-density.json)
- Change the file name suffix from .json to .js, so it becomes ct-towns-density.js
- Open this .js file with a text editor, such as Atom http://atom.io
- Inside the .js file, add text to start and end to declare a variable, data, to be equal to the contents of the file.
  - add this to the start:
  ```
  var data =
  ```
  - the contents of the file remain the same
  - insert a semicolon ( ; ) at the end of the file

- Fork this GitHub repository, or create your own, with these files (or equivalent):
  - index.html (similar to ct.html)
  - data.js (similar to ct-towns-density.js)
  - script.js (similar to ct-script.js)
  - style.css

- Adjust the hover info as needed
- Adjust the ranges with http://colorbrewer.org

Strategy 2:
- rewrite script to pull data directly from GeoJSON file, OR


Strategy 3:

- see CT Mirror workflow to keep map-borders.js separate; how to link data.js?
- rewrite functions to display borders directly from GeoJSON file, and pull data from CSV
