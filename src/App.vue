<template>
    <VApp>
        <Header />
        <RouterView />
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
