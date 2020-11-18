import * as React from 'react'
import { StandardModal } from '../components/StandardModal'
import styles from './styles/LoginModal.module.scss'
import { useToastError, useFormContext, transformStyles, enhanceFormComponent } from '@react-kits/dom'
import { useAsyncCallback } from '@react-kits/redux'
import { accountAsyncAction, userSlice } from '@smoex-logic/user'
import { LoginFormInput } from '././LoginModal'

const cx = transformStyles(styles)

const TLoginForm: React.FC<any> = (props) => {
  const { toRegister, callback } = props
  const { data, update } = useFormContext()
  const [loginType, setLoginType] = React.useState('password')

  const [login, loginState] = userSlice.useAction(accountAsyncAction.login)
  const [sendCode, sendState] = userSlice.useAction(accountAsyncAction.sendCode)
  const [verify, verifyState] = userSlice.useAction(
    accountAsyncAction.verifyCode,
  )
  const loading = loginState.loading || sendState.loading

  const onLogin = useAsyncCallback(async () => {
    const { account, password, code } = data
    if (loginType === 'password') {
      await login(account, password)
    } else if (loginType === 'code') {
      await verify(code, 'login')
    }
    if (callback) {
      callback()
    }
  }, [login, data, loginType, verify]) as any

  const onSendCode = useAsyncCallback(async () => {
    const { account } = data
    await sendCode(account, 'login')
  }, [sendCode, data]) as any

  useToastError(loginState.error)
  useToastError(sendState.error)

  React.useEffect(() => {
    if (loginType === 'code') {
      update({ password: '' })
    }
  }, [loginType])

  const onChangeType = () => {
    setLoginType((x) => (x === 'password' ? 'code' : 'password'))
  }

  return (
    <form className={cx('login-form')}>
      <div className={cx('login-label')}>
        PHONE{loginType === 'password' && '/USERNAME'}
      </div>
      <LoginFormInput name="account" defaultValue="lynnkoo" />
      <div className={cx('login-label')}>
        {loginType === 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      {loginType === 'password' && (
        <LoginFormInput name="password" defaultValue="111111">
          <div className={cx('login-send-code')}>FORGET PASSWORD</div>
        </LoginFormInput>
      )}
      {loginType === 'code' && (
        <LoginFormInput name="code">
          <div className={cx('login-send-code')} onClick={onSendCode}>
            SEND CODE
          </div>
        </LoginFormInput>
      )}
      <div className={cx('login-change-type')} onClick={onChangeType}>
        LOGIN BY {loginType !== 'password' ? 'PASSWORD' : 'VERIFY CODE'}
      </div>
      <div className={cx('login-form-btn', { loading })} onClick={onLogin}>
        LOGIN{(loginState.loading || verifyState.loading) && '...'}
      </div>
      <div className={cx('login-form-btn')} onClick={toRegister}>
        REGISTER
      </div>
    </form>
  )
}

export const LoginForm = enhanceFormComponent(TLoginForm)

export default LoginForm
