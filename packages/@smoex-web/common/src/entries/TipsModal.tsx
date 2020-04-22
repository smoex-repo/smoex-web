import * as React from 'react'
import styles from './styles/Modal.module.scss'
import { DrawerModal } from './DrawerModal'
import {
  usePopupShown,
  asModalProps,
  transformStyles,
  Modal,
} from 'react-dom-basic-kit'

const cx = transformStyles(styles)

export const TipsModal: React.FC<any> = (props) => {
  const { children } = props
  const shown = usePopupShown(props.isOpen)
  return (
    <Modal {...asModalProps(props)} blankClose={true}>
      <div className={cx('tips-modal', { shown })}>{children}</div>
    </Modal>
  )
}
export default TipsModal
