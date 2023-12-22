import { memo } from 'react'
import { type ReactNode, FC } from 'react'
import { Pagination } from 'antd'
import { PaginationWrapper } from './style'

interface IProps {
  children?: ReactNode
  currentPage: number
  total: number
  pageSize: number
  onPageChange?: (page: number, pageSize: number) => void
}

const CustomPagination: FC<IProps> = (props) => {
  const { currentPage, pageSize, total, onPageChange } = props

  function itemRender(
    current: number,
    type: string,
    originalElement: React.ReactNode
  ) {
    if (type === 'prev') {
      return (
        <button className="control prev sprite_button2 ant-pagination-item-link">
          上一页
        </button>
      )
    }
    if (type === 'next') {
      return (
        <button className="control next sprite_button2 ant-pagination-item-link">
          上一页
        </button>
      )
    }
    return originalElement
  }
  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={pageSize}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  )
}
export default memo(CustomPagination)
