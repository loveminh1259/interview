<?php

namespace App\Http\Middleware;

use App\Http\Responses\BaseResult;
use App\Models\Permission;
use App\Models\UserPermission;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next, $permissionName)
    {
        $user = JWTAuth::setToken($request->bearerToken())->toUser();
        $permission = Permission::where('name', $permissionName)->first();
        if ($permission) {
            $userPermission = UserPermission::where(['USE_ID' => $user->USE_ID, 'PER_ID' => $permission->PER_ID])->first();
            if ($userPermission) {
                return $next($request);
            } else {
                return response()->json(['message' => 'User has no permission to execute the action'], 403);
            }
        } else {
            return response()->json(['message' => 'User has no permission to execute the action'], 403);
        }
    }
}
