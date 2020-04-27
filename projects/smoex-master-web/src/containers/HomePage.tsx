import * as React from 'react'
import styles from './styles/HomePage.module.scss'
import { transformStyles } from '@smoex-kit/react-dom'
import { useEventTrace } from '@smoex-kit/react-dom'
const cx = transformStyles(styles)

type IHomePageProps = {
  className?: string
}

const traceMap = {
  test: ({ ctx } : any) => ({
    name: 'test',
    xxx: ctx.id,
  }),

}

const traceMap2 = {
  test2: ({ ctx } : any) => ({
    name: 'test2',
    xxx2: ctx.id,
  })
}

const TraceComp: React.FC = (props: any) => {
  const scopeRef = React.useRef()
  const clickTrace = useEventTrace(scopeRef, traceMap2)
  const [id, setId] = React.useState(1)
  const onClick = () => {
    console.log('xxxxxx2')
    setId(x => x + 1)
  }
  return (
    <div ref={scopeRef}>
      <div id="asd" 
        onClick={onClick} 
        data-trace={clickTrace.test2({ id })}
      >
        id: {id}
      </div>
    </div>
  )
}

export const HomePage: React.FC = (props: any) => {
  const scopeRef = React.useRef()
  const clickTrace = useEventTrace(scopeRef, traceMap)
  const onClick = () => {
    console.log('xxxxxx')
  }
  return (
    <section ref={scopeRef} className={cx('home-page')}>
      HomePage web
      <TraceComp />
      <div 
        className={cx('home-item')} 
        data-trace={clickTrace.test({ id: 1 })} 
        onClick={onClick}
      >
        11111
      </div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
      <div className={cx('home-item')}>1</div>
    </section>
  )
}

export default HomePage
