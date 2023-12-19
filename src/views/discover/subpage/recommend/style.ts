import styled from 'styled-components'
import bgcImg from '@/assets/img/wrap-bg.png'

export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background: url(${bgcImg}) repeat-y 100% 100%;
    display: flex;

    > .left {
      padding: 20px 20px 40px;
      width: 689px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`
