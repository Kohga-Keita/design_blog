<template>
  <div>
    <breadcrumbs />
    <!-- 追記 -->
    <h1>{{ category.fields.name }}</h1>
    <div v-for="(post, i) in relatedPosts" :key="i">
      {{ post.fields.category.fields.name }},
      {{ post.fields.title }}
    </div>
    <!-- 追記終了-->
  </div>
</template>

<script>
export default {
  // 追記
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category);
    }
  },
  // 追記終了
  async asyncData({ payload, store, params, error }) {
    const category =
      payload ||
      (await store.state.categories.find(
        cat => cat.fields.slug === params.slug
      ));

    if (category) {
      return { category };
    } else {
      return error({ statusCode: 400 });
    }
  }
};
</script>