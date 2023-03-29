<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">Danh sách bàn trống</h3>
        <!-- <button class="btn-create" @click="handleCreate">
          <a-icon type="plus" /> Thêm
        </button> -->
      </div>
      <!--  -->
      <listBook />
    </div>
  </adminLayout>
</template>

<script>
import listBook from "~/components/admin/order/listBook.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    listBook,
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {
    this.$emit("pagePath", "/admin/order");
    // this.fetchCategory();
    this.$router.push({
      path: "/admin/order",
    });
  },
  methods: {},
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
