import styled from 'styled-components'
import headerBgc from '@/assets/img/modal-header1.png'

export const LoginPanelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100%;
  height: 100%;
  .login-container {
    width: 530px;
    border-radius: 4px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
    border: none;
  }
  .login-header {
    position: relative;
    margin: 0;
    padding: 0 45px 0 18px;
    height: 38px;
    line-height: 38px;
    z-index: 10;
    border-bottom: 1px solid #191919;
    border-radius: 4px 4px 0 0;
    background: #2d2d2d;
    font-weight: bold;
    font-size: 14px;
    color: #fff;
    .close {
      position: absolute;
      z-index: 20;
      top: 16px;
      right: 20px;
      width: 10px;
      height: 10px;
      overflow: hidden;
      text-indent: -9999px;
      cursor: pointer;
      background: url(${headerBgc}) no-repeat;
      background-position: 0 -95px;
    }
  }
  .login-body {
    display: flex;
    justify-content: center;
    margin: auto;
    padding-top: 30px;
    background: #fff;
    .tip-img {
      img {
        width: 125px;
        height: 220px;
      }
    }
    .qr-container {
      margin-left: 25px;
      width: 200px;
      text-align: center;
      .title {
        font-size: 18px;
        font-weight: 500;
      }
      .qr {
        position: relative;
        .qr-mask {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          .tip {
            font-size: 12px;
            color: rgba(0, 0, 0, 0.8);
            font-weight: 500;
            margin-bottom: 6px;
          }
          .refresh {
            display: block;
            margin: 0 auto;
            padding-right: 0;
            width: 64px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            border-radius: 4px;
            background: -webkit-linear-gradient(top, #81dd81 0%, #55a055 100%);
            background: linear-gradient(180deg, #81dd81 0%, #55a055 100%);
            border: 1px solid #5baf5b;
            box-shadow: inset 0 -1px 1px 1px rgb(185 230 5.96774194%);
            color: #fff;
            font-size: 12px;
            cursor: pointer;
          }
        }
        .qr-tip {
          font-size: 12px;
        }
      }
    }
  }
  .login-footer {
    border: 1px solid #d8d8d8;
    border-width: 0 1px 1px;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 30px;
    .other-btn {
      display: block;
      width: 118px;
      height: 30px;
      margin: 0 auto;
      padding-right: 0;
      font-size: 12px;
      border: 1px solid #979797;
      box-sizing: border-box;
      border-radius: 15px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.8);
      background-color: #fff;
    }
  }
`
