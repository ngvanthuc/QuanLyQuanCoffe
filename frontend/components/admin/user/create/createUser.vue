<template>
  <div class="form-group">
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
            <h3 class="text-title">Nhập mật khẩu:</h3>
          </div>
          <a-input-password
            v-model="passwordUser"
            placeholder="Mật khẩu"
            class="input-group"
            @input="changePass"
          />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Nhập lại mật khẩu:</h3>
          </div>
          <a-input-password
            v-model="repeatPass"
            placeholder="Nhập lại mật khẩu"
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
          <selectOption @getEvent="getRoleUser" />
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>

<script>
import selectOption from "../selectCustom.vue";
export default {
  components: { selectOption },
  data() {
    return {
      nameUser: "",
      emailUser: "",
      passwordUser: "",
      repeatPass: "",
      waitInput: null,
      dataUser: {
        avata: "",
        nameUser: "",
        emailUser: "",
        passwordUser: "",
        roleUser: 0,
      },
    };
  },
  methods: {
    changeName() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.nameUser = this.nameUser;
        this.$emit("getValue", this.dataUser);
      }, 500);
    },
    changeEmail() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.emailUser = this.emailUser;
        this.$emit("getValue", this.dataUser);
      }, 500);
    },
    changePass() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataUser.passwordUser = this.passwordUser;
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
      this.dataUser.roleUser = val.key;
      this.$emit("getValue", this.dataUser);
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