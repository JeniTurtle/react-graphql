import styled from 'styled-components'

const LoginStyle = styled.div`
  background: #424952 url(/static/jouryu/images/login/login_bg.jpg) no-repeat
    center center;
  background-size: 100% 100%;
  height: 100%;
  position: relative;

  .content {
    background: #fff;
    border-radius: 8px;
    height: 368px;
    width: 484px;
    margin-top: -184px;
    margin-left: -242px;
    padding: 33px 93px 40px;
    position: absolute;
    top: 50%;
    left: 50%;

    header {
      padding-bottom: 33px;
      text-align: center;
    }

    h2 {
      font-size: 28px;
      color: #00a3ed;
      letter-spacing: 6px;
    }

    .logo {
      float: right;
    }

    h3 {
      font-size: 30px;
      font-weight: 700;
      margin-left: 20px;
      line-height: 60px;
    }
  }

  .form {
    .ant-form-item {
      font-size: 13px;
    }

    .ant-form-explain {
      padding-top: 8px;
    }

    .ant-input {
      height: 40px;
      border-color: $color;
      background-color: rgb(255, 255, 255);
      border-color: rgb(225, 236, 245);
    }

    .ant-input-group-wrapper {
      width: 100%;
    }

    .submit {
      background-color: #2db7f5;
      border-color: #0ba5eb;
      color: #fff;
      font-size: 14px;
      height: 40px;
      opacity: 0.9;
      width: 100%;
    }

    .submit:hover {
      opacity: 1;
    }
  }
`

export default LoginStyle
