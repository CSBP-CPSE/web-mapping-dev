var config = {
	style : "mapbox://styles/deil-leid/ck3jaa8us2obu1cpjxnwcsi3d",
    layers: ["db"],
    title: {
        "en": "Proximity to Libraries",
        "fr": "Proximité aux Bibliothèques"
    },
    subtitle: {
        "en": "(preliminary experimental results)",
        "fr": "(résultats expérimentaux préliminaires)"
    },
    legend: [{
            color: [200, 200, 200],
            label: {
                en: "Not available",
                fr: "Non-disponible"
            }
        }, {
            color: [255, 255, 255],
            label: {
                en: "Equal to 0.000",
                fr: "Égal à 0.000"
            }
        }, {
            color: [215, 48, 39],
            label: {
                en: "Between 0.000 and 0.002",
                fr: "Entre 0.000 et 0.002"
            }
        }, {
            color: [252, 141, 89],
            label: {
                en: "Between 0.002 and 0.005",
                fr: "Entre 0.002 et 0.005"
            }
        }, {
            color: [254, 224, 139],
            label: {
                en: "Between 0.005 and 0.010",
                fr: "Entre 0.005 et 0.010"
            }
        }, {
            color: [217, 239, 139],
            label: {
                en: "Between 0.010 and 0.030",
                fr: "Entre 0.010 et 0.030"
            }
        }, {
            color: [145, 207, 96],
            label: {
                en: "Between 0.030 and 0.050",
                fr: "Entre 0.030 et 0.050"
            }
        }, {
            color: [26, 152, 80],
            label: {
                en: "More than 0.050",
                fr: "Plus de 0.050"
            }
        }
    ],
    selected: "db",
    classes: ['case', ['==', ['get', 'lib_prox'], null], '#color1', 
					  ['==', ['get', 'lib_prox'], 0], '#color2', 
					  ['<', ['get', 'lib_prox'], 0.002], '#color3', 
					  ['<', ['get', 'lib_prox'], 0.005], '#color4', 
					  ['<', ['get', 'lib_prox'], 0.010], '#color5', 
					  ['<', ['get', 'lib_prox'], 0.030], '#color6', 
					  ['<', ['get', 'lib_prox'], 0.050], '#color7', 
					  '#color8'],

    fields: [{
		id : "DBUID",
			label : {
				en : "Dissemination block",
				fr : "Bloc de diffusion"
			}
		},{
			id : "CSDUID",
			label : {
				en : "Census Subdivision",
				fr : "Sous-division de recensement"
			}
		},{
            id: "lib_prox",
            label: {
                en: "Proximity to libraries",
                fr: "Proximité aux bibliothèques"
            },
            fixed: 4
        }
    ]
}

export default config;
