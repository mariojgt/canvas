class NumControl extends Control {
	constructor(emitter, key, readonly = false) {
		super(key);
		this.component = VueNumberControl;
		this.props = {
			emitter,
			ikey: key,
			type: "number",
			readonly,
			change: () => this.onChange()
		};
	}

	setValue(value) {
		const ctx = this.vueContext || this.props;
		ctx.value = value;
	}

	onChange() {}
}

class NumComponent extends Rete.Component {
	constructor() {
		super("Number");
	}

	builder(node) {
		var out1 = new Rete.Output("num", "Value", numSocket);

		return node
			.addControl(new NumControl(this.editor, "num"))
			.addOutput(out1);
	}

	worker(node, inputs, outputs) {
		outputs["num"] = node.data.num;
	}
}

class MathComponent extends Rete.Component {
	doOperation(v1, v2) {
		return 0;
	}

	builder(node) {
		var inp1 = new Rete.Input("num1", "Value 1", numSocket);
		var inp2 = new Rete.Input("num2", "Value 2", numSocket);
		var out = new Rete.Output("num", "Result", numSocket);

		inp1.addControl(new NumControl(this.editor, "num1"));
		inp2.addControl(new NumControl(this.editor, "num2"));

		return node
			.addInput(inp1)
			.addInput(inp2)
			.addControl(new NumControl(this.editor, "preview", true))
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

class AddComponent extends MathComponent {
	constructor() {
		super("Add");
	}
	doOperation(v1, v2) {
		return v1 + v2;
	}
}

class SubtractComponent extends MathComponent {
	constructor() {
		super("Subtract");
	}
	doOperation(v1, v2) {
		return v1 - v2;
	}
}

class MultiplyComponent extends MathComponent {
	constructor() {
		super("Multiply");
	}
	doOperation(v1, v2) {
		return v1 * v2;
	}
}

class DivideComponent extends MathComponent {
	constructor() {
		super("Divide");
	}
	doOperation(v1, v2) {
		return v2 != 0 ? v1 / v2 : 0;
	}
}
