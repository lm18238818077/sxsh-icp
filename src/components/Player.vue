<template>
  <div
    class="wrap"
    @mouseenter="iconShow = true"
    @mouseleave="iconShow = false"
  >
    <p> {{eventToDesc.OnCallConnect.value.calltype[props.data.calltype]}} </p>
    <div class="playicon">
      <el-icon
        :size="50"
        color="rgba(255,255,255,0.5)"
        v-show="iconShow"
        @click="playChange(played)"
      >
        <video-pause v-if="played" />
        <video-play v-else />
      </el-icon>
    </div>

    <el-icon
      v-show="iconShow"
      @click="handleClose(props.data)"
      :size="25"
      color="rgba(255,255,255,0.6)"
      ><circle-close
    /></el-icon>
    <div
      ref="playerRef"
      class="inner"
      :style="{ width: `${props.width}px`, height: `${props.height}px` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { monitorParam } from "../config";
import eventToDesc from "../config/OnDialInRinging";


const playerRef = ref(null);
const playerMsp = ref(null);
const played = ref(true);
const iconShow = ref(false);

const props = defineProps({
  width: {
    type: Number,
    default: () => monitorParam.width,
  },
  height: {
    type: Number,
    default: () => monitorParam.height,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits(["play", "pause", "stop"]);

onMounted(() => {
  console.log(props.data.wssUrl, "props");
  const playerConfig = {
    wsUrl: props.data.wssUrl,
    el: playerRef.value,
    sharpType: {
      width: props.width,
      height: props.height,
    },
    cid: props.data["cid"],
  };
  playerMsp.value = new MSP_PLAYER(playerConfig)
});

const playChange = (value) => {
  played.value = !value;
  if (value) {
    emits("pause");
    playerMsp.value?.pause();
  } else {
    emits("play");
    playerMsp.value?.play();
  }
};

const handleClose = (id) => {
  emits("stop", id);
};
</script>
<script>
export default {
  name: "Player",
};
</script>
<style scoped>
.wrap {
  position: relative;
  background: #fff;
  margin-bottom: 4px;
}

.wrap > p {
  text-align: center;
  margin-bottom: 4px;
}
.wrap .inner {
  background: rgba(0, 0, 0, 0.1);
}

.wrap > .playicon {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
  z-index: 1;
}

.wrap > .el-icon {
  position: absolute;
  right: 10px;
  top: 32px;
  z-index: 1;
  cursor: pointer;
}
</style>
