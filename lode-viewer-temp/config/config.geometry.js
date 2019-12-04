var config = {
	style : "mapbox://styles/deil-leid/ck36tlip73asa1cn6of81gugz",
    layers: ["bc", "ab", "sk", "mb", "on", "qc", "pe", "ns", "nb", "nl", "nt", "nu", "yt"],
	title : {
		"en" : "Area Per Vertex",
		"fr" : "Surface Par Vertex"
	},
    legend: [{
            color: [255, 255, 178],
            label: {
                en: "Between 0 et 20 sqm/v",
                fr: "Entre 0 et 20 m2/v"
            }
        }, {
            color: [254, 204, 92],
            label: {
                en: "Between 20 et 100 sqm/v",
                fr: "Entre 20 et 100 m2/v"
            }
        }, {
            color: [253, 141, 60],
            label: {
                en: "Between 100 et 500 sqm/v",
                fr: "Entre 100 et 500 m2/v"
            }
        }, {
            color: [240, 59, 32],
            label: {
                en: "Between 500 et 5000 sqm/v",
                fr: "Entre 500 et 5000 m2/v"
            }
        }, {
            color: [189, 0, 38],
            label: {
                en: "More than 5000 sqm/v",
                fr: "Plus de 5000 m2/v"
            }
        }
    ],
    classes: [
        'case',
        ['<', ['get', 'area_vert'], 20], '#color1',
        ['<', ['get', 'area_vert'], 100], '#color2',
        ['<', ['get', 'area_vert'], 500], '#color3',
        ['<', ['get', 'area_vert'], 5000], '#color4',
        '#color5'
    ],
    fields: [{
            id: "area",
            label: {
                en: "Area",
                fr: "Superficie"
            },
            fixed: 2
        }, {
            id: "area_vert",
            label: {
                en: "Area to vertices",
                fr: "Surface à vertex"
            },
            fixed: 2
        }, {
            id: "perimeter",
            label: {
                en: "Perimeter",
                fr: "Périmètre"
            },
            fixed: 2
        }, {
            id: "peri_vert",
            label: {
                en: "Perimeter to vertices",
                fr: "Périmètre à vertex"
            },
            fixed: 2
        }
    ]
}

export default config;
