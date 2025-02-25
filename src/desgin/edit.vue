<template>
      <el-container class="edit-wrap">
        <el-main>
          <FlowChart></FlowChart>
        </el-main>
      </el-container>
</template>

<script>
import FlowChart from "../FlowChart.vue";

export default {
  components: { FlowChart },
};
</script>

<style lang="scss">
.edit-wrap {
  .el-main {
  padding: 0;
}
}
</style>
