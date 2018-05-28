<template>
  <div>
    <Form :model="model">
      <FormItem label="姓名">
        <i-input
          v-model="model.name"
          placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="年龄">
        <i-input
          v-model="model.age"
          placeholder="请选择年龄"/>
      </FormItem>
      <FormItem label="邮箱">
        <i-input
          v-model="model.email"
          placeholder="请输入邮箱"/>
      </FormItem>
      <FormItem>
        <!-- <Button type="primary">保存</Button> -->
        <!-- <Button 
          type="ghost" 
          style="margin-left: 8px" 
          @click="onCancel">取消</Button>
          <Button type="primary" @click="set">保存快照</Button>
          <Button type="primary" @click="restore">提取快照</Button>
          <Button type="primary" @click="clear">清除快照</Button> -->
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      
    }
  },
  created () {
  },
  methods: {
    
  },
}
</script>
