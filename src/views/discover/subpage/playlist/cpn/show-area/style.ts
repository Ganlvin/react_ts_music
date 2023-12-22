import styled from 'styled-components'

export const ShowAreaWrapper = styled.div`
  .playlist {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
  .playlist-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
