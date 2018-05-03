<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GisController extends Controller
{
    public function index(){
        $kategoris = DB::table('zp_kategori')->orderBy('kategori_nama', 'asc')->get();
        return view('layout')->with('kategoris', $kategoris);
    }
}
