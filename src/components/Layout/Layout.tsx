import { PropsWithChildren } from 'react'
import Root from './Root'
import Header from './Header'
import Main from './Main'

const Layout = ({ children }: PropsWithChildren<object>) => {
  return { children }
}

Layout.Root = Root
Layout.Header = Header
Layout.Main = Main

export default Layout
