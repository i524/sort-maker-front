<template>
    <div>
        ホーム画面
        {{ userId }}
    </div>
</template>

<script>
export default {
    name: 'Home',
    computed: {
        userId(){
            this.$store.dispatch('doUpdate', 2);
            return this.$store.getters.userId;
        }
    }
}
</script>