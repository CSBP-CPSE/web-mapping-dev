var config = {
	style : "mapbox://styles/deil-leid/ck3jaa8us2obu1cpjxnwcsi3d",
    layers: ["db"],
    title: {
        "en": "Proximity to Education Facilities",
        "fr": "Proximité aux établissements d'éducation"
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
                en: "Between 0.000 and 0.005",
                fr: "Entre 0.000 et 0.005"
            }
        }, {
            color: [252, 141, 89],
            label: {
                en: "Between 0.005 and 0.010",
                fr: "Entre 0.005 et 0.010"
            }
        }, {
            color: [254, 224, 139],
            label: {
                en: "Between 0.010 and 0.020",
                fr: "Entre 0.010 et 0.020"
            }
        }, {
            color: [217, 239, 139],
            label: {
                en: "Between 0.020 and 0.040",
                fr: "Entre 0.020 et 0.040"
            }
        }, {
            color: [145, 207, 96],
            label: {
                en: "Between 0.040 and 0.070",
                fr: "Entre 0.040 et 0.070"
            }
        }, {
            color: [26, 152, 80],
            label: {
                en: "More than 0.070",
                fr: "Plus de 0.070"
            }
        }
    ],
    selected: "db",
    classes: ['case', ['==', ['get', 'educ_prx'], null], '#color1', 
					  ['==', ['get', 'educ_prx'], 0], '#color2', 
					  ['<', ['get', 'educ_prx'], 0.005], '#color3', 
					  ['<', ['get', 'educ_prx'], 0.010], '#color4', 
					  ['<', ['get', 'educ_prx'], 0.020], '#color5', 
					  ['<', ['get', 'educ_prx'], 0.040], '#color6', 
					  ['<', ['get', 'educ_prx'], 0.070], '#color7', 
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
            id: "educ_prx",
            label: {
                en: "Proximity to education facilities",
                fr: "Proximité aux établissements d'éducation"
            },
            fixed: 4
        }
    ]
}

export default config;
