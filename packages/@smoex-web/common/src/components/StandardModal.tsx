import * as React from 'react'
import styles from './styles/Modal.module.scss'
import {
  enhancePopupComponent,
  usePopupShown,
  usePopupLayerOverlay,
  asModalProps,
  Modal,
} from '@smoex-kit/react-dom'
import { transformStyles } from '@smoex-kit/react-dom'
import { Loading } from './Loading'

const cx = transformStyles(styles)

const TStandardModal: React.FC<any> = (props: any) => {
  const { isOpen, onClose, onRemove } = props
  const shown = usePopupShown(isOpen)

  return (
    <Modal {...asModalProps(props)}>
      <div
        className={cx('standard-modal', { shown })}
        onTransitionEnd={onRemove}
      >
        <div className={cx('standard-header')} onClick={() => onClose()}>
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
