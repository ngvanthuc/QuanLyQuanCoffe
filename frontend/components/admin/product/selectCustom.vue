<template>
  <div class="select-custom" v-click-outside="hide">
    <div class="select-item" @click="changeSelect">
      <!-- <span class="label-select" v-if="getSelected">
        {{ getNameSelect(selected.key) }}
      </span> -->
      <span class="label-select">{{ getName() }}</span>
      <a-icon :type="show ? 'up' : 'down'" />
    </div>
    <ul class="dropdown-select" v-show="show">
      <li
        class="dropdown-item"
        @click="handleChange(item)"
        v-for="(item, idx) in contentSelect"
        :key="idx"
        :class="{ active: selected && item._id == selected._id }"
      >
        <span class="name-item-dropdown">{{ item.name_cate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  props: {
    selectedCate: Object,
  },
  watch: {
    selectedCate(val) {
      this.selected = val;
      this.getSelected = true;
    },
  },
  mounted() {
    this.fetchCategory();
  },
  data() {
    return {
      show: false,
      getSelected: false,
      selected: {},
      contentSelect: [],
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    hide() {
      this.show = false;
    },

    changeSelect() {
      this.show = !this.show;
    },

    handleChange(event) {
      this.show = false;
      this.selected = event;
      this.$emit("getEvent", this.selected);
    },

    getName() {
      if (this.selected.name_cate) {
        return this.selected.name_cate;
      } else {
        return "Chọn danh mục";
      }
    },

    async fetchCategory() {
      this.loadingTable = true;
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(url + "/cate/list-category");
      if (response.data && response.data.success == true) {
        this.contentSelect = response.data.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.select-custom {
  position: relative;
  width: 100%;
  .select-item {
    padding: 10px 18px;
    color: #222a42;
    border: 1px solid #1d253b80;
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // outline: none;
  }
  .dropdown-select {
    position: absolute;
    z-index: 99;
    margin-bottom: 0;
    list-style: none;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    width: 99%;
    padding-inline-start: 0;
    padding: 10px 0px;
    .dropdown-item {
      padding: 10px 15px;
    }
    .dropdown-item:hover {
      background-color: #fafafa;
    }
    .active {
      background-color: #fafafa;
    }
  }
}
</style>