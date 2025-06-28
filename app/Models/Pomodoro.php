<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\StudySession;
use App\Models\Subject;
use App\Models\Note;

class Pomodoro extends Model
{
    /** @use HasFactory<\Database\Factories\PomodoroFactory> */
    use HasFactory;

    protected $fillable = ['study_session_id', 'subject_id'];

    
    public function study_session() {
        return $this->belongsTo(StudySession::class);
    }

    public function subject() {
        return $this->hasOne(Subject::class);
    }

    public function notes() {
        return $this->hasMany(Note::class);
    }
}
