<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBreads" />
    <!-- 追記 -->
    {{ currentPost.fields.title }}
    <v-img
      :src="setEyeCatch(currentPost).url"
      :alt="setEyeCatch(currentPost).title"
      :aspect-ratio="16/9"
      width="700"
      height="400"
      class="mx-auto"
    />
    {{ currentPost.fields.publishDate }}
    <br />

    {{ currentPost.fields.body }}
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["setEyeCatch", "linkTo"]), // 追記
    // 追記
    addBreads() {
      return [
        {
          icon: "mdi-folder-outline",
          text: this.category.fields.name,
          to: this.linkTo("categories", this.category)
        }
      ];
    }
    // 追記終了
  },
  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find(post => post.fields.slug === params.slug));

    if (currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category // 追記
      };
    } else {
      return error({ statusCode: 400 });
    }
  }
};
</script>