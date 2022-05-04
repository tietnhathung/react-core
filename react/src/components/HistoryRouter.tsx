import type {BrowserHistory} from 'history'
import {Router} from 'react-router-dom'
import {ReactNode, useState,useLayoutEffect } from 'react'

export interface HistoryRouterProps {
    history: BrowserHistory
    basename?: string
    children?: ReactNode
}

export function HistoryRouter({basename,children,history,}: HistoryRouterProps) {
    let [state, setState] = useState({
        action: history.action,
        location: history.location,
    })
    useLayoutEffect(() => history.listen(setState), [history])
    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={history}
        />
    )
}
