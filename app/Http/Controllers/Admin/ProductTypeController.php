<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\Permission;
use App\Models\ProductType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductTypeController extends Controller
{
    public function __construct()
    {
        $permissions = Permission::where('module', 'product-type')->get();
        foreach ($permissions as $permission) {
            $this->middleware('role:'.$permission->name, ['only' => [$permission->action]]);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get($id = null)
    {
        if ($id == null) {
            $productTypes = ProductType::all();
            if ($productTypes) {
                return BaseResult::withData($productTypes);
            } else {
                return BaseResult::error(404, 'No data found');
            }
        } else {
            $productType = ProductType::find($id);
            if ($productType) {
                return BaseResult::withData($productType);
            } else {
                return BaseResult::error(
                    404,
                    'No data found'
                );
            }
        }
    }
    public function create(Request $request)
    {
        $rules = ['name' => 'required|unique:product_type'];
        $validator = Validator::make($request->all(), $rules);
        if (!$validator->fails()) {
            $productType = new ProductType();
            $productType->name = $request->input('name');
            $productType->save();
            return BaseResult::success('Product type created');
        } else {
            return BaseResult::error(422, 'Data input is invalid');
        }
    }
    public function update($id, Request $request)
    {
        $productType = ProductType::find($id);
        if ($productType) {
            $oldName = $productType->name;
            if ($request->input('name') === $oldName) {
                return BaseResult::success('Product type updated');
            } else {
                $rules = ['name' => 'required|unique:product_type'];
                $validator = Validator::make($request->all(), $rules);
                if (!$validator->fails()) {
                    $productType->name = $request->input('name');
                    $productType->save();
                    return BaseResult::success('Product type updated');
                } else {
                    return BaseResult::error(422, 'Data input is invalid');
                }
            }
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
    public function delete($id) {
        $productType = ProductType::find($id);
        if($productType) {
            try {
                $productType->delete();
                return BaseResult::success('Product type deleted');
            } catch (\Exception $e) {
                return BaseResult::error(500, $e->getMessage());
            }
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
}
