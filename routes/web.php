<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\SubjectController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {   
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::get('/pomodoro', [PomodoroController::class, 'index']);
Route::post('/pomodoro', [PomodoroController::class, 'store']);


Route::post('/subjects', [SubjectController::class, 'store']);


Route::post('/study-session', [StudySessionController::class, 'store'])->middleware(['auth', 'verified']);











require __DIR__.'/settings.php';
require __DIR__.'/auth.php';