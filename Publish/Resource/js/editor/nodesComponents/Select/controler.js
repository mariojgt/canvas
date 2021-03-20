import Rete, { Control } from "rete";

// Select imput
import StringSelectControl from "./Select.vue";

export class StringSelectInputControler extends Control {
	constructor(emitter, key, option, readonly = false) {
		super(key);
		this.component = StringSelectControl;
		this.props = {
			emitter,
			ikey: key,
			type: "text",
			options: option,
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
// End Select imput
