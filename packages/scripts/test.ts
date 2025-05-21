function maxSubArray(nums: number[]) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Soit on étend la somme actuelle, soit on recommence à partir de nums[i]
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

    // On garde le meilleur résultat obtenu jusque-là
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }

  return maxSoFar;
}

(async () => {
  const list = [2, 8, -2, -3, 1, -4, 3, -9, 2, 2, 5, -4, -1, 3, 1, -6, 4, 2];
  const max = maxSubArray(list);
  console.log(`Max sum is ${max}`);
  process.exit(0);
})();
