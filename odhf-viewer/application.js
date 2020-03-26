import Other from "../mapbox-tools/tools/other.js";	// TODO : yiich that name sucks
import Factory from "../mapbox-tools/tools/factory.js";
import Core from "../basic-tools/tools/core.js";
import Net from "../basic-tools/tools/net.js";
import Util from "../basic-tools/tools/util.js";
import Dom from "../basic-tools/tools/dom.js";
import Store from "./store.js";

export default class ProxApp { 
	
	constructor(config) {		
		this.config = config;
		this.current = this.config.maps[Store.Map];
		// this.data = this.CSVtoJson(config.data);

		if (!this.current) this.current = Util.FirstProperty(this.config.maps);
		
		this.AddMap();	
		this.AddSearch();	
		this.AddBaseControls();		
		this.AddGroup();
		this.AddMenu();
	}

	AddMap() {
		var token = "pk.eyJ1IjoiZGVpbC1sZWlkIiwiYSI6ImNrMzZxODNvNTAxZjgzYm56emk1c3doajEifQ.H5CJ3maS0ZuxX_7QTgz1kg";
		
		this.map = Factory.Map("map", token, this.current.Style, [Store.Lng, Store.Lat], Store.Zoom);
		
		// Hooking up all events
		this.map.On("StyleChanged", this.OnMapStyleChanged_Handler.bind(this));
		this.map.On("MoveEnd", this.OnMapMoveEnd_Handler.bind(this));
		this.map.On("ZoomEnd", this.OnMapZoomEnd_Handler.bind(this));
		this.map.On("Click", this.OnMapClick_Handler.bind(this));
		// this.map.On("Load", this.OnMapLoad_Handler.bind(this));
	}

	AddBaseControls() {
		var fullscreen = Factory.FullscreenControl(Core.Nls("FullScreen_Title"));
		var navigation = Factory.NavigationControl(false, true, Core.Nls("Navigation_ZoomIn_Title"), Core.Nls("Navigation_ZoomOut_Title"));
		var scale = Factory.ScaleControl("metric");
		
		this.map.AddControl(fullscreen, "top-left");
		this.map.AddControl(navigation, "top-left");
		this.map.AddControl(scale);
	}

	AddSearch() {
		var search = Factory.SearchControl(this.config.search.items, Core.Nls("Search_Placeholder"), Core.Nls("Search_Title"));
		
		// Add top-left search bar
		this.map.AddControl(search, "top-left");
		
		search.On("Change", this.OnSearchChange_Handler.bind(this));
		
		search.Node("typeahead").Node("input").focus();
	}

	AddGroup() {
		// Top-right group for legend, etc.		
		this.group = {
			legend : Factory.LegendControl(this.current.Legend, null, this.current.Title, this.current.Subtitle),
			download : Factory.DownloadControl(null)
		}
		
		this.map.AddControl(Factory.Group(this.group));
	}
	
	AddMenu() {
		// Top-left menu below navigation
		var bookmarks = Factory.BookmarksControl(this.config.bookmarks);
		
		this.menu = Factory.MenuControl();
		
		this.map.AddControl(this.menu, "top-left");
		
		this.menu.AddButton("home", "assets/globe.png", Core.Nls("Home_Title"), this.OnHomeClick_Handler.bind(this));
		this.menu.AddPopupButton("bookmarks", "assets/bookmarks.png", Core.Nls("Bookmarks_Title"), bookmarks, this.map.Container);
		
		bookmarks.On("BookmarkSelected", this.OnBookmarkSelected_Handler.bind(this));
	}
 
	OnHomeClick_Handler(ev) {
		this.map.FitBounds([[-173.457, 41.846], [-17.324, 75.848]]);
	}
	
	OnBookmarkSelected_Handler(ev) {
		this.menu.Button("bookmarks").popup.Hide();
		
		this.map.FitBounds(ev.item.extent, { animate:false });
	}
		
	OnListSelected_Handler(ev) {
		this.menu.Button("maps").popup.Hide();
		
		Store.Map = ev.id;

		this.map.SetStyle(ev.map.Style);
		
		this.current = ev.map;
		
		this.group.legend.Reload(this.current.Legend, this.current.Title, this.current.Subtitle);
	}
	
	OnMapStyleChanged_Handler(ev) {		
		this.map.SetClickableLayers(this.current.LayerIDs);
		
		this.map.Choropleth(this.current.LayerIDs, 'circle-color', this.current.Legend, 1);
	}
	
	OnMapMoveEnd_Handler(ev) {		
		Store.Lat = this.map.Center.lat;
		Store.Lng = this.map.Center.lng;
	}
	
	OnMapZoomEnd_Handler(ev) { 		
		Store.Zoom = this.map.Zoom;
	}
	
	OnMapClick_Handler(ev) {
		if (ev.features.length == 0) return;
		
		var html = Other.HTMLize(ev.features[0].properties, this.current.Fields, Core.Nls("Map_Not_Available"));
		
		this.map.InfoPopup(ev.lngLat, html);
	}
	
	OnSearchChange_Handler(ev) {		
		var legend = [{
			color : this.config.search.color,
			value : ["==", ["get", this.config.search.field], ev.item.id]
		}, {
			color : [255, 255, 255, 0]
		}]
		
		this.map.Choropleth([this.config.search.layer], 'line-color', legend );
		
		this.map.FitBounds(ev.item.extent, { padding:30, animate:false });
	}
 /*
	OnMapLoad_Handler(ev) {
		this.map.AddSource('odhf', this.data);
		
		
		this.map.map.addLayer({
			id: 'clusters',
			type: 'circle',
			source: 'odhf',
			filter: ['has', 'point_count'],
			paint: {
				// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
				// with three steps to implement three types of circles:
				//   * Blue, 20px circles when point count is less than 100
				//   * Yellow, 30px circles when point count is between 100 and 750
				//   * Pink, 40px circles when point count is greater than or equal to 750
				'circle-color': ['step', ['get', 'point_count'], '#51bbd6',	100, '#f1f075',	750, '#f28cb1'],
				'circle-radius': ['step', ['get', 'point_count'], 20, 100, 	30, 750, 40]
			}
		});
	}
 
	CSVtoJson(csv) {		
		var data = Util.ParseCsv(csv);
		
		var json = {
			"type": "geojson",
			"data" : { "type" : "FeatureCollection", "features" : [] },
			"cluster" : true,
			"clusterMaxZoom": 14, 	// Max zoom to cluster points on
			"clusterRadius": 50 		// Radius of each cluster when clustering points (defaults to 50)
		}
		
		var fields = data.shift();
		
		data.forEach(d => {
			var f = { "type": "Feature", "properties":{}, "geometry":{ "type": "Point", "coordinates":[] }};
			
			for (var i = 0; i < fields.length; i++) {
				if (fields[i] == "longitude") f.geometry.coordinates[0] = +d[i];
				
				else if (fields[i] == "latitude") f.geometry.coordinates[1] = +d[i];

				else f.properties[fields[i]] = (d[i] == "" ? null : d[i]);
			}
			
			json.data.features.push(f);
		});
		
		return json;
	}
*/
}