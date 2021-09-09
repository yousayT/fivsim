import React, {useState, useEffect} from 'react'
import {CHARA_LIST} from './Simulater'
import Description from './Description'

function Character(props) {

  const doChange = (e) => {
    props.setChara(e.target.value);
    props.setStart(false);
  }

  const charaNames = CHARA_LIST.map((value, key) => (
    <option value={key} key={key}>
      {value.name}
    </option>
  ))

  let description = [];
  for(let i = 0; i < 16; i++) {
    description.push(
      <Description type={CHARA_LIST[props.chara].tsumoPattern[i]} key={i}/>
    )
  }



  return (
    <div>
      <div className="form-group mt-3">
        <label htmlFor="chara-select">キャラ：</label>
        <select name="charas" id="chara-select" className="form-control" onChange={doChange}>
          {charaNames}
        </select>
      </div>
      <div style={{
        }}>
        ツモパターン：
        <div className="mx-2">
          {description}
        </div>
        <div style={{
            width: '100%',
            height: '24px',
            marginBottom: '10px'
          }}>
        </div>
      </div>
    </div>
  )
}

export default Character
