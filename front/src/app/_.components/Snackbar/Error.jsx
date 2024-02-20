import React from 'react';
export function ErrorSnackBar() {
  return (
    <div className="inline-flex bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
      <p>Mauvaise réponse</p>
    </div>
  )
}
