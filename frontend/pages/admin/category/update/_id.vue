<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">Cập nhật danh mục</h3>
      </div>
      <!--  -->
      <updateCate
        :getCategory="dataCate"
        @getValue="valueInput"
        :checkSave="checkSave"
      />
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
import updateCate from "~/components/admin/category/update/updateCate.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    updateCate,
  },
  data() {
    return {
      loadingSave: false,
      dataCate: {
        name_cate: "",
        note_cate: "",
      },
      getIdCate: null,
      checkSave: false,
    };
  },
  mounted() {
    this.getID();
    this.fetchCate();
  },

  methods: {
    handleBack() {
      this.$router.push({
        path: "/admin/category",
      });
    },

    async fetchCate() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(
        url + "/cate/get-category/" + this.getIdCate
      );
      if (response.data && response.data.success == true) {
        this.dataCate = {
          name_cate: response.data.data.name_cate,
          note_cate: response.data.data.note_cate,
        };
      }
    },

    valueInput(value = {}) {
      this.dataCate = {
        name_cate: value.name,
        note_cate: value.short_desc,
      };
    },

    beforSave() {
      this.checkSave = !this.checkSave;
      if (!this.dataCate.name_cate && this.dataCate.name_cate.trim() == "") {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa nhập tên danh mục !",
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
        const response = await this.$axios.post(
          url + "/cate/update-category/update/" + this.getIdCate,
          {
            name_cate: this.dataCate.name_cate,
            note_cate: this.dataCate.note_cate,
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
              path: "/admin/category",
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

    getID() {
      this.getIdCate = this.$route.params.id;
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
