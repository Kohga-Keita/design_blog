import defaultEyeCatch from '~/assets/images/defaultEyeCatch.png'
import client from '~/plugins/contentful'

export const state = () => ({
    posts: [],
    categories: []
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
    linkTo: () => (name, obj) => {
        return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
    },
    relatedPosts: state => (category) => {
        const posts = []
        for (let i = 0; i < state.posts.length; i++) {
            const catId = state.posts[i].fields.category.sys.id
            if (category.sys.id === catId) posts.push(state.posts[i])
        }
        return posts
    }
}

export const mutations = {
    setPosts(state, payload) {
        state.posts = payload
    },
    setCategories(state, payload) {
        state.categories = payload
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
    },
    async getCategories({ commit }) {
        await client.getEntries({
            content_type: 'category',
            order: 'fields.sort'
        }).then(res =>
            commit('setCategories', res.items)
        ).catch(console.error)
    }

}
