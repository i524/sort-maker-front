<template>
    <VApp class="v-app">
        <Header />
        <VMain class="v-main">
            <VContainer>
                <RouterView />
            </VContainer>
        </VMain>
        <Footer />
    </VApp>
</template>

<script>
import { Header, Footer } from './components';

export default {
  name: 'App',
  components: {
      Header,
      Footer
  }
};
</script>

<style scope>
.v-main{
    margin: 0 auto;
    width: 720px;
}

.v-app{
    background: #eee;
    color: #444;
    font-size: 16px;
    font-family: "游ゴシック","ヒラギノ角ゴシック",sans-serif;
}

h1,h2,h3,h4,h5,h6,p{
    margin: 0;
    padding: 0;
}

h1{
    font-size: 30px;
}

h2{
    font-size: 24px;
}

h3,h4,h5,h6,p{
    font-size: 16px;
}
</style>
