<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\StudySession;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon as DateTime;



class PomodoroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('pomodoro');
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
        // fetch the last inserted study session of the authenticated user;
        $study_sessions = Auth::user()->study_sessions;
        $latest_study_session = $study_sessions[count($study_sessions) - 1];

        // compare the date
        $date_of_last_study_session = new \DateTime($latest_study_session->date);
        $datetime_today = new \DateTime();

        // if the same, return the eagerloaded latest study session. 
        if ($date_of_last_study_session->format('y-m-d') === $datetime_today->format('y-m-d')) {
            return response()->json([
                'studySession' => StudySession::with('user')->find($latest_study_session->id)
            ]);
        }

        // else, create new studysession then eagerload it then return it.
        $new_ss = StudySession::create([
            'user_id' => Auth::user()->id,
            'date' => $datetime_today->format('y-m-d')
        ]);
        
        return response()->json([
            'studySession' => StudySession::with('user')->find($new_ss->id),
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
