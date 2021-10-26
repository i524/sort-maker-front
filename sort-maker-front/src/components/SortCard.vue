<template>
    <VCard
        :class="className + ' text-left'"
        :width="240"
        :height="450"
        @click="clickCard"
    >
        <VImg :src="src">
            <VBtn @click="clickIcon" color="warning" icon>
                <VIcon>{{ icon }}</VIcon>
            </VBtn>
        </VImg>
        <VCardTitle>{{ cardTitle }}</VCardTitle>
        <VCardText>{{ cardText }}</VCardText>
    </VCard>
</template>

<script>
import { mapGetters } from 'vuex'
import { showAlert } from '../common_functions/common'
import {
    deleteLike,
    searchLike,
    registerLike,
} from '../common_functions/request'

export default {
    computed: {
        ...mapGetters(['uid']),
    },
    data() {
        return {
            icon: 'fas fa-heart',
        }
    },
    methods: {
        clickCard() {
            this.$emit('clickCard')
        },
        clickIcon: async function () {
            if (this.icon === 'fas fa-heart') {
                // お気に入り削除をする
                const postData = {
                    user_id: this.uid,
                    sort_id: this.id,
                }

                const res = await deleteLike(postData)

                if (!res) {
                    showAlert('お気に入り削除に失敗しました')
                    return
                }

                this.icon = 'far fa-heart'
            } else {
                // お気に入り登録する
                const postData = {
                    user_id: this.uid,
                    sort_id: this.id,
                }

                const res = await registerLike(postData)

                if (!res) {
                    showAlert('お気に入り登録に失敗しました')
                    return
                }

                this.icon = 'fas fa-heart'
            }
        },
    },
    async mounted() {
        // お気に入りを検索する
        const postData = {
            user_id: this.uid,
            sort_id: this.id,
        }

        const res = await searchLike(postData)

        if (!res) {
            showAlert('お気に入りの表示に失敗しました')
            return
        }

        // お気に入りが登録されていたらfas fa-heartを、登録されていなかったらfar fa-heartを表示する
        if (res['delete_flg']) {
            this.icon = 'far fa-heart'
        } else {
            this.icon = 'fas fa-heart'
        }
    },
    name: 'SortCard',
    props: {
        cardTitle: {
            required: true,
        },
        cardText: {
            required: true,
        },
        className: {
            required: false,
        },
        id: {
            required: true,
        },
        src: {
            default: require('../assets/no_image.png'),
            required: false,
        },
    },
}
</script>
