<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\StudySession;

class StudySessionController extends Controller
{
    public function store(Request $request)
    {
        $new_ss = StudySession::create([
            'user_id' => Auth::user()->id
        ]);
    }
}
