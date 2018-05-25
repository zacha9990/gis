<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="{{ "insert description here" }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('../uploads/images/setting/favicon.png')}}">

  

    {{-- bootstrap core css --}}
    <link rel="stylesheet" href="{{asset('css/bootstrap.min.css')}}">
    <link href="{{asset('plugins/bower_components/bootstrap-extension/css/bootstrap-extension.css')}}" rel="stylesheet">

    {{-- menu css --}}
    <link href="{{asset('plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css')}}" rel="stylesheet">

    {{-- vector map css --}}
    <link rel="stylesheet" href="{{asset('plugins/bower_components/vectormap/jquery-jvectormap-2.0.2.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/bower_components/css-chart/css-chart.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/bower_components/toast-master/css/jquery.toast.css')}}">

    {{-- animation css --}}
    <link rel="stylesheet" href="{{asset('css/animate.css')}}">

    {{-- custom css --}}
    <link rel="stylesheet" href="{{asset('css/admin/style.css')}}">

  

    {{-- magnific popup --}}
    <link rel="stylesheet" href="{{asset('plugins/bower_components/Magnific-Popup-master/dist/magnific-popup.css')}}">

    {{-- select2 css --}}
    <link rel="stylesheet" href="{{asset('plugins/select2/css/select2.min.css')}}">

    {{-- color --}}
    <link rel="stylesheet" href="{{asset('css/colors/default.css')}}">

    {{-- datatables --}}
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/1.2.2/css/buttons.dataTables.min.css">
    <link rel="stylesheet" href="{{asset('plugins/bower_components/datatables/jquery.dataTables.min.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/jqueryui/jquery-ui.min.css')}}">

    {{-- for map viewer better to load only for view map page --}}
    <link rel="stylesheet" href="{{asset('plugins/ol4/css/ol.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/css/layerswitchercontrol.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol3-popup-master/src/ol3-popup.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol3-popup-master/examples/popup.css')}}">
    <link rel="stylesheet" href="{{asset('plugins/ol4/ol-ext/control/layerswitchercontrol.css')}}">

    {{-- colorpicker --}}
    <link rel="stylesheet" href="{{asset('plugins/bower_components/jquery-asColorPicker-master/css/asColorPicker.css')}}">

    {{-- jquery-ui --}}
    <link rel="stylesheet" href="{{asset('plugins/jqueryui/jquery-ui.min.css')}}">
   
    <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto');
        @import url('https://fonts.googleapis.com/css?family=Josefin+Sans');
        body{
            font-family: 'Roboto', sans-serif;    
        }

        .for-notification{
            font-family: 'Josefin Sans', sans-serif;
        }

       .tabs-style-iconbox nav ul li.tab-current a {
            background: DODGERBLUE;
        }

        .tabs-style-iconbox nav ul li.tab-current a::after {
            border-top-color: DODGERBLUE;
        }
    </style>

<script>
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date(); 
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    
        ga('create', 'UA-19175540-9', 'auto');
        ga('send', 'pageview');
    </script>

    <title>WebGis Master</title>
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-static-top m-b-0">
            <div class="navbar-header"> <a class="navbar-toggle hidden-sm hidden-md hidden-lg " href="javascript:void(0)" data-toggle="collapse" data-target=".navbar-collapse"><i class="ti-menu"></i></a>

                <div class="top-left-part"><a class="logo" href="index.php?page=dashboard"><b><img src="../uploads/images/setting/5aa646b248366.png" alt="home" width="60" heigth="60" /></b><span class="hidden-xs"><img width="160" height="60" src="../uploads/images/setting/5ae2a3c7af333.jpg" alt="home" /></span></a></div>

                <ul class="nav navbar-top-links navbar-left hidden-xs">
                    <li><a href="javascript:void(0)" title="Perkecil Menu" class="open-close hidden-xs waves-effect waves-light"><i class="icon-arrow-left-circle ti-menu"></i></a></li>
                    
                </ul>
                <ul class="nav navbar-top-links navbar-right pull-right">

                    <!-- /.dropdown -->

                    <!-- /.dropdown -->
                    <li class="dropdown">
                        <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#"> <img src="../uploads/images/users/ae13e225eacc.jpg" alt="user-img" width="36" class="img-circle"><b class="hidden-xs">User</b> </a>
                        <ul class="dropdown-menu dropdown-user scale-up">
                            <li role="separator" class="divider"></li>
                            <li><a href="index.php?page=profileUser&id=?>"><i class="ti-settings"></i> Account Setting</a></li>
                            <li role="separator" class="divider"></li>
                            <li><a href="../index.php?page=logout"><i class="fa fa-power-off"></i> Logout</a></li>
                        </ul>
                        <!-- /.dropdown-user -->
                    </li>
                    <!-- .Megamenu -->

                    <!-- /.Megamenu -->

                    <!-- /.dropdown -->
                </ul>
            </div>
            <!-- /.navbar-header -->
            <!-- /.navbar-top-links -->
            <!-- /.navbar-static-side -->
        </nav>

        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse slimscrollsidebar">
                <ul class="nav" id="side-menu">

                    <li class="sidebar-search hidden-sm hidden-md hidden-lg">
                        {{-- input group --}}
                        <div class="input-group custom-search-form">
                            <input type="text" class="form-control" placeholder="cari...">
                            <span class="input-group btn:d">
                                <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                        {{-- end input group --}}
                    </li>

                    <li class="nav-small-cap m-t-30">&nbsp;&nbsp;&nbsp;Menu Utama</li>

                    <li>
                        <a href="{{--controller to dashboard home"--}}" class="waves-effect active">
                            <i class="zmdi zmdi-view-dashboard zmdi-hc-fw fa-fw"></i><span class="hide-menu">Dashboard</span>
                            
                        </a>
                    </li>

                    <li>
                        <a href="javascript:void(0)" class="waves-effect">
                            <i class="ti-map-alt"></i>
                            <span class="hide-menu">Data Spasial <span class="fa arrow"></span></span>
                        </a>

                        <ul class="nav nav-second-level">
                            <li> 
                                <a href="{{--link to list data spasial--}}"><i class="fa fa-list"></i>&nbsp;List Data Spasial</a> 
                            </li>
                            <li> 
                                <a href="{{--link to data spatial add --}}"><i class="fa fa-plus-square text-info"></i>&nbsp;Tambah Data Spasial</a> 
                            </li>
                            <li> <a href="{{-- link to data spatial files --}}" ><i style="color:CRIMSON" class="fa fa-file"></i>&nbsp;File-file data spasial</a> </li>                           
                        </ul>
                    </li>

                    <li> 
                        <a href="javascript:void(0)" class="waves-effect">
                            <i class="ti-list"></i> <span class="hide-menu">Kategori<span class="fa arrow"></span></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li> 
                                <a href="{{--link to kategori list --}}"><i class="fa fa-list"></i>&nbsp;List Kategori</a> 
                            </li>
                            <li> 
                                <a href="{{--link to kategori add--}}" class="waves-effect">
                                    <i class="fa fa-plus-square text-info"></i>&nbsp; Tambah Kategori 
                                </a> 
                            </li>
                            <li> 
                                <a href="javascript:void(0)" class="waves-effect text-primary">
                                    Sub Kategori <span class="fa arrow pull-right"></span>
                                </a>
                                <ul class="nav nav-third-level">
                                    <li> 
                                        <a href="{{--link to subkategori list --}}"><i class="fa fa-list"></i>&nbsp;List Subkategori</a> 
                                    </li>
                                    <li> 
                                        <a href="{{--link to subkategori add--}}">
                                            <i class="fa fa-plus-square text-info"></i>&nbsp;Tambahkan Subkategori
                                        </a> 
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li> 
                        <a href="javascript:void(0)" class="waves-effect">
                            <i class="ti-settings"></i> <span class="hide-menu">Setting Site<span class="fa arrow"></span></span>
                        </a>
                        <ul class="nav nav-second-level">
                            <li> <a href="{{--link to general setting --}}">General Setting</a> </li>
                            <li> <a href="{{--link to Home message --}}">Home Message</a> </li>
                            <li> <a href="{{--link to ganti logo --}}">Ganti Logo</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>

        <div class="page-wrapper">
            <div class="container-fluid">
                <div class="row bg-title">

                </div>
            </div>
        </div>

        </div>
        

        <!-- jQuery -->
        <script src="{{asset('plugins/bower_components/jquery/dist/jquery.min.js')}}"></script>
        
        <!-- Bootstrap Core JavaScript -->
        <script src="{{asset('js/tether.min.js')}}"></script>
        <script src="{{asset('js/bootstrap.min.js')}}"></script>
        <script src="{{asset('plugins/bower_components/bootstrap-extension/js/bootstrap-extension.min.js')}}"></script>
        
        <!-- Menu Plugin JavaScript -->
        <script src="{{asset('plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js')}}"></script>

    
    
        <!--slimscroll JavaScript -->
        <script src="{{asset('js/jquery.slimscroll.js')}}"></script>
    
        
        <!--Wave Effects -->
        <script src="{{asset('js/waves.js')}}"></script>
    
        <!-- Flot Charts JavaScript -->

        <script src="{{asset('js/custom.min.js')}}"></script>
        <script src="{{asset('plugins/bower_components/toast-master/js/jquery.toast.js')}}"></script>
</body>
</html>