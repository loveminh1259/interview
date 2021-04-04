<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;
    protected $table = 'products_has_images';
    protected $primaryKey = 'PRO_ID';
    public $timestamps = false;
}
