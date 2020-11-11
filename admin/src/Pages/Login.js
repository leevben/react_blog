import React, { useState } from "react";
import { Card, Input, Button, Spin, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import '../static/css/login.css';
import servicePath from '../config/apiUrl'
import axios from 'axios'

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const checkLogin = () => {
    setIsLoading(true);
    if(!userName){
       message.error('用户名不能为空')
       setTimeout(()=>setIsLoading(false),500)       
       return false
      }else if(!password){
        message.error('密码不能为空')
        setTimeout(()=>setIsLoading(false),500)        
        return false
    }
    let loginInfo={
      'userName':userName,
      'password':password
    }
    axios({
      method:'POST',
      url:servicePath.checkLogin,
      data:loginInfo,
      withCredentials:true
    }).then(
      (res)=>{
        setIsLoading(false)
        if(res.data.data==='登陆成功'){
          localStorage.setItem('openId',res.data.openId)
          props.history.push('/index')
        }else{
          message.error('密码错误，请检查后重新输入')
        }
      }
    )
  };
  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="My blog system" bordered={true} style={{ width: "400px" }}>
          <Input
            value={userName}
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            value={password}
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            登录
          </Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
