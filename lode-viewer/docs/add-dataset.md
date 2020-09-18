# Adding New Datasets to LODE Viewer

The following are steps to follow to add an additional dataset to the [LODE viewer](https://www150.statcan.gc.ca/n1/pub/71-607-x/71-607-x2020014-eng.htm). 

After cloning/downloading the entire [web-mapping-dev GitHub repo](https://github.com/CSBP-CPSE/web-mapping-dev), there are two main configuration steps to add a dataset to the LODE Viewer: 

1. **Table**: Run the `./lode-viewer/scripts/table.py` to prepare the dataset (`[dataset name].csv`) into the necessary JSONs to make the new dataset accessible as a table view (which is below the map in LODE Viewer's user interface).

2. **Map**: Create a tileset (`*.mbtiles`) using [tippecanoe](https://github.com/mapbox/tippecanoe), or simply uploading it within Mapbox Studio, and create a Mapbox basemap style with the tileset to be linked to the LODE Viewer. This is necessary to have the dataset appear on the interactive map.

These main steps are further detailed below, but first make sure the dependencies are installed.

# Dependencies 

- Python >= 3.6 and the following packages: [Pandas](https://pypi.org/project/pandas/), [GeoPandas](https://pypi.org/project/geopandas/). 
  - NOTE: If your operating system is Windows, GeoPandas should be installed through [Anaconda](https://docs.anaconda.com/anaconda/install/): `conda install geopandas`. If you do not have, or do not want to install, Anaconda, there are some other workarounds, read [GeoPandas "Installation" documentation to learn more](https://geopandas.org/install.html).
  
It is recommended to set up a Python environment. 

# Table Configuration

The desired dataset (`[dataset name].csv`) to be added to the LODE Viewer needs to be prepared into various configuration JSONs. This is essential for the new dataset to appear in the table view.

The `table.py` is the Python script that will be run to create the necessary JSONs. However, prior to running this script, the following steps must be completed first:

1. Create a new folder in `./lode-viewer/scripts/source/Tables/[dataset name]`. This is where the new dataset to be added should be stored.
2. Add the dataset (`[dataset name].csv`) to `./lode-viewer/scripts/source/Tables/[dataset name]`.
3. Create a new `[dataset name].json` from `./lode-viewer/scripts/source/Tables/template.json` in `/lode-viewer/scripts/source/Tables/[dataset name]`.
   - This JSON is used to compile the columns that will appear in the popup and table view.
   - To avoid scripting errors due to some temporary hardcoding, the following should be modified in the `[dataset name].csv`: 
     - **If you want postal codes to show up on your popup and table views, then you must name the column `postal_code`**.
     - **Name your id column `index`**.
     - **Name your CSD ID column `CSDuid`**.
     - **Name your Latitude column `latitude`**
     - **Name your Longitude column `longitude`**
4. In `./lode-viewer/scripts/table.py`, update line 71 to the correct file path: `config = u.ReadJSON('./source/Tables/[dataset name]/[dataset name].json')`.

Now `table.py` can successfully run:

5. Run `./lode-viewer/scripts/table.py` in the terminal, e.g., `python table.py`.
6. The outputs are a series of JSONs in `./lode-viewer/scripts/output/data/[dataset name]` and a table configuration JSON for the table view in `./lode-viewer/scripts/output/config/tables/config.table.[dataset name].json`
7. Move the entire folder of JSONs (`./lode-viewer/scripts/output/data/[dataset name]`) to `./lode-viewer/data`.
8. Move the table configuration JSON (`./lode-viewer/scripts/output/config/tables/config.table.[dataset name].json`) to `./lode-viewer/config/tables`. 

You should now have the necessary data prepared for the popup and table views for the LODE viewer.

# Map Configuration

In order to view the dataset on the map, the `[dataset name].csv` to  be added needs to be stored into Mapbox Studio as `[dataset].mbtiles`. In order to do this, the following steps need to be completed:

1. Convert the original `[dataset name].csv` to `[dataset name].geojson`. This can be accomplished through command line tools like OGR or through GUIs like QGIS.
2. Create a tileset (`*.mbtiles`) either by using [tippecanoe](https://github.com/mapbox/tippecanoe) for a more customized approach, or simply uploading the `[dataset name].geojson` in Mapbox Studio as Mapbox has created automatic script to convert the `[dataset name].geojson` to the desired `[dataset name].mbtiles`.
    - If tippecanoe is used, the following command can run to create the `[dataset name].mbtiles`: `tippecanoe -o [dataset name].mbtiles --base-zoom 0 --force [dataset name].geojson`
3. In Mapbox Studio, make sure your newly uploaded `[dataset name].mbtiles` is stored within the [tileset view](https://studio.mapbox.com/tilesets/).
4. Next, go to the style tab and copy an existing LODE Viewer dataset style for LODE Viewer. This assures that the same data layers and style properties are incorporated for the new dataset.
5. Open the copied style in Mapbox Studio, you will then need to update the data sources to the new `[dataset name]` and `[dataset name]-labels` map layers.
    - Make sure the `[dataset name]` layer is set to point type.
    - Make sure the `[dataset name]-labels` layer is set to symbol type.
6. Save the style, take note of the style URL.
   
Now in order to incorporate this new dataset Mapbox style to the LODE Viewer, the following map configuration file must be completed:

7. Copy/paste one of the existing `config.map.[old dataset name].json`, rename the file to `config.map.[dataset name].json`.
8. Update the "style" key's value with the new style URL (available in Mapbox Studio).

The rest of the `config.map.[dataset name].json` should be updated to reflect the dataset variables that will be included in the thematic map:
 - `id`: Abbreviated form of the dataset.
 - `table`: Add the table configuration file for the dataset, `config.table.[dataset name].json`
 - `layers`: Add the name of the data layers in the Mapbox basemap style. There should be two layers: (1) the dataset's data points (`[dataset name]`), and (2) the dataset's labels (`[dataset name]-labels`).
 - `title`: Title to appear on the map legend.
 - `abbr`: The dataset abbreviation to appear on the map legend.
 - `legend`: 
      - `colors`: The colours (as rgb) for the thematic map and legend.
      - `label`: The label to appear on the map legend.
      - `value`: The logic assigning a colour to a dataset variable and an unique value. The only thing that needs to be changed here is the variable name and the value to be coloured for the thematic map.

Last, yet very important, in `./lode-viewer/config/config.applications.json`, add `config.map.[old dataset name].json` to the array. This informs the client to include the new dataset into the user interface!