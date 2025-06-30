<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Models\StudySession;
use App\Models\Subject;


class HistoryController extends Controller
{
    public function index() {
        return Inertia::render('history', [
            'studySessions' => StudySession::where('user_id', Auth::user()->id)->paginate(12),
            'subjects' => Subject::with('pomodoros')->where('user_id', Auth::user()->id)->paginate(12),
        ]);
    }  

    public function show() {
        
    }
}
