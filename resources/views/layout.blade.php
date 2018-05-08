<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="This is the template of an Webgis, Created by soldatoDelRe">
    <meta name="author" content="soldatoDelre">
    <title>WebGis</title>

    {{-- bootstrap and related --}}
    <link rel="stylesheet" href="{{'css/bootstrap.min.css'}}">
    <link rel="stylesheet" href="{{'css/font-awesome.min.css'}}">
    <link rel="stylesheet" href="{{'css/owl.carousel.css'}}">
    {{-- end bootstrap and related --}}

    {{-- openlayer plugin --}}
    <link rel="stylesheet" href="{{asset('plugins/ol4/css/ol.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/css/layerswitchercontrol.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol3-popup-master/src/ol3-popup.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol3-popup-master/examples/popup.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol-ext/control/layerswitchercontrol.css')}}">
    {{-- end open layer plugin --}}

    {{-- jquery and related --}}
    <link rel="stylesheet" href="{{asset('plugins/jqueryui/jquery-ui.min.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/nestable2-master/dist/jquery.nestable.min.css')}}">
    {{-- end jquery and related --}}

    {{-- specific css for the page --}}
    <link rel="stylesheet" href="{{asset('css/gis.css')}}">
    {{-- end specific css for the page --}}
</head>
<body>
    <div class="wrapper">
        {{-- pre php
        insert php query from table zp_setting
        get image for logo / icon --}}

        {{-- end pre php --}}

        <nav class="navbar navbar-default navbar-static-top m-b-0">
            <div class="navbar-header">
                <div class="top-left-part">
                    <div class="navbar-brand img" href="#">
                        <input type="checkbox" id="homeFull" value="" name="home-full">
                        <img src="" alt="icon for gis site">
                    </div>
                </div>
                <div id="title-sbs">{{-- insert site name here --}}</div>
            </div>
        </nav>

        {{-- get_kategori
        get_sub_kategori
        get_layer
        short_text
         --}}

        {{-- set_layer_switcher --}}

        {{-- map area --}}
        <div class="map" id="map">
            <div class="tombol-menu">
                <div class="posisi-dorp">
                    <div class="posisi-list">
                        <ul class="list-">
                            <li>
                                <input type="checkbox" id="type" value="length">
                            </li>

                            <li>
                                <input type="checkbox" id="slideTwo" name="check">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {{-- end map area --}}

        <div class="" id="progress"></div>
        <div id="popup"></div>
        <div id="mouse-position"></div>
        <div class="full-layer">
            <div id="layer-body">
                <div class="panel-default">
                    <div class="panel-heading">
                        <div class="title-layer">Layer</div><i class="fa fa-navicon fa-3"></i>
                        <input type="checkbox" name="layer-full" id="layer-full" data-toggle="tooltip" title="Layer Menu">
                    </div>
                </div>
                <div class="panel-body">
                    <div class="dd">
                        <ol class="dd-list">
                            {{-- insert list of layer here --}}
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        {{-- contact us area --}}
        <div class="contact-us show-wilayah" data-layer="contact-us" data-id="contact_1">
            <i class="fa fa-home" aria-hidden="true"></i> Home
        </div>
        {{-- end contact us area --}}

        {{-- modal layer --}}
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Modal Methods</h4>
                    </div> 
                    <div class="modal-body">
                        <div class="modal-deskripsi"></div>
                        <div id="owl-demo" ></div>
                        <div class="modal-link"></div>
                        <div class="mod-content"></div>
                        <div class="show-logo"></div>
                        <div class="show-social text-center"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        {{-- end modal layer --}}

        {{-- modal download area --}}
        {{-- end moda download area --}}
    </div>        
</body>
<script>
    var bingkey = '{{Config('conf_var.bing_key')}}';
</script>
<script src="{{asset('js/jquery.min.js')}}"></script>
<script src="{{asset('js/bootstrap.min.js')}}"></script>
<script src="{{asset('js/owl.carousel.min.js')}}"></script>
<script src="https://www.google.com/recaptcha/api.js"></script>

{{-- plugin open layer --}}
<script src="{{asset('js/ol.js')}}"></script>
<script src="{{asset('js/geojson-vt-dev.js')}}"></script>
<script src="{{asset('plugins/ol4/ol3-popup-master/src/ol3-popup.js')}}"></script>
<script src="{{asset('plugins/d3.min.js')}}"></script>
<script src="{{asset('plugins/ol4/ol-ext/control/layerswitchercontrol.js')}}"></script>
<script src="{{asset('plugins/nestable2-master/dist/jquery.nestable.min.js')}}"></script>
<script src="{{asset('plugins/jqueryui/jquery-ui.min.js')}}"></script>
<script src="{{asset('js/page/gis.js')}}"></script>
{{-- end plugin open layer --}}
</html>