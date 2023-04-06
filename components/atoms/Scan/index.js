import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Scan = () => {
  const [data, setData] = useState('Scanner le QR Code');

  return (
    <div className='flex flex-col gap-6 py-6'>
        <div className='text-center'>
            <p>{data}</p>
        </div>
        <div className="">
        <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{facingMode: "environment"}}
        style={{ width: '100%' }}
      />
        </div>
    </div>
  );
};

export default Scan;