<template>
  <div class="userlist">
    <div>
<!--      <img :src="item" alt="" v-for="item in imglist" :key="item.id" style="width: 100px; height: 100px;">-->
    </div>
  </div>
</template>

<script>
import {contest,earchs} from '../api/https'

export default {
  name: "UserList",
  data() {
    return {
      imglist: []
    }
  },
  mounted() {
    this.contestdata();
  },
  methods: {
    contestdata() {
      contest().then(res => {
        console.log(res);
        this.imglist = res.data;
      })
      earchs().then(res => {
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>

</style>