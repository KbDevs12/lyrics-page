"use server";
function getRanNum() {
  let num = Math.floor(Math.random() * 4);
  if (num === 1) num++;
  return num;
}
export const topResponse = async () => {
  const num = getRanNum();
  console.log(num);
  const response = await fetch(`https://api.deezer.com/chart/${num}/tracks`);
  const datas = await response.json();
  const data = datas.data.slice(0, 8);
  return data;
};
