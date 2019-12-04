var config = {
	style : "mapbox://styles/deil-leid/ck3jaa8us2obu1cpjxnwcsi3d",
    layers: ["db"],
	title : {
		"en" : "Proximity to Public Transit Routes",
		"fr" : "Proximité aux routes de transport en commun"
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

        },{
            color: [215, 48, 39],
            label: {
                en: "Between 0.00 and 0.02",
                fr: "Entre 0.00 et 0.02"
            }
        }, {
            color: [252, 141, 89],
            label: {
                en: "Between 0.02 and 0.05",
                fr: "Entre 0.02 et 0.05"
            }
        }, {
            color: [254, 224, 139],
            label: {
                en: "Between 0.05 and 0.12",
                fr: "Entre 0.05 et 0.12"
            }
        }, {
            color: [217, 239, 139],
            label: {
                en: "Between 0.12 and 0.20",
                fr: "Entre 0.12 et 0.20"
            }
        }, {
            color: [145, 207, 96],
            label: {
                en: "Between 0.20 and 0.40",
                fr: "Entre 0.20 et 0.40"
            }
        }, {
            color: [26, 152, 80],
            label: {
                en: "More than 0.40",
                fr: "Plus de 0.40"
            }
        }
    ],
    selected: "db",
    classes: [
        'case',
        ['==', ['get', 'routes_prx'], null], '#color1',
        ['<', ['get', 'routes_prx'], 0.02], '#color2',
        ['<', ['get', 'routes_prx'], 0.05], '#color3',
        ['<', ['get', 'routes_prx'], 0.12], '#color4',
        ['<', ['get', 'routes_prx'], 0.2], '#color5',
        ['<', ['get', 'routes_prx'], 0.4], '#color6',
        '#color7'
    ],
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
            id: "routes_prx",
            label: {
                en: "Proximity to public transit route",
                fr: "Proximité aux routes de transport en commun"
            },
            fixed: 4
        }
    ]
}

export default config;
