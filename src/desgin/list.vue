<template>
  <div class="card-box">
    <div>
      <div class="search-box">
        <el-form class="search-form" inline>
          <el-form-item label="模型名称">
            <el-input v-model="searchInfo.name" placeholder="请输入模型名称"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker show-time placeholder="请选择开始时间" v-model="searchInfo.startTime" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker show-time placeholder="请选择结束时间" v-model="searchInfo.endTime" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onSearch">查&nbsp;询</el-button>
            <el-button class="ml-8" size="small" @click="resetEvent">重&nbsp;置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="mb-16 font-16 title-wrap">
        <div>模型列表</div>
        <el-button type="primary" size="small" @click="create">创建模型</el-button>
      </div>
      <div class="table-content">
        <el-table :data="tableInfo.dataSource">
          <el-table-column label="模型名称" prop="name"> </el-table-column>
          <el-table-column label="创建时间" prop="createTime"> </el-table-column>
          <el-table-column label="操作" prop="action">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="提示"
          :visible.sync="deleteVisible"
          width="30%"
          custom-class="delete-dialog"
        >
          <div style="padding: 10px 20px">
            <span><i class="el-icon-warning" style="color: #faad14"></i> 确定删除这个模型吗？</span>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="deleteVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmDeleteCrowd">确 定</el-button>
          </span>
        </el-dialog>
        <el-pagination
          v-if="tableInfo.dataSource && tableInfo.dataSource.length > 0"
          style="margin-top: 20px"
          layout="total, prev, pager, next"
          background
          :total="total"
          :page-size="searchInfo.pageSize"
          :current-page="searchInfo.pageNum"
          @current-change="onPageChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getModelList, deleteModel } from "@/api";
export default {
  data() {
    return {
      searchInfo: {
        name: "",
        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10,
      },
      tableInfo: {
        dataSource: [
          {
            createTime: "2016-05-02",
            name: "模型一",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
        loading: false,
      },
      total: 0,
      deltetFocusId: "",
      deleteVisible: false,
    };
  },
  mounted() {
		// this.fetchData();
	},
  methods: {
    //  查询列表数据
    async fetchData() {
      try {
        this.tableInfo.loading = true;
        this.searchInfo.name = this.searchInfo.name?.trim();
        const { data } = await getModelList({
          ...this.searchInfo,
        });
        const { list = [], total } = data.content;
        this.tableInfo.dataSource = list;
        this.crowdTotal = total;
        this.tableInfo.loading = false;
      } catch (e) {
        this.tableInfo.dataSource = [];
        this.total = 0;
        this.tableInfo.loading = false;
      }
    },
    // 分页
    onPageChange(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.fetchData();
    },
    onSearch() {
      this.searchInfo.pageNum = 1;
      this.searchInfo.pageSize = 10;
      this.fetchData();
    },
    resetEvent() {
      (this.searchInfo = {
        name: "",
        startTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 10,
      }),
        (this.tableInfo.dataSource = []);
      this.fetchData();
    },
    create() {
      console.log("新建");
      this.$router.push({
        name: "desginEdit",
      });
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      this.deltetFocusId = row.id;
      this.deleteVisible = true;
    },
    async confirmDeleteCrowd() {
      try {
        await deleteModel({
          id: this.deltetFocusId,
        });
        this.fetchData();
      } catch (e) {
        console.log(e);
      } finally {
        this.deleteVisible = false;
      }
    },
  },
};
</script>

<style lang="scss">
.table-box {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
}

.card-box {
  padding: 20px;
  color: #1d2129;
  background: #fff;
  border-radius: 8px;
  transition: all 0.3s;
}

.search-box {
  display: flex;
  min-height: 52px;

  .el-form-item {
    margin-bottom: 20px;
    padding-right: 28px;

    .el-input {
      width: 180px;

      &.el-calendar-picker-input {
        width: 100%;
      }
    }

    &:last-child {
      padding-right: 0;
    }

    .el-select {
      min-width: 60px;
    }

    .active {
      padding-right: 0;
    }
  }

  .operate-right {
    position: absolute;
    right: 0;

    .el-button {
      text-align: right;
    }

    &.line-2 {
      top: 56px;
    }

    &.line-3 {
      top: 112px;
    }
  }
}
.btn-grey {
  display: inline-block;
  height: 32px;
  margin-right: 8px;
  padding: 4px 15px;
  color: #545e6c;
  line-height: 1.5715;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  cursor: pointer;
  user-select: none;
}

.btn-grey {
  &:hover {
    background: #e5e6eb;
  }
}
.ml-8 {
  margin-left: 8px;
}
.mb-16 {
  margin-bottom: 16px;
}
.mt-16 {
  margin-top: 16px;
}
.font-16 {
  font-size: 16px;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
}

.el-pagination {
  text-align: right;
  padding: 0;
}
</style>
