<?php

namespace Mariojgt\Canvas\Controllers;

use Illuminate\Http\Request;
use Mariojgt\Canvas\Models\Flow;
use App\Http\Controllers\Controller;
use Mariojgt\Canvas\Controllers\CompileController;

class FlowController extends Controller
{
    public function save(Request $request)
    {
        $flow          = Flow::findOrFail(Request('id'));
        $flow->content = Request('flowData');
        $flow->save();

        return response()->json([
            'status' => true,
        ]);
    }

    public function load($id)
    {
        $flow = Flow::findOrFail(Request('id'));

        return response()->json([
            'data' => $flow
        ]);
    }

    public function compile(Flow $flow)
    {
        $compiler = new CompileController();

        if ($flow->type == 'Model') {
            $compiler->modelCompiler($flow);
        }
    }
}
