/** func format thêm dấu . phân cách các đơn vị */
export function formatNumberWithDot(num: number | string = 0) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VND`;
  }
  return "0 VND";
}

export function formatNumberDot(num: number | string = 0) {
  if (num) {
    // const money = Math.round(Number(num))
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
  }
  return "";
}

/** func format tiền chẵn */
export function moneyUnits(amount: number | undefined): string {
  if (amount) {
    if (amount >= 1000000000) {
      const money = amount / 1000000000;
      const fixedNumber = amount % 1000000000;
      return `${money.toFixed(fixedNumber > 0 ? 2 : 0)} tỷ`
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    if (amount >= 1000000) {
      const money = amount / 1000000;
      const fixedNumber = amount % 1000000;
      return `${money.toFixed(fixedNumber > 0 ? 2 : 0)} triệu`.replace(
        ".",
        ","
      );
    }
    if (amount >= 1000) {
      const money = amount / 1000;
      const fixedNumber = amount % 1000;
      return `${money.toFixed(fixedNumber > 0 ? 2 : 0)} nghìn`.replace(
        ".",
        ","
      );
    }
    if (amount >= 0) {
      const money = amount;
      return `${money} đồng`;
    }
    if (amount < 0) {
      return "0 đồng";
    }
  }
  return "0 đồng";
}

/** func format tiền chẵn */
export function moneyUnitsRound(amount: number | undefined): string {
  if (amount) {
    if (amount >= 1000000000) {
      const money = amount / 1000000000;
      return `${money.toFixed(1)} tỷ`
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    if (amount >= 1000000) {
      const money = amount / 1000000;
      return `${money.toFixed(1)} triệu`
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    if (amount >= 1000) {
      const money = amount / 1000;
      return `${money.toFixed(1)} nghìn`
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
    if (amount >= 0) {
      const money = amount;
      return `${money} đồng`;
    }
    if (amount < 0) {
      return "0 đồng";
    }
  }
  return "0 đồng";
}

/** Hàm chuyển đổi tiền từ số thành chữ */
function readThree(a: any, b: any, c: any, readZeroHundred: boolean) {
  a = Number(a);
  b = Number(b);
  c = Number(c);
  // Trả về dạng mảng
  const output = [];

  // Đọc phần trăm (a) trước
  if (a !== 0 || readZeroHundred) output.push(DIGITS[a], "trăm"); // Đọc là "a trăm"

  // Nối thêm phần sau (b, c)
  // Ở đây dùng spread syntax để nối output
  output.push(...readTwo(b, c, a !== 0 || readZeroHundred));
  return output;
}

export function cvUnit(num: string) {
  let needZeroCount = num.length % 3;
  if (needZeroCount !== 0) needZeroCount = 3 - needZeroCount;

  // Thêm needZeroCount số 0 cho đủ
  num = "0".repeat(needZeroCount) + num;

  const UNITS = ["", "nghìn", "triệu", "tỷ"];

  // Định nghĩa function đọc số 3 chữ số

  // Khi thêm một từ vào thì chỉ cần push vào mảng output
  const output = [];
  for (let i = 0; i < num.length / 3; i += 1) {
    const [a, b, c] = num.substr(i * 3, 3);

    const d = Number(a);
    const e = Number(b);
    const f = Number(c);

    const isFirstGroup = i === 0;
    if (d === 0 && e === 0 && f === 0) {
      // output.push(...readThree(d, e, f, !isFirstGroup)) // Dùng spread operator
      // output.push(UNITS[num.length / 3 - 1 - i])
      output.push("");
    } else {
      output.push(...readThree(d, e, f, !isFirstGroup)); // Dùng spread operator
      output.push(UNITS[num.length / 3 - 1 - i]);
    }
  }

  const money = `${output.join(" ")}`;
  return `${`${money.charAt(0).toUpperCase()}${money.slice(
    1
  )}`.trim()} Việt Nam Đồng`;
}

// Mảng DIGITS là các từ tương ứng với chữ số 0-9
const DIGITS = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];

// Định nghĩa function đọc hai số cuối
function readTwo(b: any, c: any, hasHundred: boolean) {
  b = Number(b);
  c = Number(c);
  const output = [];

  switch (b) {
    case 0: {
      // Trường hợp ngoại lệ bàn ở dưới ở đây
      // Nếu có đọc hàng trăm (đọc rồi) và b = 0, c = 0
      // thì không đọc nữa
      if (hasHundred && c === 0) break;
      if (hasHundred) output.push("lẻ"); // ví dụ a05 đọc là "a lẻ năm"
      output.push(DIGITS[c]);
      break;
    }

    case 1: {
      // Trường hợp số hàng chục là 10
      output.push("mười");
      if (c === 5) output.push("lăm"); // Mười lăm
      else if (c !== 0) output.push(DIGITS[c]);
      // Trường hợp c = 0 không xét vì đã đọc "mười" rồi
      break;
    }

    default: {
      output.push(DIGITS[b], "mươi"); // b mươi
      if (c === 1) output.push("mốt");
      // Chỗ này đọc "tư" hay "bốn" thì các bạn điều chỉnh nhe
      // Mình sẽ luôn đọc là "tư" nhé
      else if (c === 4) output.push("tư");
      else if (c === 5) output.push("lăm");
      else if (c !== 0) output.push(DIGITS[c]);
      // Không đọc c = 0 vì đã đọc "b mươi" rồi
      break;
    }
  }

  // Trả về mảng output, xem lại phần trước nhé
  return output;
}
