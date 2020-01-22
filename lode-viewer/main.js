import Splash from "./splash.js";
import Core from "../basic-tools/tools/core.js";
import Net from "../basic-tools/tools/net.js";

import Configuration from "./configuration.js";
import Application from "./application.js";

Net.JSON(`./config/config.nls.json`).then(value => {
	Core.locale = document.documentElement.lang || "en";
	Core.nls = value.result;
	
	var splash = new Splash();
	
	var p1 = splash.Show();
	var p2 = Net.JSON(`./config/config.applications.json`);
	
	Promise.all([p1, p2]).then(Start);
});

function Start(results) {	
	var id = Net.GetUrlParameter("app");
	var maps = results[1].result;
	var app = maps[id] || maps["base"];
	
	var defs = app.map(m => Net.JSON(m));
	
	var config = {}
	
	var p1 = Promise.all(defs).then(values => {
		config.maps = {};
		
		values.forEach(v => config.maps[v.result.id] = Configuration.FromJSON(v.result));
	});
	
	var p2 = Net.JSON(`./config/config.bookmarks.json`).then(value => {
		config.bookmarks = value.result.items;
	});
		
	Promise.all([p1, p2]).then(results => {
		var app = new Application(config);
	});
}