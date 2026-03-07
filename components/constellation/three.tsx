import { Constellation } from '@/components/constellation/group';

import Ganesh from '@/components/icons/ganesh';

export function ConstellationThree(properties: any) {
  return (
    <>
      <div className="flex h-[500px] w-[500px] items-center justify-center">
        <div
          className={`absolute h-[30rem] w-[30rem] rounded-full bg-white blur-[100rem] transition-opacity duration-1000 ease-in-out ${properties.visible ? 'opacity-[0.2]' : 'opacity-0'}`}
        ></div>
        <Ganesh
          className={`absolute transition-opacity duration-1000 ease-in-out ${properties.visible ? 'opacity-70' : 'opacity-0'}`}
          fill="#9be3ffff"
          width={500}
          height={500}
        />
        <Constellation
          stars={[
            [250, 80],
            [200, 140],
            [300, 140],
            [250, 250],
            [150, 320],
            [350, 320],
            [120, 250],
            [380, 250],
            [250, 380],
            [150, 400],
            [350, 400],
          ]}
          lines={[
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 3],
            [3, 4],
            [3, 5],
            [4, 6],
            [5, 7],
            [4, 8],
            [5, 8],
            [8, 9],
            [8, 10],
          ]}
          animations={[
            [-1, 0],
            [-1, 1],
            [0, 2],
            [1, 3],
            [2, 4],
            [3, 5],
            [4, 6],
            [5, 7],
            [4, 8],
            [5, 9],
            [8, 10],
            [9, 11],
          ]}
          width={500}
          height={500}
        />
      </div>
    </>
  );
}
