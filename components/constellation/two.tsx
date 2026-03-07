import { Constellation } from '@/components/constellation/group';

export function ConstellationTwo(properties: any) {
  return (
    <>
      <div
        className={`hidden h-[500px] w-[500px] transition-opacity duration-500 xl:block ${properties.visible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="absolute h-[500px] w-[500px]">
          <Constellation
            width={500}
            height={500}
            stars={[
              [20, 300],
              [70, 200],
              [100, 190],
            ]}
            lines={[
              [0, 1],
              [1, 2],
            ]}
            animations={[
              [-1, 0],
              [-1, 1],
            ]}
          />
        </div>
        <div className="absolute h-[500px] w-[500px]">
          <Constellation
            width={500}
            height={500}
            stars={[
              [350, 100],
              [270, 160],
              [380, 190],
            ]}
            lines={[
              [0, 1],
              [1, 2],
            ]}
            animations={[
              [-1, 0],
              [-1, 1],
            ]}
          />
        </div>
        <div className="absolute h-[500px] w-[500px]">
          <Constellation
            width={500}
            height={500}
            stars={[
              [250, 420],
              [200, 350],
              [310, 400],
            ]}
            lines={[
              [0, 1],
              [1, 2],
            ]}
            animations={[
              [-1, 0],
              [-1, 1],
            ]}
          />
        </div>
      </div>
    </>
  );
}
