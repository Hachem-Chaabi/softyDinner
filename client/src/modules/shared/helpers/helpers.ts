export const formatRate = (rate: number) => {
  return String(rate)?.length === 1 ? `${rate}.0` : rate
}
