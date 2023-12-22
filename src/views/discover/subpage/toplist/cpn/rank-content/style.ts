import styled from 'styled-components'
import bgcImg from '@/assets/img/sprite_table.png'

export const RankContentWrapper = styled.div`
  padding: 0 40px;

  .section-header-v1 {
    padding-left: 0px;
    background-position: 0 9999px;
    .play-count {
      color: #666;
      .count {
        color: #c20c0c;
        font-weight: bold;
      }
    }
    .sub-title {
      display: inline-block;
      font-size: 12px;
      margin: 9px 0 0 20px;
    }
  }
  .play-list {
    table {
      width: 100%;
      border: 1px solid #d9d9d9;

      thead {
        th {
          height: 34px;
          line-height: 34px;
          background-image: url(${bgcImg});
          color: #666;
          border: 1px solid #ddd;
          border-width: 0 0 1px 1px;
          padding-left: 10px;
        }

        .ranking {
          width: 78px;
          border-left: none;
        }

        .duration {
          width: 91px;
        }

        .singer {
          width: 173px;
        }
      }

      tbody {
        .rank-item {
          &:hover {
            .time {
              display: none;
            }
            .handle {
              display: flex;
            }
          }
          .handle {
            display: none;
          }
        }
        td {
          padding: 6px 10px;
        }

        tr:nth-child(2n) {
          background-color: #fff;
        }

        tr:nth-child(2n + 1) {
          background-color: #f7f7f7;
        }

        .rank-num {
          display: flex;

          .num {
            width: 25px;
            height: 18px;
            text-align: center;
            color: #999;
          }

          .new {
            width: 16px;
            height: 17px;
            margin-left: 12px;
            background-position: -67px -283px;
          }
        }

        .song-name {
          display: flex;
          align-items: center;
          img {
            width: 50px;
            height: 50px;
            margin-right: 10px;
          }

          .play {
            width: 17px;
            height: 17px;
            background-position: 0 -103px;
          }

          .name {
            margin-left: 10px;
          }
          .mv {
            width: 23px;
            height: 17px;
            margin: 1px 0 0 2px;
            background-position: 0 -151px;
            cursor: pointer;
            &:hover {
              background-position: -30px -151px;
            }
          }
        }
        .handle {
          display: flex;
          align-items: center;
          .add {
            display: block;
            width: 13px;
            height: 13px;
            background-position: 0 -700px;
            cursor: pointer;
          }
          .collect {
            background-position: 0 -174px;
            width: 18px;
            height: 16px;
            margin: 2px 0 0 4px;
            overflow: hidden;

            cursor: pointer;
          }

          .share {
            display: block;
            width: 18px;
            height: 16px;
            margin: 2px 0 0 4px;
            overflow: hidden;
            cursor: pointer;
            background-position: 0 -195px;
          }
          .download {
            display: block;
            width: 18px;
            height: 16px;
            background-position: -81px -174px;
            cursor: pointer;
          }
        }
      }
    }
  }
`
