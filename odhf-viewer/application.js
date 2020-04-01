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

		this.group.legend.On("LegendChange", this.OnLegend_Changed.bind(this));
	}

	OnLegend_Changed(ev) {
		var chkBoxesSt = ev.state;

		var opacityArr = chkBoxesSt.map(function(i){ 
            return Number(i.checkbox.checked); 
        })

        this.map.Choropleth([this.current.LayerIDs[0]], 'circle-color', this.current.Legend, opacityArr);
        this.map.ChoroplethVarOpac([this.current.LayerIDs[0]], 'circle-stroke-color', this.current.Legend, opacityArr);

        this.map.ChoroplethVarOpac( [this.current.LayerIDs[1]] , 'text-color', this.current.Legend, opacityArr);
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
		
		this.map.Choropleth([this.current.LayerIDs[0]], 'circle-color', this.current.Legend, 1);
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
}