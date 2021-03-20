// Required fore start the editor
import Rete, { Control } from "rete";
import VueRenderPlugin from "rete-vue-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import CommentPlugin from "rete-comment-plugin";
import HistoryPlugin from "rete-history-plugin";
import ConnectionReroutePlugin from 'rete-connection-reroute-plugin';
//import ConnectionMasteryPlugin  from 'rete-connection-mastery-plugin';

// Import the editor sockets example (bollean, string and mor depend the page need)
// Usage example sockets.strSocket
import sockets from '../../core/socket'

// Importing the nodes
// String node
import * as stringNodes from "../../nodes/stringNodes/string";
// Numeric nodes
import * as numericNodes from "../../nodes/numericNodes/numeric";

console.log(numericNodes);

export async function createFlowEditor() {
	console.log("createFlowEditor()");

	let container = document.querySelector("#rete");
	let components = [
        new numericNodes.NumComponent(),
        new numericNodes.AddComponent(),
        new numericNodes.SubtractComponent(),
        new numericNodes.MultiplyComponent(),
        new numericNodes.DivideComponent(),
        new stringNodes.StringVariable(),
        new stringNodes.Debug(),
        new stringNodes.NumberToString(),
	];

    // Start the editor
	let editor = new Rete.NodeEditor("demo@0.1.0", container);
    // Plugns
	editor.use(ConnectionPlugin);
	editor.use(VueRenderPlugin);
	editor.use(AreaPlugin);
	editor.use(CommentPlugin);
	editor.use(HistoryPlugin);
    editor.use(ConnectionReroutePlugin);
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
