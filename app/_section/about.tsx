
import { ConstellationOne } from "@/components/constellation/one"
import { ConstellationTwo } from "@/components/constellation/two"

export function AboutSection(properties: any) {
  return <>
  <div className="relative flex flex-col justify-center items-center w-full h-screen">
		<div className="absolute w-[10rem] h-[10rem] bg-white rounded-full blur-[10rem] opacity-60"></div>
		<div className="absolute left-0 bottom-0 w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>
		<div className="absolute right-0 bottom-0 w-[10rem] h-[10rem] bg-[#3f00ff] rounded-full blur-[10rem] opacity-50"></div>
    <div className="flex justify-center items-end w-full h-1/5 py-8">
      <p> SMA N 1 Purbalingga Profile </p>
    </div>
    <div className="flex flex-row justify-center items-center grow">
      <ConstellationTwo visible={1} />
      <div className="flex flex-col items-center w-1/2 md:w-1/3 gap-y-16 text-center">
        <p className="text-3xl">{properties.about.title}</p>
        <p>{properties.about.description}</p>
        <a href="#">
          <div className="px-10 py-2 rounded-full bg-purple-900 hover:bg-purple-800 transition duration-300">
            <p> Gabung Sekarang </p>
          </div>
        </a>
      </div>
      <ConstellationOne visible={1} />
    </div>
    <div className="flex flex-col gap-y-10 w-full h-1/5 py-8">
      <p className="text-center"> Dipercaya oleh </p>
      <div className="flex flex-row">
        <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-left">
          {properties.trusteds.map((trusted: any, i: any) => (
            <img
              key={i}
              src={trusted.image}
              alt={trusted.name}
              className="mx-4 inline w-[7rem] h-16 object-contain opacity-70 hover:opacity-100 transition duration-300"
            />
          ))}
        </div>
        <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-left" aria-hidden="true">
          {properties.trusteds.map((trusted: any, i: any) => (
            <img
              key={i}
              src={trusted.image}
              alt={trusted.name}
              className="mx-4 inline w-[7rem] h-16 object-contain opacity-70 hover:opacity-100 transition duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
  </>
}