<template>
    <VDialog v-model="dialog" width="500">
        <template v-slot:activator="{ on, attrs }">
            <slot name="activator" />
        </template>

        <VCard>
            <slot name="content" />
        </VCard>
    </VDialog>
</template>

<script>
export default {
    props: {},
}
</script>
