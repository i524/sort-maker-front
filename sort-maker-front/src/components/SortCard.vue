<template>
    <div :class="className + ' v-card-wrapper'">
        <VCard :width="225" :height="450" @click="clickCard">
            <VImg :src="src" />
            <VCardTitle class="text-left">{{ cardTitle }}</VCardTitle>
            <VCardText class="text-left">{{ cardText }}</VCardText>
        </VCard>
        <VBtn @click="clickIcon" color="warning" icon class="v-btn">
            <VIcon>{{ icon }}</VIcon>
        </VBtn>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { transitionPage, showAlert } from '../common_functions/common'
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
            icon: 'far fa-heart',
        }
    },
    methods: {
        clickCard() {
            this.$emit('clickCard')
        },
        clickIcon: async function () {
            // もしユーザーがログインしてなかったらログインページに遷移する
            if (!this.uid) {
                transitionPage(this, 'login')
                return
            }

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
        // もしユーザーがログインしてなかったらお気に入りを検索しない
        if (!this.uid) return

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

<style scoped>
.v-card-wrapper {
    position: relative;
    width: 225px;
    height: 450px;
}

.v-btn {
    position: absolute;
    top: 5px;
    left: 5px;
}
</style>
