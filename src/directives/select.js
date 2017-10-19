import Vue from 'vue';
import 'select2/dist/css/select2.min.css'
import 'select2/dist/js/select2.min.js'


var initFunction = function(el, binding, vnode) {
    // get options from binding value. 
    // v-select="THIS-IS-THE-BINDING-VALUE"
    let options = binding.value || {};
    var defaultOpt = {
        placeholder: "--请选择--",
        allowClear: true
    };
    options = Object.assign(defaultOpt, options);

    // set up select2
    $(el).select2(options).on("select2:select", (e) => {

        // v-model looks for
        //  - an event named "change"
        //  - a value with property path "$event.target.value"
        el.dispatchEvent(new Event('change', { target: e.target }));
        options && options.onSelect && options.onSelect(e);
        // $(el).html($(el)[0].options[0]);
        // $(el).select2("destroy");
        // $(el).select2(options);
    });

    //allowClear:清除选中
    $(el).select2(options).on("select2:unselecting", (e) => {
        //清空这个值，这个值即vuejs model绑定的值
        e.target.value = "";
        el.dispatchEvent(new Event('change', {
            target: e.target
        })); //双向绑定不生效
    });

    //绑定select2 dom渲染完毕时触发的事件
    options && options.onInit && options.onInit();
}
Vue.directive('select', {
    inserted: initFunction,
    update: initFunction
})
