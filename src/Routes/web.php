<?php

use Illuminate\Support\Facades\Route;
use Mariojgt\Canvas\Controllers\FlowController;
use Mariojgt\Canvas\Controllers\DashboardController;
use Mariojgt\Canvas\Controllers\ModelFlowController;

// Standard
Route::group([
    'middleware' => ['web']
], function () {
    // Example page not required to be login
    Route::get('/canvas', [DashboardController::class, 'index'])->name('canvas');

    // Model Flow controller
    Route::get('/model-flow', [ModelFlowController::class, 'index'])->name('model-flow');
    Route::post('/model-flow/store', [ModelFlowController::class, 'store'])->name('model-flow.store');
    Route::get('/model-flow/edit/{flow}', [ModelFlowController::class, 'edit'])->name('model-flow.edit');

    // Api to save the model
    Route::post('/flow/store', [FlowController::class, 'save'])->name('flow.store');
    Route::get('/flow/load/{id}', [FlowController::class, 'load'])->name('flow.load');
    // Make sure is post
    Route::get('/flow/compile/{flow}', [FlowController::class, 'compile'])->name('flow.compile');
});
