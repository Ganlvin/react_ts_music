import styled from 'styled-components'

export const CategoryWrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 55px;
  left: -25px;
  width: 700px;
  border: 1px solid #ccc;
  background-color: #fefefe;
  box-shadow: 0 0 10px 2px #d3d3d3;
  border-radius: 5px;
  padding-top: 10px;

  .arrow {
    position: absolute;
    top: -11px;
    left: 110px;
    width: 24px;
    height: 11px;
    background-position: -48px 0;
  }

  .all {
    padding: 10px 25px;
    border-bottom: 1px solid #e2e2e2;
    span {
      display: block;
      width: 75px;
      height: 26px;
      background-position: 0px -64px;
      text-align: center;
      line-height: 26px;
      font-size: 12px;
      cursor: pointer;
    }
  }

  .category {
    padding-left: 25px;
    dl {
      display: flex;
      align-items: flex-start;
    }

    dt {
      display: inline-flex;
      align-items: center;
      padding: 12px 0 0px;
      width: 70px;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-position: -20px -735px;
        margin-right: 8px;
      }
    }

    dl.item1 {
      i {
        background-position: 0 -60px;
      }
    }

    dl.item2 {
      i {
        background-position: 0 -88px;
      }
    }

    dl.item3 {
      i {
        background-position: 0 -117px;
      }
    }

    dl.item4 {
      i {
        background-position: 0 -141px;
      }

      dd {
        padding-bottom: 25px;
      }
    }

    dd {
      padding: 16px 15px 0 15px;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #e2e2e2;

      .item {
        font-size: 12px;
        line-height: 24px;
        .link {
          cursor: pointer;
        }
      }

      .divider {
        margin: 0 8px 0 10px;
        color: #d8d8d8;
        user-select: none;
      }
    }
  }
`
