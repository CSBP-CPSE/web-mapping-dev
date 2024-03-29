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
	var defs = results[1].result.map(m => Net.JSON(m));
	
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
	
	var p4 = Net.JSON(`./config/config.table.json`).then(value => {
		config.table = value.result;
	});
		
	Promise.all([p1, p2, p3, p4]).then(results => {
		var app = new Application(config);
	});
}