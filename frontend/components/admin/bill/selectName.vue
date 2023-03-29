<template>
  <div class="select-custom" v-click-outside="hide">
    <div class="select-item" @click="changeSelect">
      <span class="label-select">{{ getProduct() }}</span>

      <a-icon :type="show ? 'up' : 'down'" />
    </div>
    <ul class="dropdown-select" v-if="show">
      <li
        class="dropdown-item"
        @click="handleChange(item)"
        v-for="(item, idx) in list"
        :key="idx"
        :class="{ active: selected && item._id == selected._id }"
      >
        <span class="name-item-dropdown">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  props: {
    selected: Object,
    list: Array,
  },
  data() {
    return {
      show: false,
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
      this.$emit("getEvent", event);
    },

    getProduct() {
      if (this.selected) return this.selected.name;
      return "";
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
