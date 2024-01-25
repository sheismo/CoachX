<template>
    <div>
        <base-modal :show="!!error" title="An Error Occurred" @close="handleError">
            <p>{{ error }}</p>
        </base-modal>
        <section>
            <base-card>
                <header>
                    <h2>Requests Received</h2>
                </header>
                <base-spinner v-if="isLoading"></base-spinner>
                <ul v-else-if="hasRequests && !isLoading">
                    <request 
                    v-for="request in requests"
                    :key="request.id"
                    :email="request.userEmail"
                    :message="request.userMessage"
                    >
                    </request>
                </ul>
                <h3 v-else>You haven't received any requests yet.</h3>
            </base-card>
        </section>
    </div>
</template>

<script>
import Request from '../../components/requests/Request.vue';

export default {
    components: {
        Request
    },
    data() {
        return {
            isLoading: false,
            error: null
        }
    },
    computed: {
        requests() {
            return this.$store.getters['requests/requests'];
        },
        hasRequests() {
            return this.$store.getters['requests/hasRequests'];
        }
    },
    created() {
        this.loadRequests();
    },
    methods: {
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.$store.dispatch('requests/loadRequests');
            }catch(error) {
                this.error = error.message || 'Something went wrong';
            }
            this.isLoading = false;
        },
        handleError() {
            this.error = null;
        }
    },
}
</script>

<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>