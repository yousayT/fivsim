import React, {useState, useEffect} from 'react'
import {Modal, Row, Col} from 'react-bootstrap'
import {CHARA_LIST} from './Simulater'
import TsumoItem from './TsumoItem'
import MediaQuery from 'react-responsive'

function CustomTsumo(props) {
  // 5の倍数が好ましい
  // ただしスマホ版は3の倍数になっている
  const CUSTOM_TSUMO_NUM = 20;

  let charaIndex = props.chara;

  const [customColorData, setCustomColorData] = useState([]);
  const [buttonFlg, setButtonFlg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [clearTsumo, setClearTsumo] = useState(false);

  const doCustomize = (e) => {
    const alertCustomize = (tsumoColors) => {
      tsumoColors[0] = 'w';
      tsumoColors[1] = 'w';
      tsumoColors[2] = 'w';
      let buff = tsumoColors[3];
      tsumoColors[3] = 'w';
      const arrNum = Math.floor(tsumoColors.length / 16 + 1);
      let arr = [];
      for(let i = 0; i < arrNum; i++) {
        let arr16 = [];
        for(let j = 0; j < 16; j++) {
          arr16.push(tsumoColors[i * 16 + j]);
        }
        arr.push(arr16);
      }
      const colorsArr = ['r', 'b', 'g', 'y'];
      let flg = false;
      for(let i = 0; i < arrNum; i++) {
        for(let j in colorsArr) {
          if(flg) break;
          flg = arr[i].filter(tsumoColor => tsumoColor === colorsArr[j]).length >= 5;
        }
      }
      tsumoColors[0] = 'r';
      tsumoColors[1] = 'g';
      tsumoColors[2] = 'b';
      tsumoColors[3] = buff;
      return flg;
    }

    let arrayLen = 0;
    for(let i = 0; i < CUSTOM_TSUMO_NUM; i++) {
      if(CHARA_LIST[charaIndex].tsumoPattern[i % 16] === 'o') {
        arrayLen += 1;
      } else {
        arrayLen += 2;
      }
    }
    let tsumoColors;
    if(props.customizedTsumo.length) {
      tsumoColors = props.customizedTsumo;
    } else {
      tsumoColors = new Array(arrayLen);
    }
    for(let i = 0; i < customColorData.length; i++) {
      let arrayIndex = 0;
      for(let j = 0; j < customColorData[i].count - 1; j++) {
        if(CHARA_LIST[charaIndex].tsumoPattern[j % 16] === 'o') {
          arrayIndex += 1;
        } else {
          arrayIndex += 2;
        }
      }
      if(customColorData[i].num === 1) {
        tsumoColors[arrayIndex] = customColorData[i].color;
      } else {
        tsumoColors[arrayIndex + 1] = customColorData[i].color;
      }
    }
    props.setAlertCustom(alertCustomize(tsumoColors));
    props.setCustomizedTsumo(tsumoColors);
    setButtonFlg(true);
    props.setStart(false);
  }

  const cancelCustomize = () => {
    setCustomColorData([]);
  }

  const doClear = () => {
    setClearTsumo(true);

    let colorData = [];
    for(let i = 0; i < CUSTOM_TSUMO_NUM; i++) {
      if(CHARA_LIST[charaIndex].tsumoPattern[i % 16] === 'o') {
        colorData.push({count: i, num: 1, color: 'w'});
      } else {
        colorData.push({count: i, num: 1, color: 'w'})
        colorData.push({count: i, num: 2, color: 'w'})
      }
    }
    setCustomColorData(colorData);
  }


  const handleShowModal = () => {
    setShowModal(true);
    setButtonFlg(false);

  }

  const handleCloseModal = () => {
    setShowModal(false);
    cancelCustomize();
  }

  useEffect(() => {
    props.setCustomizedTsumo([]);
  }, [props.chara])

  const COLOR_CONVERTER = {r: 'red', g: 'lime', b: 'dodgerblue', y: 'yellow', w: 'white'};
  let items = [];
  let arrayIndex = 0;
  for(let i = 0; i < CUSTOM_TSUMO_NUM; i++) {
    if(CHARA_LIST[charaIndex].tsumoPattern[i % 16] === 'o') {
      items.push(
        <TsumoItem count={i + 1} type={CHARA_LIST[charaIndex].tsumoPattern[i % 16]} key={i} customColorData={customColorData} setCustomColorData={setCustomColorData} color1={COLOR_CONVERTER[props.customizedTsumo[arrayIndex] ?? 'w']} color2={'white'} clearTsumo={clearTsumo} setClearTsumo={setClearTsumo}/>
      )
      arrayIndex += 1;
    } else {
      items.push(
        <TsumoItem count={i + 1} type={CHARA_LIST[charaIndex].tsumoPattern[i % 16]} key={i} customColorData={customColorData} setCustomColorData={setCustomColorData} color1={COLOR_CONVERTER[props.customizedTsumo[arrayIndex] ?? 'w']} color2={COLOR_CONVERTER[props.customizedTsumo[arrayIndex + 1] ?? 'w']} clearTsumo={clearTsumo} setClearTsumo={setClearTsumo}/>
      )
      arrayIndex += 2;
    }
  }
  let fiveItems = [];
  for(let i = 0; i < CUSTOM_TSUMO_NUM / 5; i++) {
    let fiveItem = [];
    for(let j = 0; j < 5; j++) {
      fiveItem.push(
        <Col key={i * 5 + j}>
          {items[i * 5 + j]}
        </Col>
      )
    }
    fiveItems.push(
      <Row key={i}>
        {fiveItem}
      </Row>
    )
  }

  let threeItems = [];
  for(let i = 0; i < (Math.floor(CUSTOM_TSUMO_NUM / 3) + 1); i++) {
    let threeItem = [];
    for(let j = 0; j < 3; j++) {
      if(i * 3 + j !== CUSTOM_TSUMO_NUM) {
        threeItem.push(
          <Col key={i * 3 + j}>
            {items[i * 3 + j]}
          </Col>
        )
      } else {
        threeItem.push(
          <Col key={i * 3 + j}>
          </Col>
        )
      }
    }
    threeItems.push(
      <Row key={i}>
        {threeItem}
      </Row>
    )
  }

  let twoItems = [];
  for(let i = 0; i < Math.floor(CUSTOM_TSUMO_NUM / 2); i++) {
    let twoItem = [];
    for(let j = 0; j < 2; j++) {
      twoItem.push(
        <Col key={i * 2 + j}>
          {items[i * 2 + j]}
        </Col>
      )
    }
    twoItems.push(
      <Row key={i}>
        {twoItem}
      </Row>
    )
  }

  return (
    <div>
      <button className="btn btn-outline-info" onClick={handleShowModal}>
        ツモカスタム
      </button>
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" size="lg" centered>
        <Modal.Header>
          <Modal.Title>初手ツモのカスタム</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
            height: '350px',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
          <div className="container">
            <MediaQuery query='(max-width: 430px)'>
              {twoItems}
            </MediaQuery>
            <MediaQuery query='(min-width: 431px) and (max-width: 991px)'>
              {threeItems}
            </MediaQuery>
            <MediaQuery query='(min-width: 992px)'>
              {fiveItems}
            </MediaQuery>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            props.alertCustom &&
            <div className="alert alert-warning">※このツモパターンは存在しません（無視しても構いません）</div>
          }
          {
            buttonFlg ?
              <button className="btn btn-outline-danger pe-none" disabled>クリア</button>
            :
              <button className="btn btn-outline-danger" onClick={doClear}>クリア</button>
          }
          <button className="btn btn-secondary" onClick={handleCloseModal}>キャンセル</button>
          {
            buttonFlg ?
              <button className="btn btn-primary pe-none" disabled>設定完了！</button>
            :
              <button className="btn btn-primary" onClick={doCustomize}>設定する</button>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CustomTsumo
