<template>
  <v-container fluid>
    <template v-if="currentPost">
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
    </template>

    <template v-else>お探しの記事は見つかりませんでした。</template>

    <div>
      <v-btn outlined color="primary" to="/">
        <v-icon size="16">fas fa-angle-double-left</v-icon>
        <span class="ml-1">ホームへ戻る</span>
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["setEyeCatch"])
  },

  async asyncData({ payload, store, params, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find(post => post.fields.slug === params.slug));

    if (currentPost) {
      return { currentPost };
    } else {
      return error({ statusCode: 400 });
    }
  }
};
</script>