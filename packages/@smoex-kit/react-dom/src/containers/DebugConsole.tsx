import * as React from 'react'
import VConsole from 'vconsole'

export const DebugConsole: React.FC = () => {
    React.useEffect(() => {
        new VConsole()
    }, [])
    return null
}
export default DebugConsole