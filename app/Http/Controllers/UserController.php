<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response {
        $users = DB::select("select * from users");

        return Inertia::render('Users', [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): void
    {
        $foo = $request->json();
        echo $foo;
        // $students = DB::insert(
        //     "
        //     INSERT INTO students (first_name, middle_name, last_name, sexuality, email, contact_number, address)
        //     VALUES ('')
        //     RETURNING *
        //     "
        // );

        // return response()->json($foo);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $user = DB::selectOne("SELECT * FROM users WHERE id = ?", [$id]);

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
