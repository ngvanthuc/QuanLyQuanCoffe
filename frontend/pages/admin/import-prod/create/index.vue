<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">Tạo phiếu nhập</h3>
        <button class="btn-create" @click="showModal">
          <a-icon type="plus" /> Thêm sản phẩm nhập
        </button>
      </div>
      <!--  -->
      <inputImport
        :showModal="visible"
        @showOff="showOffModal"
        @getValue="valueInput"
      />
      <!--  -->
      <div class="line"></div>
      <!--  -->
      <tableImport :dataImportTable="dataImport" />
      <!--  -->
      <div class="line"></div>
      <!--  -->
      <div class="btn-action-group">
        <button class="btn-action btn-cancel" @click="handleBack">Hủy</button>
        <button
          class="btn-action btn-save"
          @click="handleSave"
          :disabled="loadingSave"
        >
          <span v-if="loadingSave"><a-icon type="loading" /></span>
          <span v-else>Lưu</span>
        </button>
      </div>
    </div>
  </adminLayout>
</template>

<script>
import inputImport from "~/components/admin/import/create/inputImport.vue";
import tableImport from "~/components/admin/import/create/tableImport.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    inputImport,
    tableImport,
  },
  data() {
    return {
      visible: false,
      loadingSave: false,
      loadiAdd: false,
      importItem: {},
      dataImport: [],
      quantity: 0,
      priceProd: 0,
      listIdProd: [],
    };
  },

  methods: {
    showModal() {
      this.visible = true;
    },
    showOffModal() {
      this.visible = false;
    },

    handleBack() {
      this.$router.push({
        path: "/admin/import-prod",
      });
    },

    valueInput(value) {
      this.dataImport.push(value);
      this.listIdProd.push(value.id_prod);
      this.quantity = this.quantity + Number(value.quantity_prod);
      this.priceProd =
        this.priceProd + Number(value.price_prod) * Number(value.quantity_prod);
      this.importItem = value;
    },

    async handleSave() {
      this.loadingSave = true;
      const url = process.env.API_SERVER;
      const response = await this.$axios.post(
        url + "/import/create-import/create",
        {
          list_prod: this.listIdProd,
          quantity_prod: this.quantity,
          amount_prod: this.priceProd,
        }
      );
      if (response.data && response.data.success == true) {
        this.$notify({
          type: "success",
          title: "Thành công !",
          text: response.data.message,
        });
        setTimeout(() => {
          this.$router.push({
            path: "/admin/import-prod",
          });
        }, 1500);
      } else {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: response.data.message,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title-card {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text-title {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: bold;
  }
}

// style btn action
.btn-action {
  width: 115px;
  padding: 11px 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 10px;
  font-weight: bold;
  outline: none;
}
.btn-cancel {
  margin-right: 15px;
  color: #1d253b80;
  background: #fff;
  border: 1px solid #1d253b80;
}
.btn-cancel:hover {
  border: 1px solid #e14eca;
  color: #e14eca;
}

.btn-save {
  color: #fff;
  background: #e14ecab3;
  border: 1px solid #e14ecab3;
}

.btn-save:hover {
  background: #e14eca;
  border: 1px solid #e14eca;
}
</style>