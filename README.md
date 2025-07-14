# Meteors-impacted-earth-for-certain-period-visuzalized
This was course project done by me using some powerful tool such as d3.js
Note: If ur using google chrome for opening this project, i would suggest using CORS extension/Allow-control-Allow-origin or try using
it in safari browser.



index.html


# Meteors Impacted Earth Visualization

This web app visualizes meteorite impacts on Earth using interactive D3.js charts and maps.

## Features

- **World Map:**  
  Interactive map showing meteorite impact locations. Supports zoom and pan.

- **Horizontal Bar Graph:**  
  Displays the number of meteorites by mass range.

- **Stacked Bar Chart:**  
  Visualizes the number of meteorites per year, grouped by type.

## Usage

1. **Install dependencies:**  
   No installation needed for static hosting.

2. **Run locally:**  
   Use a local web server (Python, Node.js, or VS Code Live Server).
   ```
   python -m http.server 8000
   ```
   Then open [http://localhost:8000](http://localhost:8000).

3. **Deploy:**  
   Host on GitHub Pages, Netlify, Vercel, or any static site host.

## Project Structure

```
├── index.html
├── Designs.css
├── js/
│   ├── map.js
│   ├── bargraph.js
│   └── stackedgraph.js
├── data/
│   ├── world.geojson
│   └── meteor.json
```

## Data

- `data/world.geojson`: GeoJSON file for world map boundaries.
- `data/meteor.json`: Meteorite impact data.

## Customization

- Change colors and layout in `Designs.css`.
- Update or replace data files in the `data/` folder.

## Credits

- Built with [D3.js](https://d3js.org/)
- World map data from [D3 Graph Gallery](https://www.d3-graph-gallery.com/)
- Meteorite data from [NASA Open Data](https://data.nasa.gov/)
	g.selectAll("path")
