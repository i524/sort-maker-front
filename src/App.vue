<template>
    <VApp>
        <Header />
        <VMain>
            <RouterView />
        </VMain>
    </VApp>
</template>

<script>
import { Header } from './components';

export default {
  name: 'App',
  components: {
      Header
  }
};
</script>
