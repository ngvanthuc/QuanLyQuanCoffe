<template>
  <adminLayout :loadPage="loading">
    <div class="card-container content-page" v-if="!loading">
      <div class="title-card">
        <h3 class="text-title">Tạo phiếu xuất</h3>
      </div>
      <!--  -->
      <inputBill @getValue="valueInput" @getListProd="getList" />
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
import inputBill from "../../../../components/admin/bill/create/inputBill.vue";
import adminLayout from "../../../../layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    inputBill,
  },
  data() {
    return {
      loading: true,
      loadingSave: false,
      arrProd: [],
      dataBill: {
        status: "",
        quantily: 0,
        amount: "",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  methods: {
    handleBack() {
      this.$router.push({
        path: "/admin/bill",
      });
    },

    valueInput(value = {}) {
      this.dataBill.status = value.status;
      this.dataBill.quantily = value.quantily;
      this.dataBill.amount = value.quantity;
    },

    getList(arr) {
      this.arrProd = arr;
    },

    beforSave() {
      if (!this.arrProd && this.arrProd.length == 0) {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa chọn đồ uống !",
        });
        return false;
      }
      return true;
    },

    async handleSave() {
      let check = await this.beforSave();
      if (check) {
        this.loadingSave = true;

        const url = process.env.API_SERVER;
        const response = await this.$axios.post(url + "/api/bill/create", {
          status: this.dataBill.status,
          quantily: this.dataBill.amount,
          amount: this.dataBill.quantily,
          product_id: this.arrProd,
          created_at: Date.now(),
        });
        if (response.data && response.data.success == true) {
          this.$notify({
            type: "success",
            title: "Thành công !",
            text: response.data.message,
          });
          setTimeout(() => {
            this.$router.push({
              path: "/admin/bill",
            });
          }, 1500);
        } else {
          this.$notify({
            type: "error",
            title: "Thất bại !",
            text: api.data.message,
          });
        }
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
