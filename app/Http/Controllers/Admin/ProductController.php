<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\Image;
use App\Models\Permission;
use App\Models\Product;
use App\Models\ProductImage;
use Carbon\Carbon;
use Faker\Provider\Base;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function __construct()
    {
        $permissions = Permission::where('module', 'product')->get();
        foreach ($permissions as $permission) {
            $this->middleware('role:'.$permission->name, ['only' => [$permission->action]]);
        }
    }
    public function get($id = null)
    {
        if ($id == null) {
            $products = Product::select(['PRO_ID', 'name', 'description', 'PTYP_ID'])->get();
            if ($products) {
                return BaseResult::withData($products);
            } else {
                return BaseResult::error(404, 'No data found');
            }
        } else {
            $product = Product::find($id);
            if ($product) {
                $productImages = ProductImage::where('PRO_ID', $product->PRO_ID)->get();
                $images = collect();
                foreach ($productImages as $productImage) {
                    $image = Image::find($productImage->IMG_ID);
                    $image = $image->name;
                    $images->push($image);
                }
                $product['images'] = $images;
                return BaseResult::withData($product);
            }
            return BaseResult::error(404, 'No data found');
        }
    }
    public function create(Request $request)
    {

        $rules = [
            'name' => 'required|unique:products',
            'price' => 'required|numeric',
            'description' => 'max:255',
            'PTYP_ID' => 'required'
        ];
        $validator = Validator::make($request->all(), $rules);
        if (!$validator->fails()) {
            $product = new Product();
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->description = $request->input('description');
            $product->PTYP_ID = $request->input('PTYP_ID');
            try {
                DB::beginTransaction();
                $product->save();
                if ($request->hasFile('images')) {
                    $files = $request->file('images');
                    foreach ($files as $index => $file) {
                        $imageName = $product->PRO_ID . '_' . $index . '.' . $file->extension();
                        $file->move(public_path('/data/product'), $imageName);
                        $image = new Image();
                        $image->name = $imageName;
                        $image->save();
                        $productImage = new ProductImage();
                        $productImage->IMG_ID = $image->IMG_ID;
                        $productImage->PRO_ID = $product->PRO_ID;
                        $productImage->save();
                    }
                }
                DB::commit();
                return BaseResult::success('Product created');
            } catch (\Exception $e) {
                DB::rollBack();
                return BaseResult::error(500, $e->getMessage());
            }
        } else {
            return BaseResult::error(422, 'Invaid data');
        }
    }
    public function update($id, Request $request)
    {
        $product = Product::find($id);
        if ($product) {
            if ($product->name === $request->input('name')) {
                $rules = [
                    // 'name' => 'required|unique:products',
                    'price' => 'required|numeric',
                    'description' => 'max:255',
                    'PTYP_ID' => 'required'
                ];
            } else {
                $rules = [
                    'name' => 'required|unique:products',
                    'price' => 'required|numeric',
                    'description' => 'max:255',
                    'PTYP_ID' => 'required'
                ];
            }
            $validator = Validator::make($request->all(), $rules);
            if (!$validator->fails()) {
                $product->name = $request->input('name');
                $product->price = $request->input('price');
                $product->description = $request->input('description');
                $product->PTYP_ID = $request->input('PTYP_ID');
                DB::beginTransaction();
                try {
                    $product->save();
                    $productImages = ProductImage::where('PRO_ID', $id)->get();
                    foreach ($productImages as $productImage) {
                        $oldFile = Image::find($productImage->IMG_ID);
                        if (File::exists(public_path('data/products') . $oldFile->name)) {
                            File::delete(public_path('/data/products') . $oldFile->name);
                        }
                        $productImage->delete();
                        $oldFile->delete();
                    }
                    if ($request->hasFile('images')) {
                        $files = $request->file('images');
                        foreach ($files as $index => $file) {
                            $imageName = $product->PRO_ID . '_' . $index . '.' . $file->extension();
                            $file->move(public_path('/data/product'), $imageName);
                            $image = new Image();
                            $image->name = $imageName;
                            $image->save();
                            $productImage = new ProductImage();
                            $productImage->IMG_ID = $image->IMG_ID;
                            $productImage->PRO_ID = $product->PRO_ID;
                            $productImage->save();
                        }
                    }
                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return BaseResult::error(500, $e->getMessage());
                }
                return BaseResult::success('Product updated');
            } else {
                return BaseResult::error(422, 'Invalid data');
            }
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
    public function delete($id)
    {
        $product = Product::find($id);
        if ($product) {
            try {
                $productImages = ProductImage::where('PRO_ID', $product->PRO_ID)->get();
                DB::beginTransaction();
                foreach ($productImages as $productImage) {
                    $image = Image::find($productImage->IMG_ID);
                    if (File::exists(public_path('data/products') . $image->name)) {
                        File::delete(public_path('/data/products') . $image->name);
                    }
                    try {
                        $productImage->delete();
                        $image->delete();
                    } catch (\Exception $e) {
                        DB::rollBack();
                        return BaseResult::error(500, $e->getMessage());
                    }
                }
                try {
                    $product->delete();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return BaseResult::error(500, $e->getMessage());
                }
                DB::commit();
                return BaseResult::success('Product deleted');
            } catch (\Exception $e) {
                return BaseResult::error(500, $e->getMessage());
            }
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
}
