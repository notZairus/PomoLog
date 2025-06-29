<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Pomodoro;

class Subject extends Model
{
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory;

    protected $fillable = ['name', 'user_id'];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function pomodoros() {
        return $this->belongsToMany(Pomodoro::class);
    }
}
