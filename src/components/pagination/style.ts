import styled from 'styled-components'
import bgcImg from '@/assets/img/sprite_button2.png'

export const PaginationWrapper = styled.div`
  .pagination {
    margin: 30px 0;
    text-align: center;

    .control {
      width: 69px;
      height: 24px;
      line-height: 22px;
      text-align: center;
      border: 1px solid #ccc !important;
      border-radius: 2px;
      margin: 0 5px;
      color: #333;

      &:disabled {
        color: #999;
      }
    }

    .prev {
      padding-left: 13px;
      background-position: -2px -561px;
    }

    .next {
      padding-right: 8px;
      background-position: -75px -561px;
    }

    .ant-pagination-item {
      border: 1px solid #ccc !important;
      margin: 0 5px;
      border-radius: 3px;
      background: url(${bgcImg}) no-repeat 0 9999px;
      a {
        font-size: 12px;
      }

      &.ant-pagination-item-active {
        background-color: #c20c0c;
        border-color: #a2161b;
        background-position: 0 -650px;
        a {
          color: #fff;
        }
      }
    }
  }
`
