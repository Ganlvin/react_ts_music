import styled from 'styled-components'

export const RankingHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 40px;

  .image {
    padding: 3px;
    border: 1px solid #ccc;
    position: relative;
    img {
      width: 150px;
      height: 150px;
    }

    .image_cover {
      position: absolute;
      inset: 0;
      background-position: -230px -380px;
    }
  }

  .info {
    margin-left: 30px;
    .title {
      line-height: 24px;
      font-size: 20px;
      font-weight: normal;
      color: #333;
      margin-bottom: 5px;
      font-family: 'Microsoft Yahei', Arial, Helvetica, sans-serif;
    }

    .time {
      display: flex;
      align-items: center;
      color: #666;
      margin: 0 0 20px;
      line-height: 35px;

      .clock {
        display: inline-block;
        width: 13px;
        height: 13px;
        background-position: -18px -682px;
        position: relative;
        top: -2px;
        margin-right: 3px;
      }

      .update-f {
        color: #999;
      }
    }
  }
`
