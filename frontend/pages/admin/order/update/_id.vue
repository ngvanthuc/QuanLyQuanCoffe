<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">Cập nhật bàn</h3>
      </div>
      <!--  -->
      <updateBook
        :getCategory="dataBook"
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
import updateBook from "~/components/admin/booking/update/updateBook.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    updateBook,
  },
  data() {
    return {
      loadingSave: false,
      dataBook: {
        name_book: "",
        note_book: "",
      },
      getIdBook: null,
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
        path: "/admin/booking",
      });
    },

    async fetchCate() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(
        url + "/book/get-booking/" + this.getIdBook
      );
      if (response.data && response.data.success == true) {
        this.dataBook = {
          name_book: response.data.data.name_book,
          note_book: response.data.data.note_book,
        };
      }
    },

    valueInput(value = {}) {
      this.dataBook = {
        name_book: value.name_book,
        note_book: value.note_book,
      };
    },

    beforSave() {
      this.checkSave = !this.checkSave;
      if (!this.dataBook.name_book && this.dataBook.name_book.trim() == "") {
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
          url + "/cate/update-category/update/" + this.getIdBook,
          {
            name_book: this.dataBook.name_book,
            note_book: this.dataBook.note_book,
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
              path: "/admin/booking",
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
      this.getIdBook = this.$route.params.id;
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
