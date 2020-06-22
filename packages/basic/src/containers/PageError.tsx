import * as React from 'react'

export const PageError: React.FC<any> = (props) => {
  return (
    <section>
      <h1>{props.code}</h1>
    </section>
  )
}
export default PageError
