export function Star(properties: any) {
  return (
    <>
      <div
        style={properties.style}
        className={`flex h-0 w-0 items-center justify-center opacity-60 ${properties.className}`}
      >
        <div className="peer absolute h-[15px] w-[15px]"></div>
        {/* <div className="absolute bottom-[2rem] hidden w-[20rem] bg-blue-500 peer-hover:flex">
          <p className="text-white">
            {' '}
            Terwujudnya Warga Indonesia Sejati, Kuat Bereligi, Pembelajar, Berbudaya, Berkarakter,
            Berwawasan Lingkungan dan Global{' '}
          </p>
        </div> */}
        <div className="pointer-events-none absolute h-[2rem] w-[2rem] rounded-full bg-white opacity-50 blur-[1rem]"></div>
        <svg className="pointer-events-none absolute h-[15px] w-[15px]">
          <rect width="100%" height="100%" fill="white" clipPath="url(#star)" />
        </svg>
      </div>
    </>
  );
}
