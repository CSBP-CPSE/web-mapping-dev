 
import Core from "../basic-tools/tools/core.js";
import Net from "../basic-tools/tools/net.js";

import Configuration from "./configuration.js";
import Application from "./application.js";

Net.JSON(`./config/config.nls.json`).then(value => {
	Core.locale = document.documentElement.lang || "en";
	Core.nls = value.result;
	
	
	var p1 = Net.JSON(`./config/config.applications.json`);
	
	p1.then(Start);

});

function Start(results) {	
	var id = Net.GetUrlParameter("app");
	var maps = results.result;
	//var app = maps[id] || maps["base"];
	var app =  maps["base"];


	
	var defs = app.map(m => Net.JSON(m));
	
	var config = {}
	
	var p1 = Promise.all(defs).then(values => {
		config.maps = {};
		
		values.forEach(v => config.maps[v.result.id] = Configuration.FromJSON(v.result));
	});
	
	var p2 = Net.JSON(`./config/config.bookmarks.json`).then(value => {
		config.bookmarks = value.result.items;
	});
	
	var p3 = Net.JSON(`./config/config.search.json`).then(value => {
		config.search = value.result;
	});
	

		
	Promise.all([p1, p2, p3]).then(results => {
		var app = new Application(config);
	});
}