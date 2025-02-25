<template>
  <div class="card-box">
    <div>
      <div class="search-box">
        <el-form-item label="关键字">
          <el-input v-model="searchInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="开始">
          <el-date-picker show-time placeholder="请选择日期" v-model="searchInfo.startTime" />
        </el-form-item>
        <el-form-item label="结束">
          <el-date-picker show-time placeholder="请选择日期" v-model="searchInfo.endTime" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <span class="btn-grey ml-8" @click="resetEvent">重置</span>
        </el-form-item>
      </div>
      <div class="mb-16 mt-16 font-16">模型列表</div>
      <div class="table-content">
        <el-table
        :data="tableInfo.dataSource"
        >
          <el-table-column label="模型名称" prop="name"> </el-table-column>
          <el-table-column label="创建时间" prop="createTime"> </el-table-column>
          <el-table-column align="right">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: {
        name: "",
        startTime: "",
        endTime: "",
      },
      tableInfo: {
        dataSource: [],
        loading: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
