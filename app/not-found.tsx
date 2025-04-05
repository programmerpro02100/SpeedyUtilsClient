import ErrorPage from '@/app/other/ErrorPage/ErrorPage';
import React from 'react';
import genMetadata from './components/MetaTags';

export function generateMetadata(){
  return genMetadata({
    indexing: false
  });
}

export default function Error() {
  return <ErrorPage code={404} />;
}
