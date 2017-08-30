# imagemap
imagemap is a Javascript library for work with image as map. jQuery is required. The goal is to create a simple core library that can be customized and extended.

# Current version
0.0.5.0

# Demo

# Quick Start
1. Import JQuery `<script type="text/javascript" src="jquery.min.js"></script>`
2. Import ImageMap javascript file `<script type="text/javascript" src="imageMap.js"></script>`

# Examples

1. Creating a map

```js
var map = new imagemap.Map({
  container: 'map',
  image: 'path/to/image/map_image.png',
  size: [4660, 3050],
  zoom: 9,
  nivel: 19
});
```

<table>
  <tr>
  <td><b>Atribute</b></td>
  <td><b>Explanation</b></td>
  </tr>
  <tr>
  <td>container</td>
  <td>Div to create map</td>
  </tr>
  <tr>
  <td>image</td>
  <td>Path to image</td>
  </tr>
  <tr>
  <td>size</td>
  <td>Imagem original size [ W, H ]</td>
  </tr>
  <tr>
  <td>zoom</td>
  <td>Zoom imagem start</td>
  </tr>
  <tr>
  <td>nivel</td>
  <td>Max zoom level</td>
  </tr>
</table>

2. Creating a marker
```js
var marker1 = map.addMarker({
  image: 'marker_red.png',
  position: [680, 720]
});
```
<table>
  <tr>
  <td><b>Atribute</b></td>
  <td><b>Explanation</b></td>
  </tr>
  <tr>
  <td>image</td>
  <td>Makert path to image</td>
  </tr>
  <tr>
  <td>position</td>
  <td>Marker position on original imagem [ Left, Top ]</td>
  </tr>
  <tr>
  <td>width</td>
  <td>Marker width</td>
  </tr>
  <tr>
  <td>height</td>
  <td>Marker height</td>
  </tr>
  <tr>
  <td>reference</td>
  <td>Users value control</td>
  </tr>
  <tr>
  <td>description</td>
  <td>Users description</td>
  </tr>
  <tr>
  <td>onclick</td>
  <td>Marker onclick event</td>
  </tr>
</table>

3. Update a marker
```js
map.addMarker({
  id: markerSelected.id, 
  image: "path/to/new_image.png", 
  width: 20,
  height: 20
});
```
<table>
  <tr>
  <td><b>Atribute</b></td>
  <td><b>Explanation</b></td>
  </tr>
  <tr>
  <td>image</td>
  <td>Makert path to image</td>
  </tr>
  <tr>
  <td>position</td>
  <td>Marker position on original imagem [ Left, Top ]</td>
  </tr>
  <tr>
  <td>width</td>
  <td>Marker width</td>
  </tr>
  <tr>
  <td>height</td>
  <td>Marker height</td>
  </tr>
  <tr>
  <td>onclick</td>
  <td>Marker onclick event</td>
  </tr>
</table>

3. Remove a marker
```js
map.removeMarker(markerSelected.id);
```
<table>
  <tr>
  <td><b>Atribute</b></td>
  <td><b>Explanation</b></td>
  </tr>
  <tr>
  <td>id</td>
  <td>Id marker</td>
  </tr>
</table>

# Authros
**Fernando Moralles**
+ [https://www.linkedin.com/in/fhmoralles](https://www.linkedin.com/in/fhmoralles)

# Copyright

# License
