<?php

use Illuminate\Support\Facades\Route;
use Mariojgt\Canvas\Controllers\DashboardController;

// Standard
Route::group([
    'middleware' => ['web']
], function () {
    // Example page not required to be login
    Route::get('/canvas', [DashboardController::class, 'index'])->name('canvas');
});
