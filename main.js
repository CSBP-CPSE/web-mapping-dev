// import MBT from '../mapbox-tools/mbtools.js';
MBT.Token = 'pk.eyJ1Ijoic3RhdWJiciIsImEiOiJjanpoaHAxOGcwdnYyM2JsZWxhZDVxbTdsIn0.6N2EV6uBr6fLpdJvCy4_Sw';
MBT.Locale = document.documentElement.lang || "en";
MBT.Nls = nls;

var map = MBT.Factory.Map('map', 'mapbox://styles/staubbr/cjztbdnpi0qgp1dpruzzu6ec4', [-75.6972, 45.4215], 11);

map.addControl(MBT.Factory.NavigationControl(), 'top-left');
map.addControl(MBT.Factory.ScaleControl('metric'));
map.addControl(MBT.Factory.LegendControl());

map.on('load', function(ev) {
	// Maybe make a classification function in MBT.Map
	var classes = [
		'case',
		['==', ['get', 'Data_prov'], "Microsoft"], 'rgba(0, 140, 220, 0.8)',
		'rgba(200, 0, 40, 0.8)'
	];

	var layers = ["ab", "bc", "mb", "nb", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yt"];

	MBT.Map.ReorderLayers(map, layers);
	MBT.Map.Choropleth(map, layers, classes);

	layers.forEach(function(l) {
		map.on('click', l, function(ev) {
			if (ev.features.length == 0) return;
		
			var html = MBT.Utils.HTMLize(ev.features[0].properties);
			
			MBT.Map.InfoPopup(map, ev.lngLat, html);
		});
	});
});