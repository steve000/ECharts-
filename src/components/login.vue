<template>
  <div class="body">
    <div class="input">
      <input type="text checkbox" placeholder="输入您的查询id" v-model='inputData' @keyup.enter='btn'>
      <button @click='btn'>前往查看运动数据</button>
      <p>请前往微信小程序---小书生，获取运动数据才能查到数据噢</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      inputData: ''
    }
  },
  methods: {
    btn () {
      let that = this
      let url = 'http://127.0.0.1:3000/userRunData?runId=' + that.inputData
      axios.get(url)
        .then(function (res) {
          let data = res.data
          if (data.code === 200) {
            console.log(data)
            that.$store.dispatch('initData', {
              data: data.data,
              avatar: data.avatar,
              name: data.name
            })
            that.$router.push({path: 'rundata'})
          } else {
            alert('请前往微信获取运动数据')
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      console.log(url)
    }
  }
}
</script>
<style scoped>
.body {
  height: 800px;
  background: url(http://img0.imgtn.bdimg.com/it/u=3643092268,1191363402&fm=26&gp=0.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  background-size: cover;
}
.input {
  padding-top: 200px;
  width: 100%;
}
input, button,p{
  height: 50px;
  width: 300px;
  font-size: 30px;
  border-radius: 20px;
  display: block;
  margin: 0 auto;
}
button{
  margin-top: 30px;
}
p{
  margin-top: 30px;
  line-height: 50px;
  height: 100px;
  background: RGB(211,179,128);
  width: 420px;
  color: RGB(14,11,11);
}
</style>
