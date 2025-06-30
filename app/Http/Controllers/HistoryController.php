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
            'studySessions' => StudySession::where('user_id', Auth::user()->id)->latest()->paginate(12),
            'subjects' => Subject::with('pomodoros')->where('user_id', Auth::user()->id)->paginate(12),
        ]);
    }  

    public function show($id, Request $request) {
        $sort_by = $request->query('sortBy');
         
        switch ($sort_by) {
            case 'study_session':
                return app(StudySessionController::class)->show($id);
                break;
            case 'subject':
                return app(SubjectController::class)->show($id);
                break;
            case 'count':
                return app(PomodoroController::class)->show($id);
                break;
            default:
                abort(404);
        }
    }
}
