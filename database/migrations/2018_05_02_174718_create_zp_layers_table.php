<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZpLayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zp_layers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('file');
            $table->string('status');
            $table->string('type');
            $table->string('name');
            $table->timestamp('date');
            $table->string('style');
            $table->string('style_code');
            $table->string('col');
            $table->string('desc');
            $table->string('style_color');
            $table->string('style_col');
            $table->string('kategori');
            $table->string('author');
            $table->string('center_x');
            $table->string('center_y');
            $table->string('geom');
            $table->string('zoom');
            $table->string('zip_name');
            $table->char('is_downloadable', 1);
            $table->string('source');
            $table->string('logos');
            $table->string('icon');
            $table->string('subkt_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('zp_layers');
    }
}
