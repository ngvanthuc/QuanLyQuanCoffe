<template>
  <adminLayout>
    <div class="card-container content-page">
      <div class="title-card">
        <h3 class="text-title">Cập nhật tài khoản</h3>
      </div>
      <!--  -->
      <updateCate @getValue="valueInput" />
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
import updateCate from "~/components/admin/user/update/updateCate.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    updateCate,
  },
  data() {
    return {
      loadingSave: false,
      checkSave: false,
      dataUser: {
        avata_user: "",
        name_user: "",
        name_account: "",
        password_account: "",
        role_user: 0,
      },
      userID: "",
    };
  },
  mounted() {
    this.getID();
  },
  methods: {
    getID() {
      this.userID = this.$route.params.id;
    },
    handleBack() {
      this.$router.push({
        path: "/admin/user",
      });
    },

    valueInput(value = {}) {
      this.dataUser = {
        avata_user: value.avata_user,
        name_user: value.name_user,
        name_account: value.name_account,
        password_account: value.password_account,
        role_user: value.role_user,
      };
    },

    beforSave() {
      this.checkSave = !this.checkSave;
      if (!this.dataUser.name_user && this.dataUser.name_user.trim() == "") {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa nhập tên người dùng !",
        });
        return false;
      }
      if (
        !this.dataUser.name_account &&
        this.dataUser.name_account.trim() == ""
      ) {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa nhập email người dùng !",
        });
        return false;
      }
      if (
        !this.dataUser.password_account &&
        this.dataUser.password_account.trim() == ""
      ) {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Mật khẩu chưa trùng nhau. Vui lòng kiểm tra lại !",
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
          url + "/user/update-user/update/" + this.userID,
          {
            avata_user: this.dataUser.avata_user,
            name_user: this.dataUser.name_user,
            name_account: this.dataUser.name_account,
            password_account: this.dataUser.password_account,
            role_user: this.dataUser.role_user,
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
              path: "/admin/user",
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
