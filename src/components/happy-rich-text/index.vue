<template>
  <div class="happy-rich-text">
    <textarea id="editor" class="happy-rich-text-inner"></textarea>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  watch,
  toRefs,
  onUnmounted,
} from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const state: any = reactive({
      editor: undefined,
      editorContent: "",
      timer: undefined,
    });
    onMounted(() => {
      console.log("on mound!!!");
      const tinymce = window.tinymce;
      tinymce
        .init({
          selector: "#editor",
        })
        .then(() => {
          const editor = tinymce.get("editor");
          if (editor) {
            editor.on("input", onContentInput);
            state.editor = editor;
            setContent(props.modelValue);
          }
        });
    });

    onUnmounted(() => {
      const editor = window.tinymce.get("editor");
      editor.destroy();
    });

    const setContent = (val) => {
      if (state.editor) {
        state.editor.setContent(val);
      }
    };

    const getContent = () => {
      if (state.editor) {
        return state.editor.getContent();
      }
      return "";
    };

    const onContentInput = () => {
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = undefined;
      }
      state.timer = setTimeout(() => {
        state.editorContent = getContent();
        console.log(state.editorContent);
      }, 300);
    };

    watch(
      () => props.modelValue,
      (val) => {
        if (val !== state.editorContent) {
          state.editorContent = val;
        }
      }
    );

    watch(
      () => state.editorContent,
      (val) => {
        ctx.emit("update:modelValue", val);
      }
    );
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="stylus" scoped>
.happy-rich-text-inner {
  text-align: left;
  min-height: 500px;
}
</style>
