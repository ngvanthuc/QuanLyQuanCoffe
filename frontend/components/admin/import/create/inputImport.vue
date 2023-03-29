<template>
  <div class="">
    <a-modal v-model="visible" title="Thêm sản phẩm" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Đóng </a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
        >
          Lưu
        </a-button>
      </template>
      <div class="form-group">
        <div class="row-form-item">
          <div class="l">
            <div class="form-input-group">
              <div class="title-input">
                <h3 class="text-title">Chọn sản phẩm:</h3>
              </div>
              <selectOption
                :removeSelected="nullSelected"
                :listProd="selectList"
                @getEvent="getProd"
              />
            </div>
          </div>
          <!--  -->
          <div class="r">
            <div class="form-input-group">
              <div class="title-input">
                <h3 class="text-title">Đơn vị tính:</h3>
              </div>
              <selectUnit
                :removeSelected="nullSelected"
                :listProd="selectListUnit"
                @getEvent="changeUnit"
              />
            </div>
          </div>
        </div>
        <!--  -->
        <div class="row-form-item">
          <div class="l">
            <div class="form-input-group">
              <div class="title-input">
                <h3 class="text-title">Nhập số lượng:</h3>
              </div>
              <input
                type="number"
                class="input-group"
                placeholder="Nhập số lượng ..."
                v-model="quantityImport"
                @input="changeQuantity"
              />
            </div>
          </div>
          <!--  -->
          <div class="r">
            <div class="form-input-group">
              <div class="title-input">
                <h3 class="text-title">Nhập giá nhập:</h3>
              </div>
              <input
                type="number"
                class="input-group"
                placeholder="Nhập giá nhập ..."
                v-model="priceImport"
                @input="changePrice"
              />
            </div>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import selectOption from "../selectCustom.vue";
import selectUnit from "./selectCustom.vue";
export default {
  components: { selectOption, selectUnit },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      loading: false,
      visible: false,
      unitImport: "",
      quantityImport: 0,
      priceImport: 0,
      nullSelected: false,
      waitInput: null,
      selectList: [],
      dataImport: {
        name_prod: "",
        id_prod: "",
        unit_prod: "",
        quantity_prod: 0,
        price_prod: 0,
      },
      selectListUnit: [
        {
          _id: "1",
          name_unit: "Cốc",
        },
        {
          _id: "2",
          name_unit: "Chai",
        },
        {
          _id: "3",
          name_unit: "Cái",
        },
      ],
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
      this.$emit("getValue", this.dataImport);
      this.updateProd();
      setTimeout(() => {
        this.visible = false;
        this.$emit("showOff", this.visible);
        this.loading = false;
        this.removeVal();
      }, 1500);
    },
    handleCancel(e) {
      this.visible = false;
      this.$emit("showOff", this.visible);
    },

    changeUnit(event) {
      this.dataImport.unit_prod = event.name_unit;
    },
    changeQuantity() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataImport.quantity_prod = this.quantityImport;
      }, 500);
    },
    changePrice() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataImport.price_prod = this.priceImport;
      }, 500);
    },

    getProd(val) {
      this.dataImport.id_prod = val._id;
      this.dataImport.name_prod = val.name_prod;
    },

    beforSave() {
      if (!this.dataImport.id_prod && this.dataImport.id_prod.trim() == "") {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa chọn sản phẩm !",
        });
        return false;
      }
      return true;
    },

    removeVal() {
      this.unitImport = "";
      this.quantityImport = 0;
      this.priceImport = 0;
      this.dataImport = {
        name_prod: "",
        id_prod: "",
        unit_prod: "",
        quantity_prod: 0,
        price_prod: 0,
      };
      this.nullSelected = true;
    },

    async fetchProd() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(url + "/prod/list-product");
      if (response.data && response.data.success == true) {
        this.selectList = response.data.data;
      }
    },

    updateProd() {
      const url = process.env.API_SERVER;
      this.$axios
        .post(url + "/prod/product-update/update/" + this.dataImport.id_prod, {
          quantity_prod: this.quantityImport,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.$notify({
              type: "success",
              title: "Thành công !",
            });
          }
        });
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