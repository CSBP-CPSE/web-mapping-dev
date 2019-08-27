import Nls from './nls.js';
import Splash from './splash.js';
import Map from '../mapbox-tools/tools/map.js';
import Utils from '../mapbox-tools/tools/utils.js';
import Factory from '../mapbox-tools/tools/factory.js';
import Core from '../basic-tools/tools/core.js';
import Dom from '../basic-tools/tools/dom.js';

Core.locale = document.documentElement.lang || "en";
Core.nls = Nls;

Map.Token = 'pk.eyJ1Ijoic3RhdWJiciIsImEiOiJjanpoaHAxOGcwdnYyM2JsZWxhZDVxbTdsIn0.6N2EV6uBr6fLpdJvCy4_Sw';

var popup = new Splash();

// TODO : Needs to be converted to promise but stupid ie11
popup.Show(Initialize);

function Initialize() {	
	var map = Factory.Map('map', 'mapbox://styles/staubbr/cjztbdnpi0qgp1dpruzzu6ec4', [-75.6972, 45.4215], 11);

	map.addControl(Factory.NavigationControl(), 'top-left');
	map.addControl(Factory.ScaleControl('metric'));
	map.addControl(Factory.LegendControl());

	map.on('load', function(ev) {
		// Maybe make a classification function in MBT.Map
		var classes = [
			'case',
			['==', ['get', 'Data_prov'], "Microsoft"], 'rgba(0, 140, 220, 0.8)',
			'rgba(200, 0, 40, 0.8)'
		];

		var layers = ["ab", "bc", "mb", "nb", "nl", "ns", "nt", "nu", "on", "pe", "qc", "sk", "yt"];

		Map.ReorderLayers(map, layers);
		Map.Choropleth(map, layers, classes);

		layers.forEach(function(l) {
			map.on('click', l, function(ev) {
				if (ev.features.length == 0) return;
			
				var html = Utils.HTMLize(ev.features[0].properties);
				
				Map.InfoPopup(map, ev.lngLat, html);
			});
		});
	});
}