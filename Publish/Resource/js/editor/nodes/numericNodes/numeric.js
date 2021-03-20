// Import rete editor
import Rete, { Control } from "rete";
// IMPORTING THE SOCKETS REMEMBER NODE USE COKET CONTROL DON;T
import sockets from '../../core/socket'

// IMPORTIN CONTROLS SUFF LIKE TEXT FIELD SELECT AND MORE
import * as inputControl from "../../nodesComponents/Input/control";

export class NumComponent extends Rete.Component {
	constructor() {
		super("Number");
	}

	builder(node) {
		var out1 = new Rete.Output("num", "Value", sockets.numSocket);

		return node
			.addControl(new inputControl.InputControler(this.editor, "num", 'number'))
			.addOutput(out1);
	}

	worker(node, inputs, outputs) {
		outputs["num"] = node.data.num;
	}
}

export class MathComponent extends Rete.Component {
	doOperation(v1, v2) {
		return 0;
	}

	builder(node) {
		var inp1 = new Rete.Input("num1", "Value 1", sockets.numSocket);
		var inp2 = new Rete.Input("num2", "Value 2", sockets.numSocket);
		var out = new Rete.Output("num", "Result", sockets.numSocket);

		inp1.addControl(new inputControl.InputControler(this.editor, "num1", 'number'));
		inp2.addControl(new inputControl.InputControler(this.editor, "num2", 'number'));

		return node
			.addInput(inp1)
			.addInput(inp2)
			.addControl(new inputControl.InputControler(this.editor, "preview", 'number', true))
			.addOutput(out);
	}

	worker(node, inputs, outputs) {
		var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
		var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
		var sum = this.doOperation(n1, n2);

		this.editor.nodes
			.find(n => n.id == node.id)
			.controls.get("preview")
			.setValue(sum);
		outputs["num"] = sum;
	}
}

export class AddComponent extends MathComponent {
	constructor() {
		super("Add");
	}
	doOperation(v1, v2) {
		return v1 + v2;
	}
}

export class SubtractComponent extends MathComponent {
	constructor() {
		super("Subtract");
	}
	doOperation(v1, v2) {
		return v1 - v2;
	}
}

export class MultiplyComponent extends MathComponent {
	constructor() {
		super("Multiply");
	}
	doOperation(v1, v2) {
		return v1 * v2;
	}
}

export class DivideComponent extends MathComponent {
	constructor() {
		super("Divide");
	}
	doOperation(v1, v2) {
		return v2 != 0 ? v1 / v2 : 0;
	}
}
