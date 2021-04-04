<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\Image;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function get($id = null) {
        if($id == null) {
            $products = Product::all();
            foreach ($products as $product) {
                $productImages = ProductImage::where('PRO_ID', $product->PRO_ID)->get();
                $productType = ProductType::find($product->PTYP_ID);
                $product['type'] = $productType->name;
                $images = collect();
                foreach ($productImages as $productImage) {
                    $image = Image::find($productImage->IMG_ID);
                    if($image) $images->push($image);
                }
                $product['images'] = $images;
            }
            return BaseResult::withData($products);
        } else {
            $product = Product::find($id);
            if($product) {
                $productType = ProductType::find($product->PTYP_ID);
                $product['type'] = $productType->name;
                $productImages = ProductImage::where('PRO_ID', $product->PRO_ID)->get();
                $images = collect();
                foreach ($productImages as $productImage) {
                    $image = Image::find($productImage->IMG_ID);
                    if($image) $images->push($image);
                }
                $product['images'] = $images;
                return BaseResult::withData($product);
            } else {
                return BaseResult::error(404, 'Data is not found');
            }
        }
    }
    public function getByProductType($ptyp_id) {
        $productType = ProductType::find($ptyp_id);
        if($productType) {
            $products = Product::where('PTYP_ID', $ptyp_id)->get();
            foreach ($products as $product) {
                $productImages = ProductImage::where('PRO_ID', $product->PRO_ID)->get();
                $images = collect();
                foreach ($productImages as $productImage) {
                    $image = Image::find($productImage->IMG_ID);
                    if($image) $images->push($image);
                }
                $product['images'] = $images;
            }
            return BaseResult::withData($products);
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
}
