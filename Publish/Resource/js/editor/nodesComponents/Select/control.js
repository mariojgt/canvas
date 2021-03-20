import Rete, { Control } from "rete";

// Select imput
import Select from "./Select.vue";

// End Select input
export class SelectControler extends Control {
	constructor(emitter, key, options, type, readonly = false) {
		super(key);
		this.component = Select;
		this.props = {
			emitter,
			ikey: key,
			options: options,
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
// End Select imput
