<template>
  <adminLayout>
    <div class="card-container">
      <div class="title-card">
        <h3 class="text-title">
          {{ infoBook.name_book }}
          <span class="note-booking">( {{ infoBook.note_book }} )</span>
        </h3>
        <button class="btn-create" @click="showModal">
          <a-icon type="plus" /> Chọn sản phẩm
        </button>
      </div>
      <!--  -->
      <inputBook
        :showModal="visible"
        @showOff="showOffModal"
        @getValue="valueInput"
      />
      <!--  -->
      <div class="table-admin-custom">
        <table class="table-custom">
          <!--  -->
          <thead class="header-table-custom">
            <th class="col-number">STT</th>
            <th
              v-for="(header, idx) in headerTable"
              :key="idx"
              :style="
                'width:' + header.width + ';' + 'text-align:' + header.align
              "
            >
              {{ header.name }}
            </th>
            <!-- <th class="col-action">Thao tác</th> -->
          </thead>
          <!--  -->
          <tbody class="body-table-custom" v-show="!loadingTable">
            <!--  -->
            <tr v-for="(item, idx) in contentTable" :key="idx">
              <td class="col-number">{{ idx + 1 }}</td>
              <td>{{ item.name_prod }}</td>
              <td>{{ item.quantity_prod }}</td>
              <td style="text-align: left">
                {{ getPriceProd(item.quantity_prod, item.price_prod) }}
              </td>
            </tr>
            <!--  -->
          </tbody>
          <!--  -->
        </table>
        <div class="no-data" v-if="contentTable.length == 0">
          <div class="text-loading">Không có dữ liệu</div>
        </div>
        <!-- loading data -->
        <div class="no-data" v-show="loadingTable">
          <div class="text-loading">
            <a-icon type="loading" />Đang tải dữ liệu
          </div>
        </div>
        <div class="pay-order" v-if="price_order != 0">
          <p class="text-price-pay">
            Tổng tiền thanh toán:
            <span class="number-price">{{ price_order }}</span> vnđ
          </p>
        </div>
      </div>
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
import inputBook from "~/components/admin/order/create/inputOrder.vue";
import adminLayout from "~/layouts/indexAdmin.vue";

export default {
  components: {
    adminLayout,
    inputBook,
  },
  data() {
    return {
      bookID: "",
      loadingSave: false,
      visible: false,
      infoBook: {},
      headerTable: [
        {
          name: "Tên sản phẩm",
          width: "200px",
          align: "left",
        },
        {
          name: "Số lượng",
          width: "200px",
          align: "left",
        },
        {
          name: "Giá",
          width: "200px",
          align: "left",
        },
      ],
      contentTable: [],
      dataOrder: {
        name_book: "",
        note_book: "",
      },
      quantity_order: 0,
      price_order: 0,
      loadingTable: false,
      infoProd: {},
      listProd: [],
    };
  },
  mounted() {
    this.getIdBook();
    this.fetchBooking();
  },
  methods: {
    getIdBook() {
      this.bookID = this.$route.params.id;
    },

    showModal() {
      this.visible = true;
    },

    showOffModal() {
      this.visible = false;
    },

    async fetchBooking() {
      const url = process.env.API_SERVER;
      const response = await this.$axios.get(
        url + "/book/get-booking/" + this.bookID
      );
      if (response.data && response.data.success == true) {
        this.infoBook = response.data.data;
      }
    },

    handleBack() {
      this.$router.push({
        path: "/admin/order",
      });
    },

    valueInput(value) {
      this.contentTable.push(value);
      this.infoProd = {
        id_prod: value.id_prod,
        quantity_prod: value.quantity_prod,
      };
      this.listProd.push(this.infoProd);
      this.quantity_order = this.quantity_order + Number(value.quantity_prod);
      this.price_order =
        this.price_order +
        Number(value.price_prod) * Number(value.quantity_prod);
      // this.dataOrder.name_book = value.name_book;
      // this.dataOrder.note_book = value.note_book;
    },

    getPriceProd(quantity, price) {
      return Number(quantity) * Number(price);
    },

    beforSave() {
      return true;
    },

    async handleSave() {
      let check = await this.beforSave();
      if (check) {
        this.loadingSave = true;
        const url = process.env.API_SERVER;
        const response = await this.$axios.post(
          url + "/order/create-order/create",
          {
            name_order: this.infoBook.name_book,
            quantity_order: this.quantity_order,
            price_order: this.price_order,
            prod_id_list: this.listProd,
            book_id: this.bookID,
          }
        );
        if (response.data && response.data.success == true) {
          const urlRes = process.env.API_SERVER;
          this.$axios
            .post(urlRes + "/book/update-booking/update/" + this.bookID, {
              status_book: 1,
            })
            .then((res) => {
              if (res.data.success == true) {
                this.$notify({
                  type: "success",
                  title: "Thành công !",
                  text: "Đặt đồ thành công ",
                });
                setTimeout(() => {
                  this.$router.push({
                    path: "/admin/order",
                  });
                }, 1500);
              } else {
                this.$notify({
                  type: "error",
                  title: "Thất bại !",
                  text: response.data.message,
                });
              }
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
    .note-booking {
      font-weight: normal;
      font-size: 16px;
    }
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

.pay-order {
  width: 100%;
  text-align: right;
  padding: 20px 0 5px;
  .text-price-pay {
    margin-bottom: 0;
    font-size: 18px;
    font-weight: 500;
    .number-price {
      font-size: 21px;
      font-weight: bold;
    }
  }
}
</style>