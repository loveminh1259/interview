<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductType extends Model
{
    use HasFactory;
    protected $primaryKey = "PTYP_ID";
    protected $table = "product_type";
    public $timestamps = true;
}
