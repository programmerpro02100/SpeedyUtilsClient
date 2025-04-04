import React from 'react'
import Loading from '@/app/components/general/Loading/Loading'
import genMetadata from '../components/MetaTags';

export function generateMetadata(){
  return genMetadata();
}
export default function LoadingPage({loadingText} : {loadingText: string}) {
  return (
    <>
      <Loading text={loadingText}/>
    </>
  )
}
