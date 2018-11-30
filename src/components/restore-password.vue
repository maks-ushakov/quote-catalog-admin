<template>
    <section>
        <form action="" @submit.prevent="submit()">
        <input placeholder="new password">
        <input placeholder="confirm new password">
        <button type="submit">Submit</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            token: this.$route.params.token
        }
    },
    methods: {
        submit(){
            console.log("Submit")
        }
    },
    created() {
        // here we will check if token exists or not ?
    }
}
</script>

<style scoped>

</style>
