<template>
  <div class="table-admin-custom">
    <table class="table-custom">
      <!--  -->
      <thead class="header-table-custom">
        <th class="col-number">STT</th>
        <th
          v-for="(header, idx) in header"
          :key="idx"
          :style="'width:' + header.width + ';' + 'text-align:' + header.align"
        >
          {{ header.name }}
        </th>
        <!-- <th class="col-action">Thao tác</th> -->
      </thead>
      <!--  -->
      <tbody class="body-table-custom">
        <!-- v-if="!loadingTable" -->
        <!--  -->
        <tr v-for="(item, idx) in content" :key="idx">
          <td class="col-number">{{ idx + 1 }}</td>
          <td>
            <div class="">
              <div v-for="(it, idx) in item.product_id" :key="idx">
                {{ it.name }} - {{ it.money }}
              </div>
            </div>
          </td>
          <td align="center">{{ item.quantily }}</td>
          <td align="center">{{ item.amount }}</td>
          <td align="center">{{ item.status }}</td>
          <td align="center">
            {{ item.created_at | formatDate("dd/mm/yyyy hh:MM") }}
          </td>
          <!-- <td class="col-action">
            <div class="action-table">
              <button class="btn-custom btn-edit" @click="handleEdit(item._id)">
                <a-icon type="edit" /> Sửa
              </button>
              <button class="btn-custom btn-del" @click="confirmDel(item._id)">
                <a-icon type="delete" /> Xóa
              </button>
            </div>
          </td> -->
        </tr>
        <!--  -->
      </tbody>
      <!--  -->
    </table>
    <!-- loading data -->
    <!-- <div class="no-data" v-if="loadingTable">
      <div class="text-loading"><a-icon type="loading" />Đang tải dữ liệu</div>
    </div> -->
    <!-- modal confirm -->
    <!-- <a-modal
      class="modal-warning"
      v-model="visible"
      title="Xoá bài viết"
      on-ok="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Huỷ </a-button>
        <a-button type="danger" :loading="loading" @click="handleOk">
          Xoá
        </a-button>
      </template>
      <p>Xác nhận xoá bài viết này ?</p>
    </a-modal> -->
  </div>
</template>

<script>
export default {
  props: {
    header: Array,
    content: Array,
    loadingTable: Boolean,
  },
  data() {
    return {
      headerTable: [],
      bodyTable: [],
      loading: false,
      visible: false,
      idBill: null,
      loadingData: true,
      nameProductTb: "",
    };
  },
  watch: {},
  methods: {
    handleEdit(event) {
      this.$router.push({
        path: "/bill/update/" + event,
      });
    },

    // confirmDel(event) {
    //   this.idBill = event;
    //   this.visible = true;
    // },

    // handleOk(e) {
    //   this.loading = true;
    //   setTimeout(() => {
    //     this.visible = false;
    //     this.loading = false;
    //     this.handleDel(this.idPost);
    //   }, 1500);
    // },
    // handleCancel(e) {
    //   this.visible = false;
    // },

    // async handleDel(event) {
    //   const url = process.env.API_SERVER;
    //   const response = await this.$axios.delete(
    //     url + "/api/post/delete/" + event
    //   );
    //   if (response.data && response.data.success == true) {
    //     this.$notify({
    //       type: "success",
    //       title: "Thành công !",
    //       text: response.data.message,
    //     });
    //     this.$emit("reloadTable", true);
    //   } else {
    //     this.$notify({
    //       type: "error",
    //       title: "Thất bại !",
    //       text: response.data.message,
    //     });
    //   }
    // },
  },
  //   computed: {
  //     getUserID() {
  //       return this.$route.query.user_id;
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
.table-admin-custom {
  width: 100%;
  .table-custom {
    width: 100%;
    .header-table-custom {
      width: 100%;
      th {
        padding: 20px 0;
      }
      th:last-child {
        text-align: center;
      }
    }
    .body-table-custom {
      width: 100%;
      tr {
        transition: all 0.3s ease;
        border-top: 1px solid #222a4233;
        td {
          padding: 15px 0;
        }
        td:last-child {
          padding: 5px 0;
          text-align: center;
        }
      }
      tr:hover {
        background: #fafafa;
      }
      //   tr:last-child {
      //     border-bottom: 1px solid #fff;
      //   }
    }
  }
}

//
.btn-custom {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background: #419ef9e0;
  transition: all 0.3s ease;
  outline: none;
  cursor: pointer;
  .anticon {
    margin-right: 5px;
  }
}
.btn-del {
  background: #ff0000e0 !important;
  margin-left: 5px;
}
.btn-del:hover {
  background: #ff0000 !important;
}

.btn-custom:hover {
  background: #419ef9;
}

.col-action {
  width: 100px;
}
.col-number {
  width: 30px;
  text-align: center;
}
</style>
