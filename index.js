MBT.Token = 'pk.eyJ1Ijoic3RhdWJiciIsImEiOiJjanpoaHAxOGcwdnYyM2JsZWxhZDVxbTdsIn0.6N2EV6uBr6fLpdJvCy4_Sw';

var map = MBT.Factory.Map('map', 'mapbox://styles/staubbr/cjzhhdt6g32ld1cmsagkahaga', [-75.6972, 45.4215], 11);

map.addControl(MBT.Factory.NavigationControl(), 'top-left');
map.addControl(MBT.Factory.ScaleControl('metric'));

map.on('load', function(ev) {
	// Maybe make a classification function in MBT.Map
	var classes = [
	  'case',
	  ['<', ['get', 'area'], 1000], 'rgba(0,194,214,0.5)',
	  ['<', ['get', 'area'], 3000], 'rgba(0,155,229,0.5)',
	  ['<', ['get', 'area'], 5000], 'rgba(0,115,225,0.5)',
	  ['<', ['get', 'area'], 10000], 'rgba(0,71,196,0.5)',
	  ['<', ['get', 'area'], 20000], 'rgba(194,6,82,0.5)',
	  '#AD001B'
	];

	MBT.Map.ReorderLayers(map, ["buildings"]);
	MBT.Map.Choropleth(map, ["buildings"], classes);

	map.on('click', "buildings", function(ev) {
		if (ev.features.length == 0) return;
	
		var html = MBT.Utils.HTMLize(ev.features[0].properties);
		
		MBT.Map.InfoPopup(map, ev.lngLat, html);
	});
});