import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  Modal,
} from '@smoex-kit/react-dom'
import { transformStyles } from '@smoex-kit/react-dom'
import { DrawerModal } from './DrawerModal'
import { asModalProps } from '@smoex-kit/react-dom'

const cx = transformStyles(styles)

export const TConfirmModal: React.FC<any> = (props) => {
  const { isOpen, onClose, onRemove, onConfirm } = props
  const shown = usePopupShown(isOpen)
  const onConfirmClick = () => {
    if (onConfirm) {
      onConfirm()
    }
    onClose()
  }
  return (
    <Modal {...asModalProps(props)}>
      <div className={cx('confirm-modal', { shown })}>
        {/* <div onClick={() => onClose()}>{` `}</div> */}
        {props.children}
        <div className={cx('confirm-btn')} onClick={onConfirmClick}>
          CONFIRM
        </div>
      </div>
    </Modal>
  )
}
export const ConfirmModal = enhancePopupComponent(TConfirmModal)
export default ConfirmModal
