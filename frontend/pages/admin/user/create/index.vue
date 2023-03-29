<template>
  <adminLayout>
    <div class="card-container content-page">
      <div class="title-card">
        <h3 class="text-title">Thêm người dùng</h3>
      </div>
      <!--  -->
      <inputCate @getValue="valueInput" />
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
import inputCate from "~/components/admin/user/create/createUser.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    inputCate,
  },
  data() {
    return {
      loadingSave: false,
      dataUser: {
        avataUser: "",
        nameUser: "",
        emailUser: "",
        passwordUser: "",
        roleUser: 0,
      },
    };
  },
  mounted() {},

  methods: {
    handleBack() {
      this.$router.push({
        path: "/admin/user",
      });
    },

    valueInput(value = {}) {
      this.dataUser.avataUser = value.avata;
      this.dataUser.nameUser = value.nameUser;
      this.dataUser.emailUser = value.emailUser;
      this.dataUser.passwordUser = value.passwordUser;
      this.dataUser.roleUser = value.roleUser;
    },

    beforSave() {
      if (!this.dataUser.nameUser && this.dataUser.nameUser.trim() == "") {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa nhập tên người dùng !",
        });
        return false;
      }
      if (!this.dataUser.emailUser && this.dataUser.emailUser.trim() == "") {
        this.$notify({
          type: "error",
          title: "Thất bại !",
          text: "Bạn chưa nhập email người dùng !",
        });
        return false;
      }
      if (
        !this.dataUser.passwordUser &&
        this.dataUser.passwordUser.trim() == ""
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
          url + "/user/create-user/create",
          {
            avata_user: this.dataUser.avataUser,
            name_user: this.dataUser.nameUser,
            name_account: this.dataUser.emailUser,
            password_account: this.dataUser.passwordUser,
            role_user: this.dataUser.roleUser,
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
            text: response.data.message,
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