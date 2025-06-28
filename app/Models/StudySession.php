<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class StudySession extends Model
{
    /** @use HasFactory<\Database\Factories\StudySessionFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'date'];


    public function user() {
        return $this->belongsTo(User::class);
    }
}