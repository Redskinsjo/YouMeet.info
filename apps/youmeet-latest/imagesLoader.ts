// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: string;
  quality: string;
}) {
  const params = ["f_auto", "c_limit", `w_${width}`, `q_${quality || "auto"}`];
  return `${src}?${params.join(",")}`;
}
