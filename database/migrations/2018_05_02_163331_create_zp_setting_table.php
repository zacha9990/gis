<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateZpSettingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('zp_setting', function (Blueprint $table) {
            $table->increments('id');
            $table->string('timezone');
            $table->string('site_name');
            $table->string('email');
            $table->string('phone');
            $table->string('mobile');
            $table->text('home_message');
            $table->string('logo_icon');
            $table->string('logo_text');
            $table->string('logo_text_dark');
            $table->string('favicon');
            $table->string('corps');
            $table->string('corps_address');
            $table->string('login_banner');
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
        Schema::dropIfExists('zp_setting');
    }
}
