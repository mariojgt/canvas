<template>

  <div>
      <label for=""> {{ ikey }}</label>
      <select
        :readonly="readonly"
        :value="value"
        @input="onChange($event)"
        @mousedown.stop
    >
        <option v-for="(item, index) in options" :key="index" :value="index" >{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
    props: ['initial', 'readonly', 'emitter', 'ikey', 'options', 'type','change', 'getData', 'putData'],
    data() {
        return {
            value: this.initial || 0,
        }
    },
    methods: {
        parse(value) {
            switch (this.type) {
                // If type boolean
                case 'boolean':
                    // check if is true or fasle
                    if (value === 'true') {
                        return true;
                    } else if(value === 'false') {
                        return false;
                    } else {
                        Boolean(value);
                    }
                    break;
                default:
                    // deatul is string
                    return value;
                    break;
            }
        },
        onChange(e) {
            this.value = this.parse(e.target.value);
            this.update();
        },
        update() {
            if (this.ikey) {
                this.putData(this.ikey, this.value)
                this.change(this.value);
            }
            this.emitter.trigger('process');
        }
    },
    mounted() {
        this.value = this.getData(this.ikey);
    }
}
</script>
