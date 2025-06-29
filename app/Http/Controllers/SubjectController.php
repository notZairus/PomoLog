<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

use App\Models\Subject;
use Inertia\Inertia;

use App\Http\Controllers\PomodoroController;

class SubjectController extends Controller
{
    public function store(Request $request) {
        Subject::create([
            'name' => $request->get('name'),
            'user_id' => $request->user()->id
        ]);
    }
}
