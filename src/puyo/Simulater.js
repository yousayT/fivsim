import React, {useState, useEffect, useRef, useCallback} from 'react'
import Random from './random.js'
import Decode from './decode.js'

// キャラ性能リスト
export const CHARA_LIST = [
  {
    name: 'アルル',
    tsumoPattern: ['2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2'],
    normalRatio: [0, 0, 8, 17, 23, 35, 71, 118, 178, 239, 300, 377, 454, 534, 613, 693, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 76, 101, 151, 176, 181, 216, 252, 277, 302, 328]
  },
  {
    name: 'アミティ',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', '2', 'o', '2', '2', '2', '_', '2', '2', '2', '4'],
    normalRatio: [0, 0, 8, 17, 22, 34, 67, 112, 168, 224, 280, 350, 420, 490, 560, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 21, 34, 56, 84, 112, 168, 196, 202, 239, 280, 308, 336, 364]
  },
  {
    name: 'りんご',
    tsumoPattern: ['2', '2', '2', '|', 'o', '2', '2', '2', '_', 'o', '4', '2', '2', '|', '2', '|'],
    normalRatio: [0, 0, 8, 15, 20, 30, 60, 101, 151, 202, 252, 315, 378, 441, 504, 567, 630, 693, 699, 699],
    feverRatio: [0, 0, 6, 12, 15, 22, 35, 59, 91, 122, 186, 220, 228, 276, 328, 365, 403, 437]
  },
  {
    name: 'アリィ',
    tsumoPattern: ['2', '2', '2', '2', '|', '2', '2', '2', '2', 'o', '2', '2', '2', '2', '2', '4'],
    normalRatio: [0, 0, 8, 17, 23, 35, 71, 118, 178, 239, 300, 377, 454, 534, 613, 693, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 76, 101, 151, 176, 181, 216, 252, 277, 302, 328]
  },
  {
    name: 'ルルー',
    tsumoPattern: ['2', '2', '2', '4', '2', '2', '2', 'o', '2', '2', '2', '4', '2', '2', '2', 'o'],
    normalRatio: [0, 0, 8, 17, 23, 36, 74, 125, 192, 260, 330, 420, 512, 617, 699, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 10, 14, 20, 32, 54, 78, 106, 160, 190, 198, 239, 284, 317, 351, 380]
  },
  {
    name: 'シェゾ',
    tsumoPattern: ['2', '2', '2', '2', '|', '2', '4', '2', '_', '2', 'o', '2', '|', '2', '4', '2'],
    normalRatio: [0, 0, 8, 16, 23, 36, 77, 132, 202, 274, 350, 447, 546, 661, 699, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 10, 13, 17, 29, 48, 72, 97, 146, 171, 177, 211, 249, 276, 302, 328]
  },
  {
    name: 'シグ',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', '2', '4', '2', '2', '_', '2', 'o', '2', '2', '4'],
    normalRatio: [0, 0, 8, 15, 20, 30, 60, 101, 151, 202, 252, 315, 378, 441, 504, 567, 630, 693, 699, 699],
    feverRatio: [0, 0, 8, 14, 17, 24, 38, 64, 97, 130, 197, 230, 237, 283, 333, 368, 403, 437]
  },
  {
    name: 'まぐろ',
    tsumoPattern: ['2', '2', '|', '2', '2', '_', '2', '2', '4', '2', '2', 'o', '2', '2', '2', '4'],
    normalRatio: [0, 0, 9, 17, 23, 34, 67, 111, 164, 217, 269, 332, 395, 451, 510, 567, 623, 678, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 20, 32, 53, 79, 105, 156, 181, 186, 219, 255, 279, 302, 328]
  },
  {
    name: 'すけとうだら',
    tsumoPattern: ['2', '2', '|', '2', '2', '_', '2', 'o', '2', '|', '2', '2', '_', '2', '2', 'o'],
    normalRatio: [0, 0, 8, 15, 20, 29, 57, 94, 141, 187, 232, 289, 344, 397, 451, 504, 556, 608, 655, 699],
    feverRatio: [0, 0, 8, 14, 17, 24, 38, 64, 97, 130, 197, 230, 237, 283, 333, 368, 403, 437]
  },
  {
    name: 'りすくませんぱい',
    tsumoPattern: ['2', '_', '2', '2', '2', '2', 'o', '2', '2', '2', '2', '4', '2', '2', '|', '2'],
    normalRatio: [0, 0, 8, 15, 21, 31, 64, 107, 161, 216, 272, 342, 412, 485, 557, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 8, 15, 17, 24, 37, 61, 91, 120, 178, 206, 211, 247, 286, 311, 336, 364]
  },
  {
    name: 'ラフィーナ',
    tsumoPattern: ['2', '2', '|', '2', '2', 'o', '2', '2', '2', '_', '2', '2', '|', '2', '2', '4'],
    normalRatio: [0, 0, 8, 17, 23, 36, 74, 125, 192, 260, 330, 420, 512, 617, 699, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 10, 14, 20, 32, 54, 83, 111, 169, 201, 209, 252, 300, 334, 370, 400]
  },
  {
    name: 'ラグナス',
    tsumoPattern: ['2', '2', '2', '2', '|', '2', '4', '2', '_', '2', 'o', '2', '|', '2', '4', '2'],
    normalRatio: [0, 0, 8, 17, 23, 35, 70, 112, 165, 220, 275, 332, 395, 451, 510, 567, 623, 678, 699, 699],
    feverRatio: [0, 0, 7, 13, 14, 19, 32, 53, 79, 105, 155, 180, 185, 218, 254, 279, 302, 328]
  },
  {
    name: 'ドラコケンタウロス',
    tsumoPattern: ['2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '|', '_', 'o', '_', '|', '4'],
    normalRatio: [0, 0, 8, 17, 24, 36, 74, 125, 188, 253, 319, 402, 487, 578, 666, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 10, 13, 17, 27, 45, 67, 90, 134, 157, 161, 192, 224, 246, 269, 291]
  },
  {
    name: 'ウィッチ',
    tsumoPattern: ['_', '|', '2', '2', '_', '2', '2', '2', '4', '2', '2', '2', 'o', '2', '2', '2'],
    normalRatio: [0, 0, 8, 16, 21, 32, 64, 106, 160, 213, 266, 333, 399, 465, 532, 598, 628, 654, 678, 699],
    feverRatio: [0, 0, 7, 13, 16, 22, 34, 57, 87, 115, 174, 204, 209, 250, 293, 323, 353, 382]
  },
  {
    name: 'ヘド',
    tsumoPattern: ['2', '2', '|', '2', '2', '_', '2', 'o', '2', '|', '2', '2', '_', '2', '2', 'o'],
    normalRatio: [0, 0, 8, 15, 20, 29, 58, 95, 145, 190, 240, 289, 344, 397, 451, 504, 556, 608, 655, 699],
    feverRatio: [0, 0, 8, 14, 17, 24, 38, 62, 95, 128, 195, 229, 236, 282, 332, 367, 403, 437]
  },
  {
    name: 'スルターナ',
    tsumoPattern: ['|', '2', 'o', '2', '_', '2', '4', '2', 'o', '2', '|', '2', '4', '2', '_', '2'],
    normalRatio: [0, 0, 8, 15, 20, 29, 57, 94, 141, 187, 232, 287, 342, 396, 450, 503, 555, 607, 654, 699],
    feverRatio: [0, 0, 8, 13, 17, 22, 35, 60, 89, 118, 175, 202, 208, 245, 285, 310, 336, 364]
  },
  {
    name: 'ホウライ',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', 'o', '2', '2', '_', '2', '2', 'o', '2', '2', '4'],
    normalRatio: [0, 0, 8, 17, 24, 36, 74, 125, 188, 254, 320, 402, 487, 578, 666, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 10, 13, 18, 29, 47, 69, 92, 136, 160, 163, 195, 227, 250, 269, 291]
  },
  {
    name: 'ハーピー',
    tsumoPattern: ['2', '|', '2', 'o', '2', '_', '2', 'o', '2', '|', '2', '4', '2', '2', '2', '4'],
    normalRatio: [0, 0, 8, 15, 20, 30, 60, 101, 151, 202, 252, 315, 378, 441, 504, 567, 630, 693, 699, 699],
    feverRatio: [0, 0, 6, 12, 15, 21, 32, 55, 85, 120, 175, 205, 215, 260, 315, 340, 353, 382]
  },
  {
    name: 'セリリ',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', '_', 'o', '2', '2', '|', 'o', '2', '2', '_', '4'],
    normalRatio: [0, 0, 8, 17, 23, 36, 74, 90, 125, 192, 260, 330, 420, 490, 512, 617, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 12, 15, 20, 31, 52, 77, 110, 150, 175, 180, 215, 250, 275, 300, 325]
  },
  {
    name: 'シエル',
    tsumoPattern: ['2', '2', '|', '2', '_', '2', 'o', '2', '|', '2', 'o', '2', '_', '2', '2', '4'],
    normalRatio: [0, 0, 8, 16, 23, 36, 77, 132, 200, 270, 350, 445, 540, 660, 699, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 75, 100, 150, 175, 180, 215, 250, 275, 300, 330]
  },
  {
    name: 'ハルトマン',
    tsumoPattern: ['2', '|', '2', 'o', '2', '_', '2', '2', '2', '|', '2', '4', '2', 'o', '2', '_'],
    normalRatio: [0, 0, 8, 17, 22, 34, 68, 113, 170, 225, 280, 350, 420, 490, 560, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 20, 33, 54, 80, 106, 157, 181, 186, 219, 255, 279, 302, 328]
  },
  {
    name: 'アレックス',
    tsumoPattern: ['2', '|', '2', '_', '2', '|', '2', 'o', '2', '_', '2', '|', '2', '_', '2', '4'],
    normalRatio: [0, 0, 8, 17, 23, 36, 74, 125, 192, 260, 335, 425, 515, 615, 630, 655, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 76, 101, 153, 178, 183, 218, 254, 279, 302, 328]
  },
  {
    name: 'カーバンクル',
    tsumoPattern: ['2', '|', 'o', '2', '4', '_', '2', 'o', '2', '|', '4', '2', 'o', '_', '2', '4'],
    normalRatio: [0, 0, 8, 17, 22, 34, 67, 112, 168, 224, 280, 350, 420, 490, 560, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 21, 34, 56, 84, 112, 168, 196, 202, 239, 280, 308, 336, 364]
  },
  {
    name: 'サタン',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', '2', 'o', '2', '2', '2', '4', '2', '2', '2', 'o'],
    normalRatio: [0, 0, 8, 16, 23, 36, 75, 125, 188, 255, 325, 410, 520, 610, 655, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 76, 101, 151, 176, 181, 216, 252, 280, 302, 328]
  },
  {
    name: 'ラフィソル',
    tsumoPattern: ['2', '2', '2', '|', '2', '2', '2', '_', '2', '4', '|', 'o', '2', '4', '_', 'o'],
    normalRatio: [0, 0, 8, 16, 23, 36, 77, 132, 202, 274, 350, 447, 546, 661, 699, 699, 699, 699, 699, 699],
    feverRatio: [0, 0, 6, 11, 14, 19, 30, 50, 76, 101, 151, 176, 181, 216, 252, 277, 302, 328]
  },
  {
    name: 'パプリス',
    tsumoPattern: ['2', '|', '2', '2', '_', '2', '2', '|', '4', '2', 'o', '_', '2', 'o', '2', '4'],
    normalRatio: [0, 0, 9, 18, 24, 36, 73, 122, 183, 244, 306, 382, 459, 535, 612, 688, 765, 765, 765, 765],
    feverRatio: [0, 0, 8, 15, 18, 25, 40, 67, 100, 134, 201, 235, 242, 287, 336, 369, 403, 410]
  },
  {
    name: 'マール',
    tsumoPattern: ['2', '2', 'o', '2', '4', '2', '2', 'o', '2', '4', '2', '2', 'o', '2', '2', '4'],
    normalRatio: [0, 0, 8, 17, 22, 34, 67, 112, 168, 224, 280, 350, 420, 490, 560, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 21, 34, 56, 84, 112, 168, 196, 202, 239, 280, 308, 336, 364]
  },
  {
    name: '3こぷよオンリー',
    tsumoPattern: ['|', '_', '|', '_', '|', '_', '|', '_', '|', '_', '|', '_', '|', '_', '|', '_'],
    normalRatio: [0, 0, 8, 17, 22, 34, 67, 112, 168, 224, 280, 350, 420, 490, 560, 630, 699, 699, 699, 699],
    feverRatio: [0, 0, 7, 13, 15, 21, 34, 56, 84, 112, 168, 196, 202, 239, 280, 308, 336, 364]
  }
];

function Simulater(props) {

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [drawDestination, setDrawDestination] = useState(true);




  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    setContext(ctx);

  }, [])


  useEffect(() => {
    // ここの書き方は変更されるかも
    // loadSeeds('hiradumi', 13, false);
    // listLinkedPuyo();
    // checkErase();
    // returnPuyo();
    // setTsumo();
    // loadTsumo();
    // loadDestination();
    // drawAll();
    const puyoImage = new Image();
    puyoImage.src = 'puyo_image_transparent.png';

    // 連結ボーナスは「連結ぷよ数 - 4」
    // 色数ボーナス
    const COLOR_RATIO = [0, 0, 2, 4, 8]

    // 連鎖のタネの種類
    const SEEDS_TYPES = {
      kaidan: [
        '',
        '',
        '',
        '00341000341000341000414T',
        '0421300421300421300213100042T',
        '12134102134102134001341000213T',
        '042312042312042312023144010424T',
        '4321414321414321413214103400003000004000003T',
        '1343121343121343123431443104243000001000003T',
        '4213414213414213412134332443132400004200002000003T',
        '2134212134212134211342441234142332201200001200002000001T',
        '4321434321434321433214113421313244434420033420004000003T',
        '432132432132432132321344312424323332112022312003400002300003T',
        '241324241324241324413233421343212224421044421033200034400002000001T',
        '234313234312234312343132324323221114344334324113200134300004000001000004T',
        '21342421342421342413421114314143222314311314322123111310032340002200001T'
      ],
      hasamikomi: [
        '',
        '',
        '',
        '0413300443000011000013000001000004T',
        '042133044110002230002130004T',
        '012341011331002244002341000001000004000004T',
        '321423332443021122021423000003000001000004T',
        '4314324434422311332314322000024000044000044000002T',
        '2314322234421311331314321234022200001000002T',
        '34132433433414112214132413230432240013000033T',
        '432132443112132233132132143212432201143001443T',
        '4321424431122322442321422432124331132422034432T',
        '432142443112232244232142243212433113242233443201000003T',
        '131432113442231133231432213212133113212233113244000043000001000003T',
        '432142443112232244232142241212442113211233441211200033000031000013000001T',
        '124324112334424422424324112434422331414411112433443344002224000041000033T'
      ],
      hiradumi: [
        '',
        '',
        '',
        '002411002244000411000004000004000001000001T',
        '333144222311013144T',
        '4112333441223312334000024000024000003T',
        '4332441443221132443340001300004T',
        '1441333114113341334424004220003400001T',
        '31123343312244123322312033110022300034T',
        '13342241134444342222113411334422113041000041T',
        '411433244144221433114112441223114133240002240002000003T',
        '144322311433334322442443224332432422413044301004100002000003T',
        '433122144311113122224331443112224322140144140011000044000021T',
        '233122122311113122442441224113442433121344021133000344000031T',
        '311233433122441233223114331442223122431211431122044211041024T',
        '133422211344223422331334113441331311223133111311443133140114230032100034T'
      ],
      zabuton: [
        '',
        '',
        '',
        '2221103332101110003000002T',
        '2221104442103330004440003000004000002000001T',
        '4443301114302220003330004440003000002000001000004000003T',
        '3334401113404440002220001110003330001000002000004000001000003000004T',
        '4443301132302220204440001110002220001000004000002000001000001000004T',
        '2223344434342220433330031110004440001000003000002000004000004000002T',
        '1113314431312223131110334440012220034000001000002000004000004000001T',
        '4441143314142221413332114440221110024000013000042000013000003000004T',
        '1113312231311114143332442223224440332000233000241000012000032000001T',
        '4442243324241112422223224441331112134022312010011000003000003000004T',
        '1114412241413334144442442221223334122422214344013000022000002000001T',
        '1113312231314443131112332224224443422331141403144004412004132000001T',
        '444114331414222141111411333244222124311332220132310211340022400011100033T'
      ],
    };

    // フィールドサイズ
    const FIELD_COL = 6;
    const FIELD_ROW = 16;

    // フィールドのうち、ツモ表示用の列
    const TSUMO_FIELD = 3;

    // ぷよのサイズ
    const PUYO_SIZE = 30;

    // ぷよの色
    // 赤、緑、青、黄、紫、お邪魔の順
    const PUYO_COLORS = ['r', 'g', 'b', 'y', 'p', 'o'];

    // ツモの種類
    // ２個ぷよ、３個ぷよ（縦）、３個ぷよ（横）、４個ぷよ、でかぷよの順
    const TSUMO_TYPES = ['2', '|', '_', '4', 'o'];

    // ぷよが消える個数
    const ERASE_PUYO_COUNT = 4;

    // ツモを生成する数
    const TSUMO_GEN_NUM = 640;

    // ぷよの色数
    const PUYO_COLORS_NUM = [3, 4, 5]

    // 得点表示の座標
    const SCORE_FIELD_X = 1;
    const SCORE_FIELD_Y = 16.5;
    const SCORE_FIELD_WIDTH = 6;

    // 予告ぷよのお邪魔ぷよ数
    const YOKOKU = [1440, 720, 360, 180, 30, 6, 1];

    // 予告ぷよ表示の座標
    const YOKOKU_FIELD_X = 1;
    const YOKOKU_FIELD_Y = 18;

    // 連鎖数表示の座標
    const RENSA_NUM_FIELD_X = 7;
    const RENSA_NUM_FIELD_Y = 18;
    const RENSA_NUM_FIELD_WIDTH = 3;

    // 現在のツモ
    // x: 軸ぷよのx座標
    // rotStat: 回転の状況（初期位置0から時計回りに0, 1, 2, 3）、でかぷよの時は現在の色のインデックス（0から4まで、赤、緑、青、黄、紫の順）
    // type: ツモのタイプ
    // jiku: 軸ぷよの色（3個ぷよの時はゾロのぷよの色、4個ぷよの時は左側のぷよの色、でかぷよの時は現在の色）
    // nonJiku: 軸ぷよ以外のぷよの色（4個ぷよの時は右側のぷよの色、でかぷよの時はnull)
    const tsumo = {
      x: 2,
      type: null,
      rotStat: 0,
      jiku: null,
      nonJiku: null
    }

    // ネクスト
    const nextTsumo = {
      x: 7,
      type: null,
      rotStat: 0,
      jiku: null,
      nonJiku: null
    }

    // ネクネク
    const nextNextTsumo = {
      x: 7,
      type: null,
      rotStat: 0,
      jiku: null,
      nonJiku: null
    }

    // 現在のツモの目的地
    let dests = [];

    // フィールドの中身
    let field = [];

    // 繋がっているぷよ全体を表す二次元配列
    let linkedPuyo = [];

    // 繋がっているとある色のぷよを表す配列
    let puyoBlock = [];

    // 消える予定のぷよ
    let erasingPuyo = [];

    // 残る予定のぷよ
    let existingPuyo = [];

    // 落ちた後のぷよ
    let falledPuyo = [];

    // れんさ数
    let rensaCount = 0;

    // 用意されたツモ
    let tsumoColors = [];

    // 現在のツモの色の消費数
    let tsumoColorCount = 0;

    // 現在のツモの手数
    let tsumoCount = 0;

    // 現在のツモパターンの位置（0~15)
    let tsumoPatternCount = 0;

    // 場面の記録
    let fieldRecords = [];

    // キー操作を受け付けるかどうか
    let acceptKeyDown = true;

    // 現在選ばれているキャラの番号
    let charaNum = props.chara;

    // 得点
    let score = 0;

    // 前回連鎖時までの得点
    let beforeScore = 0;

    // 得点の記録
    let scoreRecords = [];

    // フィーバーモード中に一度でも消したかどうか
    let checkFeverErase = false;

    // ゴーストを表示するかどうか
    let isDrawDestination = drawDestination;

    // 初期化
    const init = () => {
      // フィールドのクリア
      for(let y = 0; y < FIELD_ROW; y++) {
        field[y] = [];
        for(let x = 0; x < FIELD_COL; x++) {
          field[y][x] = 0;
        }
      }
      // フィールドフレーム
      // for(let y = 0; y < FIELD_ROW - TSUMO_FIELD - 1; y++) {
      //   drawPuyo(0, y + 4, 0, 7, puyoImage);
      //   drawPuyo(7, y + 4, 2, 7, puyoImage);
      // }
      // for(let x = 0; x < FIELD_COL; x++) {
      //   drawPuyo(x + 1, FIELD_ROW, 4, 7, puyoImage);
      // }
      // drawPuyo(0, FIELD_ROW, 1, 7, puyoImage);
      // drawPuyo(7, FIELD_ROW, 3, 7, puyoImage);

      context.clearRect(PUYO_SIZE, 0, PUYO_SIZE * FIELD_COL, PUYO_SIZE * FIELD_ROW);
      context.clearRect(PUYO_SIZE * 8, 0, PUYO_SIZE * 2, PUYO_SIZE * 9);

      context.fillStyle = '#aaa'
      context.fillRect(PUYO_SIZE, PUYO_SIZE * 4, PUYO_SIZE * FIELD_COL, PUYO_SIZE * (FIELD_ROW - TSUMO_FIELD - 1))

      // 窒息地点のマーク
      drawPuyo(3, TSUMO_FIELD + 1, 5, 7, puyoImage);
      drawPuyo(4, TSUMO_FIELD + 1, 5, 7, puyoImage);
      context.fillStyle = "#38D";
      context.font = "38px sans-serif";
      context.textBaseline = "top";
      context.textAlign = "right";
      context.clearRect(SCORE_FIELD_X * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE, 2.5 * PUYO_SIZE);
      context.fillText(score, (SCORE_FIELD_X + FIELD_COL) * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE);
      context.clearRect(RENSA_NUM_FIELD_X * PUYO_SIZE, RENSA_NUM_FIELD_Y * PUYO_SIZE, RENSA_NUM_FIELD_WIDTH * PUYO_SIZE, 1.5 * PUYO_SIZE);
    }

    // ぷよ1つを描画する
    // x: 描画先x座標、y: 描画先y座標、col: 参照元x座標、row: 参照元y座標、src: 参照イメージ
    const drawPuyo = (x, y, col, row, src) => {
      let px = x * PUYO_SIZE;
      let py = y * PUYO_SIZE;

      context.drawImage(src,
        col * PUYO_SIZE, row * PUYO_SIZE, PUYO_SIZE, PUYO_SIZE,
        px, py, PUYO_SIZE, PUYO_SIZE
      );
    }

    // ぷよを全て描画する
    const drawAll = () => {
      // ぷよの連結を描写する
      const drawLink = (puyoBlock, puyo) => {
        // 左の桁から上、左、下、右につながるぷよがあるかないかを示す数（例： 1010は上と下につながるぷよがある）
        let directIndic = 0;
        for (let i = 0; i < puyoBlock.length; i++) {
          if(puyo.x === puyoBlock[i].x && puyo.y === puyoBlock[i].y + 1) {
            directIndic += 1000;
          } else if (puyo.x === puyoBlock[i].x + 1 && puyo.y === puyoBlock[i].y) {
            directIndic += 100;
          } else if (puyo.x === puyoBlock[i].x && puyo.y === puyoBlock[i].y - 1) {
            directIndic += 10;
          } else if (puyo.x === puyoBlock[i].x - 1 && puyo.y === puyoBlock[i].y) {
            directIndic += 1;
          }
        }
        switch (directIndic) {
          case 0:
            drawPuyo(puyo.x + 1, puyo.y, 0, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 10:
            drawPuyo(puyo.x + 1, puyo.y, 1, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1:
            drawPuyo(puyo.x + 1, puyo.y, 2, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1000:
            drawPuyo(puyo.x + 1, puyo.y, 3, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 100:
            drawPuyo(puyo.x + 1, puyo.y, 4, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 11:
            drawPuyo(puyo.x + 1, puyo.y, 5, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1001:
            drawPuyo(puyo.x + 1, puyo.y, 6, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1100:
            drawPuyo(puyo.x + 1, puyo.y, 7, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 110:
            drawPuyo(puyo.x + 1, puyo.y, 8, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1010:
            drawPuyo(puyo.x + 1, puyo.y, 9, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 101:
            drawPuyo(puyo.x + 1, puyo.y, 10, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 111:
            drawPuyo(puyo.x + 1, puyo.y, 11, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1011:
            drawPuyo(puyo.x + 1, puyo.y, 12, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1101:
            drawPuyo(puyo.x + 1, puyo.y, 13, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1110:
            drawPuyo(puyo.x + 1, puyo.y, 14, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
          case 1111:
            drawPuyo(puyo.x + 1, puyo.y, 15, PUYO_COLORS.indexOf(puyo.c), puyoImage);
            break;
        }
      }
      // ツモを描写する
      const drawTsumo = (tsumo, y = 0) => {
        // 2個ぷよ3個ぷよ素材の軸ぷよの座標をrotStatごとに表す配列
        const JIKU_X = [0, 2, 5, 7];
        const JIKU_Y = [1, 0, 0, 1];
        // 2個ぷよの子ぷよの軸ぷよに対する座標をrotStatごとに表す配列
        const NON_JIKU_2_X = [0, 1, 0, -1];
        const NON_JIKU_2_Y = [-1, 0, 1, 0];
        // 3個ぷよ（縦）の子ぷよの軸ぷよに対する座標をrotStatごとに表す配列
        const NON_JIKU_3_X = [1, 0, -1, 0];
        const NON_JIKU_3_Y = [0, 1, 0, -1];
        // 4マスのうち3個ぷよが存在しないマスの座標をrotStatごとに表す配列（黄ぷよの3こぷよ用）
        const NON_JIKU_4_X = [1, 1, -1, -1];
        const NON_JIKU_4_Y = [-1, 1, 1, -1];
        // 2個ぷよ3個ぷよ4個ぷよでかぷよ素材の始まりのY座標を表す定数
        const DOUBLE_Y = 8;
        const TRIPLE_Y = 14;
        const QUADRUPLE_Y = 20;
        const DEKA_Y = 30;
        // tsumo.jikuの色番号
        let jikuNum = PUYO_COLORS.indexOf(tsumo.jiku);
        // tsumo.nonJikuの色番号
        let nonJikuNum;
        if(tsumo.nonJiku) {
          nonJikuNum = PUYO_COLORS.indexOf(tsumo.nonJiku);
        }
        if(tsumo.type === '2') {
          // ツモがゾロかどうか
          if(tsumo.jiku === tsumo.nonJiku) {
            drawPuyo(tsumo.x + 1, 1 + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_2_X[tsumo.rotStat], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_2_Y[tsumo.rotStat], puyoImage);
          } else {
            drawPuyo(tsumo.x + 1, 1 + y, 0, jikuNum, puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, 0, nonJikuNum, puyoImage);
          }
        } else if (tsumo.type === '|') {
          if(tsumo.jiku === tsumo.nonJiku) {
            drawPuyo(tsumo.x + 1, 1 + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_2_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_2_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_3_X[tsumo.rotStat], 1 + NON_JIKU_3_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_3_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_3_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_4_X[tsumo.rotStat], 1 + NON_JIKU_4_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_4_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_4_Y[tsumo.rotStat], puyoImage);
          } else {
            drawPuyo(tsumo.x + 1, 1 + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_2_X[tsumo.rotStat], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_2_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_3_X[tsumo.rotStat], 1 + NON_JIKU_3_Y[tsumo.rotStat] + y, 0, nonJikuNum, puyoImage);
          }
        } else if (tsumo.type === '_') {
          if(tsumo.jiku === tsumo.nonJiku) {
            drawPuyo(tsumo.x + 1, 1 + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_2_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_2_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_3_X[tsumo.rotStat], 1 + NON_JIKU_3_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_3_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_3_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_4_X[tsumo.rotStat], 1 + NON_JIKU_4_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[tsumo.rotStat] + NON_JIKU_4_X[tsumo.rotStat], TRIPLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[tsumo.rotStat] + NON_JIKU_4_Y[tsumo.rotStat], puyoImage);
          } else {
            drawPuyo(tsumo.x + 1, 1 + y, (jikuNum % 2) * 8 + JIKU_X[(tsumo.rotStat + 1) % 4], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[(tsumo.rotStat + 1) % 4], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_3_X[tsumo.rotStat], 1 + NON_JIKU_3_Y[tsumo.rotStat] + y, (jikuNum % 2) * 8 + JIKU_X[(tsumo.rotStat + 1) % 4] + NON_JIKU_3_X[tsumo.rotStat], DOUBLE_Y + (Math.floor(jikuNum / 2) * 2) + JIKU_Y[(tsumo.rotStat + 1) % 4] + NON_JIKU_3_Y[tsumo.rotStat], puyoImage);
            drawPuyo(tsumo.x + 1 + NON_JIKU_2_X[tsumo.rotStat], 1 + NON_JIKU_2_Y[tsumo.rotStat] + y, 0, nonJikuNum, puyoImage);
          }
        } else if (tsumo.type === '4') {
          let smallNum;
          let largeNum;
          let adj;
          if(jikuNum < nonJikuNum) {
            smallNum = jikuNum;
            largeNum = nonJikuNum;
            adj = 0;
          } else {
            smallNum = nonJikuNum;
            largeNum = jikuNum;
            adj = 2;
          }
          if(smallNum === 0) {
            drawPuyo(tsumo.x + 1, 0 + y, ((largeNum - 1) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + Math.floor((largeNum - 1) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 1, 1 + y, ((largeNum - 1) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + Math.floor((largeNum - 1) / 2) * 2 + 1, puyoImage);
            drawPuyo(tsumo.x + 2, 0 + y, ((largeNum - 1) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + Math.floor((largeNum - 1) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 2, 1 + y, ((largeNum - 1) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + Math.floor((largeNum - 1) / 2) * 2 + 1, puyoImage);
          } else if(smallNum === 1) {
            drawPuyo(tsumo.x + 1, 0 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 4 + Math.floor((largeNum - 2) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 1, 1 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 4 + Math.floor((largeNum - 2) / 2) * 2 + 1, puyoImage);
            drawPuyo(tsumo.x + 2, 0 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 4 + Math.floor((largeNum - 2) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 2, 1 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 4 + Math.floor((largeNum - 2) / 2) * 2 + 1, puyoImage);
          } else if(smallNum === 2) {
            drawPuyo(tsumo.x + 1, 0 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 6 + Math.floor((largeNum - 2) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 1, 1 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 6 + Math.floor((largeNum - 2) / 2) * 2 + 1, puyoImage);
            drawPuyo(tsumo.x + 2, 0 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 6 + Math.floor((largeNum - 2) / 2) * 2, puyoImage);
            drawPuyo(tsumo.x + 2, 1 + y, ((largeNum - 2) % 2) * 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 6 + Math.floor((largeNum - 2) / 2) * 2 + 1, puyoImage);
          } else {
            drawPuyo(tsumo.x + 1, 0 + y, 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 8, puyoImage);
            drawPuyo(tsumo.x + 1, 1 + y, 8 + ((tsumo.rotStat + adj) % 4) * 2, QUADRUPLE_Y + 8 + 1, puyoImage);
            drawPuyo(tsumo.x + 2, 0 + y, 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 8, puyoImage);
            drawPuyo(tsumo.x + 2, 1 + y, 8 + ((tsumo.rotStat + adj) % 4) * 2 + 1, QUADRUPLE_Y + 8 + 1, puyoImage);
          }
        } else {
          drawPuyo(tsumo.x + 1, 0 + y, tsumo.rotStat * 2, DEKA_Y, puyoImage);
          drawPuyo(tsumo.x + 1, 1 + y, tsumo.rotStat * 2, DEKA_Y + 1, puyoImage);
          drawPuyo(tsumo.x + 2, 0 + y, tsumo.rotStat * 2 + 1, DEKA_Y, puyoImage);
          drawPuyo(tsumo.x + 2, 1 + y, tsumo.rotStat * 2 + 1, DEKA_Y + 1, puyoImage);
        }
      }

      context.clearRect(PUYO_SIZE, 0, PUYO_SIZE * FIELD_COL, PUYO_SIZE * FIELD_ROW);
      context.clearRect(PUYO_SIZE * 8, 0, PUYO_SIZE * 2, PUYO_SIZE * 9);

      context.fillStyle = '#aaa'
      context.fillRect(PUYO_SIZE, PUYO_SIZE * 4, PUYO_SIZE * FIELD_COL, PUYO_SIZE * (FIELD_ROW - TSUMO_FIELD - 1))
      // 窒息地点のマーク
      drawPuyo(3, TSUMO_FIELD + 1, 5, 7, puyoImage);
      drawPuyo(4, TSUMO_FIELD + 1, 5, 7, puyoImage);

      // 目的地の描写
      if(dests.length && isDrawDestination) {
        dests.filter(dest => dest.y > 1).forEach(dest => drawPuyo(dest.x + 1, dest.y, PUYO_COLORS.indexOf(dest.color), 5, puyoImage));
      }
      // 消えているぷよの描写
      if(erasingPuyo.length) {
        erasingPuyo.forEach(erasingPuyoBlock => {
          erasingPuyoBlock.forEach(erasingPuyo => {
            drawPuyo(erasingPuyo.x + 1, erasingPuyo.y, PUYO_COLORS.indexOf(erasingPuyo.c), 6, puyoImage);
          });
        });
      }
      // 残っているぷよの描写
      if(existingPuyo.length) {
        existingPuyo.forEach((existingPuyoBlock) => {
          existingPuyoBlock.forEach((existingPuyo) => {
            drawLink(existingPuyoBlock, existingPuyo);
          })
        })
      }
      // これから落ちるぷよの描写
      if(falledPuyo.length) {
        falledPuyo.forEach((falledPuyoBlock) => {
          falledPuyoBlock.forEach((falledPuyo) => {
            drawLink(falledPuyoBlock, falledPuyo);
          });
        });
      }
      // 13段目のぷよの描写
      for(let x = 0; x < FIELD_COL; x++) {
        if(field[3][x]) {
          drawPuyo(x + 1, 3, 0, PUYO_COLORS.indexOf(field[3][x]), puyoImage);
        }
      }
      // 現在のツモの描写
      for(let y = 0; y < TSUMO_FIELD; y++) {
        for(let x = 0; x < FIELD_COL; x++) {
          if(field[y][x]) {
            drawTsumo(tsumo);
            break;
          }
        }
      }
      // ネクスト、ネクネクの描写
      if(nextTsumo.type) {
        drawTsumo(nextTsumo, 4);
      }
      if(nextNextTsumo.type) {
        drawTsumo(nextNextTsumo, 7);
      }
    }

    // 現在のツモを読み込む
    const loadTsumo = () => {
      if(tsumo.type === '2') {
        field[0][2] = tsumo.nonJiku;
        field[1][2] = tsumo.jiku;
      } else if (tsumo.type === '|') {
        field[0][2] = tsumo.jiku;
        field[1][2] = tsumo.jiku;
        field[1][3] = tsumo.nonJiku;
      } else if (tsumo.type === '_') {
        field[0][2] = tsumo.nonJiku;
        field[1][2] = tsumo.jiku;
        field[1][3] = tsumo.jiku;
      } else if (tsumo.type === '4') {
        field[0][2] = tsumo.jiku;
        field[1][2] = tsumo.jiku;
        field[0][3] = tsumo.nonJiku;
        field[1][3] = tsumo.nonJiku;
      } else {
        field[0][2] = tsumo.jiku;
        field[1][2] = tsumo.jiku;
        field[0][3] = tsumo.jiku;
        field[1][3] = tsumo.jiku;
      }
    }

    // ぷよを左右に動かす
    const movePuyo = (direction) => {
      // 右へ移動
      if(direction) {
        // これ以上右へ動けないなら
        if(field[1][FIELD_COL - 1]) {
          return;
        } else {
          for(let y = 0; y < TSUMO_FIELD; y++) {
            for(let x = 0; x < (FIELD_COL - 1); x++) {
              field[y][FIELD_COL - 1 - x] =
                [field[y][FIELD_COL - 2 - x], field[y][FIELD_COL - 2 - x] = field[y][FIELD_COL - 1 - x]][0];
            }
          }
          tsumo.x++;
        }
      // 左へ移動
      } else {
        // これ以上左へ動けないなら
        if(field[1][0]) {
          return;
        } else {
          for(let y = 0; y < TSUMO_FIELD; y++) {
            for(let x = 0; x < (FIELD_COL - 1); x++) {
              field[y][x] =
                [field[y][x + 1], field[y][x + 1] = field[y][x]][0];
            }
          }
          tsumo.x--;
        }
      }
      loadDestination();
    }

    // ぷよを回転する
    const rotate = (direction, x, type, rotStat) => {

      // 軸ぷよを中心に周りのぷよを回転させる
      const jikuRot = (direction, x) => {
        // 右回転
        if(direction) {
          if(x === 0) {
            field[2][0] = field[1][1];
            field[1][1] = field[0][0];
            field[0][0] = 0;
          } else if(x === 5 ) {
            field[0][5] = field[1][4];
            field[1][4] = field[2][5];
            field[2][5] = 0;
          } else {
            let buf = field[0][x];
            field[0][x] = field[1][x - 1];
            field[1][x - 1] = field[2][x];
            field[2][x] = field[1][x + 1];
            field[1][x + 1] = buf;
          }
        // 左回転
        } else {
          if(x === 0) {
            field[0][0] = field[1][1];
            field[1][1] = field[2][0];
            field[2][0] = 0;
          } else if(x === 5 ) {
            field[2][5] = field[1][4];
            field[1][4] = field[0][5];
            field[0][5] = 0;
          } else {
            let buf = field[0][x];
            field[0][x] = field[1][x + 1];
            field[1][x + 1] = field[2][x];
            field[2][x] = field[1][x - 1];
            field[1][x - 1] = buf;
          }
        }
      }

      // 4個ぷよを回転させる
      // 2個ぷよ、3個ぷよの壁蹴りにも用いる
      const nonJikuRot = (direction, x, y) => {
        // 右回転
        if(direction) {
          let buf = field[y][x];
          field[y][x] = field[y + 1][x];
          field[y + 1][x] = field[y + 1][x + 1];
          field[y + 1][x + 1] = field[y][x + 1];
          field[y][x + 1] = buf;
        // 左回転
        } else {
          let buf = field[y][x];
          field[y][x] = field[y][x + 1];
          field[y][x + 1] = field[y + 1][x + 1];
          field[y + 1][x + 1] = field[y + 1][x];
          field[y + 1][x] = buf;
        }
      }

      // 負数剰余対策
      const mod = (a, b) => {
        return (a % b + b) % b;
      }

      if(type === '2') {
        // 右回転
        if(direction) {
          if(x === 0 && rotStat === 2 || x === 5 && rotStat === 0){
            let y = x ? 0 : 1;
            let adj = y ? 0 : 1;
            nonJikuRot(direction, x - adj, y);
            y ? tsumo.x++ : tsumo.x--;
          } else {
            jikuRot(direction, x);
          }
          tsumo.rotStat = mod(tsumo.rotStat + 1, 4);
        // 左回転
        } else {
          if(x === 0 && rotStat === 0 || x === 5 && rotStat === 2){
            let y = x ? 1 : 0;
            let adj = y;
            nonJikuRot(direction, x - adj, y);
            y ? tsumo.x-- : tsumo.x++;
          } else {
            jikuRot(direction, x);
          }
          tsumo.rotStat = mod(tsumo.rotStat - 1, 4);
        }
      } else if (type === '|' || type === '_') {
        // 右回転
        if(direction) {
          if(x === 0 && rotStat === 1 || x === 5 && rotStat === 3){
            let y = x ? 0 : 1;
            let adj = y ? 0 : 1;
            nonJikuRot(direction, x - adj, y);
            y ? tsumo.x++ : tsumo.x--;
          } else {
            jikuRot(direction, x);
          }
          tsumo.rotStat = mod(tsumo.rotStat + 1, 4);
        // 左回転
        } else {
          if(x === 0 && rotStat === 0 || x === 5 && rotStat === 2){
            let y = x ? 1 : 0;
            let adj = y;
            nonJikuRot(direction, x - adj, y);
            y ? tsumo.x-- : tsumo.x++;
          } else {
            jikuRot(direction, x);
          }
          tsumo.rotStat = mod(tsumo.rotStat - 1, 4);
        }
      } else if (type === '4') {
        // 右回転
        if(direction) {
          nonJikuRot(direction, x, 0);
          tsumo.rotStat = mod(tsumo.rotStat + 1, 4);
        // 左回転
        } else {
          nonJikuRot(direction, x, 0);
          tsumo.rotStat = mod(tsumo.rotStat - 1, 4);
        }
      } else {
        // 現在は中辛（4色）のみ対応
        tsumo.rotStat = direction ? mod(tsumo.rotStat + 1, PUYO_COLORS_NUM[1]) : mod(tsumo.rotStat - 1, PUYO_COLORS_NUM[1]);
        field[0][x] = PUYO_COLORS[tsumo.rotStat];
        field[0][x + 1] = PUYO_COLORS[tsumo.rotStat];
        field[1][x] = PUYO_COLORS[tsumo.rotStat];
        field[1][x + 1] = PUYO_COLORS[tsumo.rotStat];
      }
      loadDestination();
    }

    // 落下地点を読み込む
    const loadDestination = () => {
      dests = [];
      for(let x = 0; x < FIELD_COL; x++) {
        let c = [];
        for(let y = 0; y < TSUMO_FIELD; y++) {
          if(field[TSUMO_FIELD - y - 1][x]) c.push(field[TSUMO_FIELD - y - 1][x]);
        }
        if(c.length) {
          for(let n = 0; n < FIELD_ROW; n++) {
            if(!field[FIELD_ROW - n - 1][x]) {
              for(let m = 0; m < c.length; m++) {
                dests.push({
                  x: x,
                  y: FIELD_ROW - n - m - 1,
                  color: c[m]
                });
              }
              break;
            }
          }
        }
      }
    }

    //　ぷよのタイプと落下の目的地をみて置けるかチェックする
    const checkCanDrop = () => {

      // 指定された列で最高位にあるぷよの段数を数える
      const countColPuyo = (x) => {
        for(let y = 3; y < FIELD_ROW; y++) {
          if(field[y][x]) return y;
        }
        return -1;
      }

      if(tsumo.type === '2' || tsumo.type === '|' || tsumo.type === '_') {
        if(dests.some(dest => dest.y < 3)) {
          if(countColPuyo(1) === 4 || countColPuyo(4) === 4) {
            return true;
          } else if(countColPuyo(0) === 4) {
            if(countColPuyo(1) === 3 && countColPuyo(5) !== 4) {
              return false;
            } else {
              return true;
            }
          } else if (countColPuyo(5) === 4) {
            if(countColPuyo(4) === 3 && countColPuyo(0) !== 4) {
              return false;
            } else {
              return true;
            }
          } else {
            return false;
          }
        } else {
          return true;
        }
      // 4個ぷよ、でかぷよの時
      } else {
        return !dests.some(dest => dest.y < 3);
      }
    }

    // ぷよを落とす (無限回し考慮)
    const dropPuyo = () => {
      dests.filter(dest => dest.y > 2).forEach(dest => {
        field[dest.y][dest.x] = dest.color;
      });
      for(let y = 0; y < TSUMO_FIELD; y++) {
        field[y].fill(0);
      }
      dests = [];
    }

    // 直前の状態のフィールドを保存する（setTsumo関数の中で使用）
    const recordField = () => {
      fieldRecords[tsumoCount] = [];
      for(let y = 0; y < FIELD_ROW; y++) {
        fieldRecords[tsumoCount][y] = [];
        for(let x = 0; x < FIELD_COL; x++) {
          fieldRecords[tsumoCount][y][x] = field[y][x];
        }
      }
    }

    // スコアの変遷を保存する（setTsumo関数の中で使用）
    const recordScore = () => {
      scoreRecords[tsumoCount] = score;
    }

    // ツモを用意する（現在は中辛のみに対応）
    // isRestricted: 初手2手の制約を加えるかどうか
    // seed: ツモ生成時の乱数の種を指定
    const prepareTsumo = (isRestricted, seed) => {
      const random = new Random(seed);
      let restrictedColors = ['r', 'g', 'b'];
      const restrictTsumo = () => {
        let r = random.genInt(0, 2);
        restrictedColors.push(PUYO_COLORS[r]);
      }

      const sixteenTsumo = ['r', 'r', 'r', 'r', 'g', 'g', 'g', 'g', 'b', 'b', 'b', 'b', 'y', 'y', 'y', 'y'];
      for(let i = 0; i < (TSUMO_GEN_NUM / 8); i++) {
        let group = sixteenTsumo;
        for(let j = group.length; j > 1; j--) {
          let r = random.genInt(0, j - 1);
          group[r] = [group[j - 1], group[j - 1] = group[r]][0];
        }
        tsumoColors.push(...group);
      }
      if(isRestricted) {
        restrictTsumo();
        tsumoColors[0] = restrictedColors[0];
        tsumoColors[1] = restrictedColors[1];
        tsumoColors[2] = restrictedColors[2];
        tsumoColors[3] = restrictedColors[3];
      }
      // ツモのカスタム （改良の余地あり）
      if(props.customizedTsumo.length) {
        if(props.fever) {
          let sixteenBeginning = random.genInt(0, 15);
          tsumoColors.splice(0, sixteenBeginning);
          for(let i = 0; i < props.customizedTsumo.length; i++) {
            if(props.customizedTsumo[i] && props.customizedTsumo[i] !== 'w') {
              tsumoColors[i] = props.customizedTsumo[i];
            }
          }
        } else {
          if(props.alertCustom) {
            for(let i = 0; i < props.customizedTsumo.length; i++) {
              if(props.customizedTsumo[i] && props.customizedTsumo[i] !== 'w') {
                tsumoColors[i] = props.customizedTsumo[i];
              }
            }
          } else {
            const arrNum = Math.floor(props.customizedTsumo.length / 16 + 1);
            let arr = [];
            for(let i = 0; i < arrNum; i++) {
              let arr16 = [];
              for(let j = 0; j < 16; j++) {
                arr16.push(props.customizedTsumo[i * 16 + j]);
              }
              arr.push(arr16);
            }
            arr[0][0] = 'w';
            arr[0][1] = 'w';
            arr[0][2] = 'w';
            console.log(arr[0][3]);
            let buff = arr[0][3];
            arr[0][3] = 'w';
            arr.forEach((arr16, index) => {
              const colorCount = {
                r: 0,
                g: 0,
                b: 0,
                y: 0
              }
              arr16.forEach((color) => {
                switch (color) {
                  case 'r':
                    colorCount.r++;
                    break;
                  case 'g':
                    colorCount.g++;
                    break;
                  case 'b':
                    colorCount.b++;
                    break;
                  case 'y':
                    colorCount.y++;
                    break;
                  default:
                }
              });
              const colorsArr = ['r', 'b', 'g', 'y'];
              let baseTsumo = [];
              for(let i in colorsArr) {
                for(let j = 0; j < (4 - colorCount[colorsArr[i]]); j++) {
                  baseTsumo.push(colorsArr[i]);
                }
              }
              for(let i = baseTsumo.length; i > 1; i--) {
                let r = random.genInt(0, i - 1);
                baseTsumo[r] = [baseTsumo[i - 1], baseTsumo[i - 1] = baseTsumo[r]][0];
              }
              let count = 0;
              for(let i = 0; i < 16; i++) {
                if(arr16[i] && arr16[i] !== 'w') {
                  tsumoColors[index * 16 + i] = arr16[i]
                } else {
                  tsumoColors[index * 16 + i] = baseTsumo[count];
                  count++;
                }
              }
            });
            tsumoColors[0] = 'r';
            tsumoColors[1] = 'g';
            tsumoColors[2] = 'b';
            if(buff && buff !== 'w') {
              tsumoColors[3] = buff;
            } else {
              const colorsArr = ['r', 'b', 'g'];
              let r = random.genInt(0, 2);
              tsumoColors[3] = colorsArr[r];
            }
          }
        }
      }
    }

    // ツモを一つ次に進める
    const setTsumo = () => {
      let adj = 0;
      tsumo.x = 2;
      tsumo.type = CHARA_LIST[charaNum].tsumoPattern[tsumoPatternCount];
      nextTsumo.type = CHARA_LIST[charaNum].tsumoPattern[(tsumoPatternCount + 1) % 16];
      nextNextTsumo.type = CHARA_LIST[charaNum].tsumoPattern[(tsumoPatternCount + 2) % 16];
      tsumoPatternCount++;
      if(tsumoPatternCount === 16) tsumoPatternCount = 0;
      tsumo.rotStat = 0;
      nextTsumo.rotStat = 0;
      nextNextTsumo.rotStat = 0;
      tsumo.jiku = tsumoColors[tsumoColorCount];
      tsumoColorCount++;
      if(tsumo.type === 'o') {
        tsumo.rotStat = PUYO_COLORS.indexOf(tsumo.jiku);
      } else if(tsumo.type === '4' && tsumo.jiku === tsumoColors[tsumoColorCount]) {
        tsumo.nonJiku = PUYO_COLORS[(PUYO_COLORS.indexOf(tsumoColors[tsumoColorCount]) + 1) % 4];
        tsumoColorCount++;
      } else {
        tsumo.nonJiku = tsumoColors[tsumoColorCount];
        tsumoColorCount++;
      }
      nextTsumo.jiku = tsumoColors[tsumoColorCount];
      adj++;
      if(nextTsumo.type === 'o') {
        nextTsumo.rotStat = PUYO_COLORS.indexOf(nextTsumo.jiku);
      } else if(nextTsumo.type === '4' && nextTsumo.jiku === tsumoColors[tsumoColorCount + adj]) {
        nextTsumo.nonJiku = PUYO_COLORS[(PUYO_COLORS.indexOf(tsumoColors[tsumoColorCount + adj]) + 1) % 4];
        adj++;
      } else {
        nextTsumo.nonJiku = tsumoColors[tsumoColorCount + adj];
        adj++;
      }
      nextNextTsumo.jiku = tsumoColors[tsumoColorCount + adj];
      adj++;
      if(nextNextTsumo.type === 'o') {
        nextNextTsumo.rotStat = PUYO_COLORS.indexOf(nextNextTsumo.jiku);
      } else if(nextNextTsumo.type === '4' && nextNextTsumo.jiku === tsumoColors[tsumoColorCount + adj]) {
        nextNextTsumo.nonJiku = PUYO_COLORS[(PUYO_COLORS.indexOf(tsumoColors[tsumoColorCount + adj]) + 1) % 4];
        adj++;
      } else {
        nextNextTsumo.nonJiku = tsumoColors[tsumoColorCount + adj];
        adj++;
      }
      recordField();
      recordScore();
      tsumoCount++;
    }

    // ツモを一つ戻す
    const backPuyo = () => {
      tsumoCount -= 2;
      tsumoPatternCount = (tsumoPatternCount + 14) % 16;
      if(CHARA_LIST[charaNum].tsumoPattern[tsumoPatternCount] === "o" || CHARA_LIST[charaNum].tsumoPattern[tsumoPatternCount + 1] === "o") {
        tsumoColorCount -= 3;
      } else {
        tsumoColorCount -= 4;
      }
      field = fieldRecords[tsumoCount];
    }

    // 繋がっているぷよをリストアップする
    const listLinkedPuyo = () => {

      // 繋がっている同じ色のぷよを見つけ出す
      const listPuyoBlock = (x, y) => {
        let color
        if(field[y][x]) {
          puyoBlock.push({
            x: x,
            y: y,
            c: field[y][x]
          });
          color = field[y][x];
          field[y][x] = 0;
        } else {
          return;
        }
        const direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for(let i = 0; i < direction.length; i++) {
          const dx = x + direction[i][0];
          const dy = y + direction[i][1];
          if(dx < 0 || dy < 4 || dx >= FIELD_COL || dy >= FIELD_ROW) continue;
          if(color !== field[dy][dx]) continue;
          listPuyoBlock(dx, dy);
        }
      }

      for(let y = 0; y < FIELD_ROW - TSUMO_FIELD - 1; y++) {
        for(let x = 0; x < FIELD_COL; x++) {
          if(field[FIELD_ROW - y - 1][x]) {
            puyoBlock = [];
            listPuyoBlock(x, FIELD_ROW - y - 1);
            linkedPuyo.push(puyoBlock);
          }
        }
      }
    }

    // ぷよが消えるかチェックする
    const checkErase = () => {
      erasingPuyo = linkedPuyo.filter(puyoBlock => puyoBlock.length >= ERASE_PUYO_COUNT);
      existingPuyo = linkedPuyo.filter(puyoBlock => puyoBlock.length < ERASE_PUYO_COUNT);
      linkedPuyo = [];
    }

    // スコア計算
    const calcScore = () => {
      let rensaBonus;
      if(props.fever) {
        rensaBonus = CHARA_LIST[charaNum].feverRatio[rensaCount];
      } else {
        rensaBonus = CHARA_LIST[charaNum].normalRatio[rensaCount];
      }
      let linkBonus = erasingPuyo.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.length - 4;
      }, 0)
      let colorBonus = COLOR_RATIO[[...new Set(erasingPuyo.map((value) => value[0].c))].length];
      let totalBonus = rensaBonus + linkBonus + colorBonus;
      if(!totalBonus) totalBonus = 1;
      let erasedPuyoNum = erasingPuyo.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.length;
      }, 0)
      let erasedPuyoScore = erasedPuyoNum * 10;
      let totalScore = erasedPuyoScore * totalBonus;
      // グローバルな変数scoreに合計得点を加算しておく
      score += totalScore;
      return [erasedPuyoScore, totalBonus];
    }

    // 予告ぷよ計算
    const calcYokoku = (score) => {
      let ojama = Math.floor(score / 120);
      let drawingYokokuCount = 0;
      let drawingYokoku = [];
      while(ojama > 0 && drawingYokokuCount < 6) {
        for(let i = 0; i < 7; i++) {
          if(ojama >= YOKOKU[i]) {
            ojama-= YOKOKU[i];
            drawingYokokuCount++;
            drawingYokoku.push(i);
            break;
          }
        }
      }
      return drawingYokoku;
    }

    // 残るぷよをフィールドに戻す
    const returnPuyo = () => {
      existingPuyo.forEach(existingPuyoBlock => {
        existingPuyoBlock.map(puyo => {
          field[puyo.y][puyo.x] = puyo.c;
        });
      });
    }

    // 自然落下させる
    const fallPuyo = () => {
      for(let x = 0; x < FIELD_COL; x++) {
        let rowCount = 0;
        for(let y = 0; y < FIELD_ROW - TSUMO_FIELD; y++) {
          if(field[FIELD_ROW - y - 1][x]) {
            field[FIELD_ROW - rowCount - 1][x] = field[FIELD_ROW - y - 1][x];
            if(rowCount !== y) field[FIELD_ROW - y - 1][x] = 0;
            rowCount++;
          }
        }
      }
    }

    // れんささせる
    const rensa = async () => {

      // ぷよが消えている描写
      const erasing = () => {
        return new Promise((resolve, reject) => {
          returnPuyo();
          drawAll();
          rensaCount++;
          let [erasedPuyoScore, totalBonus] = calcScore()
          context.clearRect(SCORE_FIELD_X * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE, 1.5 *  PUYO_SIZE);
          context.textAlign = "center";
          context.fillStyle = '#38D'
          context.font = "38px sans-serif";
          context.fillText(erasedPuyoScore + " × " + totalBonus, (SCORE_FIELD_X + FIELD_COL / 2) * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE);
          existingPuyo = [];
          erasingPuyo = [];
          resolve();
        });
      }

      // ぷよが落ちる描写
      const falling = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fallPuyo();
            listLinkedPuyo();
            falledPuyo = linkedPuyo;
            drawAll();
            context.clearRect(SCORE_FIELD_X * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE, 2.5 * PUYO_SIZE);
            context.textAlign = "right"
            context.fillStyle = '#38D'
            context.font = "38px sans-serif";
            context.fillText(score, (SCORE_FIELD_X + FIELD_COL) * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE);
            let drawingYokoku = calcYokoku(score - beforeScore);
            for(let i = 0; i < drawingYokoku.length; i++) {
              drawPuyo(i + YOKOKU_FIELD_X, YOKOKU_FIELD_Y, drawingYokoku[i], 32, puyoImage);
            }
            if(rensaCount) {
              context.clearRect(RENSA_NUM_FIELD_X * PUYO_SIZE, RENSA_NUM_FIELD_Y * PUYO_SIZE, RENSA_NUM_FIELD_WIDTH * PUYO_SIZE, 2.5 * PUYO_SIZE);
              context.textAlign = "center"
              context.fillStyle = 'black'
              context.font = "24px sans-serif";
              context.fillText(rensaCount + "連鎖", (RENSA_NUM_FIELD_X + RENSA_NUM_FIELD_WIDTH / 2) * PUYO_SIZE, RENSA_NUM_FIELD_Y * PUYO_SIZE, RENSA_NUM_FIELD_WIDTH * PUYO_SIZE);
            }
            resolve();
          }, 400);
        });
      }

      // ぷよが消えるかチェック
      const check = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            checkErase();
            falledPuyo = [];
            resolve();
          }, 400);
        });
      }

      rensaCount = 0;
      listLinkedPuyo();
      checkErase();
      if(!!erasingPuyo.length && props.fever) {
        checkFeverErase = true;
      }
      while(!!erasingPuyo.length) {
        let prom = Promise.resolve();
        prom = await prom
        .then(erasing)
        .then(falling)
        .then(check);
      }
      if(rensaCount) {
        beforeScore = score;
      }
      returnPuyo();
    }

    // ばたんきゅーしているかチェックする
    const checkBatankyu = () => {
      return (!!field[4][2] || !!field[4][3])
    }


    // 連鎖のタネを読み込む
    const loadSeeds = (seedsType, chainNum, isFixed) => {
      const decode = new Decode();
      if(isFixed) {
        field = decode.decodeToField(SEEDS_TYPES[seedsType][chainNum])[0];
      } else {
        const random = new Random(props.changeTsumo);
        let fourColors = ['r', 'g', 'b', 'y'];
        for(let j = 4; j > 1; j--) {
          let r = random.genInt(0, j - 1);
          fourColors[r] = [fourColors[j - 1], fourColors[j - 1] = fourColors[r]][0];
        }
        field = decode.decodeToField(SEEDS_TYPES[seedsType][chainNum], fourColors[0], fourColors[1], fourColors[2], fourColors[3])[0];
      }
    }

    // キーボードが押された時の処理
    const leftKey = () => {
      movePuyo(0);
      drawAll();
    }
    const rightKey = () => {
      movePuyo(1);
      drawAll();
    }
    const downKey = () => {
      if(!checkBatankyu()) {
        if(!checkFeverErase) {
          if(checkCanDrop()) {
            const prom = Promise.resolve();
            prom
            .then(() => {
              acceptKeyDown = false;
            })
            .then(dropPuyo)
            .then(() => {
              return new Promise((resolve, reject) => {
                Promise.resolve()
                .then(rensa)
                .then(resolve);
              });
            })
            .then(setTsumo)
            .then(loadTsumo)
            .then(loadDestination)
            .then(drawAll)
            .then(() => {
              acceptKeyDown = true;
            });
          }
        }
      }
    }
    const upKey = () => {
      if(tsumoCount - 1) {
        backPuyo();
        context.clearRect(SCORE_FIELD_X * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE, 1.5 * PUYO_SIZE);
        context.textAlign = "right";
        context.fillStyle = '#38D';
        context.font = "38px sans-serif";
        context.fillText(scoreRecords[tsumoCount], (SCORE_FIELD_X + FIELD_COL) * PUYO_SIZE, SCORE_FIELD_Y * PUYO_SIZE, SCORE_FIELD_WIDTH * PUYO_SIZE);
        score = scoreRecords[tsumoCount];
        beforeScore = scoreRecords[tsumoCount];
        listLinkedPuyo();
        checkErase();
        returnPuyo();
        setTsumo();
        loadTsumo();
        loadDestination();
        drawAll();
        checkFeverErase = false;
      }
    }
    const zKey = () => {
      rotate(0, tsumo.x, tsumo.type, tsumo.rotStat);
      drawAll();
      }
    const xKey = () => {
      rotate(1, tsumo.x, tsumo.type, tsumo.rotStat);
      drawAll();
    }
    const pKey = () => {
      isDrawDestination = !isDrawDestination;
      setDrawDestination(isDraw => !isDraw);
      drawAll();
    }
    const keyDown = (e) => {
      if(acceptKeyDown){
        if(e.key === 'ArrowLeft') {
          leftKey();
          e.preventDefault();
        }
        if(e.key === 'ArrowRight') {
          rightKey();
          e.preventDefault();
        }
        if(e.key === 'ArrowDown') {
          downKey();
          e.preventDefault();
        }
        if(e.key === 'ArrowUp') {
          upKey();
          e.preventDefault();
        }
        if(e.key === 'z') {
          zKey();
        }
        if(e.key === 'x') {
          xKey();
        }
        if(e.key === 'p') {
          pKey();
        }
      }
    }

    const pushButton = (e) => {
      if(acceptKeyDown){
        if(e.target.getAttribute('id') === 'leftButton') {
          leftKey();
        }
        if(e.target.getAttribute('id') === 'rightButton') {
          rightKey();
        }
        if(e.target.getAttribute('id') === 'downButton') {
          downKey();
        }
        if(e.target.getAttribute('id') === 'upButton') {
          upKey();
        }
        if(e.target.getAttribute('id') === 'zButton') {
          zKey();
        }
        if(e.target.getAttribute('id') === 'xButton') {
          xKey();
        }
        if(e.target.getAttribute('id') === 'onOffButton') {
          pKey();
        }
      }
    }

    if(context) {
      puyoImage.onload = () => {
        if(props.start) {
          if(props.fever) {
            if(props.beginning) {
              tsumoPatternCount = props.beginning - 1;
            } else {
              const random = new Random(props.changeTsumo);
              tsumoPatternCount = random.genInt(0, 15);
            }
            init();
            if(Object.keys(props.rensaType).length) {
              loadSeeds(props.rensaType.type, props.rensaType.num, !props.active);
            }
            prepareTsumo(false, props.changeTsumo);
            listLinkedPuyo();
            checkErase();
            returnPuyo();
            setTsumo();
            loadTsumo();
            loadDestination();
            drawAll();
          } else {
            init();
            prepareTsumo(true, props.changeTsumo);
            listLinkedPuyo();
            checkErase();
            returnPuyo();
            setTsumo();
            loadTsumo();
            loadDestination();
            drawAll();
          }
        } else {
          if(props.fever) {
            acceptKeyDown = false;
            init();
            if(Object.keys(props.rensaType).length) {
              loadSeeds(props.rensaType.type, props.rensaType.num, !props.active);
              listLinkedPuyo();
              checkErase();
              returnPuyo();
              drawAll();
            }
          } else {
            acceptKeyDown = false;
            init();
          }
        }
      }
    }

    document.addEventListener('keydown', keyDown);

    const upButton = document.getElementById("upButton");
    const leftButton = document.getElementById("leftButton");
    const downButton = document.getElementById("downButton");
    const rightButton = document.getElementById("rightButton");
    const zButton = document.getElementById("zButton");
    const xButton = document.getElementById("xButton");
    const onOffButton = document.getElementById("onOffButton");

    upButton.addEventListener('click', pushButton);
    leftButton.addEventListener('click', pushButton);
    downButton.addEventListener('click', pushButton);
    rightButton.addEventListener('click', pushButton);
    zButton.addEventListener('click', pushButton);
    xButton.addEventListener('click', pushButton);
    onOffButton.addEventListener('click', pushButton);

    return () => {
      document.removeEventListener('keydown', keyDown);
      upButton.removeEventListener('click', pushButton);
      leftButton.removeEventListener('click', pushButton);
      downButton.removeEventListener('click', pushButton);
      rightButton.removeEventListener('click', pushButton);
      zButton.removeEventListener('click', pushButton);
      xButton.removeEventListener('click', pushButton);
      onOffButton.removeEventListener('click', pushButton);
    }

  }, [context, props.fever, props.start, props.toFirst, props.changeTsumo, props.chara, props.customizedTsumo, props.alertCustom, props.beginning, props.rensaType, props.active])

  return(
    <div>
      <div style={{
          position: 'relative'
        }}>
        <canvas
          ref={canvasRef}
          width="300"
          height="575"
          style={{
            display: 'block',
            margin: 'auto',
            paddingLeft: '5px',
            paddingRight: '5px',
            backgroundColor: '#efefef'
          }}
          >
        </canvas>
        <button id="onOffButton" className="btn btn-info" style={{
            position: 'absolute',
            top: '7px',
            right: '7px',
            padding: '5px'
          }}>
          ゴースト<br/>on/off
        </button>
      </div>
      <div style={{
          width: '310px',
          paddingBottom: '10px',
          paddingLeft: '5px',
          paddingRight: '5px',
          backgroundColor: '#efefef'
        }}>
        <input id="upButton" type="button" value="↑" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px',
            marginLeft: '57px',
            marginTop: '2px',
            marginBottom: '2px'
          }}/>
        <br/>
        <input id="leftButton" type="button" value="←" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px',
            marginRight: '2px'
          }}/>
        <input id="downButton" type="button" value="↓" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px',
            marginRight: '2px'
          }}/>
        <input id="rightButton" type="button" value="→" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px',
            marginRight: '19px'
          }}/>
        <input id="zButton" type="button" value="z" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px',
            marginRight: '2px'
          }}/>
        <input id="xButton" type="button" value="x" className="btn btn-info" style={{
            width: '55px',
            height: '55px',
            fontSize: '28px'
          }}/>
      </div>
    </div>
  )

}


export default Simulater
