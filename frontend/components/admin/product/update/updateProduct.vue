<template>
  <div class="form-group">
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Hình ảnh sản phẩm:</h3>
          </div>
          <uploadAvt
            :imgAvt="dataProduct.thumbnail_prod"
            @uploadAvt="getUploadAvt"
          />
        </div>
      </div>
      <!--  -->
      <!-- <div class="r"></div> -->
    </div>
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Tên sản phẩm:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập tên sản phẩm ..."
            v-model="name_prod"
            @input="changeName"
          />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Mã sản phẩm:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Mã sản phẩm"
            v-model="code_prod"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Danh mục sản phẩm:</h3>
          </div>
          <selectOption :selectedCate="selectedData" @getEvent="getCateProd" />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Giá bán:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập giá bán ..."
            v-model="price_prod"
            @input="changeMoney"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uploadAvt from "~/components/admin/product/uploadAvt";
import selectOption from "../selectCustom.vue";
var slugify = require("slugify");
export default {
  components: { uploadAvt, selectOption },
  data() {
    return {
      name_prod: "",
      code_prod: "",
      price_prod: 0,
      waitInput: null,
      dataProduct: {
        thumbnail_prod: "",
        name_prod: "",
        code_prod: "",
        cate_prod: "",
        price_prod: 0,
      },
      selectedData: {},
      prodID: "",
    };
  },
  mounted() {
    this.getID();
    this.fetchProd();
  },
  methods: {
    getID() {
      this.prodID = this.$route.params.id;
    },
    async fetchProd() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(
        url + "/prod/get-product/" + this.prodID
      );
      if (response.data && response.data.success == true) {
        this.dataProduct = {
          thumbnail_prod: response.data.data.thumbnail_prod,
          name_prod: response.data.data.name_prod,
          code_prod: response.data.data.code_prod,
          cate_prod: response.data.data.cate_prod,
          price_prod: response.data.data.price_prod,
        };
        this.selectedData = this.dataProduct.cate_prod;
        this.name_prod = this.dataProduct.name_prod;
        this.code_prod = this.dataProduct.code_prod;
        this.price_prod = this.dataProduct.price_prod;
        this.$emit("getValue", this.dataProduct);
      }
    },
    changeName() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataProduct.name_prod = this.name_prod;
        this.$emit("getValue", this.dataProduct);
        this.changeCode();
      }, 500);
    },
    changeCode() {
      this.code_prod = slugify(this.name_prod, "_").toLowerCase();
      this.dataProduct.code_prod = this.code_prod;
      this.$emit("getValue", this.dataProduct);
    },
    changeMoney() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataProduct.price_prod = this.price_prod;
        this.$emit("getValue", this.dataProduct);
      }, 500);
    },
    getUploadAvt(file) {
      if (file) {
        this.dataProduct.thumbnail_prod = file;
        setTimeout(() => {
          this.$emit("getValue", this.dataProduct);
        }, 1000);
      }
    },
    getCateProd(val) {
      this.dataProduct.cate_prod = val._id;
      this.$emit("getValue", this.dataProduct);
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
