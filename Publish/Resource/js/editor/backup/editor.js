import Rete, { Control } from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "rete-comment-plugin";
import HistoryPlugin from "rete-history-plugin";
//import ConnectionMasteryPlugin  from 'rete-connection-mastery-plugin';

import VueNumberControl from "./NumberControl.vue";

let numSocket = new Rete.Socket("Number Value");

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

export async function createFlowEditor() {
	console.log("createFlowEditor()");

	let container = document.querySelector("#rete");
	let components = [
		new NumComponent(),
		new AddComponent(),
		new SubtractComponent(),
		new MultiplyComponent(),
		new DivideComponent()
	];

	let editor = new Rete.NodeEditor("demo@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(VueRenderPlugin);
	editor.use(AreaPlugin);
	editor.use(CommentPlugin);
	editor.use(HistoryPlugin);
	//editor.use(ConnectionMasteryPlugin);

	editor.use(ContextMenuPlugin, {
		searchBar: true,
		items: {
			"Dump JSON": () => {
				console.log(editor.toJSON());
			}
		},
		allocate(component) {
			return ["+ New"];
		},
		rename(component) {
			return component.name;
		}
	});

	let engine = new Rete.Engine("demo@0.1.0");

	components.map(c => {
		editor.register(c);
		engine.register(c);
	});

	let n1 = await components[0].createNode({ num: 2 });
	let n2 = await components[0].createNode({ num: 3 });
	let add = await components[1].createNode();

	n1.position = [80, 200];
	n2.position = [80, 400];
	add.position = [500, 240];

	editor.addNode(n1);
	editor.addNode(n2);
	editor.addNode(add);

	editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
	editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

	editor.on(
		"process nodecreated noderemoved connectioncreated connectionremoved",
		async () => {
			console.log("processing...");
			await engine.abort();
			await engine.process(editor.toJSON());
		}
	);

	// editor.on('nodedraged', async (node) =>
	// {
	//     console.log('node dragged', node);
	//     let grid = 10;
	//     node.position[0] = Math.floor(node.position[0] / grid) * grid;
	//     node.position[1] = Math.floor(node.position[1] / grid) * grid;
	// });

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
