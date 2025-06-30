<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;

use App\Models\StudySession;
use App\Models\Pomodoro;

class StudySessionController extends Controller
{
    public function store(Request $request)
    {
        $new_ss = StudySession::create([
            'user_id' => Auth::user()->id
        ]);
    }

    public function show($id) {
        $notes = [];

        $study_session = StudySession::with('pomodoros.notes')->find($id);

        foreach($study_session->pomodoros as $pomodoro) {
            array_push($notes, ...$pomodoro->notes->load('pomodoro.subject'));
        }

        return Inertia::render('study-sessions/show', [
            'notes' => $notes,
        ]);
    }
}
