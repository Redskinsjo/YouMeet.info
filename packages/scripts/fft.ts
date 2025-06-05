import prisma from "@youmeet/prisma-config/prisma";
import fft from "fft.js";

(async () => {
  const findPowerOfTwo = (n: number, pow: number, size: number): number => {
    if (n * 2 > size) return pow;
    else return findPowerOfTwo(n * 2, pow + 1, size);
  };

  let T = await prisma.tipe.findMany({
    orderBy: { createdAt: "asc" },
  });

  T = T.map((doc) => doc.temperature.main) as any[];

  console.log("Tipes count:", (T as any).length);

  const powerOfTwo = findPowerOfTwo(1, 0, (T as any).length);
  console.log("Power of two:", powerOfTwo, Math.pow(2, powerOfTwo));

  const arr = T.slice(0, Math.pow(2, powerOfTwo)) as any;
  const mean =
    (arr as any).reduce((sum, x) => sum + x, 0) / (arr as any).length;
  const centered = (arr as any).map((x) => x - mean);

  const f = new fft(centered.length);

  // On prépare les buffers d'entrée et sortie
  const input = arr.slice();
  const output = f.createComplexArray();

  // Résultat en format complexe (alternance [real, imag, real, imag...])
  f.realTransform(output, centered);
  f.completeSpectrum(output);

  const data = [];
  const samplingInterval = 1.83; // secondes
  const samplingRate = 1 / samplingInterval; // ≈ 0.546 Hz
  for (let i = 1; i < centered.length / 2; i++) {
    const re = output[2 * i];
    const im = output[2 * i + 1];
    data.push({
      frequency: (i * samplingRate) / (centered.length / 2),
      amplitude: Math.sqrt(re * re + im * im),
    });
  }

  console.log("Data:", data);
  const amplitudes = data.map((d) => d.amplitude);
  const peakIndex = amplitudes.indexOf(Math.max(...amplitudes));
  const frequency = data[peakIndex].frequency;
  console.log("Peak frequency:", frequency, "Hz");

  if (data.length !== 0)
    await prisma.fft.createMany({
      data: data.map((d) => ({
        frequency: d.frequency,
        amplitude: d.amplitude,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    });
})();
