<?php

use App\Http\Controllers\AcademicYearController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SectionsController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
  return Inertia::render('Auth/Login');
});


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/enrollments', [EnrollmentController::class, 'enroll'])->name('enrollments.enroll');
    Route::post('/enrollments', [EnrollmentController::class, 'insert'])->name('enrollments.insert');
});

Route::middleware(['auth', 'admin'])->group(function () {
  Route::get('/admin/dashboard', [DashboardController::class, 'adminIndex'])->name("admin.dashboard");

  Route::post('/academic-years', [AcademicYearController::class, 'insert']);
  Route::patch('/academic-years', [AcademicYearController::class, 'update']);

  Route::get('/admin/sections', [SectionsController::class, 'getAll']);
  Route::get('/admin/users', [UserController::class, 'index']);
});

require __DIR__.'/auth.php';
