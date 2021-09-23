import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import './SelectRensa.css'
import MediaQuery from 'react-responsive'

function SelectRensa(props) {
  const [showModal, setShowModal] = useState(false);

  const doSelect = (e) => {
    const data = {
      type: e.target.getAttribute('value'),
      num: e.target.textContent
    }
    props.setRensaType(data);
    props.setStart(false);
    handleCloseModal();
  }

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleActive = () =>{
    props.setActive(!props.active);
  }

  let kaidan = [];
  let hasamikomi = [];
  let hiradumi = [];
  let zabuton = [];
  for(let i = 0; i < 13; i++) {
    kaidan.push(
      <td className="tdStyle" key={i} onClick={doSelect} value='kaidan'>{i + 3}</td>
    )
    hasamikomi.push(
      <td className="tdStyle" key={i} onClick={doSelect} value='hasamikomi'>{i + 3}</td>
    )
    hiradumi.push(
      <td className="tdStyle" key={i} onClick={doSelect} value='hiradumi'>{i + 3}</td>
    )
    zabuton.push(
      <td className="tdStyle" key={i} onClick={doSelect} value='zabuton'>{i + 3}</td>
    )
  }

  let nRensa = [];
  for(let i = 0; i < 13; i++) {
    nRensa.push(
      <tr key={i}>
        <td className="tdStyle" onClick={doSelect} value='kaidan'>{i + 3}</td>
        <td className="tdStyle" onClick={doSelect} value='hasamikomi'>{i + 3}</td>
        <td className="tdStyle" onClick={doSelect} value='hiradumi'>{i + 3}</td>
        <td className="tdStyle" onClick={doSelect} value='zabuton'>{i + 3}</td>
      </tr>
    )
  }

  return (
    <div>
      <button className="btn btn-outline-success my-3" onClick={handleShowModal}>
        れんさのタネ選択
      </button>
      <br/>
      {
        props.active ?
          <div>
            <div className="btn-group btn-block">
              <button className="btn btn-success" onClick={handleActive}>1色で固定</button>
              <button className="btn btn-success active">ランダム</button>
            </div>
            <div style={{
                fontSize: '13px'
              }} className="alert alert-success text-center">リセットと同時にれんさのタネの色がランダムで変わります</div>
          </div>
        :
          <div>
            <div className="btn-group btn-block" >
              <button className="btn btn-success active">1色で固定</button>
              <button className="btn btn-success" onClick={handleActive}>ランダム</button>
            </div>
            <div style={{
                fontSize: '13px'
              }} className="alert alert-success text-center">リセットしてもれんさのタネの色が変わりません</div>
          </div>
      }
      <Modal show={showModal} onHide={handleCloseModal} backdrop="static" size='lg' centered>
        <Modal.Header>
          <Modal.Title>れんさのタネ選択</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-bordered">
            <tbody className="text-center">
              <MediaQuery query='(max-width: 991px)'>
                <tr style={{backgroundColor: '#d4edda', width: '25%'}}><th style={{fontWeight: 'normal'}}>階段</th><th style={{fontWeight: 'normal'}}>挟み込み</th><th style={{fontWeight: 'normal'}}>平積み</th><th style={{fontWeight: 'normal'}}>座布団</th></tr>
                {nRensa}
              </MediaQuery>
              <MediaQuery query='(min-width: 992px)'>
                <tr><td style={{backgroundColor: '#d4edda', width: '12.9%'}}>階段</td>{kaidan}</tr>
                <tr><td style={{backgroundColor: '#d4edda', width: '12.9%'}}>挟み込み</td>{hasamikomi}</tr>
                <tr><td style={{backgroundColor: '#d4edda', width: '12.9%'}}>平積み</td>{hiradumi}</tr>
                <tr><td style={{backgroundColor: '#d4edda', width: '12.9%'}}>座布団</td>{zabuton}</tr>
              </MediaQuery>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>キャンセル</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default SelectRensa;
