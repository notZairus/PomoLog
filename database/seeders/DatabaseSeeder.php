<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;
use Database\Seeders\StudySessionSeeder;

use App\Models\User;
use App\Models\Subject;
use App\Models\StudySession;
use App\Models\Pomodoro;
use App\Models\Note;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
        $user = User::factory()->create([
            'name' => 'Zairus Bermillo',
            'email' => 'notzairus@gmail.com',
            'password' => 'notQZr8408o',
        ]);

        $subjects = Subject::factory(5)->state([
            'user_id' => $user->id
        ])->create();

        $study_sessions = StudySession::factory(5)->state([
            'user_id' => $user->id
        ])->create();

        $pomodoro = Pomodoro::factory(5)->state([
            'study_session_id' => collect($study_sessions->map(fn ($ss) => $ss->id))->random()
        ])->create();

        $note = Note::factory(5)->state([
            'pomodoro_id' => 1
        ])->create();

    }
}


