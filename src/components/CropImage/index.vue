<template>
  <div>
    <el-dialog title="裁剪图片" :model-value="props.visible" width="600px" @closed="emit('closed')">
      <vue-cropper
        ref="cropper"
        :src="props.imgsrc"
        :ready="cropImage"
        :zoom="cropImage"
        :cropmove="cropImage"
        style="width: 100%; height: 400px"
      ></vue-cropper>

      <template #footer>
        <span class="dialog-footer">
          <el-button class="crop-demo-btn" type="primary"
            >选择图片
            <input
              class="crop-input"
              type="file"
              name="image"
              accept="image/*"
              @change="setImage"
            />
          </el-button>
          <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="CropImage">
import { ref, computed } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
const props = defineProps({
  visible: Boolean,
  imgsrc: String,
});

const emit = defineEmits(["change", "closed"]);

const cropImg = ref("");
const cropper = ref(null);

const setImage = (e) => {
  const file = e.target.files[0];
  if (!file.type.includes("image/")) {
    return;
  }
  const reader = new FileReader();
  reader.onload = (event) => {
    cropper.value && cropper.value.replace(event.target.result);
  };
  reader.readAsDataURL(file);
};

const cropImage = () => {
  cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
};

const saveAvatar = () => {
  emit("change", cropImg.value);
};
</script>

<style>
.crop-demo-btn {
  position: relative;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
