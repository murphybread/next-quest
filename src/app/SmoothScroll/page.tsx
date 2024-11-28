import SmoothScroll from "@components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      {/* 섹션 1 */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Page 1</h1>
      </div>

      {/* 섹션 2 */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "blue",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Page 2</h1>
      </div>

      {/* 섹션 3 */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "green",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Page 3</h1>
      </div>

      {/* 섹션 4 */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "purple",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white" }}>Page 4</h1>
      </div>
    </SmoothScroll>
  );
}
