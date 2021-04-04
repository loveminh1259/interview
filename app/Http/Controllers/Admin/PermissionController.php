<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct()
    {
        $permissions = Permission::where('module', 'permission')->get();
        foreach ($permissions as $permission) {
            $this->middleware('role:'.$permission->name, ['only' => [$permission->action]]);
        }
    }
    public function get($id = null) {
        if($id == null) {
            $permissions = Permission::all();
            return BaseResult::withData($permissions);
        } else {
            $permission = Permission::find($id);
            if($permission) return BaseResult::withData($permission);
            return BaseResult::error(404, 'Data is not found');
        }
    }
}
