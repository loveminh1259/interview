<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('PRO_ID');
            $table->string('name', 255)->nullable(false)->unique();
            $table->float('price')->nullable(false);
            $table->integer('created_by');
            $table->integer('updated_by');
            $table->integer('PTYP_ID')->unsigned();
            $table->foreign('PTYP_ID')->constrained('product_types');
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
        Schema::dropIfExists('products');
    }
}
