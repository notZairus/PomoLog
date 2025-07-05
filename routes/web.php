<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\PomodoroController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\HistoryController;

use App\Models\Pomodoro;
use App\Models\Note;
use App\Models\StudySession;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {   
        $pomodoros = Pomodoro::whereHas('study_session', function ($study_session) {
            return $study_session->where('user_id', Auth::id());
        })->get();

        $notes = Note::wherehas('pomodoro.study_session', function ($study_session) {
            return $study_session->where('user_id', Auth::id());
        })->get();
        
        $study_session = StudySession::with('pomodoros')->where('user_id', Auth::id())->get();

        return Inertia::render('dashboard', [
            'pomodoros' => $pomodoros,
            'notes' => $notes,
            'averageTime' => count($pomodoros) > 0 ? (count($pomodoros) * 25) / count($study_session) : 0,
            'studySessions' => $study_session,
        ]);
    })->name('dashboard');
    
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