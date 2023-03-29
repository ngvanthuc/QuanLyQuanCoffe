<template>
  <div class="form-group">
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Ảnh đại diện:</h3>
          </div>
          <uploadAvt :imgAvt="dataUser.avata_user" @uploadAvt="getUploadAvt" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Tên người dùng:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập tên người dùng ..."
            v-model="nameUser"
            @input="changeName"
          />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Email:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập Email ..."
            v-model="emailUser"
            @input="changeEmail"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Nhập mật khẩu mới:</h3>
          </div>
          <a-input-password
            v-model="passwordUser"
            placeholder="Mật khẩu mới"
            class="input-group"
            @input="changePass"
          />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Xác nhận mật khẩu mới:</h3>
          </div>
          <a-input-password
            v-model="repeatPass"
            placeholder="Xác nhận mật khẩu"
            class="input-group"
            @input="changeRePass"
          />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Chọn vai trò:</h3>
          </div>
          <selectOption :selectedRole="selectedData" @getEvent="getRoleUser" />
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import uploadIMG from "~/components/admin/user/uploadImg";
import uploadAvt from "~/components/admin/user/uploadAvt";
import selectOption from "../selectCustom.vue";
export default {
  components: { uploadIMG, selectOption, uploadAvt },
  data() {
    return {
      nameUser: "",
      emailUser: "",
      passwordUser: "",
      repeatPass: "",
      selectedData: {
        key: 0,
      },
      waitInput: null,
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
    this.fetchCate();
  },
  methods: {
    getID() {
      this.userID = this.$route.params.id;
    },
    async fetchCate() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(
        url + "/user/get-user/" + this.userID
      );
      if (response.data && response.data.success == true) {
        this.dataUser = {
          avata_user: response.data.data.avata_user,
          name_user: response.data.data.name_user,
          name_account: response.data.data.name_account,
          password_account: "",
          role_user: response.data.data.role_user,
        };
        this.selectedData = {
          key: this.dataUser.role_user,
        };
        this.nameUser = this.dataUser.name_user;
        this.emailUser = this.dataUser.name_account;
        this.$emit("getValue", this.dataUser);
      }
    },

    changeName() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.name_user = this.nameUser;
        this.$emit("getValue", this.dataUser);
      }, 500);
    },
    changeEmail() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.name_account = this.emailUser;
        this.$emit("getValue", this.dataUser);
      }, 500);
    },
    changePass() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.password_account = this.passwordUser;
      }, 500);
    },
    changeRePass() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        if (this.repeatPass != this.passwordUser) {
          this.$notify({
            type: "error",
            title: "Lỗi !",
            text: "Mật khẩu không trùng nhau. Vui lòng kiểm tra lại !",
          });
        } else {
          this.$emit("getValue", this.dataUser);
        }
      }, 500);
    },
    getRoleUser(val) {
      this.dataUser.role_user = val.key;
      this.$emit("getValue", this.dataUser);
    },

    getUploadAvt(file) {
      if (file) {
        this.dataUser.avata_user = file;
        setTimeout(() => {
          this.$emit("getValue", this.dataUser);
        }, 1000);
      }
    },

    // getUploaded(event) {
    //   if (event.length != 0) {
    //     this.dataUser.avata_user = event[0].thumbUrl;
    //     setTimeout(() => {
    //       this.$emit("getValue", this.dataUser);
    //     }, 1000);
    //   }
    // },
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
