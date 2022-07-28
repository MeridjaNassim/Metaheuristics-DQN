import {AppProps } from 'next/app'
import '../styles/globals.css'
import 'rsuite/dist/rsuite.min.css';
const MyApp  = ({ Component, pageProps,router} : AppProps ) =>{
 
  return <Component {...pageProps} />
}

export default MyApp
