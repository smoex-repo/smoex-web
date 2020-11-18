import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  useModalStatus,
  useModalClose,
  Modal,
  transformStyles,
} from '@react-kits/dom'
import { Loading } from './Loading'

const cx = transformStyles(styles)

const TStandardModal: React.FC<any> = (props: any) => {
  const { uuid } = props
  const { shown } = useModalStatus(uuid)
  const [onHide, onClose] = useModalClose(uuid)

  return (
    <Modal uuid={uuid}>
      <div
        className={cx('standard-modal', { shown })}
        onTransitionEnd={onClose}
      >
        <div className={cx('standard-header')} onClick={onHide}>
          X
        </div>
        <div className={cx('standard-content')}>
          <React.Suspense fallback={<Loading />}>
            {props.children}
          </React.Suspense>
        </div>
      </div>
    </Modal>
  )
}
export const StandardModal = enhancePopupComponent(TStandardModal)
export default StandardModal
