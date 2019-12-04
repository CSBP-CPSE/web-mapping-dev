var config = {
	style : "mapbox://styles/deil-leid/ck36tlip73asa1cn6of81gugz",
    layers: ["bc", "ab", "sk", "mb", "on", "qc", "pe", "ns", "nb", "nl", "nt", "nu", "yt"],
	title : {
		"en" : "Data Provenance",
		"fr" : "Source des données"
	},
    legend: [{
            color: [77, 148, 242],
            label: {
                en: "Microsoft",
                fr: "Microsoft"
            }
        }, {
            color: [240, 82, 43],
            label: {
                en: "Statistics Canada (ODB)",
                fr: "Statistique Canada (BDOI)"
            }
        }
    ],
    classes: [
        'case',
        ['==', ['get', 'Data_prov'], 'Microsoft'], '#color1',
        '#color2'
    ],
    fields: [{
            id: "Data_prov",
            label: {
                en: "Origin",
                fr: "Source"
            }
        },{
            id: "PRUID",
            label: {
                en: "PR",
                fr: "PR"
            }
        },{
            id: "CDUID",
            label: {
                en: "CD",
                fr: "DR"
            }
        },{
            id: "CSDUID",
            label: {
                en: "CSD",
                fr: "SDR"
            }
        },{
            id: "DAUID",
            label: {
                en: "DA",
                fr: "AD"
            }
        },{
            id: "DBUID",
            label: {
                en: "DB",
                fr: "BD"
            }
        }
    ]
}

export default config;
