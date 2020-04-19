import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'
import client from '~/plugins/contentful'

export const state = () => ({
    posts: []
})

export const getters = {
    setEyeCatch: () => (post) => {
        if (!!post.fields.image && !!post.fields.image.fields) return {
            url: `https:${post.fields.image.fields.file.url}`,
            title: post.fields.image.fields.title
        }
        else return { url: defaultEyeCatch, title: 'defaultImage' }
    },
    draftChip: () => (post) => {
        if (!post.fields.publishDate) return 'draftChip'
    },
    linkTo: () => (obj) => {
        return { name: 'posts-slug', params: { slug: obj.fields.slug } }
    }
}

export const mutations = {
    setPosts(state, payload) {
        state.posts = payload
    }

}

export const actions = {
    async getPosts({ commit }) {
        await client.getEntries({
            content_type: process.env.CTF_BLOG_POST_TYPE_ID,
            order: '-fields.publishDate' // desc
        }).then(res =>
            commit('setPosts', res.items)
        ).catch(console.error)
    }

}
