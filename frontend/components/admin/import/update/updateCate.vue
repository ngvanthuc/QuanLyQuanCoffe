<template>
  <div class="form-group">
    <div class="row-form-item">
      <div class="l">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Tên danh mục:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập tên danh mục ..."
            v-model="nameCate"
            @input="changeName"
          />
        </div>
      </div>
      <!--  -->
      <div class="r">
        <div class="form-input-group">
          <div class="title-input">
            <h3 class="text-title">Mô tả:</h3>
          </div>
          <input
            type="text"
            class="input-group"
            placeholder="Nhập mô tả ..."
            v-model="shortDesc"
            @input="changeShort"
          />
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
export default {
  components: {},
  props: ["getCategory", "checkSave"],
  mounted() {},
  watch: {
    getCategory() {
      this.nameCate = this.getCategory.name_cate;
      this.shortDesc = this.getCategory.note_cate;
      this.dataCate = {
        name: this.getCategory.name_cate,
        short_desc: this.getCategory.note_cate,
      };
    },
    checkSave() {
      this.getPropsCate();
    },
  },
  data() {
    return {
      nameCate: "",
      shortDesc: "",
      waitInput: null,
      dataCate: {
        name: "",
        short_desc: "",
      },
    };
  },
  methods: {
    changeName() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataCate.name = this.nameCate;
        this.$emit("getValue", this.dataCate);
      }, 500);
    },
    changeShort() {
      clearTimeout(this.waitInput);
      this.waitInput = setTimeout(() => {
        this.dataCate.short_desc = this.shortDesc;
        this.$emit("getValue", this.dataCate);
      }, 500);
    },

    async getPropsCate() {
      this.dataCate = await {
        name: this.getCategory.name,
        short_desc: this.getCategory.short_desc,
      };
      this.$emit("getValue", this.dataCate);
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
