import * as React from 'react'
import styles from './styles/Loading.module.scss'
import { transformStyles } from 'react-dom-basic-kit'
import LoadingSVG from '../assets/loading.svg'

const cx = transformStyles(styles)

export const Loading: React.FC = () => {
  return <img className={cx('loading')} src={LoadingSVG} />
}
export default Loading
