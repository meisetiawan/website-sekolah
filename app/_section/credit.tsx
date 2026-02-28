
import { ConstellationOne } from "@/components/constellation/one"
import { ConstellationTwo } from "@/components/constellation/two"

export function CreditSection(properties: any) {
  return <>
  <div className="relative flex flex-col justify-center items-center w-full h-screen">
		<div className="absolute top-72 w-[100rem] h-[100rem] bg-[#3f00ff] rounded-full opacity-50"></div>
    <div className="flex flex-row justify-center items-center grow">
      <ConstellationTwo visible={1} />
      <div className="flex flex-col items-center w-1/2 md:w-1/3 gap-y-16 text-center">
        <p className="text-3xl">{properties.credit.title}</p>
        <p>{properties.credit.description}</p>
        <a href="#">
          <div className="px-10 py-2 rounded-full bg-purple-900 hover:bg-purple-800 transition duration-300">
            <p> Gabung Sekarang </p>
          </div>
        </a>
      </div>
      <ConstellationOne visible={1} />
    </div>
  </div>
  </>
}