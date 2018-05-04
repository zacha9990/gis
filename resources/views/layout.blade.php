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

    </div>        
</body>
</html>