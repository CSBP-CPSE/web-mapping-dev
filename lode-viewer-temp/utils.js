import Core from '../basic-tools/tools/core.js';

export default class Utils {
	
	static HTMLize(json, fields) {
        var html = "";
		
		fields.forEach(function(f) {
			if (!json.hasOwnProperty(f.id)) return;
			
			var label = f.label[Core.locale];
			
            html += `<div class='row'><span>${label} : </span><span>${json[f.id]}</span></div>`;
		}) 
        
		return `<div class='popup-inner'>${html}</div>`;
    }
}