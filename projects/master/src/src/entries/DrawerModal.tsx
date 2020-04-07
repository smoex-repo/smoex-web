import * as React from 'react'
import styles from './styles/Modal.module.scss'
import { usePopupShown, IPopupProps } from 'react-dom-basic-kit'

import { enhancePopupComponent } from 'react-dom-basic-kit'

import { transformStyles } from 'react-dom-basic-kit'
import { cloneModalContent } from 'react-dom-basic-kit'

const cx = transformStyles(styles)

type IDrawerModalProps = IPopupProps & {
  children: React.ReactElement
}

export function getOffsetTop() {
  const headerNode = document.getElementById('Header')
  if (headerNode) {
    const { bottom } = headerNode.getBoundingClientRect()
    return bottom
  }
  return 0
}

// 如果使用 setTimeout 延时处理，则会有比较明显的卡顿, 这里需要提前计算出移动之后的位置
export function updateOffsetTop(node: HTMLElement) {
  const modals: any = document.getElementsByClassName(cx('dropdown-modal'))
  const { height = 0 } = node.getBoundingClientRect()
  for (const modal of modals) {
    ; (modal as HTMLElement).style.top = `${getOffsetTop() - height}px`
  }
}

const TDrawerModal: React.FC<IDrawerModalProps> = (props) => {
  const { isOpen, onClose, onRemove, children } = props
  const shown = usePopupShown(isOpen)
  return (
    <div
      className={cx('dropdown-modal', { shown })}
      style={{ top: getOffsetTop() }}
      onClick={onClose}
      onTransitionEnd={onRemove}
    >
      {cloneModalContent(children)}
    </div>
  )
}

export const DrawerModal = enhancePopupComponent(TDrawerModal)
export default DrawerModal
