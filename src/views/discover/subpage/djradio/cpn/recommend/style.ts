import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  .radio-list {
    margin: 20px 0 40px;
    display: flex;
    justify-content: space-between;
  }
  .section-header-v1 {
    padding-left: 0px;
    background-position: 0 9999px;
    .title {
      font-size: 24px;
    }
  }
`

export const CoverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;

  .name {
    font-size: 14px;
    color: #333;
    margin: 5px 0;
  }

  img {
    width: 150px;
    height: 150px;
  }

  p {
    color: #666;
  }
`
