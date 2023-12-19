import styled from 'styled-components'

export const SingerWrapper = styled.div`
  padding: 20px;

  .artists {
    .item {
      display: flex;
      height: 62px;
      margin-top: 14px;
      background-color: #fafafa;
      text-decoration: none;

      :hover {
        background-color: #f4f4f4;
      }

      img {
        width: 62px;
        height: 62px;
        /* object-fit: cover; */
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 3px 12px;
        border: 1px solid #e9e9e9;
        border-left: none;
        overflow: hidden;

        .name {
          font-size: 14px;
          font-weight: 700;
          color: #000;
        }

        .alias {
          font-size: 12px;
          color: #666;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }

  .apply-for {
    margin-top: 12px;
    .btn {
      border-radius: 4px;
      padding: 0 5px 0 0;
      white-space: nowrap;
      display: inline-block;
      height: 31px;
      line-height: 31px;
      overflow: hidden;
      vertical-align: top;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      color: #333;
      background-position: right -100px;
      &:hover {
        background-position: right -182px;
        i {
          background-position: 0 -141px;
        }
      }
      i {
        width: 170px;
        font-weight: bold;
        color: #333;
        padding: 0 15px 0 20px;
        pointer-events: none;
        background-position: 0 -59px;
        display: inline-block;
        height: 31px;
        line-height: 31px;
        overflow: hidden;
        vertical-align: top;
        text-align: center;
        cursor: pointer;
      }
    }
  }
`
