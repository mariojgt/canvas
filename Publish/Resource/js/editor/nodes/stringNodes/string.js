// Import rete editor
import Rete, { Control } from "rete";

// IMPORTING THE SOCKETS REMEMBER NODE USE COKET CONTROL DON;T
import sockets from '../../core/socket'

// IMPORTIN CONTROLS SUFF LIKE TEXT FIELD SELECT AND MORE
import * as selectControl from "../../nodesComponents/Select/controler";
import * as inputControl from "../../nodesComponents/Input/control";

// The string node can be used to create varaibles
export class StringVariable extends Rete.Component {
	constructor() {
		super("String-Varaible");
	}

	builder(node) {
		var out1 = new Rete.Output("string", "Value", sockets.strSocket);

        // Select option for the nullable fild
        var selectOptions = {
            1:true,
            2:false,
        };

		return node
			.addControl(new inputControl.InputControler(this.editor, "string")) //Variable name
			.addControl(new selectControl.StringSelectInputControler(this.editor, "nullable", selectOptions)) // nullable
			.addOutput(out1);
	}

	worker(node, inputs, outputs) {
		outputs["string"] = node.data.string;
	}
}


// Debug string example
export class Debug extends Rete.Component {
	constructor() {
		super("Debug");
	}

	builder(node) {
		var inp1 = new Rete.Input("string", "Value", sockets.strSocket, true);

		return node
			.addInput(inp1);
	}

	worker(node, inputs, outputs) {
        console.log(inputs.string);
		outputs["string"] = node.data.string;
	}
}

// Debug string example
export class NumberToString extends Rete.Component {
	constructor() {
		super("NumberToString");
	}

	builder(node) {
		var inp1 = new Rete.Input("number", "Value", sockets.numSocket);
		var out = new Rete.Output("string", "Result", sockets.strSocket, true);

		return node
			.addInput(inp1)
			.addOutput(out);
	}

	worker(node, inputs, outputs) {
		outputs["string"] = inputs.number;
	}
}
