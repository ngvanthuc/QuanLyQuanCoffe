<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">Danh sách danh mục</h3>
        <button class="btn-create" @click="handleCreate">
          <a-icon type="plus" /> Thêm
        </button>
      </div>
      <!--  -->
      <tableCustom
        :header="headerTable"
        :content="contentTable"
        :loadingTable="loadingTable"
        @reloadTable="reloadFetchData"
      />
    </div>
  </adminLayout>
</template>

<script>
import tableCustom from "~/components/admin/category/tableCustom.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    tableCustom,
  },
  data() {
    return {
      loadingTable: false,
      headerTable: [
        {
          name: "Tên danh mục",
          width: "200px",
          align: "left",
        },
        {
          name: "Mô tả",
          width: "200px",
          align: "left",
        },
        {
          name: "Tạo lúc",
          width: "150px",
          align: "center",
        },
      ],
      contentTable: [],
    };
  },
  watch: {},
  mounted() {
    this.$emit("pagePath", "/admin/category");
    this.fetchCategory();
  },
  methods: {
    handleCreate() {
      this.$router.push({
        path: "/admin/category/create",
      });
    },

    async fetchCategory() {
      this.loadingTable = true;
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(url + "/cate/list-category");
      if (response.data && response.data.success == true) {
        this.contentTable = response.data.data;
        setTimeout(() => {
          this.loadingTable = false;
        }, 1500);
      }
    },

    reloadFetchData(event) {
      if (event == true) {
        this.fetchCategory();
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

// style btn create
.btn-create {
  padding: 4px 20px;
  border: 2px solid #000;
  border-radius: 5px;
  color: #000;
  background: transparent;
  transition: all 0.3s ease;
  cursor: pointer;
  .anticon {
    margin-right: 10px;
  }
}
.btn-create:hover {
  border-color: #42b883;
  color: #42b883;
}
</style>
