<template>
  <div>
    <Row
      v-if="children"
      :gutter="20">
      <Col
        v-for="(route, index) in children"
        :span="4"
        :key="index">
      <Card>
        <div class="text">
          <p>
            {{ route.name }}
          </p>
          <router-link :to="{ name: route.name }">
            查看
          </router-link>
        </div>
      </Card>
      </Col>
    </Row>
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      children: null
    };
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      const children = vm.$route.meta.children;
      if (children) {
        vm.children = children;
      } else {
        vm.children = null;
      }
    });
  },
  watch: {
    $route () {
      const children = this.$route.meta.children;
      if (children) {
        this.children = children;
      } else {
        this.children = null;
      }
    }
  }
};
</script>
