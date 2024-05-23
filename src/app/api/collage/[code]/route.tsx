import { ImageResponse } from "next/og";

const BASE_URL = process.env.HOSTED_URL
  ? process.env.HOSTED_URL
  : "http://localhost:3000";

export async function GET(
  request: Request,
  { params }: { params: { code: string } },
) {
  const code = params.code;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 100,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={`${BASE_URL}/images/collage/${code}`}
          width={2100}
          height={1500}
          alt="Collage"
        />
      </div>
    ),
    {
      width: 2100,
      height: 1500,
    },
  );
}
