import React from 'react'
import Navigbar from '@/app/components/general/Navigbar/Navigbar'
import Footer from '@/app/components/general/Footer/Footer'
import Loading from '@/app/components/general/Loading/Loading'
import genMetadata from '../components/MetaTags';

export function generateMetadata(){
  return genMetadata();
}
export default function LoadingPage({loadingText} : {loadingText: string}) {
  return (
    <>
      <Navigbar/>
      <Loading text={loadingText}/>
      <Footer/>
    </>
  )
}
