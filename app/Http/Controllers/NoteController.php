<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Pomodoro;
use App\Models\Note;

class NoteController extends Controller
{
    public function store(Request $request) {

        $request->validate([
            'note' => ['required', 'min:12'],
        ]);

        // get the latest study session
        $latest_study_session = $request->user()->study_sessions->last();

        // get the latest pomodoro using the latest study session
        $latest_pomodoro = $latest_study_session->pomodoros->last();

        // create a notes with the latest pomodoro's id
        Note::create([
            'pomodoro_id' => $latest_pomodoro->id,
            'note' => $request->get('note')
        ]);
    }

    public function tite() {
        dd(';tite');
    }
}
