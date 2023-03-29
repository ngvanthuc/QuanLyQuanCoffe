<template>
  <div class="form-group">
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Đóng </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Thêm
        </a-button>
      </template>
      <div class="row-form-item">
        <div class="l">
          <div class="form-input-group">
            <div class="title-input">
              <h3 class="text-title">Chọn sản phẩm:</h3>
            </div>
            <selectOption :listProd="selectList" @getEvent="getProd" />
          </div>
        </div>
        <!--  -->
        <div class="r">
          <div class="form-input-group">
            <div class="title-input">
              <h3 class="text-title">Số lượng:</h3>
            </div>
            <input
              type="number"
              class="input-group"
              placeholder="Nhập số lượng ..."
              v-model="quantity"
              @input="changeQuantity"
            />
          </div>
        </div>
      </div>
    </a-modal>
    <!--  -->
  </div>
</template>

<script>
import selectOption from "../selectCustom.vue";
export default {
  components: { selectOption },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      quantity: 0,
      waitInput: null,
      selectList: [],
      dataOrder: {
        id_prod: "",
        name_prod: "",
        quantity_prod: 0,
        price_prod: 0,
      },
      visible: false,
      loading: false,
    };
  },
  watch: {
    showModal(val) {
      if (val == true) {
        this.visible = val;
      }
    },
  },
  mounted() {
    this.fetchProd();
  },
  methods: {
    handleOk(e) {
      this.loading = true;
      this.$emit("getValue", this.dataOrder);
      setTimeout(() => {
        this.visible = false;
        this.$emit("showOff", this.visible);
        this.loading = false;
        this.removeVal();
      }, 1000);
    },
    handleCancel(e) {
      this.visible = false;
      this.$emit("showOff", this.visible);
    },

    changeQuantity() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataOrder.quantity_prod = this.quantity;
      }, 500);
    },

    getProd(val) {
      this.dataOrder.id_prod = val._id;
      this.dataOrder.name_prod = val.name_prod;
      this.dataOrder.price_prod = val.price_prod;
    },

    fetchProd() {
      const url = process.env.API_SERVER;
      this.$axios.get(url + "/prod/list-product").then((res) => {
        if (res.data && res.data.success == true) {
          this.selectList = res.data.data;
        }
      });
    },

    removeVal() {
      this.dataOrder = {
        id_prod: "",
        name_prod: "",
        quantity_prod: 0,
        price_prod: 0,
      };
      this.quantity = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  width: 100%;
}
.row-form-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  .l {
    width: 48%;
  }
  .r {
    width: 48%;
  }
}

.row-form-item:last-child {
  margin-bottom: 0;
}

.form-input-group {
  width: 100%;
  .title-input {
    margin-bottom: 5px;
    .text-title {
      font-size: 16px;
    }
  }
  .input-group {
    padding: 10px 18px;
    color: #222a42;
    border: 1px solid #1d253b80;
    border-radius: 10px;
    width: 100%;
    outline: none;
  }

  .input-group:hover {
    border-color: #e14eca;
  }

  .input-group:focus {
    border-color: #e14eca;
  }

  .area-group {
    padding: 10px 18px;
    color: #222a42;
    border: 1px solid #1d253b80;
    border-radius: 10px;
    width: 100%;
    outline: none;
  }

  .area-group:hover {
    border-color: #e14eca;
  }

  .area-group:focus {
    border-color: #e14eca;
  }
}
</style>