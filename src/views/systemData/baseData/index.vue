<template>
  <div class="container">
    <div class="search-wrapper">
      <el-row>
        <el-col style="flex: 1">
          <el-form :model="formModel" label-width="80px" label-position="left">
            <el-row :gutter="16">
              <el-col :span="8">
                <el-form-item label="集合编号">
                  <el-input
                    v-model="formModel.number"
                    placeholder="请输入集合编号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="集合名称">
                  <el-input
                    v-model="formModel.name"
                    placeholder="请输入集合名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="内容裁剪">
                  <el-select
                    v-model="formModel.contentType"
                    placeholder="全部"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in contentTypeOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态">
                  <el-select
                    v-model="formModel.status"
                    placeholder="全部"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="创建时间">
                  <el-date-picker
                    v-model="formModel.createdTime"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
        <el-divider style="height: 82px" direction="vertical" />
        <el-col style="text-align: right; flex: 0 0 80px">
          <el-space direction="vertical" :size="18">
            <el-button type="primary" :icon="Search" @click="search(1)">
              查找
            </el-button>
            <el-button :icon="RefreshRight" @click="reset">重置</el-button>
          </el-space>
        </el-col>
      </el-row>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe>
      <el-table-column label="#" width="50">
        <template #default="{ $index }">
          {{ $index + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="260">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createdTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="集合编号" />
      <el-table-column prop="name" label="集合名称" />
      <el-table-column
        prop="contentType"
        label="内容体裁"
        show-overflow-tooltip
      >
        <template #default="scope">
          {{ valueToLabel(contentTypeOptions, scope.row.contentType) }}
        </template>
      </el-table-column>
      <el-table-column prop="filterType" label="筛选方式" />
      <el-table-column prop="count" label="内容量" />
      <el-table-column prop="status" label="状态" />
      <el-table-column fixed="right" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pagination.current"
      v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      background
      page-classifier="页"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Search, RefreshRight } from '@element-plus/icons-vue'
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/systemData'
  import useLoading from '@/hooks/loading'
  import { Options, Pagination } from '@/types/global'
  import { computed, reactive, ref } from 'vue'
  import { valueToLabel } from '@/utils'

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      filterType: '',
      createdTime: [],
      status: ''
    }
  }
  const { loading, setLoading } = useLoading(true)
  const tableData = ref<PolicyRecord[]>([])
  const formModel = ref(generateFormModel())
  const pagination: Pagination = reactive({
    current: 1,
    pageSize: 10
  })
  const contentTypeOptions = computed<Options[]>(() => [
    {
      label: '图文',
      value: 'img'
    },
    {
      label: '横版短视频',
      value: 'horizontalVideo'
    },
    {
      label: '竖版小视频',
      value: 'verticalVideo'
    }
  ])
  const statusOptions = computed<Options[]>(() => [
    {
      label: '已上线',
      value: 'online'
    },
    {
      label: '已下线',
      value: 'offline'
    }
  ])
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 10 }
  ) => {
    setLoading(true)
    try {
      const { data } = await queryPolicyList(params)
      tableData.value = data.list
      pagination.total = data.total
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const search = (current?: number) => {
    if (current) {
      pagination.current = current
    }
    fetchData({
      ...pagination,
      ...formModel.value
    } as unknown as PolicyParams)
  }

  const handleCurrentChange = (current: number) => {
    pagination.current = current
    search()
  }

  const handleSizeChange = (pageSize: number) => {
    pagination.pageSize = pageSize
    search()
  }

  fetchData()

  const reset = () => {
    formModel.value = generateFormModel()
  }

  const handleEdit = (index: number, row: PolicyRecord) => {
    console.log(index, row)
  }
  const handleDelete = (index: number, row: PolicyRecord) => {
    console.log(index, row)
  }
</script>

<script lang="ts">
  export default {
    // 要写name才能缓存路由
    name: 'BaseData'
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .el-table {
    width: 100%;
    height: 346px;
  }
</style>
