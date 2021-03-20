<?php

namespace Mariojgt\Canvas\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Mariojgt\Canvas\Models\Flow;

class ModelFlowController extends Controller
{
    public function index()
    {
        $flow = Flow::all();
        return view('canvas::content.model_flow.index', compact('flow'));
    }

    public function store(Request $request)
    {
        // Validate the user
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
        ]);

        $flow       = new Flow();
        $flow->name = Request('name');
        $flow->type = 'Model';
        $flow->save();

        return back()->with('success', 'Account Created with success, Please check you email for a verification link.');
    }

    public function edit(Flow $flow)
    {
        return view('canvas::content.model_flow.edit', compact('flow'));
    }
}
