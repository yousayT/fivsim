// 記号化されたフィールド及びツモをプログラムが認識できる形に整形する（4色のみ対応）
// 記号ルール
// 1.記号は一行の文字列で、"T"という文字によってフィールド部とツモ部に分かれる
// 2.フィールド部は数字の羅列となっており、0~4の数字がぷよに対応している（デフォルトでは0=ぷよ無し、1=赤、2=緑、3=青、4=黄）
// 3.フィールド部は一番下の行の左からぷよを敷き詰めるように数字が書かれており、もしそれ以降ぷよが存在しないなら省略される
// 4.ツモ部は英数字と記号の羅列となっており、ツモタイプの指定、軸ぷよの色、子ぷよの色（でかぷよ除く）の順に1手ずつ書かれている
// 例："01234101234101234102341To1212"（階段積みのフィールドにでかぷよと2個ぷよのツモ）
class Decode {
  constructor(fieldRow = 16, fieldCol = 6) {
    this.fieldRow = fieldRow;
    this.fieldCol = fieldCol;
  }

  decodeToIntField(string) {
    const a = string.split('T');
    const fieldArr = a[0].split('');
    let intField = [];
    let i = 0;
    intField[0] = [];
    for(let y = this.fieldRow; y > 0; y--) {
      intField[0][y - 1] = [];
      for(let x = 0; x < this.fieldCol; x++) {
        if(i < fieldArr.length) {
          intField[0][y - 1][x] = Number(fieldArr[i]);
        } else {
          intField[0][y - 1][x] = 0;
        }
        i++;
      }
    }
    if(a[1]) {
      const tsumoArr = a[1].split('');
      intField[1] = {
        type: [],
        colors: []
      };
      let j = 0
      while(j < tsumoArr.length) {
        if(tsumoArr[j] === 'o') {
          intField[1].type.push(tsumoArr[j]);
          intField[1].colors.push(tsumoArr[j + 1]);
          j += 2;
        } else {
          intField[1].type.push(tsumoArr[j]);
          intField[1].colors.push(tsumoArr[j + 1]);
          intField[1].colors.push(tsumoArr[j + 2]);
          j += 3;
        }
      }
    }
    return intField;
  }

  decodeToField(string, one = 'r', two = 'g', three = 'b', four = 'y') {
    let intField = this.decodeToIntField(string);
    for(let y = 0; y < this.fieldRow; y++) {
      for(let x = 0; x < this.fieldCol; x++) {
        if(intField[0][y][x] === 1) {
          intField[0][y][x] = one;
        }
        if(intField[0][y][x] === 2) {
          intField[0][y][x] = two;
        }
        if(intField[0][y][x] === 3) {
          intField[0][y][x] = three;
        }
        if(intField[0][y][x] === 4) {
          intField[0][y][x] = four;
        }
      }
    }
    return intField;
  }
}

export default Decode
