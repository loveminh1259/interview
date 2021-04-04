<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function get($id = null) {
        if($id == null) {
            $productTypes = ProductType::all();
            return BaseResult::withData($productTypes);
        } else {
            $productType = ProductType::find($id);
            if($productType) {
                return BaseResult::withData($productType);
            } else {
                return BaseResult::error(404, 'Data is not found');
            }
        }
    }
}
