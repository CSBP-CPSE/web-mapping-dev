var style = 'mapbox://styles/staubbr/cjzhhdt6g32ld1cmsagkahaga';
var center = [-75.6972, 45.4215];
var zoom = 11;
var layers = ['buildings'];
var paint = 'odb-ontario-4326';

var classes = [
  'case',
  ['<', ['get', 'area'], 1000], 'rgba(0,194,214,0.5)',
  ['<', ['get', 'area'], 3000], 'rgba(0,155,229,0.5)',
  ['<', ['get', 'area'], 5000], 'rgba(0,115,225,0.5)',
  ['<', ['get', 'area'], 10000], 'rgba(0,71,196,0.5)',
  ['<', ['get', 'area'], 20000], 'rgba(194,6,82,0.5)',
  '#AD001B'
];

MBT.Token = 'pk.eyJ1Ijoic3RhdWJiciIsImEiOiJjanpoaHAxOGcwdnYyM2JsZWxhZDVxbTdsIn0.6N2EV6uBr6fLpdJvCy4_Sw';

var map = MBT.Factory.Map('map', style, center, zoom);

map.addControl(MBT.Factory.NavigationControl(), 'top-left');
map.addControl(MBT.Factory.ScaleControl('metric'));
// map.addControl(MBT.Factory.AttributionControl());

map.on('load', function(ev) { 
	// MBT.ReorderLayers(map, layers);
	// MBT.Choropleth(map, layers, classes);

	for (var i = 0; i < layers.length; i++) {
		map.on('click', layers[i], function(ev) {
			if (ev.features.length == 0) return;
		
			var html = MBT.Utils.HTMLize(ev.features[0].properties);
			
			MBT.InfoPopup(map, ev.lngLat, html);
		});
	}
});