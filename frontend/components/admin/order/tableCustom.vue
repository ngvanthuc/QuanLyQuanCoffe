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
        <th class="col-action">Thao tác</th>
      </thead>
      <!--  -->
      <tbody class="body-table-custom" v-if="!loadingData">
        <!--  -->
        <tr v-for="(item, idx) in content" :key="idx">
          <td class="col-number">{{ idx + 1 }}</td>
          <td>
            <div class="product-detail-thumbnail">
              <div class="name-prod">
                <p class="text-name-prod">
                  {{ item.book_id.name_book }}
                </p>
              </div>
            </div>
          </td>
          <td>{{ item.quantity_order }}</td>
          <td>{{ item.price_order }}</td>
          <td :class="statusOrder(item.status_order)">
            {{ getStatus(item.status_order) }}
          </td>
          <td class="time-create-prod">
            {{ getTime(item.created_at) }}
          </td>
          <td class="col-action">
            <div class="action-table">
              <button class="btn-custom btn-edit" @click="handleEdit(item._id)">
                <a-icon type="edit" /> Sửa
              </button>
            </div>
          </td>
        </tr>
        <!--  -->
      </tbody>
      <!--  -->
    </table>
    <!-- loading data -->
    <div class="no-data" v-if="loadingData">
      <div class="text-loading"><a-icon type="loading" />Đang tải dữ liệu</div>
    </div>
    <!-- modal confirm -->
    <a-modal
      class="modal-warning"
      v-model="visible"
      title="Chỉnh sửa trạng thái đơn hàng"
      @cancel="handleCancel"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Huỷ </a-button>
        <a-button type="primary" :loading="loading" @click="handleOk">
          Lưu
        </a-button>
      </template>
      <div class="row-content-switch">
        <div class="label-switch">Thay đổi trạng thái:</div>
        <div class="content-switch">
          <select class="select-switch" v-model="valueSelect">
            <option
              v-for="(item, idx) in listStatus"
              :key="idx"
              :value="item._id"
            >
              {{ item.name_status }}
            </option>
          </select>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    header: Array,
    content: Array,
    loadingTable: Boolean,
  },
  computed: {},
  data() {
    return {
      headerTable: [],
      bodyTable: [],
      loading: false,
      visible: false,
      idProduct: null,
      loadingData: true,
      idOrder: "",
      valueSelect: "",
      listStatus: [
        {
          _id: 1,
          name_status: "Mới",
        },
        {
          _id: 2,
          name_status: "Đang xử lý",
        },
        {
          _id: 3,
          name_status: "Hoàn thành",
        },
        {
          _id: 4,
          name_status: "Đã thanh toán",
        },
        {
          _id: 5,
          name_status: "Đã hủy",
        },
      ],
    };
  },
  watch: {
    loadingTable(event) {
      this.loadingData = event;
    },
  },
  methods: {
    handleEdit(event) {
      this.visible = true;
      this.idOrder = event;
    },
    handleCancel() {
      this.visible = false;
    },
    async handleOk() {
      const url = process.env.API_SERVER;
      await this.$axios
        .post(url + "/order/update-order/update/" + this.idOrder, {
          status_order: this.valueSelect,
        })
        .then((res) => {
          if (res) {
            this.$notify({
              type: "success",
              title: "Thành công !",
              text: "Cập nhật trạng thái đơn hàng thành công!",
            });
            setTimeout(() => {
              this.visible = false;
              this.idOrder = "";
              this.valueSelect = "";
              this.$emit("reloadTable", true);
            }, 1500);
          } else {
            this.$notify({
              type: "error",
              title: "Không thành công !",
              text: res.message,
            });
          }
        })
        .catch((err) => {
          this.$notify({
            type: "error",
            title: "Không thành công !",
            text: err,
          });
        });
    },
    getTime(time) {
      let getTime = this.moment(time).format("DD/MM/YYYY");
      return getTime;
    },
    statusOrder(value) {
      if (value == 1) {
        return "status-new";
      }
      if (value == 2) {
        return "status-process";
      }
      if (value == 3) {
        return "status-success";
      }
      if (value == 4) {
        return "status-active";
      }
      return "status-prod";
    },
    getStatus(val) {
      if (val == 1) {
        return "Mới";
      }
      if (val == 2) {
        return "Đăng xử lý";
      }
      if (val == 3) {
        return "Hoàn thành";
      }
      if (val == 4) {
        return "Đã thanh toán";
      }
      if (val == 5) {
        return "Đã hủy";
      }
    },
  },
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
