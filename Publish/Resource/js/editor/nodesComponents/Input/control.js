import Rete, { Control } from "rete";

// Begin Text input
// Import the vue componert that is the text imput
import StringControl from "./Input.vue";

export class InputControler extends Control {
	constructor(emitter, key, type = 'text',readonly = false) {
		super(key);
		this.component = StringControl;
		this.props = {
			emitter,
			ikey: key,
			type: type,
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
// End text input
