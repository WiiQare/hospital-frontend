import Link from 'next/link';

const ItemBottom = ({ title, icon, link, activePath, rounded = false }) => {
  return (
    <Link href={link} legacyBehavior>
      {!rounded ? (
        <span
          className={`flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-sky ${
            activePath ? 'text-sky font-bold' : ''
          } transition-all duration-300 cursor-pointer`}
        >
          <span>{icon({ size: 20 })}</span>
          <h6 className="text-xs">{title}</h6>
        </span>
      ) : (
        <span
          className={`bg-white shadow-2xl rounded-full py-8 px-8 -top-8 absolute flex flex-col gap-2 items-center justify-center text-gray-500 hover:text-sky ${
            activePath ? 'text-sky font-bold' : ''
          } transition-all duration-300 cursor-pointer`}
        >
          <span>{icon({ size: 30 })}</span>
          {/* <h6 className='text-xs'>
                            {title}
                        </h6> */}
        </span>
      )}
    </Link>
  );
};

export default ItemBottom;
