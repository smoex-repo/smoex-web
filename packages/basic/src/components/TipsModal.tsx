import * as React from 'react'
import styles from './styles/Modal.module.scss'
import { DrawerModal } from '../components/DrawerModal'
import {
  usePopupShown,
  useModalStatus,
  useModalClose,
  transformStyles,
  Modal,
} from 'react-dom-basic-kit'

const cx = transformStyles(styles)

export const TipsModal: React.FC<any> = (props) => {
  const { children, uuid } = props
  const { shown } = useModalStatus(uuid)
  // const [ onHide, onClose ] = useModalClose(uuid)
  return (
    <Modal uuid={uuid}>
      <div className={cx('tips-modal', { shown })}>{children}</div>
    </Modal>
  )
}
export default TipsModal
