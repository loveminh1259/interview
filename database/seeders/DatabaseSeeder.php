<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\User;
use App\Models\UserPermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $user = new User();
        $user->email = "admin@gmail.com";
        $user->name = "Admin";
        $user->password = Hash::make("admin");
        $user->save();
        $permissions = [
            [
                'module' => 'user',
                'name' => 'user-get',
                'title' => 'Get user',
                'action' => 'get'
            ],
            [
                'module' => 'user',
                'name' => 'user-create',
                'title' => 'Create user',
                'action' => 'create'
            ],
            [
                'module' => 'user',
                'name' => 'user-update',
                'title' => 'Update user',
                'action' => 'update'
            ], [
                'module' => 'user',
                'name' => 'user-delete',
                'title' => 'Delete user',
                'action' => 'delete'
            ],
            [
                'module' => 'product',
                'name' => 'product-get',
                'title' => 'Get product',
                'action' => 'get'
            ],
            [
                'module' => 'product',
                'name' => 'product-create',
                'title' => 'Create product',
                'action' => 'create'
            ],
            [
                'module' => 'product',
                'name' => 'product-update',
                'title' => 'Update product',
                'action' => 'update'
            ],
            [
                'module' => 'product',
                'name' => 'product-delete',
                'title' => 'Delete product',
                'action' => 'delete'
            ],
            [
                'module' => 'product-type',
                'name' => 'product-type-get',
                'title' => 'Get product type',
                'action' => 'get'
            ],
            [
                'module' => 'product',
                'name' => 'product-type-create',
                'title' => 'Create product type',
                'action' => 'create'
            ],
            [
                'module' => 'product',
                'name' => 'product-type-update',
                'title' => 'Update product type',
                'action' => 'update'
            ],
            [
                'module' => 'product',
                'name' => 'product-type-delete',
                'title' => 'Delete product type',
                'action' => 'delete'
            ],
            [
                'module' => 'permission',
                'name' => 'permission-get',
                'title' => 'Ger permission',
                'action' => 'get'
            ]
        ];
        foreach ($permissions as $permission) {
            $newPermission = new Permission();
            $newPermission->module = $permission['module'];
            $newPermission->name = $permission['name'];
            $newPermission->action = $permission['action'];
            $newPermission->title = $permission['title'];
            $newPermission->save();
            $userPermission = new UserPermission();
            $userPermission->USE_ID = $user->USE_ID;
            $userPermission->PER_ID = $newPermission->PER_ID;
            $userPermission->save();
        }
    }
}
