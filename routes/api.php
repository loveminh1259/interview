<?php

use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductTypeController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Client\ProductController as ClientProductController;
use App\Http\Controllers\Client\ProductTypeController as ClientProductTypeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});




Route::group([

    'middleware' => 'auth:api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($router) {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});


Route::group([
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login'])->name('login');
});

Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::get('products/{id?}', [ProductController::class, 'get']);
    Route::post('products', [ProductController::class, 'create']);
    Route::post('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'delete']);

    Route::get('product-types/{id?}', [ProductTypeController::class, 'get']);
    Route::post('/product-types', [ProductTypeController::class, 'create']);
    Route::post('/product-types/{id}', [ProductTypeController::class, 'update']);
    Route::delete('/product-types/{id}', [ProductTypeController::class, 'delete']);

    Route::get('currentUser', [UserController::class, 'getCurrentUser']);
    Route::get('users/{id?}', [UserController::class, 'get']);
    Route::post('users', [UserController::class, 'create']);
    Route::post('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'delete']);
    Route::post('currentUser/update', [UserController::class, 'updateCurrentUser']);

    Route::get('permissions/{id?}', [PermissionController::class, 'get']);
});

Route::group([
    'prefix' => 'client'
], function($router) {
    Route::get('/products/{id?}', [ClientProductController::class, 'get']);
    Route::get('/products/type/{ptyp_id}', [ClientProductController::class, 'getByProductType']);

    Route::get('/product-types/{id?}', [ClientProductTypeController::class, 'get']);
});
