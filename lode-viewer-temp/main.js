import Nls from './nls.js';
import CfgBoundary from './config/config.boundary.js';
import CfgSource from './config/config.source.js';
import CfgGeometry from './config/config.geometry.js';
import CfgRoutes from './config/config.routes.js';
import CfgTrips from './config/config.trips.js';
import CfgEducation from './config/config.education.js';
import CfgLibrary from './config/config.library.js';
import Splash from './splash.js';
import Map from '../mapbox-tools/tools/map.js';
import Other from '../mapbox-tools/tools/other.js';	// TODO : yiich that name sucks
import Factory from '../mapbox-tools/tools/factory.js';
import Popup from '../basic-tools/components/popup.js';
import Core from '../basic-tools/tools/core.js';
import Net from '../basic-tools/tools/net.js';
import Dom from '../basic-tools/tools/dom.js';

var cfg = Net.GetUrlParameter("context");

var maps = {
	"source" : CfgSource,
	"geometry" : CfgGeometry,
	"boundary" : CfgBoundary,
	"routes" : CfgRoutes,
	"trips" : CfgTrips,
	"education" : CfgEducation,
	"library" : CfgLibrary
}

var Config = maps[cfg] || CfgTrips;

Core.locale = document.documentElement.lang || "en";
Core.nls = Nls;

Map.Token = 'pk.eyJ1IjoiZGVpbC1sZWlkIiwiYSI6ImNrMzZxODNvNTAxZjgzYm56emk1c3doajEifQ.H5CJ3maS0ZuxX_7QTgz1kg';

var popups = {
	splash : new Splash(),
	maps : new Popup("maps modal")
}

// TODO : Needs to be converted to promise but stupid ie11
popups.splash.Show(Initialize);

function Initialize() {	
	var map = Factory.Map('map', Config.style, [-75.6972, 45.4215], 11);
	
	var cLegend = Factory.LegendControl(Config.toc, Config.selected, Config.legend, Config.title, Config.subtitle);
	var cMenu = Factory.MenuControl();
	var cMapsList = Factory.MapsListControl(maps, "trips");
	
	popups.maps.Content = cMapsList.Node("root");
	
	cMenu.AddButton('assets/layers.png', Core.Nls("Maps_Title"), OnMapsClick_Handler);
	cLegend.On("OpacityChanged", OnLegend_OpacityChanged);
	cMapsList.On("MapSelected", OnMapsListSelected_Handler);
	
	map.addControl(Factory.NavigationControl(), 'top-left');
	map.addControl(Factory.ScaleControl('metric'));
	map.addControl(cMenu, 'top-left');
	map.addControl(cLegend);

	map.on('styledata', OnMapStyleData_Handler);
	
	function OnMapsListSelected_Handler(ev) {
		popups.maps.Hide();
		
		Map.Destroy(map, Config, OnLayerClick_Handler);

		Config = ev.map;
		
		Map.Reload(map, Config, OnLayerClick_Handler);
	}
	
	function OnMapStyleData_Handler(ev) {
		Map.Redraw(map, Config, cLegend.opacity, OnLayerClick_Handler);
	}
	
	function OnMapsClick_Handler(ev) {
		popups.maps.Show();
	}
	
	function OnLegend_OpacityChanged(ev) {
		var classes = Other.Classes(Config.classes, Config.legend, ev.opacity);
		
		Map.Choropleth(map, Config.layers, classes);
	}
	
	function OnLayerClick_Handler(ev) {
		if (ev.features.length == 0) return;
		
		var html = Other.HTMLize(ev.features[0].properties, Config.fields);
		
		Map.InfoPopup(map, ev.lngLat, html);
	}
}
