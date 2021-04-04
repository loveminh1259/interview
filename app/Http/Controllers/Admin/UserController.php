<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Responses\BaseResult;
use App\Models\Permission;
use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function __construct()
    {
        $permissions = Permission::where('module', 'user')->get();
        foreach ($permissions as $permission) {
            $this->middleware('role:' . $permission->name, ['only' => [$permission->action]]);
        }
    }
    public function get($id = null)
    {
        $currentUser = Auth::user();
        if ($id == null) {
            $users = User::where('USE_ID', '!=', $currentUser->USE_ID)->get();
            return BaseResult::withData($users);
        } else {
            $user = User::find($id);
            if ($user) {
                $userPermissions = UserPermission::where('USE_ID', $user->USE_ID)->get();
                $permissions = array();
                foreach ($userPermissions as $userPermission) {
                    $permission = Permission::select('PER_ID')->where('PER_ID', $userPermission->PER_ID)->first();
                    if ($permission) array_push($permissions, $permission->PER_ID);
                }
                $user['permissions'] = $permissions;
                return BaseResult::withData($user);
            }
            return BaseResult::error(404, 'Data is not found');
        }
    }
    public function getCurrentUser(Request $request)
    {
        $user = JWTAuth::setToken($request->bearerToken())->toUser();
        return BaseResult::withData($user);
    }
    public function confirmPassword($user, $password)
    {
        return Hash::check($password, $user->password);
    }
    public function updateCurrentUser(Request $request)
    {
        try {
            $user = JWTAuth::setToken($request->bearerToken())->toUser();
            if ($this->confirmPassword($user, $request->input('password_confirmation'))) {
                if ($user->email === $request->input('email')) {
                    $rules = [];
                } else {
                    $rules = ['email' => 'unique:users'];
                }
                $validator = Validator::make($request->all(), $rules);
                if (!$validator->fails()) {
                    $user->name = $request->input('name');
                    $user->email = $request->input('email');
                    if ($user->password !== $request->input('password'))
                        $user->password = Hash::make($request->input('password'));
                    $user->save();
                    return BaseResult::success('User updated');
                } else {
                    return BaseResult::error(422, 'Invalid data input');
                }
            } else {
                return BaseResult::error(401, 'Password invalid');
            }
        } catch (\Exception $e) {
            return BaseResult::error(500, $e->getMessage());
        }
    }

    public function create(Request $request)
    {
        $rules = [
            'name' => 'required',
            'email' => 'email|unique:users',
            'password' => 'required',
        ];
        $validator = Validator::make($request->all(), $rules);
        if (!$validator->fails()) {
            $user = new User();
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->password = Hash::make($request->input('password'));
            try {
                DB::beginTransaction();
                $user->save();
                $permissions = $request->input('permissions');
                foreach ($permissions as $permission) {
                    $userPermission = new UserPermission();
                    $userPermission->USE_ID = $user->USE_ID;
                    $userPermission->PER_ID = $permission;
                    $userPermission->save();
                }
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                return BaseResult::error(500, $e->getMessage());
            }
            return BaseResult::success('User created');
        } else {
            return BaseResult::error(422, 'Invalid data');
        }
    }
    public function update($id, Request $request)
    {
        $user = User::find($id);
        if ($user) {
            if ($user->email === $request->input('email')) {
                $rules = [
                    'name' => 'required',
                    'email' => 'email',
                    'password' => 'required',
                ];
            } else {
                $rules = [
                    'name' => 'required',
                    'email' => 'email',
                    'password' => 'required',
                ];
            }
            $validator = Validator::make($request->all(), $rules);
            if (!$validator->fails()) {
                $user->name = $request->input('name');
                $user->email = $request->input('email');
                if ($user->password !== $request->input('password'))
                    $user->password = Hash::make($request->input('password'));
                try {
                    DB::beginTransaction();
                    $user->save();
                    $oldUserPermissions = UserPermission::where('USE_ID', $user->USE_ID)->get();
                    foreach ($oldUserPermissions as $oldUserPermission) {
                        $oldUserPermission->delete();
                    }
                    $permissions = $request->input('permissions');
                    foreach ($permissions as $permission) {
                        $userPermission = new UserPermission();
                        $userPermission->USE_ID = $user->USE_ID;
                        $userPermission->PER_ID = $permission;
                        $userPermission->save();
                    }
                    DB::commit();
                } catch (\Exception $e) {
                    DB::rollBack();
                    return BaseResult::error(500, $e->getMessage());
                }
                return BaseResult::success('User updated');
            } else {
                return BaseResult::error(422, 'Invalid data');
            }
        }
    }
    public function delete($id)
    {
        $user = User::find($id);
        if ($user) {
            $userPermissions = UserPermission::where('USE_ID', $user->USE_ID)->get();
            try {
                DB::beginTransaction();
                foreach ($userPermissions as $userPermission) {
                    $userPermission->delete();
                }
                $user->delete();
                DB::commit();
                return BaseResult::success('User deleted');
            } catch (\Exception $e) {
                DB::rollBack();
                return BaseResult::error(500, $e->getMessage());
            }
        } else {
            return BaseResult::error(404, 'Data is not found');
        }
    }
}
