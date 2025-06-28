<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PomodoroController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/pomodoro', [PomodoroController::class, 'index'])
    ->middleware(['auth', 'verified']);
Route::post('/pomodoro', [PomodoroController::class, 'store']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {   
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';