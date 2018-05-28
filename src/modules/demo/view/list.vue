<!-- 这部分是组件的UI-->
<template>
  <div>
    <div>
      <Button>新增</Button>
      <Button>刷新</Button>
    </div>
    <div>
      <Table 
        :columns="columns" 
        :data="data"/>
    </div>
    <Modal 
      v-model="showForm" 
      @on-cancel="onCancel">
      <list-detail :model="selectItem"/>
    </Modal>
  </div>
</template>

<!-- 这部分是组件的UE-->
<script>



export default {
  components: {
    ListDetail: () => import('./list-detail.vue')
  },
  data () {
    return {
      showForm: false,
      selectItem: {},
      columns: [
        { title: '姓名', key: 'name' },
        { title: '邮箱', key: 'email' },
        { title: '年龄', key: 'age' },
        {
          title: '操作',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ]
    };
  },
  computed: {
    data () {
      return this.$store.state.demo.users;
    }
  },
  mounted () {
    this.$store.dispatch('demo/loadData');
  },
  methods: {
    onCancel () {
      this.$snapshot('restore', 'selectItem');
    },
    show (user) {
      this.showForm = true;
      this.selectItem = user;
      this.$snapshot('set', 'selectItem');
    },
    remove (id) {
      this.$store.dispatch('demo/deleteData', id);
      this.$store.dispatch('demo/loadData');
    }
  },
};
</script>



