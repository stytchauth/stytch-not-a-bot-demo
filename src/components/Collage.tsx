import Image from "next/image";

export default function Collage({ code }: { code: string }) {
  const ikFolder = `not-a-bot/${code}`;

  const h = 636;
  const w = 887;
  const b = 10;
  const topLeftImg = `i-${ikFolder}/image_0.png,lfo-top_left,r-50,lx-125,ly-50,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const topRightImg = `l-image,i-${ikFolder}/image_1.png,lfo-top_right,r-50,lx-1050,ly-50,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const botLeftImg = `l-image,i-${ikFolder}/input_image.jpg,lfo-bottom_left,r-50,lx-125,ly-725,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const botRightImg = `l-image,i-${ikFolder}/image_2.png,lfo-bottom_right,r-50,lx-1050,ly-725,w-${w},h-${h},b-${b}_FFFFFF,l-end`;
  const notABot = `l-image,i-not-a-bot/not-a-bot-symbol.png,lx-850,ly-1175,l-end`;

  const collageUrl = encodeURI(
    `https://ik.imagekit.io/stytchdevrel/not-a-bot/5x7postcard-photos.jpg?tr=l-image,${topLeftImg}:${topRightImg}:${botLeftImg}:${botRightImg}:${notABot}`,
  );

  return (
    <div className="flex flex-col justify-center my-32">
      <div className="flex justify-center items-center h-full w-full">
        <Image
          className="object-cover max-h-full max-w-full"
          priority={true}
          fill={true}
          src={collageUrl}
          alt={`photo-collage`}
        />
      </div>
    </div>
  );
}
