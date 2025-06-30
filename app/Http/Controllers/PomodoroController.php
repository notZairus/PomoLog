<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\Pomodoro;
use App\Models\StudySession;



class PomodoroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $study_session = Auth::user()->study_sessions->last();

        if (!$study_session) {
            //create new study session
            $study_session = StudySession::create([
                'user_id' => Auth::user()->id
            ]);
        }

        $subjects = Auth::user()->subjects->map->only(['id', 'name']);

        $ss = StudySession::with('pomodoros')->where('user_id', Auth::user()->id)->get();
        $pomodoro_count = 0;

        foreach ($ss as $sss) {
            $pomodoro_count += count($sss->pomodoros);
        }

        // get the notes
        $notes = [];

        $pomodoros_of_the_current_study_session = Pomodoro::with('notes')->where('study_session_id', $study_session->id)->get();
        foreach($pomodoros_of_the_current_study_session as $pomodoro) {
            if (count($pomodoro->notes) >= 1) {
                array_push($notes, ...$pomodoro->notes);
            }
        }

        return Inertia::render('pomodoro', [
            'studySession' => $study_session,
            'subjects' => $subjects,
            'completedPomodoro' => $pomodoro_count,
            'notes' => $notes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // fetch the latest studysession
        $study_session = Auth::user()->study_sessions->last();

        Pomodoro::create([
            'study_session_id' => $study_session->id,
            'subject_id' => $request->get('subject_id'),
        ]);
    }

    /** 
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
