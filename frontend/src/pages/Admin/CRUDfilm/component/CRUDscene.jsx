import React from 'react'
import { BrowserRouter, Route , Routes } from 'react-router-dom'


export const CRUDscene = () => {
  return (
    <div>CRUDfilm</div>
  );
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<CRUDfilm />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    




}


export default CRUDfilm