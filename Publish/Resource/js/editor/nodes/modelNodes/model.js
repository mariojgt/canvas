// Import rete editor
import Rete, { Control } from "rete";

// IMPORTING THE SOCKETS REMEMBER NODE USE COKET CONTROL DON;T
import sockets from '../../core/socket'

// IMPORTIN CONTROLS SUFF LIKE TEXT FIELD SELECT AND MORE
import * as selectControl from "../../nodesComponents/Select/control";
import * as inputControl from "../../nodesComponents/Input/control";

// The string node can be used to create varaibles
export class ModelVariable extends Rete.Component {
	constructor() {
		super("ModelVariable");
	}

	builder(node) {
		var out1 = new Rete.Output("variable", "Var", sockets.modelVarSocket);

        // Select option for the nullable field
        var selectOptions = {
            true:true,
            false:false,
        };

        // Select option for the type field
        var typeOptions = {
            bigIncrements        : "bigIncrements",
            bigInteger           : "bigInteger",
            binary               : "binary",
            boolean              : "boolean",
            char                 : "char",
            dateTimeTz           : "dateTimeTz",
            dateTime             : "dateTime",
            date                 : "date",
            decimal              : "decimal",
            double               : "double",
            enum                 : "enum",
            float                : "float",
            foreignId            : "foreignId",
            geometryCollection   : "geometryCollection",
            geometry             : "geometry",
            id                   : "id",
            increments           : "increments",
            integer              : "integer",
            ipAddress            : "ipAddress",
            json                 : "json",
            jsonb                : "jsonb",
            lineString           : "lineString",
            longText             : "longText",
            macAddress           : "macAddress",
            mediumIncrements     : "mediumIncrements",
            mediumInteger        : "mediumInteger",
            mediumText           : "mediumText",
            morphs               : "morphs",
            multiLineString      : "multiLineString",
            multiPoint           : "multiPoint",
            multiPolygon         : "multiPolygon",
            nullableMorphs       : "nullableMorphs",
            nullableTimestamps   : "nullableTimestamps",
            nullableUuidMorphs   : "nullableUuidMorphs",
            point                : "point",
            polygon              : "polygon",
            rememberToken        : "rememberToken",
            set                  : "set",
            smallIncrements      : "smallIncrements",
            smallInteger         : "smallInteger",
            softDeletesTz        : "softDeletesTz",
            softDeletes          : "softDeletes",
            string               : "string",
            text                 : "text",
            timeTz               : "timeTz",
            time                 : "time",
            timestampTz          : "timestampTz",
            timestamp            : "timestamp",
            timestampsTz         : "timestampsTz",
            timestamps           : "timestamps",
            tinyIncrements       : "tinyIncrements",
            tinyInteger          : "tinyInteger",
            unsignedBigInteger   : "unsignedBigInteger",
            unsignedDecimal      : "unsignedDecimal",
            unsignedInteger      : "unsignedInteger",
            unsignedMediumInteger: "unsignedMediumInteger",
            unsignedSmallInteger : "unsignedSmallInteger",
            unsignedTinyInteger  : "unsignedTinyInteger",
            uuidMorphs           : "uuidMorphs",
            uuid                 : "uuid",
        };

		return node
            // Variable name
			.addControl(new inputControl.InputControler(this.editor, "var_name")) //Variable name
            // Select if will be nullable
			.addControl(new selectControl.SelectControler(
                    this.editor, // Editor ref
                    "nullable",  // Key used in the editor
                    selectOptions, // Options
                    'boolean'  // Type Boolean, int, float, string(default)
            )) // nullable
            // Select the field type in the database
            .addControl(new selectControl.SelectControler(
                    this.editor,// Editor ref
                    "type",  // Key used in the editor
                    typeOptions// Options
            )) // type
			.addControl(new inputControl.InputControler(this.editor, "lenght", "number")) // Lenght
			.addOutput(out1);
	}

	worker(node, inputs, outputs) {
		outputs["variable"] = node.data.var_name;
	}
}

// Module that will be used to generate the migration
export class ModelMigration extends Rete.Component {
	constructor() {
		super("ModelMigration");
	}

	builder(node) {
		var input = new Rete.Input("variable", "Model Variables", sockets.modelVarSocket, true);

		return node
			.addInput(input);
	}

	worker(node, inputs, outputs) {
        console.log(inputs["variable"]);
		outputs["variable"] = node.data;
	}
}


// Model Cast
export class ModelCast extends Rete.Component {
	constructor() {
		super("ModelCast");
	}

	builder(node) {
		var input = new Rete.Input("variable", "Model Variables", sockets.modelVarSocket, true);

		return node
			.addInput(input);
	}

	worker(node, inputs, outputs) {
        console.log(inputs["variable"]);
		//outputs["variable"] = node.data;
	}
}


// Model Fillable
export class ModelFillable extends Rete.Component {
	constructor() {
		super("ModelFillable");
	}

	builder(node) {
		var input = new Rete.Input("variable", "Model Variables", sockets.modelVarSocket, true);

		return node
			.addInput(input);
	}

	worker(node, inputs, outputs) {
        console.log(inputs["variable"]);
		//outputs["variable"] = node.data;
	}
}


// Model Hidden
export class ModelHidden extends Rete.Component {
	constructor() {
		super("ModelHidden");
	}

	builder(node) {
		var input = new Rete.Input("variable", "Model Variables", sockets.modelVarSocket, true);

		return node
			.addInput(input);
	}

	worker(node, inputs, outputs) {
        console.log(inputs["variable"]);
		//outputs["variable"] = node.data;
	}
}
