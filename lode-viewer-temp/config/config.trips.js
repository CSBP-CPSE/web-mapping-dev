var config = {
    style: "mapbox://styles/deil-leid/ck3p5wyxl2a231cp3s207tv4z",
    layers: ["db"],
    title: {
        "en": "Proximity to Public Transit Trips",
        "fr": "Proximité aux voyages de transport en commun"
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
                en: "Between 0.000 and 0.085",
                fr: "Entre 0.000 et 0.085"
            }
        }, {
            color: [252, 141, 89],
            label: {
                en: "Between 0.085 and 0.310",
                fr: "Entre 0.085 et 0.31"
            }
        }, {
            color: [254, 224, 139],
            label: {
                en: "Between 0.310 and 0.800",
                fr: "Entre 0.310 et 0.800"
            }
        }, {
            color: [217, 239, 139],
            label: {
                en: "Between 0.800 and 1.000",
                fr: "Entre 0.800 et 1.000"
            }
        }, {
            color: [145, 207, 96],
            label: {
                en: "Between 1.000 and 2.000",
                fr: "Entre 1.000 et 2.000"
            }
        }, {
            color: [26, 152, 80],
            label: {
                en: "More than 2.000",
                fr: "Plus de 2.000"
            }
        }
    ],
    selected: "db",
    classes: ['case', ['==', ['get', 'trips_prx'], null], '#color1', ['>=', ['get', 'trips_prx'], 30], '#color2', ['==', ['get', 'trips_prx'], 0], '#color2', ['<', ['get', 'trips_prx'], 0.085], '#color3', ['<', ['get', 'trips_prx'], 0.31], '#color4', ['<', ['get', 'trips_prx'], 0.8], '#color5', ['<', ['get', 'trips_prx'], 1], '#color6', ['<', ['get', 'trips_prx'], 2], '#color7', '#color8'],

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
            id: "trips_prx",
            label: {
                en: "Proximity to public transit trip",
                fr: "Proximité aux voyages de transport en commun"
            },
            fixed: 4
        }
    ]
}

export default config;
