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

// IMPORTING THE NODES
// String node
import * as stringNodes from "../../nodes/stringNodes/string";
// Numeric nodes
import * as numericNodes from "../../nodes/numericNodes/numeric";
// Model creation nodes
import * as modelNodes from "../../nodes/modelNodes/model";

// Load the save and load manager
import * as saveLoadCompileManager from "../../core/saveLoadCompileManager";

export async function createFlowEditor(flowId, type) {
    // Editor conteiner ref
	let container = document.querySelector("#rete");
    // NODES
	let components = [
        new modelNodes.ModelVariable(),
        new modelNodes.ModelMigration(),
        new modelNodes.ModelFillable(),
        new modelNodes.ModelHidden(),
	];

    // Editor id
    var nodeEditorid = type+flowId;

    // Start the editor
	let editor = new Rete.NodeEditor(nodeEditorid+"@0.1.0", container);
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
			},
            "Save": () => {
                saveLoadCompileManager.save(flowId, editor.toJSON());
			},
            "compile": () => {
                saveLoadCompileManager.save(flowId, editor.toJSON());
                setTimeout(() => {
                    saveLoadCompileManager.compile(flowId);
                }, 1000);
			}
		},
		allocate(component) {
			return ["+ New"];
		},
		rename(component) {
			return component.name;
		}
	});

	let engine = new Rete.Engine(nodeEditorid+"@0.1.0");

	components.map(c => {
		editor.register(c);
		engine.register(c);
	});


    // Load the Data from the database
    axios.get('/flow/load/'+flowId, {
    })
    .then(function (response) {
        // Json parse the data
        var dataLoad = JSON.parse(response.data.data.content);
        // Editor load nodes
        editor.fromJSON(dataLoad);
    })
    .catch(function (error) {
    })

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
