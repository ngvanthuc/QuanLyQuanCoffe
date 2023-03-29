<template>
  <div class="layout-book-custom">
    <!-- loading data -->
    <div class="no-data" v-if="loadingTable">
      <div class="text-loading"><a-icon type="loading" />Đang tải dữ liệu</div>
    </div>
    <!--  -->
    <div class="list-book-custom" v-else>
      <a-row :gutter="[20, 20]">
        <a-col :span="4" v-for="(item, idx) in contentBook" :key="idx">
          <div
            class="book-items-custom"
            :class="{ 'active-order': item.status_book == 1 }"
          >
            <div
              class=""
              v-if="item.status_book == 0"
              @click="handleCreate(item._id)"
            >
              <div class="thumbnail-book">
                <img
                  class="thumbnail-img-book"
                  src="/images/ban-cafe-resize.jpg"
                  alt=""
                />
              </div>
              <div class="body-book-item">
                <div class="title-body-book">
                  <h3 class="text-title-book">{{ item.name_book }}</h3>
                </div>
                <div class="status-body-book">
                  <p
                    class="status-book"
                    :class="{ 'active-booking': item.status_book == 1 }"
                  >
                    {{ getStatus(item.status_book) }}
                  </p>
                </div>
              </div>
            </div>
            <!--  -->
            <div
              class="active-order-inner"
              v-else
              @click="showModalDetail(item.id_order)"
            >
              <div class="thumbnail-book">
                <img
                  class="thumbnail-img-book"
                  src="/images/ban-cafe-resize.jpg"
                  alt=""
                />
              </div>
              <div class="body-book-item">
                <div class="title-body-book">
                  <h3 class="text-title-book">{{ item.name_book }}</h3>
                </div>
                <div class="status-body-book">
                  <p
                    class="status-book"
                    :class="{ 'active-booking': item.status_book == 1 }"
                  >
                    {{ getStatus(item.status_book) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
    <!--  -->
    <a-modal
      v-model="orderTableDetail"
      :title="dataOrder.name_order"
      on-ok="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel"> Đóng </a-button>
        <a-button type="primary" :loading="loading" @click="handleOk">
          Chuyển bàn
        </a-button>
        <a-button type="primary" :loading="loading" @click="handleDone">
          Đã thanh toán
        </a-button>
      </template>
      <div class="list-prod-order">
        <table class="table-order-custom">
          <thead>
            <th class="col-unit-number">STT</th>
            <th>Tên sản phẩm</th>
            <th class="col-quant-number">Số lượng</th>
            <th class="col-price-number">Thành tiền</th>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in dataOrder.prod_id_list" :key="idx">
              <td class="col-unit-number">{{ idx + 1 }}</td>
              <td>{{ item.id_prod.name_prod }}</td>
              <td class="col-quant-number">{{ item.quantity_prod }}</td>
              <td class="col-price-number">
                {{ getPrice(item.quantity_prod, item.id_prod.price_prod) }}
              </td>
            </tr>
            <tr class="total-price">
              <td colspan="2"></td>
              <td class="total-price-text">Tổng tiền:</td>
              <td class="total-price-number">{{ dataOrder.price_order }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-modal>
    <a-modal v-model="visible" title="Chuyển bàn" @ok="handleSwitch">
      <div class="switch-table">
        <p class="title-switch">Chuyển bàn:</p>
        <div class="row-content-switch">
          <div class="label-switch">Từ bàn:</div>
          <div class="content-switch">{{ dataOrder.name_order }}</div>
        </div>
        <div class="row-content-switch">
          <div class="label-switch">Đến bàn:</div>
          <div class="content-switch">
            <select class="select-switch" v-model="valueSelect">
              <option
                v-for="(item, idx) in listBookActive"
                :key="idx"
                :value="item._id"
              >
                {{ item.name_book }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingTable: true,
      contentBook: [],
      visible: false,
      loading: false,
      orderTableDetail: false,
      dataOrder: {},
      listBookActive: [],
      valueSelect: "",
    };
  },
  mounted() {
    this.fetchListBook();
    this.fetchListBookActive();
  },
  methods: {
    showModalDetail(idBook) {
      this.orderTableDetail = true;
      this.fetchOrder(idBook);
    },
    handleOk(e) {
      this.visible = true;
      this.fetchListBookActive();
    },
    handleCancel(e) {
      this.orderTableDetail = false;
    },

    handleDone() {
      const url = process.env.API_SERVER;
      this.$axios
        .post(url + "/order/update-order/update/" + this.dataOrder._id, {
          status_order: 4,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.updateQuantityProd(this.dataOrder.prod_id_list);
            this.$notify({
              type: "success",
              title: "Thành công !",
              text: "Xác nhận thanh toán thành công",
            });
            this.orderTableDetail = false;
            setTimeout(() => {
              this.fetchListBook();
            }, 500);
          }
        });
    },

    updateQuantityProd(prods) {
      prods.forEach((item) => {
        const url = process.env.API_SERVER;
        this.$axios
          .post(url + "/prod/product-update/quantity/" + item.id_prod._id, {
            quantity_prod: item.quantity_prod,
          })
          .then((res) => {
            if (res && res.data.success == true) {
              this.$notify({
                type: "success",
                title: "Thành công !",
                text: res.data.message,
              });
            } else {
              this.$notify({
                type: "error",
                title: "Thất bại !",
                text: "Lỗi khi cập nhật số lượng sản phẩm !",
              });
            }
          });
      });
    },

    handleSwitch(e) {
      const url = process.env.API_SERVER;
      this.$axios
        .post(url + "/order/switch-order", {
          old_id: this.dataOrder.book_id,
          new_id: this.valueSelect,
          order_id: this.dataOrder._id,
        })
        .then((res) => {
          if (res.data.success == true) {
            this.$notify({
              type: "success",
              title: "Thành công !",
              text: "Chuyển bàn thành công",
            });
            this.visible = false;
            this.orderTableDetail = false;
            setTimeout(() => {
              this.fetchListBook();
            }, 500);
          }
        });
    },

    getPrice(quantity, price) {
      return Number(quantity) * Number(price);
    },

    fetchListBookActive() {
      const url = process.env.API_SERVER;
      this.$axios.get(url + "/book/list-booking-active").then((res) => {
        this.listBookActive = res.data.data;
      });
    },
    // /list-booking-active
    async fetchListBook() {
      this.loadingTable = true;
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(url + "/book/list-booking");
      if (response.data && response.data.success == true) {
        this.contentBook = response.data.data;
        setTimeout(() => {
          this.loadingTable = false;
        }, 1500);
      }
    },

    fetchOrder(id) {
      const url = process.env.API_SERVER;
      this.$axios.get(url + "/order/get-order/" + id).then((res) => {
        this.dataOrder = res.data.data;
      });
    },

    handleCreate(idBook) {
      this.$router.push({
        path: "/admin/order/create/" + idBook,
      });
    },

    reloadFetchData(event) {
      if (event == true) {
        this.fetchCategory();
      }
    },

    getStatus(val) {
      if (val == 0) {
        return "Bàn trống";
      } else {
        return "Đã có khách";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.layout-book-custom {
  width: 100%;
}
.book-items-custom {
  width: 100%;
  padding: 8px;
  border: 2px solid #0000004d;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 1px 15px 0 rgba(123, 123, 123, 0.3);
  cursor: pointer;
  .thumbnail-book {
    width: 100%;
    margin-bottom: 10px;
    .thumbnail-img-book {
      width: 100%;
    }
  }
  .body-book-item {
    text-align: center;
    .title-body-book {
      width: 100%;
      margin-bottom: 8px;
      .text-title-book {
        font-size: 18px;
        margin-bottom: 0;
      }
    }
    .status-body-book {
      width: 100%;
      .status-book {
        color: green;
        font-size: 16px;
        margin-bottom: 0;
      }
    }
  }
}
</style>
