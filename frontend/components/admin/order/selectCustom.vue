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
        v-for="(item, idx) in listProd"
        :key="idx"
        :class="{ active: selected && item._id == selected._id }"
      >
        <span class="name-item-dropdown" v-if="item.quantity_prod != 0">
          {{ item.name_prod }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
export default {
  props: {
    selectedRole: Object,
    removeSelected: Boolean,
    listProd: Array,
  },
  watch: {
    selectedRole(val) {
      this.selected = val;
      this.getSelected = true;
    },
    removeSelected(val) {
      if (val == true) {
        this.selected = {};
      }
    },
  },
  mounted() {},
  data() {
    return {
      show: false,
      getSelected: false,
      selected: {},
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
      if (this.selected._id) {
        return this.selected.name_prod;
      } else {
        return "Chọn sản phẩm";
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