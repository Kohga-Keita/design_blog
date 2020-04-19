<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10" xl="8">
        <v-row v-if="posts.length">
          <v-col v-for="(post, i) in posts" :key="i" cols="12" sm="6" lg="4" xl="3">
            <v-card max-width="400" class="mx-auto">
              <v-img
                :src="setEyeCatch(post).url"
                :alt="setEyeCatch(post).title"
                :aspect-ratio="16/9"
                max-height="200"
                class="white--text"
              >
                <v-card-title class="align-end fill-height font-weight-bold">{{ post.fields.title }}</v-card-title>
              </v-img>

              <v-card-text>
                {{ post.fields.publishDate }}
                <span :is="draftChip(post)" />
              </v-card-text>

              <v-list-item three-line style="min-height: unset;">
                <v-list-item-subtitle>{{ post.fields.body }}</v-list-item-subtitle>
              </v-list-item>

              <v-card-actions>
                <v-spacer />
                <v-btn text color="primary" :to="linkTo(post)">この記事をみる</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <div v-else class="text-center">投稿された記事はありません。</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import client from "~/plugins/contentful";
import draftChip from "~/components/posts/draftChip";

import { mapState, mapGetters } from "vuex";

export default {
  components: {
    followBtns,
    draftChip
  },
  computed: {
    ...mapState(["posts"]),
    ...mapGetters(["setEyeCatch", "draftChip", "linkTo"])
  }
};
</script>