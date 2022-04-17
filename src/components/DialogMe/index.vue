<template>
  <el-dialog :model-value="props.visible" @close="emit('close')">
    <slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('onCancel')">挂机</el-button>
        <el-button type="primary" @click="emit('onOk')">接听</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup name="DialogMe">
const props = defineProps({
  visible: Boolean
});
const emit = defineEmits(["onOk", "onCancel", "close"]);

</script>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
