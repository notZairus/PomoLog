<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\HistoryController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {   
        return Inertia::render('dashboard');
    })->name('dashboard');
});



Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/pomodoro', [PomodoroController::class, 'index']);
    Route::post('/pomodoro', [PomodoroController::class, 'store']);
    
    Route::post('/subjects', [SubjectController::class, 'store']);
    
    Route::post('/notes', [NoteController::class, 'store']);
    
    Route::post('/study-session', [StudySessionController::class, 'store']);
    
    
    Route::get('/history', [HistoryController::class, 'index']);
    Route::get('/history/{id}', [HistoryController::class, 'show']);
});









require __DIR__.'/settings.php';
require __DIR__.'/auth.php';