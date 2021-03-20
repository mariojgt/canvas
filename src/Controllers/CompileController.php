<?php

namespace Mariojgt\Canvas\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CompileController extends Controller
{
    public function modelCompiler($flow)
    {
        $flow = json_decode($flow->content);
        // Migration builder
        dd($flow->nodes);
        foreach ($flow->nodes as $key => $node) {
            dd($node);
        }
    }

    public function modelVariableNodeValidator($node)
    {
        dd($node);
    }
}
