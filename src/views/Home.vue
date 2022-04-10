<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <v-tags></v-tags>
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="move" mode="out-in">
            <keep-alive :include="tagsList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
        <!-- <el-backtop target=".content"></el-backtop> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useIndexStore } from "../store/index";
import { storeToRefs } from "pinia";
import vHeader from "../components/Header.vue";
import vSidebar from "../components/Sidebar.vue";
import vTags from "../components/Tags.vue";
export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const indexStore = useIndexStore();
    const { collapse, tagsList: tagsListAlias } = storeToRefs(indexStore);
    const tagsList = computed(() =>
      tagsListAlias.value.map((item) => item.name)
    );
    return {
      tagsList,
      collapse,
    };
  },
};
</script>
