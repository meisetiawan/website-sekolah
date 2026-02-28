

function splitIntoThree(arr) {
  const size = Math.floor(arr.length / 3);

  const part1 = arr.slice(0, size);
  const part2 = arr.slice(size, size * 2);
  const part3 = arr.slice(size * 2, size * 3);

  return [part1, part2, part3];
}

export function CommentSection(properties: any) {
  const [one, two, three] = splitIntoThree(properties.comments)

  return (
    <div className={`w-full h-screen`}>
      <div className="relative flex flex-col items-center gap-y-20 w-full h-full py-32 overflow-hidden">

        <p className="text-2xl">
          Bagaimana pendapat orang lain?
        </p>

        <div className="flex flex-col gap-y-10 w-full grow">

          {/* ROW 1 → */}
          <div className="flex flex-row h-1/3">
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-right-slow-2x h-full">
              {one.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-right-slow-2x h-full" aria-hidden="true">
              {one.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* ROW 2 ← */}
          <div className="flex flex-row h-1/3">
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-left-slow-2x h-full">
              {two.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-left-slow-2x h-full" aria-hidden="true">
              {two.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
          </div>

          {/* ROW 3 → */}
          <div className="flex flex-row h-1/3">
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-right-slow-2x h-full">
              {three.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
            <div className="flex flex-row gap-x-10 pr-10 animate-infinite-carousel-right-slow-2x h-full" aria-hidden="true">
              {three.map((item, i) => (
                <CommentCard key={i} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function CommentCard({ item }: any) {
  return (
    <div className="min-w-[300px] h-full p-6 bg-gray-900/70 border border-gray-800 rounded-2xl">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={item.image}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="font-medium">{item.tittle}</p>
      </div>
      <p className="text-sm text-gray-300">
        {item.description}
      </p>
    </div>
  )
}