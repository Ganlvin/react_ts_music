import { memo, useState, useEffect } from 'react'
import { type ReactNode, FC } from 'react'
import { ShowAreaWrapper } from './style'
import { shallowEqual, useAppSelector } from '@/stores'
import SongMenuItem from '@/components/song-menu-item'
import Pagination from '@/components/pagination'
import { useSearchParams } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const PlaylistShowArea: FC<IProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1)

  const { playlistInfo } = useAppSelector(
    (state) => ({
      playlistInfo: state.playlist.playlistInfo
    }),
    shallowEqual
  )

  function onPageChange(page: number) {
    const query = Object.fromEntries(searchParams.entries())
    setSearchParams({ ...query, page: String(page) })
    window.scrollTo({ top: 0 })
  }
  useEffect(() => {
    setCurrentPage(Number(searchParams.get('page')))
  }, [searchParams])
  return (
    <>
      {playlistInfo && (
        <ShowAreaWrapper>
          <div className="playlist">
            {playlistInfo.playlists.map((item) => {
              return (
                <div className="playlist-item" key={item.id}>
                  <SongMenuItem oneLineTitle coverSource itemData={item} />
                </div>
              )
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            total={playlistInfo.total}
            pageSize={35}
            onPageChange={onPageChange}
          />
        </ShowAreaWrapper>
      )}
    </>
  )
}

export default memo(PlaylistShowArea)
