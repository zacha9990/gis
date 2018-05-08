/*
 load Jquery ready
 map Open Layer modul and Function
 mousePositionControl
 max zoom
 function popup
 function bing map and OSM Map
 Openlayer Map
 show popup
 max-zoom get width
 function style icon
 style Default
 i dont know this script
 call checked for load geo
 full screen map
 hide header and show logo only
 show full panel body
 drag layer menu
 menampilkan modal untuk data aksi
 function  modal untuk data aksi
 fungsi download
 cek Download
 fungsi cekDownload
 fungsi getfile Download
 loading before load


*/

/*---------------------------------------------------------------------
              load Jquery ready
----------------------------------------------------------------------*/
jQuery(document).ready(function ($) {

    /*---------------------------------------------------------------------
                 map Open Layer modul and Function
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                  mousePositionControl
    ----------------------------------------------------------------------*/
    var view = '';
    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });
    /*---------------------------------------------------------------------
                   end mousePositionControl
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                                  max zoom
    ----------------------------------------------------------------------*/
    var viewport = document.getElementById('map');

    function getMinZoom() {
        var width = viewport.clientWidth;
        return Math.ceil(Math.LOG2E * Math.log(width / 50));
    }
    var initialZoom = getMinZoom();
    /*---------------------------------------------------------------------
                                 end max zoom
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                                function popup
    ----------------------------------------------------------------------*/

    var popup = new ol.Overlay.Popup({
        popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
        closeBox: true,
        onshow: function () {
            console.log("You opened the box");
        },
        onclose: function () {
            console.log("You close the box");
        },
        positioning: 'auto',
        autoPan: true,
        element: document.getElementById('popup'),
        autoPanAnimation: {
            duration: 250
        }
    });
    var coordinatepopup = function (evt) {
        var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
        popup.show(evt.coordinate, '<div><h2>Coordinates</h2><p>' + prettyCoord + '</p></div>');
    }
    /*---------------------------------------------------------------------
                                end popup
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                                back to coordinate
    ----------------------------------------------------------------------*/

    var coordinat = [120.9213, -3.7893];
    $('#backfocus').click(function () {
        //alert('target');
        var coordinat = [120.9213, -3.7893];
    });

    /*---------------------------------------------------------------------
                                andback to coordinate
    ----------------------------------------------------------------------*/
    /*---------------------------------------------------------------------
                               function bing map and OSM Map
    ----------------------------------------------------------------------*/
    function bingMap(bingkey) {
        return new ol.source.BingMaps({
            key: bingkey,
            imagerySet: 'AerialWithLabels'
        })
    }

    function osmMap() {
        return new ol.source.OSM();
    }
    var i, ii;
    var map1 = new ol.layer.Tile({
        source: bingMap(bingkey)
    });
    var map2 = new ol.layer.Tile({
        source: osmMap()
    });
    /*---------------------------------------------------------------------
                               and function bing map and OSM Map
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                               On Class for Vector
    ----------------------------------------------------------------------*/
    var source = new ol.source.Vector();
    var vector = new ol.layer.Vector({
        source: source,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    /*---------------------------------------------------------------------
                               end On Class for Vector
    ----------------------------------------------------------------------*/
    var layerschng = [map1, map2, vector];
    /**Currently drawn feature. @type {ol.Feature}*/
    var sketch;
    /*** The help tooltip element.* @type {Element}*/
    var helpTooltipElement;
    /*** Overlay to show the help messages.* @type {ol.Overlay}*/
    var helpTooltip;
    /*** The measure tooltip element.* @type {Element}*/
    var measureTooltipElement;
    /** * Overlay to show the measurement. * @type {ol.Overlay}*/
    var measureTooltip;
    /*** Message to show when the user is drawing a polygon.* @type {string} */
    var continuePolygonMsg = 'Click to continue drawing the polygon';
    /*** Message to show when the user is drawing a line.* @type {string} */
    var continueLineMsg = 'Click to continue drawing the line';
    /*** Handle pointer move.* @param {ol.MapBrowserEvent} evt The event. */



    /*---------------------------------------------------------------------
                              Openlayer Map
    ----------------------------------------------------------------------*/
    var map = new ol.Map({
        layers: layerschng,
        loadTilesWhileInteracting: true,
        target: 'map',
        overlays: [popup],
        controls: ol.control.defaults({
            attributionOptions: {
                collapsible: false
            }
        }).extend([
            new ol.control.ZoomSlider(),
            new ol.control.ScaleLine(),
            mousePositionControl,
            /*  new ol.control.ZoomToExtent({
            extent: [
              813079.7791264898, 5929220.284081122,
              848966.9639063801, 5936863.986909639
            ]
          })*/

            /*new ol.control.FullScreen()*/
        ]),
        view: new ol.View({
            center: ol.proj.fromLonLat([120.9213, -3.7893]),
            minZoom: initialZoom,
            zoom: initialZoom
            // zoom: 5
        })

    });


    /*---------------------------------------------------------------------
                                end Openlayer Map
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                                Measurement 
    ----------------------------------------------------------------------*/

    // map.on('pointermove', pointerMoveHandler);

    var typeSelect = document.getElementById('type');
    var draw; // global so we can remove it later
    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    var formatLength = function (line) {
        var length = ol.Sphere.getLength(line);
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    };
    /**
     * Format area output.
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function (polygon) {
        var area = ol.Sphere.getArea(polygon);
        var output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    function addInteraction() {

        var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
        draw = new ol.interaction.Draw({
            source: source,
            type: type,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });

        map.addInteraction(draw);
        createMeasureTooltip();

        var listener;
        draw.on('drawstart',
            function (evt) {

                // set sketch
                sketch = evt.feature;

                /** @type {ol.Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {

                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            }, this);

        draw.on('drawend',
            function () {
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            }, this);
    }

    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'tooltip tooltip-measure';
        measureTooltip = new ol.Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        map.addOverlay(measureTooltip);
    }
    /**
     * Let user change the geometry type.
     */
    $('#type').click(function () {
        map.removeInteraction(draw);

        if ($(this).is(':checked') == true) {
            addInteraction();
        }
    });


    //  addInteraction();

    /*---------------------------------------------------------------------
                                end Measurement 
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                             changed bingmap
    ----------------------------------------------------------------------
     var styles = [
            'bingmap',
            'osm'
          ];
    var select = document.getElementById('layer-select');
          function onChange() {
            var style = select.value;
            for (i = 0, ii = styles.length; i < ii; ++i) {
              layerschng[i].setVisible(styles[i] === style);
            }
          }
    select.addEventListener('change', onChange);
    onChange();
    */

    $("#slideTwo").click(function () {
        var styles = [
            'bingmap',
            'osm'
        ];
        var action = $(this).is(':checked');
        var style = 'osm';
        if (action == true) {
            var style = 'bingmap';
        }
        for (i = 0, ii = styles.length; i < ii; ++i) {
            layerschng[i].setVisible(styles[i] === style);
        }
    });

    /*---------------------------------------------------------------------
                            end changed bingmap
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                           show popup
    ----------------------------------------------------------------------*/

    map.on('singleclick', function (evt) {
        var coordinate = evt.coordinate;

        // Hide existing popup and reset it's offset
        popup.hide();
        popup.setOffset([0, 0]);

        // Attempt to find a feature in one of the visible vector layers
        var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return feature;
        });


        //nah kalau yang ini buat dapat info properti dari layer. ~zach
        var infoLayer = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
            return layer;
        });

        if (feature) {

            var coord = feature.getGeometry().getCoordinates();
            var props = feature.getProperties();
            var propLayer = infoLayer.getProperties();
            var propValue;
            var info = "<h3><a href='" + props.caseurl + "'>" + propLayer.title + "</a></h3>";
            info += '<table class="table table-responsive" ><thead><tr>';

            for (var propName in props) {
                if (propName != "geometry" && propName != "geom" && propName != "gid") {
                    info += "<th>" + propName + "</th>";
                }
            }

            info += '</tr></thead><tbody><tr>';

            for (var propName in props) {
                if (propName != "geometry" && propName != "geom" && propName != "gid") {
                    propValue = props[propName];
                    info += "<td>" + propValue + "</td>";
                }
            }
            console.log(propName);


            info += '</tr></tbody></table>';

            // Offset the popup so it points at the middle of the marker not the tip
            if (propLayer.title) {
                popup.setOffset([0, -22]);
                popup.show(coord, info);
                popup.setPosition(coordinate);
                console.log(propLayer);
            }
            // alert(propLayer);
        }
    });


    /*---------------------------------------------------------------------
                                end  show popup
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                                max-zoom get width
    ----------------------------------------------------------------------*/
    //---------- yang ini jangan dihapus-----------------------//

    var kelaslevel0 = {};
    var styleCache0 = {};
    kelaslevel0 = {
        'Default Simbol': 'grey',
    };

    fetch('uploads/geojson/default_layer.geojson', {
        headers: {
            "Content-Type": "text/plain"
        }
    }).then(function (response) {
        return response.json();
    }).then(function (json) {
        var tileIndex = geojsonvt(json, {
            extent: 4096,
            debug: 1
        });

        vectorSource = new ol.source.VectorTile({
            format: new ol.format.GeoJSON(),
            tileGrid: ol.tilegrid.createXYZ(),
            tilePixelRatio: 16,
            tileLoadFunction: function (tile) {
                var format = tile.getFormat();
                var tileCoord = tile.getTileCoord();
                var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);
                var features = format.readFeatures(
                    JSON.stringify({
                        type: 'FeatureCollection',
                        features: data ? data.features : []
                    }, replacer));
                tile.setLoader(function () {
                    tile.setFeatures(features);
                    tile.setProjection(tilePixels);
                });
            },
            url: 'data:'
        }); //end vectorsource

        var defStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                width: 3,
                color: 'rgba(255, 0, 0, 1)',
                lineDash: [.1, 5] //or other combinations
            }),
            zIndex: 2
        })

        var defaultLayer = new ol.layer.VectorTile({
            title: "Sbs Boundary",
            visible: true,
            opacity: 0.5,
            source: vectorSource,
            style: defStyle,
        }); //end layer
        map.addLayer(defaultLayer);
        var layerSource = defaultLayer.getSource();

        console.log(layerSource);

    })

    //-----------------------end Mas Hardian, yang ini jangan dihapus--------------------------------

    //-----------------------max-zoom get width--------------------------------

    window.addEventListener('resize', function () {
        var minZoom = getMinZoom();
        if (minZoom !== view.getMinZoom()) {
            view.setMinZoom(minZoom);
        }
    });
    /*---------------------------------------------------------------------
                            end max-zoom get width
----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                            9. function style icon
----------------------------------------------------------------------*/

    function styleIcon(icon, color = 'rgba(0,0,0,1)') {
        if (icon != '') {
            icon = 'upload/icon/' + icon;
            var iconStyle = new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: icon,
                    size: [200, 200],
                    scale: 0.9
                }))
            });
        } else {
            var iconStyle = new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: new ol.style.Fill({
                        color: color
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0,1)'
                    })
                })
            });
        }
        return iconStyle;
    }
    /*---------------------------------------------------------------------
                                end style icon
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                              style Default
    ----------------------------------------------------------------------*/
    function styleDefault() {
        var defaultStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'grey'
            }),
            stroke: new ol.style.Stroke({
                color: [0, 0, 0, 1],
                width: 1
            })
        });
        return defaultStyle;
    }
    /*---------------------------------------------------------------------
                                end style Default
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                             i dont know this script
    ----------------------------------------------------------------------*/
    var iconStyle = new ol.style.Style({
        image: new ol.style.Icon( /** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://openlayers.org/en/v4.1.1/examples/data/icon.png'
        }))
    });
    var fill = new ol.style.Fill({
        color: 'rgba(0,0,0,0.6)'
    });
    var stroke = new ol.style.Stroke({
        color: 'rgba(0,0,0,1)'
    });
    var circle = new ol.style.Circle({
        radius: 6,
        fill: fill,
        stroke: stroke
    });
    var vectorStyle = new ol.style.Style({
        fill: fill,
        stroke: stroke,
        image: new ol.style.Icon(({
            scale: 0.6,
            rotateWithView: false,
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            opacity: 1,
            src: 'plugins/ol4/marker4.png'
        }))
    });
    var pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                color: 'rgba(255,255,255,1)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0,0,0,1)'
            })
        })
    });
    var replacer = function (key, value) {
        if (value.geometry) {
            var type;
            var rawType = value.type;
            var geometry = value.geometry;

            if (rawType === 1) {
                type = 'MultiPoint';
                if (geometry.length == 1) {
                    type = 'Point';
                    geometry = geometry[0];
                }
            } else if (rawType === 2) {
                type = 'MultiLineString';
                if (geometry.length == 1) {
                    type = 'LineString';
                    geometry = geometry[0];
                }
            } else if (rawType === 3) {
                type = 'Polygon';
                if (geometry.length > 1) {
                    type = 'MultiPolygon';
                    geometry = [geometry];
                }
            }

            return {
                'type': 'Feature',
                'geometry': {
                    'type': type,
                    'coordinates': geometry
                },
                'properties': value.tags
            };
        } else {
            return value;
        }
    };

    var tilePixels = new ol.proj.Projection({
        code: 'TILE_PIXELS',
        units: 'tile-pixels'
    });
    /*---------------------------------------------------------------------
                               and  i dont know this script
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                               call checked for load geo
    ----------------------------------------------------------------------*/
    $('.form-check .trigger-happy').click(function (e) {

        $(".se-pre-con").fadeIn();
        var id = $(this).data('layer-id');
        var layerSrc = $(this).attr("id");
        var checked = $(this).is(':checked');

        if (checked) {

            $.ajax({
                type: 'POST',
                url: 'pages/geoJson.php',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (data) {
                    var layerId = data.layers_id;
                    var layerName = data.layers_name;
                    var layerStyleCode = data.layers_style_code;
                    var layerCol = data.layers_col;
                    var layerStyleCol = data.layers_style_col;
                    var layerGeom = data.layers_geom;
                    var layerStyleColor = data.layers_style_color;
                    var layerOpacity = data.layers_opacity;
                    var layerFile = data.layers_file;
                    var icon = data.query_icon;
                    var arrLayerStyleCode = layerStyleCode.split(",");
                    var arrLayerstyleColor = layerStyleColor.split(",");


                    var kelasLevel = {};
                    var styleCache = {};
                    var vectorLayer;
                    /*
                                                if (arrLayerStyleCode.length >= 2){
                                                    for (var i = 0; i < arrLayerStyleCode.length; i++) {
                                                        kelasLevel[arrLayerStyleCode[i]] = arrLayerstyleColor[i];
                                                    }
                                                }else{
                                                    kelasLevel[arrLayerStyleCode[0]] = arrLayerstyleColor[0];
                                                }   */

                    $.each(arrLayerstyleColor, function (index, color) {
                        kelasLevel[arrLayerStyleCode[index]] = color;
                    });


                    console.log(kelasLevel);
                    console.log(layerStyleCol);

                    //  console.log("Load Layer = "+window["load"+layerSrc]);
                    if (window["load" + layerSrc] != true) {
                        window["load" + layerSrc] = true;
                        //   console.log("Load Layer = "+window["load"+layerSrc]);

                        if (layerGeom == 'st_multilinestring' || layerGeom == 'st_linestring' || layerGeom == 'st_point' || layerGeom == 'st_multipoint') {
                            console.log("the layer is not poligon, but" + layerGeom);

                            window[layerFile] = new ol.layer.Vector({
                                title: layerName, //nama layer
                                opacity: layerOpacity, //data opacity
                                visible: true,
                                source: new ol.source.Vector({
                                    format: new ol.format.GeoJSON(),
                                    url: 'uploads/geojson/' + layerFile + '.geojson',
                                    projection: 'EPSG:3857'
                                }),
                                style: function (feature, resolution) {
                                    //var kelas = feature.get(layerStyleCol);
                                    if (layerGeom != 'st_multilinestring') {
                                        /* $.each(arrLayerstyleColor, function( index, color ) {
                                                                                                     return styleIcon(icon,color);
                                                                                                  });*/


                                        var kelas = feature.get(layerStyleCol);

                                        //alert( feature.getGeometry().getType());
                                        // if there is no level or its one we don't recognize,
                                        // return the default style (in an array!)
                                        if (!kelas || !kelasLevel[kelas]) {
                                            //return [vectorStyle,pointStyle];
                                            return [styleIcon(icon)];
                                        }

                                        // check the cache and create a new style for the income
                                        // level if its not been created before.
                                        if (!styleCache[kelas]) {
                                            //alert(styleCache[kelas]);  
                                            /*  return  [new ol.style.Style({
                                                       image: new ol.style.Circle({
                                                       radius: 5,
                                                       fill: new ol.style.Fill({
                                                           color: kelasLevel[kelas]
                                                       }),
                                                       stroke: new ol.style.Stroke({
                                                           color: 'rgba(0,0,0,1)'
                                                       })
                                                   })
                                               })];*/
                                            return [styleIcon(icon, kelasLevel[kelas])];

                                        }
                                        //return [styleCache[kelas]];
                                        //return styleIcon(icon);
                                        console.log('jika bukan multiline string');
                                    } else {
                                        console.log("the layer is multiline string");

                                        var kelas = feature.get(layerStyleCol);
                                        console.log(layerStyleCol);
                                        console.log(feature);


                                        // if there is no level or its one we don't recognize,
                                        // return the default style (in an array!)
                                        if (kelas || !kelasLevel[kelas]) {
                                            //console.log(kelas);
                                            //console.log(kelasLevel[kelas]);

                                            return [vectorStyle];
                                        }
                                        // check the cache and create a new style for the income
                                        // level if its not been created before.
                                        if (!styleCache[kelas]) {
                                            styleCache[kelas] = new ol.style.Style({
                                                stroke: new ol.style.Stroke({
                                                    color: kelasLevel[kelas],
                                                    width: 2
                                                })
                                            });
                                        }
                                        console.log(styleCache[kelas]);
                                        console.log(kelasLevel[kelas]);
                                        console.log('default');

                                        return [styleCache[kelas]];


                                    }
                                }
                            }); //ol.source.Vector
                            //console.log('default');
                            map.addLayer(window[layerFile]);
                        } else if (layerGeom == "st_multipolygon" || layerGeom == "st_polygon") {
                            console.log("the layer is " + layerGeom);
                            fetch('uploads/geojson/' + layerFile + '.geojson', {
                                headers: {
                                    "Content-Type": "text/plain"
                                }
                            }).then(function (response) {
                                return response.json();
                            }).then(function (json) {
                                var tileIndex = geojsonvt(json, {
                                    extent: 4096,
                                    debug: 1
                                });

                                vectorSource = new ol.source.VectorTile({
                                    format: new ol.format.GeoJSON(),
                                    tileGrid: ol.tilegrid.createXYZ(),
                                    tilePixelRatio: 16,
                                    tileLoadFunction: function (tile) {
                                        var format = tile.getFormat();
                                        var tileCoord = tile.getTileCoord();
                                        var data = tileIndex.getTile(tileCoord[0], tileCoord[1], -tileCoord[2] - 1);
                                        var features = format.readFeatures(
                                            JSON.stringify({
                                                type: 'FeatureCollection',
                                                features: data ? data.features : []
                                            }, replacer));
                                        tile.setLoader(function () {
                                            tile.setFeatures(features);
                                            tile.setProjection(tilePixels);
                                        });
                                    },
                                    url: 'data:'
                                }); //end vectorsource
                                window[layerSrc] = new ol.layer.VectorTile({
                                    title: layerName,
                                    visible: true,
                                    opacity: layerOpacity,
                                    source: vectorSource,
                                    style: function (feature, resolution) {
                                        // get the incomeLevel from the feature properties
                                        var kelas = feature.get(layerStyleCol);
                                        //alert( feature.getGeometry().getType());
                                        // if there is no level or its one we don't recognize,
                                        // return the default style (in an array!)
                                        if (kelas || !kelasLevel[kelas]) {
                                            console.log("the layer use default style");
                                            console.log(kelas);

                                            return styleDefault();
                                        }
                                        // check the cache and create a new style for the income
                                        // level if its not been created before.
                                        if (!styleCache[kelas] && (feature.getGeometry().getType() == 'Polygon' || feature.getGeometry().getType() == 'MultiPolygon')) {
                                            styleCache[kelas] = new ol.style.Style({
                                                fill: new ol.style.Fill({
                                                    color: kelasLevel[kelas],
                                                }),
                                                stroke: new ol.style.Stroke({
                                                    color: kelasLevel[kelas],
                                                    width: 1
                                                })
                                            });
                                        }
                                        return [styleCache[kelas]];
                                    }
                                }); //end layer
                                map.addLayer(window[layerSrc]);
                                var layerSource = window[layerSrc].getSource();
                            });


                        } else {}
                    } else {
                        window[layerSrc].setVisible(true);
                    }
                    $(".se-pre-con").fadeOut("hide");

                }

            });

        } else {
            $(".se-pre-con").fadeOut("hide");
            window[layerSrc].setVisible(false);

        }


    });
    /*---------------------------------------------------------------------
                               end call checked for load geo
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                             full screen map 
    ----------------------------------------------------------------------*/

    var windowHeight = $(window).height();
    var navHeight = $('nav').height();
    var mapHeight = windowHeight;
    console.log(mapHeight);
    $('#map').css({
        height: mapHeight + "px"
    });
    $('.navbar-default').css({
        position: 'absolute',
    });
    map.updateSize();
    //untuk submenu layer
    $('.dd').nestable({
        onDragStart: function (l, e) {
            return false;
        }
    });
    /*---------------------------------------------------------------------
                               end  full screen map 
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                   end  map Open Layer modul and Function-
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                  hide header and show logo only
    ----------------------------------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    $('#homeFull').click(function (e) {
        var checked = $(this).is(':checked');
        if (checked) {
            $('.navbar-default').addClass('shonav');

        } else {
            $('.navbar-default').removeClass('shonav');
        }
    });
    /*---------------------------------------------------------------------
                    end hide header and show logo only
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                  show full panel body
    ----------------------------------------------------------------------*/

    $('#layer-full').click(function (e) {

        var checked = $(this).is(':checked');

        if (checked) {
            $('.full-layer').addClass('show-layer');
        } else {

            $('.full-layer').removeClass('show-layer');
        }

    });
    /*---------------------------------------------------------------------
                        end show full panel body
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                        drag layer menu
    ----------------------------------------------------------------------*/


    $("#layer-body").draggable({
        containment: "#map",
        scroll: false
    });
    /*---------------------------------------------------------------------
                        end drag layer menu
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                       menampilkan modal untuk data aksi
    ----------------------------------------------------------------------*/
    $(".show-wilayah").click(function (e) {
        aksimodal($(this).data('id'), $(this).data('layer'));
    });
    /*---------------------------------------------------------------------
                        selesai menampilkan modal untuk data aksi
    ----------------------------------------------------------------------*/


    /*---------------------------------------------------------------------
                      function  modal untuk data aksi
    ----------------------------------------------------------------------*/
    function aksimodal(id, namelayer) {

        $("#myModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $('.modal-title').html('');
        $('.modal-deskripsi').html('');
        $('.modal-link').html('');
        $('.mod-content').html('');
        $('#owl-demo').html('');
        $('show-logo').html('');
        // var owl = $('#owl-demo');
        //owl.owlCarousel();
        $('.show-social').html('');

        var dataItems = "";
        var datasocial = "";
        var id = id;
        //$(this).data('id');
        var namelayer = namelayer;

        $.ajax({
            type: 'POST',
            url: 'pages/datamodal.php',
            data: {
                id: id,
                namelayer: namelayer
            },
            dataType: 'json',
            success: function (data) {
                if (!data.error) {

                    $('.modal-title').html(data.name_layer);
                    $('.modal-deskripsi').html('<p>' + data.deskripsi + '</p>');
                    //Gallery
                    /* if(data.items!="")
                     {
                        $.each(data.items, function(i,v){
                           dataItems += '<div class="owl-item"><img src="'+v['img']+'" ></div>';   
                         });
                        //owl.trigger('insertContent.owl',dataItems);
                       //$('#owl-demo').html(dataItems); 
                       //owl.trigger('add.owl.carousel', [jQuery(dataItems)]).trigger('refresh.owl.carousel');
                     }*/
                    // end Gallery
                    //btn download
                    if (data.link != 0) {
                        $('.modal-link').html('<span class="btn btn-success form-download" data-id="' + id + '" href="#" >Download</span>');
                    } else {
                        $('.modal-link a').remove();
                    }
                    //end btn download
                    //deskripsi
                    if (data.dtSource != "") {
                        $('.mod-content').html('<div class="well">' + data.dtSource + '</div>');
                    } else {
                        $('.mod-content').html('<div class="well">' + data.address + '</div>');
                    }
                    //end deskripsi  
                    //social media
                    $.each(data.sc_arry, function (i, v) {
                        datasocial += '<li><a href="' + v + '" target="_blank" class="' + i + '"  data-toggle="tooltip" title="' + v + '"><i class="fa fa-' + i + '"></i></a></li>';
                    });
                    $('.show-social').html('<ul class="social-icon">' + datasocial + '<ul>');
                    //end social media
                    //social media
                    $('.show-logo').html(data.logo_img);
                    //untuk download
                    $(".form-download").click(function (e) {
                        e.preventDefault();
                        //alert('disini nanti ada form untuk mngisi data pendownload');
                        aksidownload($(this).data('id'), $(this).data('layer'));
                    });

                } else {
                    $('.mod-content').html('<div>data eror</div>');
                }

            }
        });
        return false;
    }
    /*---------------------------------------------------------------------
                        end function  modal untuk data aksi
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                       fungsi download
    ----------------------------------------------------------------------*/

    function aksidownload(id, namelayer) {
        $("#myModalDownload").modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#myModalDownload .modal-title').html('Silahkan Isikan Form di bawah');

        $('.download').attr('href', 'download&id=' + id);

        $('.cekDownload').attr('id', id);

        //alert(id);

    }
    /*---------------------------------------------------------------------
                        end fungsi download
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                      cek Download
    ----------------------------------------------------------------------*/
    $('.cekDownload').submit(function (e) {
        e.preventDefault();
        simpanRegistrasi($(this).attr('id'));
    });
    /*---------------------------------------------------------------------
                        end cek Download
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                          21. fungsi cekDownload
    ----------------------------------------------------------------------*/
    function simpanRegistrasi(id) {
        $('.loader').show();
        $('.msg-alert').html('');

        $.ajax({
            type: 'POST',
            url: 'pages/regisJson.php',
            data: $(".cekDownload").serialize(),
            dataType: 'json',
            success: function (data) {
                grecaptcha.reset();
                if (!data.error) {

                    $('.msg-alert').html('<div class="alert alert-success">' + data.alert + '</div>').fadeOut();
                    $('#myModalDownload .modal-body').html('<div class="text-center"><a class="btn btn-primary download" target = "_blank" href="download&id=' + id + '" >Download</a></div><div class="text-center"><p>terimakasih ' + data.nama + '</p> anda sudah dapat mendownload</div>').fadeIn();
                    /*  $('.download').click(function(){
                     getFileDnld($(this).attr('id')); 
                     });*/
                } else {
                    $('.msg-alert').html('<div class="alert alert-danger"><ul>' + data.alert + '</ul></div>').fadeIn('500');
                }
                $('.loader').hide();
            }

        });
        return false;
    }
    /*---------------------------------------------------------------------
                         end  fungsi cekDownload
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                      fungsi getfile Download
    ----------------------------------------------------------------------*/
    $('.download').click(function () {
        getFileDnld($(this).attr('id'));

    });

    function getFileDnld(id) {
        $.ajax({
            type: 'POST',
            url: 'pages/regisJson.php',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (data) {
                if (!data.error) {
                    alert(data.alert);
                }
            }
        });

    }
    /*---------------------------------------------------------------------
                         end fungsi getfile Download
    ----------------------------------------------------------------------*/

    /*---------------------------------------------------------------------
                         Hide All Layer
    ----------------------------------------------------------------------*/
    $('#collapsedAll').click(function () {
        $('.form-check input[type="checkbox"]').each(function (index) {
            if ($(this).is(':checked') == true) {
                window[$(this).attr('id')].setVisible(false);
                $(this).prop('checked', false);
            }
        });

    });
    /*---------------------------------------------------------------------
                         And Hide All Layer
    ----------------------------------------------------------------------*/
});
/*---------------------------------------------------------------------
                end load Jquery ready
----------------------------------------------------------------------*/


/*---------------------------------------------------------------------
                loading before load
----------------------------------------------------------------------*/
$(window).load(function () {
    // Animate loader off screen
    $(".se-pre-con").fadeOut("slow");
});
/*---------------------------------------------------------------------
                end loading before load 
----------------------------------------------------------------------*/
