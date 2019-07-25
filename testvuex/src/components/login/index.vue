<template>
  <div class="login-group">
    <div class="login-minGroup">
      <div class="login-topLogo"></div>
      <div class="login-box">
        <span class="tip" v-show="flag">{{ tip }}</span>
        <div class="enter-groups">
          <i class="user-bg"></i>
          <el-input
            type="text"
            name="login-user"
            placeholder="请输入用户名"
            @blur="loginUser"
            v-model="username"
          />
        </div>
        <div class="enter-groups">
          <i class="pwd-bg"></i>
          <el-input
            type="password"
            name="login-pwd"
            placeholder="请输入密码"
            @blur="loginPwd"
            v-model="password"
          />
        </div>
        <el-button class="btn-login" @click="login">登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import style from "../../../static/css/login.css";
import { message } from "../../assets/common/api";
import Axios from "axios";
export default {
  data() {
    return {
      style,
      tip: "",
      username: "",
      password: "",
      flag: false
    };
  },
  methods: {
    loginUser() {
      if (this.username == "") {
        this.flag = true;
        this.tip = "用户名不能为空！";
      } else {
        if (!/^.{3,6}$/.test(this.username)) {
          this.flag = true;
          this.tip = "用户名必须为3-6个字符！";
        } else {
          this.flag = false;
        }
      }
    },
    loginPwd() {
      if (this.password == "") {
        this.flag = true;
        this.tip = "密码不能为空！";
      } else {
        if (!/^.{6,12}$/.test(this.password)) {
          this.flag = true;
          this.tip = "密码为长度6-12位！";
        } else if (!/^[A-Za-z0-9]+$/.test(this.password)) {
          this.flag = true;
          this.tip = "密码只能包含字母和数字！";
        } else {
          this.flag = false;
        }
      }
    },
    login() {
      if (this.flag == false && this.username != "" && this.password != "") {
        // Axios.get("http://localhost:8080/login")
        //   .then(response => {
        //     let username = response.data.data[0].u_name;
        //     let password = response.data.data[0].u_psw;
        //     if(username == this.username && password == this.password){
        //         alert('登陆成功！')
        //     }else{
        //         alert('查无此人！')
        //     }
        //   })
        //   .catch(function(error) {
        //     alert('请检查接口数据！')
        //   });
        message()
          .then(response => {
            let username = response.data.data[0].u_name;
            let password = response.data.data[0].u_psw;
            if (username == this.username && password == this.password) {
              alert("登陆成功！");
            } else {
              alert("查无此人！");
            }
          })
          .catch(function(error) {
            alert("请检查接口数据！");
          });
      } else {
        alert("请先完善登陆信息！");
      }
    }
  }
};
</script>
