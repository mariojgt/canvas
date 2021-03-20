import Rete, { Control } from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "rete-comment-plugin";
import HistoryPlugin from "rete-history-plugin";
//import ConnectionMasteryPlugin  from 'rete-connection-mastery-plugin';


let numSocket = new Rete.Socket("Number Value");
const strSocket = new Rete.Socket('String');

import VueNumberControl from "./NumberControl.vue";

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

import StringControl from "./String.vue";
class StringControler extends Control {
	constructor(emitter, key, readonly = false) {
		super(key);
		this.component = StringControl;
		this.props = {
			emitter,
			ikey: key,
			type: "text",
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

class StringVariable extends Rete.Component {
	constructor() {
		super("String");
	}

	builder(node) {
		var out1 = new Rete.Output("string", "Value", strSocket);

		return node
			.addControl(new StringControler(this.editor, "string"))
			.addOutput(out1);
	}

	worker(node, inputs, outputs) {
		outputs["string"] = node.data.string;
	}
}

class Print extends Rete.Component {
	constructor() {
		super("Print");
	}

	builder(node) {
		var inp1 = new Rete.Input("string", "Value", strSocket);

		return node
			.addInput(inp1);
	}

	worker(node, inputs, outputs) {
        alert(inputs.string);
		outputs["string"] = node.data.string;
	}
}

export async function createFlowEditor() {
	console.log("createFlowEditor()");

	let container = document.querySelector("#rete");
	let components = [
		new NumComponent(),
        new StringVariable(),
        new Print()
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

	// let n1 = await components[0].createNode({ num: 2 });
	// let n2 = await components[0].createNode({ num: 3 });
	// let add = await components[1].createNode();

	// n1.position = [80, 200];
	// n2.position = [80, 400];
	// add.position = [500, 240];

	// editor.addNode(n1);
	// editor.addNode(n2);
	// editor.addNode(add);

	// editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
	// editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

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
