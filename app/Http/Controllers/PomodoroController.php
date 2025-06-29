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
        $subjects = Auth::user()->subjects->map->only(['id', 'name']);

        $ss = StudySession::with('pomodoros')->where('user_id', Auth::user()->id)->get();
        $pomodoro_count = 0;

        foreach ($ss as $sss) {
            $pomodoro_count += count($sss->pomodoros);
        }
        

        return Inertia::render('pomodoro', [
            'studySession' => $study_session,
            'subjects' => $subjects,
            'completedPomodoro' => $pomodoro_count
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
