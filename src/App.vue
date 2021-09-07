<template>
    <VApp class="v-app">
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

<style scope>
.v-app{
    font-size: 16px;
    color: #444;
    font-family: "游ゴシック","ヒラギノ角ゴシック",sans-serif;
}

h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding: 0;
}

h1{
    font-size: 20px;
}

h2{
    font-size: 18px;
}

h3,h4,h5,h6,p{
    font-size: 16px;
}
</style>
