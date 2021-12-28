<template>
    <VDataTable
        :headers="headers"
        :items="items"
        :disable-sort="true"
        :hide-default-footer="true"
    />
</template>

<script>
export default {
    name: 'CustomDataTable',
    props: {
        headers: {
            required: true,
        },
        items: {
            required: true,
        },
    },
}
</script>
