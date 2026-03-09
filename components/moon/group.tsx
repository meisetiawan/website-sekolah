export function MoonDefinition() {
  return (
    <>
      <svg className="h-0 w-0">
        <defs>
          <clipPath id="outer" clipPathUnits="objectBoundingBox">
            <path d="M0,0.5C0.3,-0.05 0.7,-0.05 1,0.5C0.7,0.05 0.3,0.05 0,0.5Z" />
          </clipPath>
          <clipPath id="inner" clipPathUnits="objectBoundingBox">
            <path d="M0,0.5C0.3,-0.025 0.7,-0.025 1,0.5C0.7,0.025 0.3,0.025 0,0.5Z" />
          </clipPath>
          <clipPath id="moon" clipPathUnits="objectBoundingBox">
            <path d="M0,0.5C0.3,0 0.7,0 1,0.5C0.7,0.01 0.3,0.01 0,0.5Z" />
          </clipPath>
          <clipPath id="filler" clipPathUnits="objectBoundingBox">
            <path d="M0,1L0,0.5C0.3,0 0.7,0 1,0.5L1,1Z" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
export function Moon(properties: any) {
  return (
    <>
      <div
        className={`h-[500px] min-w-[100rem] w-screen duration-1000 ${properties.visible ? 'opacity-100' : 'opacity-0'} ${properties.className}`}
      >
        <svg className="pointer-events-none absolute h-full w-full">
          <rect width="100%" height="100%" fill="#020712" clipPath="url(#filler)" />
        </svg>
        <svg className="pointer-events-none absolute h-full w-full blur-[75px]">
          <rect width="100%" height="100%" fill="#3f00ff" clipPath="url(#outer)" />
        </svg>
        <svg className="pointer-events-none absolute h-full w-full blur-[50px]">
          <rect width="100%" height="100%" fill="white" clipPath="url(#inner)" />
        </svg>
        <svg className="pointer-events-none absolute h-full w-full opacity-100">
          <rect width="100%" height="100%" fill="white" clipPath="url(#moon)" />
        </svg>
      </div>
    </>
  );
}
