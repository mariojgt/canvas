<template>
    <div id="app" class="border-2 border-indigo-600" >
        <div id="rete"/>
    </div>
</template>

<script>
import { createFlowEditor } from "./flowMode/modelCreator/editor";
import "./style/editor.css";

export default {
    mounted() {
        createFlowEditor();
    }
};
</script>

<style>
#app {
    width: 100%;
    height: 600px;
}

#rete {
    margin: 0 auto;
    width: 99%;
    height: 100%;
    border: 1px solid #333;
}
</style>
